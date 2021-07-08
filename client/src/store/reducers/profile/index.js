import { createReducer } from "@reduxjs/toolkit";
import { actionTypes } from "../../../common/enum/action-types.enum";

const initialState = {
  user: null,
};

export const profileReducer = createReducer(initialState, (builder) => {
  builder.addCase(actionTypes.SET_USER, (state, action) => {
    const { user } = action.payload;
    state.user = user;
  });
  builder.addCase(actionTypes.CLEAR_USER_DATA, (state, action) => {
    state.user = null;
  });
});
