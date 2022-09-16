import { combineReducers } from "@reduxjs/toolkit";
import calendarReduser from "./calendar.slice";
import dialogReducer from "./dialog.slice";

const rootReducer = combineReducers({
    calendar: calendarReduser,
    dialog: dialogReducer
});

export default rootReducer;