import React from 'react';
import { connect } from 'react-redux';

import Content from 'containers/content';
import Auth from 'simple/auth';
import * as actions from 'core/actions';
import separateProps from 'lib/separateProps';

let App = (props) => {
    const propsApp = separateProps(props);
    return (
        <>
            {!propsApp.userId ?
                <Auth {...propsApp.propsAuth} /> :
                <Content {...propsApp.propsContent} />
            }
        </>
    );

};

const mapStateToProps = state => state;

const mapDispatchToProps = (dispatch) => {
    const obj = {};
    Object.keys(actions).forEach(item => Object.assign(obj, { [`on${item.charAt(0).toUpperCase()}${item.substring(1)}`]: (data) => dispatch(actions[item](data)) }));
    return obj;
};

App = connect(mapStateToProps, mapDispatchToProps)(App);
export default App;
