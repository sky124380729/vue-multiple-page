import createRouter from 'config/router'

const router = createRouter('guard')

//重置路由方法
export const resetRouter = () => {
    const newRouter = createRouter('guard')
    router.matcher = newRouter.matcher
}

export default router
