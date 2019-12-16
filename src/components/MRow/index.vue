<script>
export default {
    name: 'mRow',
    functional: true,
    props: {
        // 一行显示几个
        number: {
            type: Number,
            default: 3
        }
    },
    render(h, { props, scopedSlots }) {
        const list = (scopedSlots.default && scopedSlots.default()) || []
        const row = (
            <el-row>
                {list.map(v => (
                    <el-col span={24 / props.number}>{v}</el-col>
                ))}
            </el-row>
        )
        return row
    }
}
</script>
