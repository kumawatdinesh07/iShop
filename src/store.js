import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./Reducers/Category";
import productReducer from "./Reducers/Product";
import cartReducer from "./Reducers/Cart";
import userReducer from "./Reducers/User";
import adminReducer from "./Reducers/Admin";
import orderReducer from "./Reducers/Order";
import selectProdReducer from "./Reducers/SelectedProd"

const store = configureStore(
    {
        reducer: {
            category: categoryReducer,
            product: productReducer,
            cart: cartReducer,
            user: userReducer,
            admin: adminReducer,
            order: orderReducer,
            selectSlug: selectProdReducer
        }
    }
);

export default store;