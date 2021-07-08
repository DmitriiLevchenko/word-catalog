import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionTypes } from "../common/enum/action-types.enum";
import { TokenHelper } from "../helpers";
import { LoginPage } from "./LoginPage";
import { Switch } from "react-router-dom";
import { appRoute } from "../common/enum/app-route.enum";
import { PrivateRoute, PublicRoute } from "./common";
import { ContentPage } from "./ContentPage";
import { NotFoundPage } from "./NotFound";
import { Header } from "./common/Header";
import { HomePage } from "./HomePage";


export const App = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => ({
    user: state.profile.user,
  }));

  const hasToken = TokenHelper.checkOnExists();
  const hasUser = !!user;

  React.useEffect(() => {
    if (hasToken) {
      dispatch({ type: actionTypes.CHECK_AUTH_STATUS });
    }
  }, [hasToken, dispatch]);

  //Emulate navbar

  if (!hasUser && hasToken) {
    return <h3>Loading...</h3>;
  }

  return (
    <div>
      {hasUser && hasToken && <Header user={user} />}
      <Switch>
        <PublicRoute exact path={appRoute.BASE} component={HomePage} />
        <PublicRoute exact path={appRoute.LOGIN} component={LoginPage} />
        <PrivateRoute exact path={appRoute.CONTENT} component={ContentPage} />
        <PublicRoute exact path={appRoute.ANY} component={NotFoundPage} />
      </Switch>
    </div>
  );
};
