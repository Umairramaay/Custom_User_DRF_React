import React from 'react'
import {Route} from 'react-router-dom'

import Login from './containers/Auth/Login';
import Signup from './containers/Auth/Signup';
import CustomerSignup from './containers/Auth/CustomerSignup'
import EmployeSignup from './containers/Auth/EmployeSignup'

const baseRouter = () => (
    <div>
        <Route exact path='/login/' component={Login} />
        <Route exact path='/signup-customer/' component={CustomerSignup} />
        <Route exact path='/signup-employee/' component={EmployeSignup} />
        {/* <Route exact path='/signup/' component={Signup} /> */}
    </div>
)

export default baseRouter;