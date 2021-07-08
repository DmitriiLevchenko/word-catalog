import * as React from "react";
import { useDispatch } from "react-redux";
import { actionTypes } from "../../common/enum/action-types.enum";
import { Button, Input } from "antd";
import "./styles.css";

export const LoginPage = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const login = React.useCallback(
    () => dispatch({ type: actionTypes.LOGIN, payload: { email, password } }),
    [dispatch, email, password]
  );
  const auth = React.useCallback(
    () =>
      dispatch({
        type: actionTypes.REGISTRATION,
        payload: { email, password },
      }),
    [dispatch, email, password]
  );
  return (
    <div className="wrapper">
      <div className="form">
        <div className="input-wrapper">
          <Input
            value={email}
            type="text"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-wrapper">
          <Input
            value={password}
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <Button onClick={login}>Login</Button>
        <Button onClick={auth}>Auth</Button>
      </div>
    </div>
  );
};
