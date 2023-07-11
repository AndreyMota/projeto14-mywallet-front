import React, { createContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(0);

  const login = (token) => {
    setUser(token);
  };

  const logout = () => {
    setUser(null);
  };

  const getUser = async (tokein) => {
    setToken(tokein);
    axios.get(`${import.meta.env.VITE_API_URL}/user`, 
    {headers: {
      Authorization: `Bearer ${tokein}`
    }}).then((res) => {
      console.log(res);
      const userSER = JSON.stringify(res.data);
      localStorage.setItem("user", userSER);
      login(res.data);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, getUser, token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
