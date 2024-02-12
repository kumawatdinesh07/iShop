import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
//   Strong@123
const getUserDataFromLS = createAsyncThunk(
    "user/ls-user-data",
    () => {
        const lsUser = localStorage.getItem("user");
        if (lsUser !== null && lsUser !== undefined) {
            return (
                {
                    user: JSON.parse(lsUser)
                }
            )
        } else {
            return ( 
                {
                    user: null
                }
            )
        }
    }
);

const userSlice = createSlice(
    {
        name: "User",
        initialState: {
            user: null
        },
        reducers: {
            login: (state, { payload }) => {
                state.user = payload.user;
                localStorage.setItem("user", JSON.stringify(payload.user))
            },
            logOut: (state) => {
                state.user = null;
                localStorage.removeItem("user");
            }
        },
        extraReducers: (builder) => {
            builder.addCase(
                getUserDataFromLS.fulfilled,
                (state, { payload }) => {
                    state.user = payload.user;
                }
            );
        }
    }
);

export const { login, logOut } = userSlice.actions;
export default userSlice.reducer;
export { getUserDataFromLS };

