import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const fatchCategory = createAsyncThunk(
    "category/getCategory",
    async () => {
        const response = await fetch("http://localhost:5000/category");
        const data = await response.json();
        if(data.status === 1){
            return(
                {
                    category : data.category,
                    catBaseUrl : data.baseUrl
                }
            )
        }
        else{
            return(
                {
                    category : [],
                    catBaseUrl : null
                }
            )
        }
    }
);

const categorySlice = createSlice(
    {
        name: "Category",
        initialState: {
            category : [],
            catBaseUrl : null
        },
        extraReducers: (builder) => {
            builder.addCase(
                fatchCategory.fulfilled,
                (state, action) => {
                    state.category = action.payload.category;
                    state.catBaseUrl = action.payload.catBaseUrl;
                }
            );
            builder.addCase(
                fatchCategory.rejected,
                (state) => {
                    state.category = [];
                    state.imgBaseUrl = null;
                }
            );
        }
    }
);

export { fatchCategory };
export default categorySlice.reducer;