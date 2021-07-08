import { createAction } from "@reduxjs/toolkit";
import { actionTypes } from "../../../common/enum/action-types.enum";

const clearProfileData = createAction(actionTypes.CLEAR_USER_DATA);

export { clearProfileData };
