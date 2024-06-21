import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllEmails, sendEmail } from "../../api";

const initialState = {
    emails: [],
    isLoading: false,
    error: null,
    type: null,
}

// export const fetchEmails = createAsyncThunk('fetchEmails', async (token,type) => {
//     const response = await getAllEmails(token,type)
//     console.log(response.data);
//     return response.data
// })

export const addNewEmail = createAsyncThunk('addNewEmail', async (form) => {
        const response = await sendEmail(form)
        return response.data;
    }
)



const EmailReducer = createSlice({
    name: "emails",
    initialState,
    reducers: {
        fetchEmails: (state, action) => {
            state.emails = action.payload;
          },
    },
    extraReducers: (builder) => {
        builder
            // .addCase(fetchEmails.pending, (state, action) => {
            //     state.isLoading = true
            // })
            // .addCase(fetchEmails.fulfilled, (state, action) => {
            //     state.isLoading = false
            //     // Add any fetched emails to the array
            //     // state.emails = state.emails.concat(action.payload)
            //     state.emails = action.payload;
            // })
            // .addCase(fetchEmails.rejected, (state, action) => {
            //     state.error = action.error.message
            // })
            .addCase(addNewEmail.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(addNewEmail.fulfilled, (state, action) => {
                state.isLoading = false
                // Add any fetched emails to the array
                state.emails = state.emails.concat(action.payload.data)
                state.emails = state.emails.concat(action.payload.received)

                console.log(action.payload);
                // state.emails = action.payload;
                // state.type = action.payload;

            })
            .addCase(addNewEmail.rejected, (state, action) => {
                state.error = action.error.message
            })
            
    }
});

export const { fetchEmails  } = EmailReducer.actions;

export default EmailReducer.reducer;

export const selectEmailById = (state, emailId) =>
    state.emails.emails.find((email) => email.id === emailId)