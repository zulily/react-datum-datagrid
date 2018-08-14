import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import DevRunner from './DevRunner';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<DevRunner />, document.getElementById('root'));
registerServiceWorker();
