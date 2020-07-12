import React, {useEffect} from 'react';
import {BrowserRouter} from 'react-router-dom';
import {connect} from 'react-redux'

import 'antd/dist/antd.css';

import CustomLayout from './containers/Layout/Layout';
import BaseRouter from './Routes';
import * as actions from './store/actions/auth';

function App(props) {

  useEffect (() => {
    props.onTryAutoSignup()
  })

  return (
    <div>
      <BrowserRouter>
        <CustomLayout {...props}>
          <BaseRouter />
        </CustomLayout>
      </BrowserRouter>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated:state.token !== null 
  }
}

const mapDispatchToProps = dispath => {
  return {
    onTryAutoSignup: () => dispath(actions.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)





