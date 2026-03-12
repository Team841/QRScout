import { act, fireEvent, render, screen } from '@testing-library/preact';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ConfigEditor } from './ConfigEditor';

// vi.hoisted ensures these are available inside vi.mock factories,
// which are hoisted to the top of the file before any imports run.
const { capturedCallbacks } = vi.hoisted(() => {
  const capturedCallbacks = {
    onValidate: undefined as ((markers: any[]) => void) | undefined,
  };
  return { capturedCallbacks };
});

const minimalConfig = { sections: [{ name: 'Test', fields: [] }] };

vi.mock('../store/store', () => ({
  useQRScoutState: (selector: any) => selector({ formData: minimalConfig }),
  getConfig: () => minimalConfig,
}));

vi.mock('@monaco-editor/react', () => ({
  default: ({
    defaultValue,
    onChange,
    onValidate,
  }: {
    defaultValue?: string;
    onChange?: (value: string) => void;
    onValidate?: (markers: any[]) => void;
  }) => {
    capturedCallbacks.onValidate = onValidate;
    return (
      <textarea
        data-testid="monaco-editor"
        defaultValue={defaultValue}
        onChange={e => onChange?.((e.target as HTMLTextAreaElement).value)}
      />
    );
  },
  useMonaco: () => null,
}));

describe('ConfigEditor', () => {
  beforeEach(() => {
    capturedCallbacks.onValidate = undefined;
  });

  it('Save button is enabled on initial render without any user changes', () => {
    render(<ConfigEditor />);
    const saveButton = screen.getByRole('button', { name: /save/i });
    expect(saveButton).not.toBeDisabled();
  });

  it('calls onSave with valid JSON when Save is clicked without editing', () => {
    const onSave = vi.fn();
    render(<ConfigEditor onSave={onSave} />);
    fireEvent.click(screen.getByRole('button', { name: /save/i }));
    expect(onSave).toHaveBeenCalledOnce();
    const savedText = onSave.mock.calls[0][0] as string;
    const parsed = JSON.parse(savedText);
    expect(parsed).toHaveProperty('sections');
  });

  it('calls onSave with updated text after user edits', () => {
    const onSave = vi.fn();
    render(<ConfigEditor onSave={onSave} />);
    fireEvent.change(screen.getByTestId('monaco-editor'), {
      target: { value: '{"sections":[]}' },
    });
    fireEvent.click(screen.getByRole('button', { name: /save/i }));
    expect(onSave).toHaveBeenCalledWith('{"sections":[]}');
  });

  it('calls onCancel when Cancel is clicked', () => {
    const onCancel = vi.fn();
    render(<ConfigEditor onCancel={onCancel} />);
    fireEvent.click(screen.getByRole('button', { name: /cancel/i }));
    expect(onCancel).toHaveBeenCalledOnce();
  });

  it('Save button is disabled when Monaco reports validation errors', () => {
    render(<ConfigEditor />);
    act(() => {
      capturedCallbacks.onValidate?.([{ message: 'Unexpected token' }]);
    });
    expect(screen.getByRole('button', { name: /save/i })).toBeDisabled();
  });

  it('Save button re-enables after validation errors are cleared', () => {
    render(<ConfigEditor />);
    act(() => {
      capturedCallbacks.onValidate?.([{ message: 'Unexpected token' }]);
    });
    act(() => {
      capturedCallbacks.onValidate?.([]);
    });
    expect(screen.getByRole('button', { name: /save/i })).not.toBeDisabled();
  });
});
