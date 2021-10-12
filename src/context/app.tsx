import React from "react";
import { useState, createContext, Dispatch } from "react";
import { AppInitialContextIF } from "../interface";
import Axios from '../services/axios';

// Utils
function _logout(
  setToken: Dispatch<React.SetStateAction<any>>,
  setUser: Dispatch<React.SetStateAction<any>>,
  axiosInterceptor: number | undefined,
  setAxiosInterceptor: React.Dispatch<React.SetStateAction<number | undefined>>
) {
  setToken(null);
  setUser(null);

  localStorage.removeItem('ad_token');
  localStorage.removeItem('ad_user');

  if(axiosInterceptor){
    Axios.interceptors.request.eject(axiosInterceptor);
    setAxiosInterceptor(undefined);
  }
}

export function _setupAxiosInterceptors(token: string | null | undefined) {
  if(token) {
    return Axios.interceptors.request.use(config => {
      config.headers = {'Authorization' : `${token}`};
      return config
    });
  }
}


// Main part
export const AppContext = createContext<AppInitialContextIF>({} as AppInitialContextIF);

export const AppContextProvider = (props: any) => {
  const localToken = localStorage.getItem('ad_token')
  const localUser = localStorage.getItem('ad_user')

  const [token, setToken] = useState(localToken ? localToken : null);
  const [user, setUser] = useState(localUser ? JSON.parse(localUser) : null);
  const [axiosInterceptor, setAxiosInterceptor] = useState(_setupAxiosInterceptors(token));
  const [contentTitle, setContentTitle] = useState();
  const [activeMenu, setActiveMenu] = useState();

  const value = {
    states: {
      token,
      user,
      axiosInterceptor,
      contentTitle,
      activeMenu,
    },
    actions: {
      setToken,
      setUser,
      setAxiosInterceptor,
      setContentTitle,
      setActiveMenu,
      logout: () => {
        _logout(setToken, setUser, axiosInterceptor, setAxiosInterceptor);
      },
    }
  } as AppInitialContextIF;

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  )
}