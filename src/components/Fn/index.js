export default {
    name: 'fn',
    functional: true,
    props: {
        component: {
            type: String,
            default: 'el-button'
        }
    },
    render(createElement, { data, props, children }) {
        // 尤大大已经把需要传递的东西全封装到context的data里面啦，赞！
        return createElement(props.component, data, children)
    }
}
