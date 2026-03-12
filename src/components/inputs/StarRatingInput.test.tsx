import { fireEvent, render, screen } from '@testing-library/preact';
import { describe, expect, it, vi } from 'vitest';
import StarRatingInput from './StarRatingInput';

const baseProps = {
  title: 'Driver Skill',
  type: 'rating' as const,
  required: false,
  code: 'driverSkill',
  section: 'Postmatch',
  onChange: vi.fn(),
};

describe('StarRatingInput', () => {
  it('renders 5 star buttons', () => {
    render(<StarRatingInput {...baseProps} value={0} />);
    expect(screen.getAllByRole('button')).toHaveLength(5);
  });

  it('calls onChange with the clicked star number', () => {
    const onChange = vi.fn();
    render(<StarRatingInput {...baseProps} onChange={onChange} value={0} />);
    fireEvent.click(screen.getByLabelText('3 star'));
    expect(onChange).toHaveBeenCalledWith(3);
  });

  it('highlights stars up to and including the current value', () => {
    render(<StarRatingInput {...baseProps} value={3} />);
    const buttons = screen.getAllByRole('button');
    expect(buttons[0]).toHaveClass('text-yellow-400'); // star 1
    expect(buttons[1]).toHaveClass('text-yellow-400'); // star 2
    expect(buttons[2]).toHaveClass('text-yellow-400'); // star 3
    expect(buttons[3]).not.toHaveClass('text-yellow-400'); // star 4
    expect(buttons[4]).not.toHaveClass('text-yellow-400'); // star 5
  });

  it('highlights stars on hover', () => {
    render(<StarRatingInput {...baseProps} value={0} />);
    const buttons = screen.getAllByRole('button');
    fireEvent.mouseEnter(buttons[1]); // hover star 2
    expect(buttons[0]).toHaveClass('text-yellow-400');
    expect(buttons[1]).toHaveClass('text-yellow-400');
    expect(buttons[2]).not.toHaveClass('text-yellow-400');
  });

  it('clears hover highlight on mouse leave', () => {
    render(<StarRatingInput {...baseProps} value={0} />);
    const buttons = screen.getAllByRole('button');
    fireEvent.mouseEnter(buttons[2]);
    fireEvent.mouseLeave(buttons[2]);
    buttons.forEach(b => expect(b).not.toHaveClass('text-yellow-400'));
  });
});
