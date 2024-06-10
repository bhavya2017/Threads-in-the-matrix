import * as types from "./userAuth.types";

export const userLogin = (payload) => {
  // Assuming payload contains user information if logged in
  // If payload is null or undefined, it signifies an unauthenticated state
  return { type: types.USER_AUTH_GET, payload };
};

export const userLogout = () => {
  // Clear user information to signify an unauthenticated state
  return { type: types.USER_AUTH_DELETE };
};
