import { Authenticated } from "../apis/requests";
import { Route, Redirect } from "react-router";

function PrivateRoute({component: Component, ...rest}) {
    return (
        <Route {...rest} render={(props) => Authenticated().role === 'student' ? (
            <Redirect to={{pathname: '/dashboard', state: {from: props.location}}} />
        ) : <Component {...props} /> } />
    )
}


export default PrivateRoute;