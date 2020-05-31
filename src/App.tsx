import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IAppProps, IAppState } from './interfaces/Interfaces';

import Books from './components/Books';
import './App.css';

const App: React.SFC<IAppProps> = props => {

  return (
    <div className="App">
        <Books />
    </div>
  );
}

export default App;
