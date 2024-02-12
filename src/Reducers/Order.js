import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice(
    {
        name: "Order",
        initialState: {
            order: []
        },
        reducers: {
            orderDetails: (state, { payload }) => {
                state.order = payload.order
            }
        }
    }
)

export default orderSlice.reducer;
export const { orderDetails } = orderSlice.actions;