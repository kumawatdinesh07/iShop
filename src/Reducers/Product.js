import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const fatchProduct = createAsyncThunk(
    "product/getproduct",
    async () => {
        const response = await fetch("http://localhost:5000/product");
        const data = await response.json();
        if (data.status === 1) {
            return (
                {
                    product: data.product,
                    prodImgUrl: data.baseUrl
                }
            )
        } else {
            return (
                {
                    product: [],
                    prodImgUrl: null
                }
            )
        }
    }
);

const productSlice = createSlice(
    {
        name: "Product",
        initialState: {
            product: [],
            prodImgUrl: null
        },
        extraReducers: (builder) => {
            builder.addCase(
                fatchProduct.fulfilled,
                (state, action) => {
                    state.product = action.payload.product;
                    state.prodImgUrl = action.payload.prodImgUrl
                }
            );
            builder.addCase(
                fatchProduct.rejected,
                (state) => {
                    state.product = [];
                    state.prodImgUrl = null;
                }
            );
        }
    }
);

export { fatchProduct }
export default productSlice.reducer;