


import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name: "feed",
    initialState: null,

    reducers: {
        addFeed: (state, action) => {
            return action.payload;
        },
        appendFeed:(state,action)=>{
    state.push(...action.payload)
},

        removeUserFromFeed: (state, action) => {
            return state.filter(
                (user) => user._id !== action.payload
            );
        },
    },
});

export const { addFeed,appendFeed, removeUserFromFeed } =
    feedSlice.actions;

export default feedSlice.reducer;