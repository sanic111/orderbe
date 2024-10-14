import { FC, useState, createContext, useContext } from 'react'
import {
  QueryState,
  QueryRequestContextProps,
  initialQueryRequest,
  WithChildren,
} from '../../helpers'

const QueryRequestContext = createContext<QueryRequestContextProps>(initialQueryRequest)

type Props = {
  defaultSort?: string
}

const QueryRequestProvider: FC<Props & WithChildren> = ({ children, defaultSort }) => {
  const [state, setState] = useState<QueryState>({
    sort: defaultSort || 'id',
    orders: 'desc',
    ...initialQueryRequest.state,
  })

  const updateState = (updates: Partial<QueryState>) => {
    const updatedState = { ...state, ...updates } as QueryState
    setState(updatedState)
  }

  return (
    <QueryRequestContext.Provider value={{ state, updateState }}>
      {children}
    </QueryRequestContext.Provider>
  )
}

const useQueryRequest = () => useContext(QueryRequestContext)
export { QueryRequestProvider, useQueryRequest }
