import createRouter from 'config/router'

const router = createRouter('consumer')

//重置路由方法
export const resetRouter = () => {
    const newRouter = createRouter('consumer')
    router.matcher = newRouter.matcher
}

export default router
