import React from 'react';
import MultipleFetches from './MultipleFetches';
import { render, fireEvent, cleanup, wait } from '@testing-library/react';

afterEach(cleanup);

test('starts without any post', () => {
  const { queryByTestId } = render(<MultipleFetches />);
  expect(queryByTestId("fetch-post")).toBeNull();
});

test('after clicking on button, displays loading message', () => {
  const { getByTestId, getByText } = render(<MultipleFetches />);
  fireEvent.click(getByText("Fetch post and comments"));
  expect(getByTestId("fetch-loading-post").textContent).toBe("Loading post...");
});

describe('API tests', () => {
  // Group API tests so we can clear the mock more easily
  afterEach(() => global.fetch.mockClear());

  test('displays post if API succeeds', async () => {
    // Mock API
    jest.spyOn(global, 'fetch')
      .mockImplementationOnce(() => Promise.resolve({
        status: 200,
        json: () => Promise.resolve({
          title: "How to Become a Bad Developer"
        })
      }))
      .mockImplementationOnce(() => Promise.resolve({
        status: 200,
        json: () => Promise.resolve([
          { id: 1, name: "Rafael" },
          { id: 2, name: "Andressa" }
        ])
      }));
  
    const { getByTestId, getByText, getAllByTestId } = render(<MultipleFetches />);
    fireEvent.click(getByText("Fetch post and comments"));
    
    await wait();
  
    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect(global.fetch.mock.calls[0][0]).toBe("https://jsonplaceholder.typicode.com/posts/1");
    expect(global.fetch.mock.calls[1][0]).toBe("https://jsonplaceholder.typicode.com/posts/1/comments");
    
    expect(getByTestId("fetch-post").textContent).toBe("How to Become a Bad Developer");
    expect(getByText("All fetched!")).toBeTruthy();
  
    const authors = getAllByTestId("comment-author");
    expect(authors[0].textContent).toBe("Rafael");
    expect(authors[1].textContent).toBe("Andressa");
  });
  
  test('displays comments error if API fails', async () => {
    // Mock API
    jest.spyOn(global, 'fetch')
      .mockImplementationOnce(() => Promise.resolve({
        status: 200,
        json: () => Promise.resolve({
          title: "How to Become a Bad Developer"
        })
      }))
      .mockImplementationOnce(() => ({
        status: 500
      }));
  
    const { getByTestId, getByText, queryByText } = render(<MultipleFetches />);
    fireEvent.click(getByText("Fetch post and comments"));
    await wait();
  
    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect(global.fetch.mock.calls[0][0]).toBe("https://jsonplaceholder.typicode.com/posts/1");
    expect(global.fetch.mock.calls[1][0]).toBe("https://jsonplaceholder.typicode.com/posts/1/comments");
  
    expect(getByTestId("fetch-post").textContent).toBe("How to Become a Bad Developer");
    expect(getByTestId("fetch-error-comments").textContent).toBe("Failed to fetch");
    expect(queryByText("All fetched!")).toBeNull();
  });
  
  test('displays post error if API fails', async () => {
    // Mock API
    jest.spyOn(global, 'fetch')
      .mockImplementation(() => Promise.resolve({
        status: 500,
      }));
  
    const { getByTestId, getByText, queryByText } = render(<MultipleFetches />);
    fireEvent.click(getByText("Fetch post and comments"));
    await wait(() => getByTestId("fetch-error-post"));
  
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch.mock.calls[0][0]).toBe("https://jsonplaceholder.typicode.com/posts/1");
    
    expect(getByTestId("fetch-error-post").textContent).toBe("Failed to fetch");
    expect(queryByText("All fetched!")).toBeFalsy();
  });
});