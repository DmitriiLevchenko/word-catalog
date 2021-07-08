import * as React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { appRoute } from "../../../common/enum/app-route.enum";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user } = useSelector((state) => ({
    user: state.profile.user,
  }));

  const hasUser = Boolean(user);

  return (
    <Route
      {...rest}
      render={(props) =>
        hasUser ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: appRoute.LOGIN, state: { from: props.location } }}
          />
        )
      }
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
};

export default PrivateRoute;
