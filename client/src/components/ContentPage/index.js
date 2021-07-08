import * as React from "react";
import { useDispatch } from "react-redux";
import { actionTypes } from "../../common/enum/action-types.enum";

export const ContentPage = () => {
  const dispatch = useDispatch()
  const logout = React.useCallback(()=>{
    dispatch({type:actionTypes.LOGOUT})
  },[dispatch])
  const fetchUsers = React.useCallback(()=>{
    dispatch({type:actionTypes.GET_ALL_USERS})
  },[dispatch])

  return <div>
    <button onClick={logout}>Logout</button>
    <button onClick={fetchUsers}>Get all users</button>
  </div>;
};


