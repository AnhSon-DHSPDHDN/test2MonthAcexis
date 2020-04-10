// isProtected: các route cần được bảo vệ
// Có thể thêm giá trị vào đây
import  {lazy} from 'react'

export default [
  {
    title: 'Login Page | Sample App',
    component: lazy(() => import('../pages/Login')),
    path: '/login',
    isProtected: false,
    exact: false
  },
  {
    title: 'Dashboard | Sample App',
    component: lazy(()=>import('../pages/Dashboard')),
    path: '/dashboard',
    isProtected: true,
    exact: false
  },
  {
    title: 'Setting | Sample App',
    component: lazy(()=>import('../pages/Setting')),
    path: '/setting',
    isProtected: true,
    exact: false
  },
  {
    title: 'Functions',
    component: lazy(()=>import('../pages/Functions')),
    path: '/functions',
    isProtected: true,
    exact: true
  },
  {
    title: 'Functions',
    component: lazy(()=>import('../pages/FunctionFoo')),
    path: '/functions/foo',
    isProtected: true,
    exact: false
  }
]