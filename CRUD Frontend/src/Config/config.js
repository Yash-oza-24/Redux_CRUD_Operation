const getTokenFromLocalStorage = localStorage.getItem("TOKEN")
  ? JSON.parse(localStorage.getItem("TOKEN"))
  : null;

export const config = {
  headers: {
    Authorization: `Bearer ${
      getTokenFromLocalStorage !== null && getTokenFromLocalStorage
        ? getTokenFromLocalStorage
        : ""
    }`,
    Accept: "application/json",
  },
};
