import React, { Component } from "react";
import App from "./App";
import {
    Switch,
    Route,
    Redirect
} from "react-router-dom";
const AuthWrapper = React.lazy(() => import('./components/auth-component/auth-wrapper'))
const FormWrapper = React.lazy(() => import('./components/form-components/form-wrapper'))
const DepartmentWrapper = React.lazy(() => import('./components/department-components/department-wrapper'))

class Router extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Redirect from='/' to='/auth' exact />
                    <Route path='/app' component={App} />
                    <Route exact path="/form" component={FormWrapper} />
                    <Route exact path="/auth" component={AuthWrapper} />
                    <Route exact path="/department" component={DepartmentWrapper} />
                </Switch>
            </div>
        )
    }
}
export default Router;