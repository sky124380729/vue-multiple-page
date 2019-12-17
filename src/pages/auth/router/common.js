import Login from 'modules/Login'
import NoPermission from 'modules/NoPermission'
export default [
    {
        path: '/',
        redirect: '/platform'
    },
    {
        path: '/noPermission',
        component: NoPermission
    },
    {
        path: '/login',
        component: Login
    }
]
