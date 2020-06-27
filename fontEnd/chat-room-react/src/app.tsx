import * as React from 'react';
import * as ReactDOM from 'react-dom';
import HomePage from './pages/homepage';

function App() {
  return <HomePage />;
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
