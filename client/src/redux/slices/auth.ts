import { createSlice } from "@reduxjs/toolkit";
import { loginUser, logoutUser } from "../../Api";
import { LocalStorage, requestHandler } from "../../Utils";
// import { showSnackbar } from "./app";

// ----------------------------------------------------------------------

const initialState = {
  isLoggedIn: false,
  token: "",
  isLoading: false,
  user: null,
  user_id: null,
  email: "",
  error: false,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateIsLoading(state, action) {
      state.error = action.payload.error;
      state.isLoading = action.payload.isLoading;
    },
    logIn(state, action) {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.token = action.payload.token;
      state.user_id = action.payload.user_id;
    },
    signOut(state) {
      state.isLoggedIn = false;
      state.token = "";
      state.user_id = null;
    },
    updateRegisterEmail(state, action) {
      state.email = action.payload.email;
    },
  },
});

// Reducer
export default slice.reducer;

export function LoginUser(data: { email: string; password: string; }) {
  return async (dispatch :any) => {
    // Make API call here
    dispatch(slice.actions.updateIsLoading({ isLoading: true, error: false }));
    await requestHandler(
      async () => await loginUser(data),
      null,
      (res) => {
        const { data } = res;
        dispatch(
          slice.actions.logIn({
            isLoggedIn: true,
            token: data.accessToken,
            user_id: data.user._id,
            user: data.user,
          })
        );
        LocalStorage.set("user", data.user);
        LocalStorage.set("token", data.accessToken);
        dispatch(
          slice.actions.updateIsLoading({ isLoading: false, error: false })
        );
      },
      dispatch(
        slice.actions.updateIsLoading({ isLoading: false, error: false })
      ) // Display error alerts on request failure
    );
  };
}

export function LogoutUser() {
  return async (dispatch:any) => {
    await requestHandler(
        async () => await logoutUser(),
        null,
        () => {
          LocalStorage.clear(); // Clear local storage on logout
        },
        alert // Display error alerts on request failure
      );
    dispatch(slice.actions.signOut());
  };
}
