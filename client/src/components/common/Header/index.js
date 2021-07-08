import * as React from "react";
import { NavLink } from "react-router-dom";

export const Header = ({ user }) => {
  let text = `Auth success with email ${user.email}.`;
  if (!user.isActivated) {
    text += "Warning: your email not activated, please activate your email";
  }
  return (
    <div>
      <h3>{text}</h3>
      <div>
        <p>
          <NavLink to="/content" activeClassName="selected">
            Content
          </NavLink>
        </p>
        <p>
          <NavLink to="/login" activeClassName="selected">
            Login
          </NavLink>
        </p>
      </div>
      <hr />
    </div>
  );
};
