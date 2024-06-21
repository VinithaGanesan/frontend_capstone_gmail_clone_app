import { configureStore } from "@reduxjs/toolkit";
import EmailReducer from "./Reducers/EmailReducer";
import AuthReducer from "./Reducers/AuthReducer";

export const store = configureStore({
    reducer: {
        emails: EmailReducer,
        users: AuthReducer,
    },
})
