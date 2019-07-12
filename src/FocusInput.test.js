import React from 'react';
import FocusInput from './FocusInput';
import { render, fireEvent, cleanup } from '@testing-library/react';

afterEach(cleanup);

test('FocusInput matches snapshot', () => {
  const { container } = render(<FocusInput />)
  expect(container.firstChild).toMatchSnapshot();
});

test('clicking on button trigger focus on input', () => {
  const { getByPlaceholderText, getByText } = render(<FocusInput />)
  fireEvent.click(getByText("Click to Focus"));
  expect(document.activeElement).toBe(getByPlaceholderText('Focus me!'));
});
