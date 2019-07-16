import React, { useEffect } from 'react';
import Prism from 'prismjs';
import FocusInput from './FocusInput';
import Timeout from './Timeout';
import ChangeInput from './ChangeInput';
import Counter from './Counter';
import Fetch from './Fetch';
import MultipleFetches from './MultipleFetches';
import './prism.css';
import * as snippets from './snippets';
import Scenario from './Scenario';
import Button from './Button';

const REPO_BASE_URL = "https://github.com/rafaelquintanilha/react-testing-library-examples/blob/master/src";

function App() {

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  const renderSnippet = snippet => (
    <pre>
      <code className="language-javascript">          
        {snippet}   
      </code>
    </pre>
  );

  return (
    <div className="app-container">
      <header>
        <h1>Common Test Scenarios with React Testing Library</h1>
      </header>
      <main>
        <div className="info">
          <p>
            This page aims to provide a non-exhaustive reference to common test cases
            using <a href="https://github.com/testing-library/react-testing-library">react-testing-library</a> and <a href="https://jestjs.io">Jest</a>.
          </p>
          <p>
            Notice that throughout the examples different approaches are used.
            This is intentional in order to showcase the API.
          </p>
          <p>
            <b><a href="https://rafaelquintanilha.com/react-testing-library-common-scenarios/">Check the complete blog post</a> for more details.</b>
          </p>
          <p>Other useful links:</p>
          <ul>
            <li><a href="https://testing-library.com/docs/react-testing-library/intro">Official Docs</a></li>
            <li><a href="https://testing-library.com/docs/learning">Learning Material</a></li>
            <li><a href="https://testing-library.com/docs/guide-which-query">Which Query Should I use?</a></li>
          </ul>
        </div>
        <Scenario
          title="Scenario 1: Controlled Component"
          description={<ul>
            <li><code>queryByText</code> and <code>getByText</code> to select a node and assert its presence</li>
            <li><code>rerender</code> to test with different props</li>
            <li><code>jest.fn</code> to mock functions</li>
            <li><code>fireEvent.click</code> to simulate click events</li>
          </ul>}
          component={<Button text="Submit" onClick={() => {}} />}
          codeURL={`${REPO_BASE_URL}/Button.js`}
          snippet={renderSnippet(snippets.Button)}
        />
        <Scenario
          title="Scenario 2: Input Change"
          description={<ul>
            <li><code>getByLabelText</code> to select elements via <code>aria-label</code></li>
            <li><code>fireEvent.change</code> to simulate change events. Accepts an <code>event</code> object</li>
          </ul>}
          component={<ChangeInput />}
          codeURL={`${REPO_BASE_URL}/ChangeInput.js`}
          snippet={renderSnippet(snippets.ChangeInput)}
        />
        <Scenario
          title="Scenario 3: Focused Element"
          description={<ul>
            <li><code>container.firstChild</code> is the DOM tree of the component and can be used in snapshot testing</li>
            <li><code>getByPlaceholderText</code> to select via input <code>placeholder</code></li>
            <li><code>document.activeElement</code> is the same DOM node returned by the getter</li>
          </ul>}
          component={<FocusInput />}
          codeURL={`${REPO_BASE_URL}/FocusInput.js`}
          snippet={renderSnippet(snippets.FocusInput)}
        />
        <Scenario
          title="Scenario 4: Effects"
          description={<ul>
            <li><code>useState</code>, <code>useRef</code> and <code>useEffect</code> are only implementation details and have no impact in the tests</li>
            <li><code>getByTestId</code> for dynamic text</li>
            <li><code>fireEvent.click</code> when simulating checkbox action, even though the component has <code>onChange</code> callback</li>
          </ul>}
          component={<Counter />}
          codeURL={`${REPO_BASE_URL}/Counter.js`}
          snippet={renderSnippet(snippets.Counter)}
        />
        <Scenario
          title="Scenario 5: setTimeout"
          description={<ul>
            <li><code>button</code> is a DOM node and you can assert any of its attributes, e.g. <code>disabled</code></li>
            <li><code>queryByTestId</code> to assert an element is <b>not</b> present</li>
            <li><code>jestRunAllTimers</code> and <code>jest.useFakeTimers</code> to assert after timeout</li>
          </ul>}
          component={<Timeout />}
          codeURL={`${REPO_BASE_URL}/Timeout.js`}
          snippet={renderSnippet(snippets.Timeout)}
        />
        <Scenario
          title="Scenario 6: Fetch API"
          description={<ul>
            <li><code>jest.spyOn(global, "fetch")</code> to mock <code>fetch</code> implementation</li>
            <li><code>await wait(() => getByTestId("my-async-element"))</code> to wait until element is visible</li>
            <li><code>global.fetch.mockClear</code> to clear mock after test</li>
            <li><code>global.fetch.mock.calls</code> returns an array of function invocations, which in turn returns an array with the <code>args</code> used in each invocation</li>
          </ul>}
          component={<Fetch />}
          codeURL={`${REPO_BASE_URL}/Fetch.js`}
          snippet={renderSnippet(snippets.Fetch)}
        />
        <Scenario
          title="Scenario 7: Fetch API Multiple Times"
          description={<ul>
            <li><code>describe</code> to group API tests and clear mock after each</li>
            <li><code>mockImplementationOnce</code> to have more control over multiple API requests</li>
            <li><code>await wait()</code> holds until the next tick, e.g. API call or <code>setTimeout</code></li>
          </ul>}
          component={<MultipleFetches />}
          codeURL={`${REPO_BASE_URL}/MultipleFetches.js`}
          snippet={renderSnippet(snippets.MultipleFetches)}
        />
      </main>
      <footer>
        Created by
        <a href="https://rafaelquintanilha.com">Rafael Quintanilha</a>
        @
        {' '}
        {(new Date()).getFullYear()}
      </footer>
    </div>
  );
}

export default App;
