import * as React from "react";
import { useDispatch } from "react-redux";
import { actionTypes } from "../../common/enum/action-types.enum";
import { Button,  Space } from "antd";
import "./styles.css";

export const ContentPage = () => {
  const dispatch = useDispatch();
  const logout = React.useCallback(() => {
    dispatch({ type: actionTypes.LOGOUT });
  }, [dispatch]);
  const fetchUsers = React.useCallback(() => {
    dispatch({ type: actionTypes.GET_ALL_USERS });
  }, [dispatch]);

  return (
    <Space>
      <Button type="primary" onClick={logout}>
        Logout
      </Button>

      <Button type="primary" onClick={fetchUsers}>
        Get all users console 
      </Button>
    </Space>
  );
};
