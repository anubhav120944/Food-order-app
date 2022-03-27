import { useContext, useEffect, useState } from "react";
import jwt from "jwt-decode";
import { AuthContext } from "../providers/AuthProvider";
// import { login as userLogin, register } from '../api';
import { API_URLS, getFormBody } from "../utils";

import {
  setItemInLocalStorage,
  LOCALSTORAGE_TOKEN_KEY,
  removeItemFromLocalStorage,
  getItemFromLocalStorage,
} from "../utils";

export const useAuth = () => {
  return useContext(AuthContext);
};

export const useProvideAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const userToken = getItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);

      if (userToken) {
        const user = jwt(userToken);

        setUser({
          ...user,
        });
      }
      setLoading(false);
    };

    getUser();
  }, []);

  const login = async (email, password) => {
    const response = await fetch(API_URLS.login, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: getFormBody({ email, password }),
    });
    const data = await response.json();
    if (!data.success) {
      return {
        success: false,
        message: data.message,
      };
    }
    setUser(data.data.user);
    setItemInLocalStorage(LOCALSTORAGE_TOKEN_KEY, data.data.token);
  };

  const signup = async (name, email, password, confirmPassword) => {
    const response = await fetch(API_URLS.signup, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: getFormBody({ name, email, password, confirm_password: confirmPassword }),
    });
    const data = await response.json();
    if (!data.success) {
      return {
        success: false,
        message: data.message,
      };
    }
    setUser(data.data.user);
    setItemInLocalStorage(LOCALSTORAGE_TOKEN_KEY, data.data.token);
    return {
      success: true,
      message: data.message,
    };
  };

  const logout = () => {
    setUser(null);
    removeItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);
  };

  return {
    user,
    login,
    logout,
    loading,
    signup,
  };
};
