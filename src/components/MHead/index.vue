<script>
import { ICON_DEFAULT } from '@/constant'
export default {
    name: 'mHead',
    functional: true,
    props: {
        // 标题
        title: {
            type: String,
            default: ''
        },
        // 图标
        icon: {
            type: String,
            default: ICON_DEFAULT
        },
        // 返回方法
        back: {
            type: [Function, Boolean],
            default: false
        },
        customClass: {
            type: String,
            default: ''
        }
    },
    render(h, context) {
        const slots = context.scopedSlots.default && context.scopedSlots.default()
        const customClass = context.props.customClass ? ' ' + context.props.customClass : ''
        return (
            <section class={`toolbar${customClass}`}>
                <div class='toolbar__left'>
                    <i class='fa fa-ravelry' />
                    <span class='title'>{context.props.title}</span>
                </div>
                <div class='toolbar__right'>
                    {slots}
                    {context.props.back ? (
                        <el-button
                            type='danger'
                            size='mini'
                            on-click={() => {
                                typeof context.props.back === 'boolean' ? context.parent.switchPage('Index') : context.props.back.call(context)
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
.toolbar {
    display: flex;
    align-items: center;
    height: 46px;
    padding: 8px;
    justify-content: space-between;
    border-bottom: 2px solid $-color--theme;
    margin-bottom: 10px;
    .title {
        font-weight: 600;
        color: #4a6076;
    }
}
</style>
