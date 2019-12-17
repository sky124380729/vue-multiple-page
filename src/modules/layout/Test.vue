<template>
    <section class="test">
        <m-table :queryArr="queryArr">
            <el-table-column label="序号" type="index" width="400px"></el-table-column>
            <el-table-column label="姓名"></el-table-column>
            <el-table-column label="性别"></el-table-column>
            <el-table-column label="年龄"></el-table-column>
            <el-table-column label="操作" class-name="operate">
                <template v-slot="{ row, $index }">
                    <el-button size="mini" @click="goEdit(row.id)">{{ $index }}</el-button>
                </template>
            </el-table-column>
        </m-table>
        <m-button debounce @click="test">试试呢</m-button>
        <m-select v-model="x" :options="[{ label: 'xxx', value: 'xxx' }]"></m-select>
    </section>
</template>

<script>
export default {
    data() {
        return {
            x: null,
            queryArr: [
                {
                    key: 'name',
                    tag: 'el-input',
                    ph: '请输入呵呵呵'
                },
                {
                    key: 'age',
                    tag: 'el-select',
                    ph: '请选择哦吼',
                    options: [
                        {
                            label: '111',
                            value: 111
                        },
                        {
                            label: '222',
                            value: 222
                        }
                    ]
                },
                {
                    key: 'sasd',
                    tag: 'el-date-picker',
                    ph: '请选择时间'
                }
            ]
        }
    },
    methods: {
        test() {
            console.log('说试试就试试')
        },
        goEdit(id) {
            this.$router.push({
                name: 'equipmentOpt',
                params: { id }
            })
        }
    }
}
</script>
