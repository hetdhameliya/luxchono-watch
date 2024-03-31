import { createSlice } from "@reduxjs/toolkit";

const emptyObj = { open: false, data: null };

const initialState = {
  Logout: emptyObj,
  Like: emptyObj,
  MobileDrawer: emptyObj,
  Cart: emptyObj,
  RemoveDialog: emptyObj,
  AddQuantity: emptyObj,
  ProductFilter: emptyObj,
  Address: emptyObj,
  AddAddress: emptyObj,
  DeleteAddress: emptyObj,
  OrderDetails: emptyObj,
  OrderConform: emptyObj,
  CancelOrder: emptyObj,
  LoginAlert: emptyObj,
  changePassword: emptyObj,
  Rating: emptyObj,
  Notificattion: emptyObj,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openLogoutModal: (state, { payload }) => {
      state.Logout = { open: true, data: payload };
    },
    openLikeDrawer: (state, { payload }) => {
      state.Like = { open: true, data: payload };
    },
    openMobileDrawer: (state, { payload }) => {
      state.MobileDrawer = { open: true, data: payload };
    },
    openCartDrawer: (state, { payload }) => {
      state.Cart = { open: true, data: payload };
    },
    openRemoveDialog: (state, { payload }) => {
      state.RemoveDialog = { open: true, data: payload };
    },
    openAddQuantityDialog: (state, { payload }) => {
      state.AddQuantity = { open: true, data: payload };
    },
    openProductFilterDrawer: (state, { payload }) => {
      state.ProductFilter = { open: true, data: payload };
    },
    openAddressDrawer: (state, { payload }) => {
      state.Address = { open: true, data: payload };
    },
    openAddAddressDrawer: (state, { payload }) => {
      state.AddAddress = { open: true, data: payload };
    },
    openDeleteAddressDrawer: (state, { payload }) => {
      state.DeleteAddress = { open: true, data: payload };
    },
    openOrderDetailsModal: (state, { payload }) => {
      state.OrderDetails = { open: true, data: payload };
    },
    openOrderConformModal: (state, { payload }) => {
      state.OrderConform = { open: true, data: payload };
    },
    openCancelOrderModal: (state, { payload }) => {
      state.CancelOrder = { open: true, data: payload };
    },
    openLoginAlertModal: (state, { payload }) => {
      state.LoginAlert = { open: true, data: payload };
    },
    openChangePasswordModal: (state, { payload }) => {
      state.changePassword = { open: true, data: payload };
    },
    openRatingModal: (state, { payload }) => {
      state.Rating = { open: true, data: payload };
    },
    openNotificattionModal: (state, { payload }) => {
      state.Notificattion = { open: true, data: payload };
    },

    closeLogoutModal: (state, { payload }) => {
      state.Logout = emptyObj;
    },
    closeLikeDrawer: (state, { payload }) => {
      state.Like = emptyObj;
    },
    closeMobileDrawer: (state, { payload }) => {
      state.MobileDrawer = emptyObj;
    },
    closeCartDrawer: (state, { payload }) => {
      state.Cart = emptyObj;
    },
    closeRemoveDialog: (state, { payload }) => {
      state.RemoveDialog = emptyObj;
    },
    closeAddQuantityDialog: (state, { payload }) => {
      state.AddQuantity = emptyObj;
    },
    closeProductFilterDrawer: (state, { payload }) => {
      state.ProductFilter = emptyObj;
    },
    closeAddressDrawer: (state, { payload }) => {
      state.Address = emptyObj;
    },
    closeAddAddressDrawer: (state, { payload }) => {
      state.AddAddress = emptyObj;
    },
    closeDeleteAddressDrawer: (state, { payload }) => {
      state.DeleteAddress = emptyObj;
    },
    closeOrderDetailsModal: (state, { payload }) => {
      state.OrderDetails = emptyObj;
    },
    closeOrderConformModal: (state, { payload }) => {
      state.OrderConform = emptyObj;
    },
    closeCancelOrderModal: (state, { payload }) => {
      state.CancelOrder = emptyObj;
    },
    closeLoginAlertModal: (state, { payload }) => {
      state.LoginAlert = emptyObj;
    },
    closeChangePasswordModal: (state, { payload }) => {
      state.changePassword = emptyObj;
    },
    closeRatingModal: (state, { payload }) => {
      state.Rating = emptyObj;
    },
    closeNotificattionModal: (state, { payload }) => {
      state.Notificattion = emptyObj;
    },
  },
});

export const {
  openLogoutModal,
  openLikeDrawer,
  openMobileDrawer,
  openCartDrawer,
  openAddQuantityDialog,
  openProductFilterDrawer,
  openAddressDrawer,
  openAddAddressDrawer,
  openDeleteAddressDrawer,
  openOrderDetailsModal,
  openOrderConformModal,
  openCancelOrderModal,
  openLoginAlertModal,
  openChangePasswordModal,
  openRatingModal,
  openNotificattionModal,

  closeLogoutModal,
  closeLikeDrawer,
  closeMobileDrawer,
  closeCartDrawer,
  closeAddQuantityDialog,
  closeProductFilterDrawer,
  closeAddressDrawer,
  closeAddAddressDrawer,
  closeDeleteAddressDrawer,
  closeOrderDetailsModal,
  closeOrderConformModal,
  closeCancelOrderModal,
  closeLoginAlertModal,
  closeChangePasswordModal,
  closeRatingModal,
  closeNotificattionModal,
} = modalSlice.actions;
export default modalSlice.reducer;
