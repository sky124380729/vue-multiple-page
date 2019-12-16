<script>
export default {
    name: 'mStatus',
    functional: true,
    props: {
        data: Object
    },
    render(h, { props }) {
        const vnode = <ol class='m-status' />
        !vnode.children && (vnode.children = [])
        for (const k in props.data) {
            const v = props.data[k]
            vnode.children.push(
                <li>
                    <span class='dotted' style={{ backgroundColor: v.color }} />
                    <span class='des'>{v.des}</span>
                </li>
            )
        }
        return vnode
    }
}
</script>

<style lang="scss" scoped>
.m-status {
    display: inline-flex;
    font-size: 0;
    li {
        display: flex;
        align-items: center;
        margin-right: 20px;
        .dotted {
            width: 12px;
            height: 12px;
            margin-right: 6px;
            border-radius: 50%;
        }
        .des {
            font-size: 12px;
            color: #7a8999;
        }
    }
}
</style>
