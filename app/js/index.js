// Simply import bootstrap to add it to the Webpack depency graph.
// It will now be bundled in our app.js bundle.
import 'bootstrap';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';

ReactDOM.render(<App />, document.getElementById('root'));
