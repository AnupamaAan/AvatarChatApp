import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // registrationDeatils: {},
  queryquestion:{},
  loginUser:{},
  listedchats:{},
  ngrokprocess:{}

}
  const registerSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      updateRedux: (state, action) => {
        const { key, result } = action.payload;
        state[key] = result;
      },
    },
  })
  

  export const { updateRedux } = registerSlice.actions

  // export const registerDetails = (state) => state.user.registrationDeatils
  export const queryquestion = (state) => state.user.queryquestion;
export const loginUser = (state) => state.user.loginUser;
export const listedchats = (state) => state.user.listedchats;
export const ngrokprocess = (state) => state.user.ngrokprocess;

export default registerSlice.reducer;
