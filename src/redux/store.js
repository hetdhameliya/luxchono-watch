import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { LoginApi } from "../api/Login";
import _ from "lodash";
import modalReducer, { modalSlice } from "./slices/modalSlice";
import loderReducer, { loderSlice } from "./slices/LoderSlice";
import cartReducer, { cartSlice } from "./slices/CartSlice";
import { ProductApi } from "../api/Product";
import { BrandApi } from "../api/Brand";
import { CategoryApi } from "../api/Category";
import { CartApi } from "../api/Cart";
import { AddressApi } from "../api/Address";
import { OrderApi } from "../api/Order";

export const store = configureStore({
    reducer: {
        loder: loderReducer,
        modal: modalReducer,
        cart: cartReducer,
        [LoginApi.reducerPath]: LoginApi.reducer,
        [ProductApi.reducerPath]: ProductApi.reducer,
        [BrandApi.reducerPath]: BrandApi.reducer,
        [CategoryApi.reducerPath]: CategoryApi.reducer,
        [CartApi.reducerPath]: CartApi.reducer,
        [AddressApi.reducerPath]: AddressApi.reducer,
        [OrderApi.reducerPath]: OrderApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(LoginApi.middleware)
            .concat(ProductApi.middleware)
            .concat(BrandApi.middleware)
            .concat(CategoryApi.middleware)
            .concat(CartApi.middleware)
            .concat(AddressApi.middleware)
            .concat(OrderApi.middleware)

})

setupListeners(store.dispatch);

const createActions = (slice) =>
    _.mapValues(
        slice.actions,
        (actionCreator) => (payload) =>
            store.dispatch(actionCreator(payload))
    );

export const actions = {
    modal: createActions(modalSlice),
    loder: createActions(loderSlice),
    cart: createActions(cartSlice)
};