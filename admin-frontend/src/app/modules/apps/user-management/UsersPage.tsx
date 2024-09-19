import { Route, Routes, Outlet, Navigate } from 'react-router-dom'
import { PageLink, PageTitle } from '../../../../_metronic/layout/core'
import { UsersListWrapper } from './users-list/UsersList'

const usersBreadcrumbs: Array<PageLink> = [
  {
    title: 'User Management',
    path: '/users',
    isSeparator: false,
    isActive: false,
  },
  {
    title: '',
    path: '',
    isSeparator: true,
    isActive: false,
  },
]

const UsersPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          index
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>Users list</PageTitle>
              <UsersListWrapper />
            </>
          }
        />
      </Route>
    </Routes>
  )
}

export default UsersPage
