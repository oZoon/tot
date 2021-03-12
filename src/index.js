import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import reducers from 'core/reducers';
import Records from 'lib/records';
import App from 'core/app';
import { VERSION } from 'lib/constants';

import 'styles/main.css';

const store = createStore(reducers);

const update = () => {
    const records = new Records();
    records.setRecord(`tot-systems-${VERSION}`, store.getState());
};
store.subscribe(update);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
