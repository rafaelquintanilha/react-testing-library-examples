import React from 'react';
import Timeout from './Timeout';
import { render, fireEvent, cleanup } from '@testing-library/react';

afterEach(cleanup);

jest.useFakeTimers();

test('clicking on button makes it disabled', () => {
  const { getByText } = render(<Timeout />);
  const button = getByText("Click to trigger timeout");
  expect(button.disabled).toBeFalsy();
  fireEvent.click(button);
  expect(button.disabled).toBeTruthy();
});

test('clicking on button displays timeout message', () => {
  const { getByText, queryByTestId, getByTestId } = render(<Timeout />);
  const button = getByText("Click to trigger timeout");
  expect(queryByTestId("timeout-message")).toBeNull();
  fireEvent.click(button);
  expect(getByTestId("timeout-message").textContent).toBe("This will timeout in 5 seconds");
  jest.runAllTimers();
  expect(getByTestId("timeout-message").textContent).toBe("Timeout!");
});