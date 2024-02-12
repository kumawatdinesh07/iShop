import { createSlice } from "@reduxjs/toolkit";

const selectedProdSlice = createSlice(
    {
        name: "SelectedProd",
        initialState:{
            selectedProd : ""
        },
        reducers:{
            selectProd: (state, {payload}) => {
                state.selectedProd = payload.selectProd;
                console.log(payload.selectProd);
            }
        }
    }
)

export const { selectProd } = selectedProdSlice.actions;
export default selectedProdSlice.reducer;