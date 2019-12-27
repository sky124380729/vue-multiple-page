import createRouter from 'config/router'

const router = createRouter('identity')

//重置路由方法
export const resetRouter = () => {
    const newRouter = createRouter('identity')
    router.matcher = newRouter.matcher
}

export default router
