import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

function timeout(duration = 0) {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(1), duration);
    })
}

