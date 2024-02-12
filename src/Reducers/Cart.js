import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const getDataFromLS = createAsyncThunk(
    "cart/ls-cart-data",
    () => {
        const lsCart = localStorage.getItem("cart");
        if (lsCart !== null && lsCart !== undefined) {
            return (
                {
                    cart: JSON.parse(lsCart)
                }
            )
        } else {
            return (
                {
                    cart: []
                }
            )
        }
    }
);

const cartSlice = createSlice(
    {
        name: "Cart",
        initialState: {
            cart: []
        },
        reducers: {
            userCart: (state, {payload}) => {
                state.cart = payload.userCart
            },
            emptyCart: (state, {payload}) => {
                state.cart = [];
            },
            addToCart: (state, { payload }) => {
                let index = null;
                state.cart.forEach(
                    (item, ind) => {
                        if (item.prodId === payload.prodId) {
                            index = ind;
                        }
                    }
                )
                if (index == null) {
                    state.cart.push({ prodId: payload.prodId, qnty: 1 });
                }
                else {
                    state.cart[index].qnty = state.cart[index].qnty + 1;
                } 
                localStorage.setItem("cart", JSON.stringify(state.cart));
            },
            removeFromCart: (state, { payload }) => {
                state.cart = state.cart.filter(
                    (prod) => {
                        if (prod._id === payload.prodId) {
                            return false;
                        }
                        else {
                            return true;
                        }
                    }
                )   
                localStorage.setItem("cart", JSON.stringify(state.cart));
            },
            increase: (state, { payload }) => {
                let index = null;
                state.cart.forEach(
                    (item, ind) => {
                        if (item.prodId === payload.prodId) {
                            index = ind;
                        }
                    }
                )
                if (state.cart[index].qnty !== 10) {
                    state.cart[index].qnty += 1
                }
                localStorage.setItem("cart", JSON.stringify(state.cart));
            },
            decrease: (state, { payload }) => {
                let index = null;
                state.cart.forEach(
                    (item, ind) => {
                        if (item.prodId === payload.prodId) {
                            index = ind;
                        }
                    }
                )
                if (state.cart[index].qnty !== 1) {
                    state.cart[index].qnty -= 1
                    localStorage.setItem("cart", JSON.stringify(state.cart));
                }
            }

        },
        extraReducers: (builder) => {
            builder.addCase(
                getDataFromLS.fulfilled,
                (state, { payload }) => {
                    state.cart = payload.cart;
                }
            );
        }
    }
);

export const { addToCart, removeFromCart, increase, decrease, emptyCart, userCart } = cartSlice.actions;
export default cartSlice.reducer;
export { getDataFromLS };

