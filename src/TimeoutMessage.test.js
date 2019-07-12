import React from 'react';
import TimeoutMessage from './TimeoutMessage';
import { render, cleanup } from '@testing-library/react';

jest.useFakeTimers();

afterEach(cleanup);

test('renders with default text', () => {
  const { getByTestId } = render(<TimeoutMessage />)
  expect(getByTestId("timeout-message").textContent).toBe("This will timeout in 5 seconds");
});

test('text changes after timeout', () => {
  const { getByTestId } = render(<TimeoutMessage />);
  jest.runAllTimers();
  expect(getByTestId("timeout-message").textContent).toBe("Timeout!");
});
