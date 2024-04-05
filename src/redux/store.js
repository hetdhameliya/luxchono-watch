import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { LoginApi } from "../api/Login";
import _ from "lodash";
import modalReducer, { modalSlice } from "./slices/modalSlice";
import loderReducer, { loderSlice } from "./slices/LoderSlice";
import likeReducer, { likeSlice } from "./slices/LikeSlice";
import cartReducer, { cartSlice } from "./slices/CartSlice";
import { ProductApi } from "../api/Product";
import { BrandApi } from "../api/Brand";
import { CategoryApi } from "../api/Category";
import { CartApi } from "../api/Cart";
import { AddressApi } from "../api/Address";
import { OrderApi } from "../api/Order";
import { NotificationApi } from "../api/Notification";
import { UserRatingApi } from "../api/UserRating";

export const store = configureStore({
  reducer: {
    loder: loderReducer,
    modal: modalReducer,
    like: likeReducer,
    cart: cartReducer,
    [LoginApi.reducerPath]: LoginApi.reducer,
    [ProductApi.reducerPath]: ProductApi.reducer,
    [BrandApi.reducerPath]: BrandApi.reducer,
    [CategoryApi.reducerPath]: CategoryApi.reducer,
    [CartApi.reducerPath]: CartApi.reducer,
    [AddressApi.reducerPath]: AddressApi.reducer,
    [OrderApi.reducerPath]: OrderApi.reducer,
    [NotificationApi.reducerPath] : NotificationApi.reducer,
    [UserRatingApi.reducerPath] : UserRatingApi.reducer
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
      .concat(NotificationApi.middleware)
      .concat(UserRatingApi.middleware)
});

setupListeners(store.dispatch);

const createActions = (slice) =>
  _.mapValues(
    slice.actions,
    (actionCreator) => (payload) => store.dispatch(actionCreator(payload))
  );

export const actions = {
  modal: createActions(modalSlice),
  loder: createActions(loderSlice),
  like: createActions(likeSlice),
  cart : createActions(cartSlice)
};
