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
        <Scenario
          title="Scenario 1: Controlled Component"
          description={"How to assert that a component renders the right props and has a controlled callback."}
          component={<Button text="Submit" onClick={() => {}} />}
          codeURL="https://google.com"
          snippet={renderSnippet(snippets.Button)}
        />
        <Scenario
          title="Scenario 2: Usage with Hooks"
          description={"Basic usage with useState, useRef, useEffect. Bonus: checkbox click event."}
          component={<Counter />}
          codeURL="https://google.com"
          snippet={renderSnippet(snippets.Counter)}
        />
        <Scenario
          title="Scenario 3: Change Input"
          description={"How to assert a change event."}
          component={<ChangeInput />}
          codeURL="https://google.com"
          snippet={renderSnippet(snippets.ChangeInput)}
        />
        <Scenario
          title="Scenario 4: Focused Element"
          description={"How to check if an element is focused. Bonus: snapshot usage."}
          component={<FocusInput />}
          codeURL="https://google.com"
          snippet={renderSnippet(snippets.FocusInput)}
        />
        <Scenario
          title="Scenario 5: setTimeout"
          description={"How to assert after a timeout. Bonus: check if a button is disabled."}
          component={<Timeout />}
          codeURL="https://google.com"
          snippet={renderSnippet(snippets.Timeout)}
        />
        <Scenario
          title="Scenario 6: Fetch API"
          description={"How to mock fetch implementation."}
          component={<Fetch />}
          codeURL="https://google.com"
          snippet={renderSnippet(snippets.Fetch)}
        />
        <Scenario
          title="Scenario 7: Fetch API Multiple Times"
          description={"How to test multiple fetches in a row."}
          component={<MultipleFetches />}
          codeURL="https://google.com"
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