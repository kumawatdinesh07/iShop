import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const getAdminDataFromLs = createAsyncThunk(
    "admin/ls-admin-data",
    () => {
        const lsAdmin = localStorage.getItem("admin");
        if(lsAdmin !== null && lsAdmin !== undefined){
            return(
                {
                    admin : JSON.parse(lsAdmin)
                }
            )
        }else{
            return(
                {
                    admin : null
                }
            )
        }
    }
)

const adminSlice = createSlice(
    {
        name: "Admin",
        initialState: {
            admin : null
        },
        reducers: {
            adminLogin : (state, {payload}) => {
                state.admin = payload.admin;
                localStorage.setItem("admin", JSON.stringify(payload.admin))
            }
        },
        extraReducers: (bulder) => {
            bulder.addCase(
                getAdminDataFromLs.fulfilled,
                (state, {payload}) => {
                    state.admin = payload.admin;
                }
            )
        }
    }
)

export default adminSlice.reducer;
export const {adminLogin} = adminSlice.actions;
export {getAdminDataFromLs};