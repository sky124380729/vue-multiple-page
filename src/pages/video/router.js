import createRouter from 'config/router'

const router = createRouter('video')

//重置路由方法
export const resetRouter = () => {
    const newRouter = createRouter('video')
    router.matcher = newRouter.matcher
}

export default router
