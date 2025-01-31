'use client'
import { Category, Contact, Visa } from '@/payload-types'
import { createContext, ReactNode, useContext } from 'react'

type GlobalContextProps = {
  contacts: Contact[]
  visas: Visa[]
  categories: Category[]
}

const GlobalContext = createContext<GlobalContextProps>({ contacts: [], visas: [], categories: [] })

type GlobalProviderProps = GlobalContextProps & {
  children: ReactNode
}

export const GlobalProvider = ({ children, ...props }: GlobalProviderProps) => {
  return <GlobalContext value={props}>{children}</GlobalContext>
}

export const useGlobalContext = () => useContext(GlobalContext)
