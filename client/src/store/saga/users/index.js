import { call } from "redux-saga/effects"
import { UsersService } from "../../../services"

export function* getUsersSagaWorker(){
    try{
     const response = yield call(UsersService.getAllUsers)
     console.log(response)
    }catch(e){
     console.log(e)
    }
}