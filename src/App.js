import React from 'react';
import Columns from './containers/Columns';

import './App.scss';

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <Columns />
      </div>
    );
  }
}

export default App;
