import { Visa } from '@/payload-types'
import { createContext, ReactNode, useContext } from 'react'

type VisaContextProps = {
  visas: Visa[]
}

type VisasProviderProps = {
  children: ReactNode
  visas: Visa[]
}

const VisaContext = createContext<VisaContextProps | null>(null)

export const VisasProvider = ({ children, visas }: VisasProviderProps) => {
  ;<VisaContext.Provider value={{ visas }}>{children}</VisaContext.Provider>
}

export const useVisas = () => {
  const data = useContext(VisaContext)

  return data
}
