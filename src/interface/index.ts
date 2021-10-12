import { As } from "@chakra-ui/react";
import { ForwardRefExoticComponent } from 'react'

export interface AppInitialContextIF {
  states: {
    token: string | undefined,
    user: any | undefined,
    axiosInterceptor: number | undefined,
    contentTitle: string | undefined,
    activeMenu: string | undefined,
  }
  actions: {
    logout: () => void
    setUser:React.Dispatch<React.SetStateAction<string | undefined>>,
    setToken:React.Dispatch<React.SetStateAction<any>>,
    setAxiosInterceptor: React.Dispatch<React.SetStateAction<number | undefined>>,
    setContentTitle: React.Dispatch<React.SetStateAction<string | undefined>>
    setActiveMenu: React.Dispatch<React.SetStateAction<string | undefined>>,
  }
}

export interface IMenuItem {
  id: string
  icon?: any,
  text?: string
  uri?: string
  subMenu?: Array<{
    id: string,
    text: string,
    uri: string,
  }>
}