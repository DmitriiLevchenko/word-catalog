import * as React from "react";
import { useDispatch } from "react-redux";
import {actionTypes} from "../../common/enum/action-types.enum";
export const LoginPage = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const login = React.useCallback(
    () =>
      dispatch({ type: actionTypes.LOGIN, payload: { email, password } }),
    [dispatch, email, password]
  );
  const auth = React.useCallback(
    () =>
      dispatch({ type: actionTypes.REGISTRATION, payload: { email, password } }),
    [dispatch, email, password]
  );
  return (
    <div>
      <input
        value={email}
        type="text"
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        value={password}
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={login}
      >
        Login
      </button>
      <button
        onClick={auth}
      >
        Auth
      </button>
    </div>
  );
};
