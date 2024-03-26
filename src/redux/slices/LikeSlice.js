import { createSlice } from "@reduxjs/toolkit";

export const likeSlice = createSlice({
    name: "like",
    initialState: {
        data: null,
    },
    reducers: {
        setLike: (state, action) => {
            state.data = action.payload;
        },
    },
});

export const { setLike } = likeSlice.actions;
export default likeSlice.reducer;
