<script>
export default {
    name: 'mTitle',
    functional: true,
    props: {
        // 标题
        title: {
            type: String,
            default: ''
        },
        // 返回方法
        back: {
            type: [Function, Boolean],
            default: false
        }
    },
    render(h, context) {
        const slots = context.scopedSlots.default && context.scopedSlots.default()
        const customClass = context.props.customClass ? ' ' + context.props.customClass : ''
        return (
            <section class={`mTitle${customClass}`}>
                <div class='mTitle__left'>
                    <span class='title'>{context.props.title}</span>
                </div>
                <div class='mTitle__right'>
                    {slots}
                    {context.props.back ? (
                        <el-button
                            type='danger'
                            size='mini'
                            on-click={() => {
                                typeof context.props.back === 'boolean' ? context.$router.back() : context.props.back.call(context)
                            }}
                        >
                            返回
                        </el-button>
                    ) : null}
                </div>
            </section>
        )
    }
}
</script>

<style lang="scss" scoped>
.mTitle {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    min-height: 32px;
    .title {
        color: $--color-text;
    }
}
</style>
