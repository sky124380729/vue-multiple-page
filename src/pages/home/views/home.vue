<template>
    <section class="home">
        <el-row :gutter="20">
            <el-col :span="6" v-for="item in linkList" :key="item.path">
                <el-card shadow="hover">
                    <a :href="item.path">{{ item.des }}</a>
                </el-card>
            </el-col>
        </el-row>
    </section>
</template>

<script>
export default {
    data() {
        return {
            linkList: [
                { path: '/xxx', des: '系统X' },
                { path: '/auth', des: '统一身份认证系统' },
                { path: '/c', des: '系统C' },
                { path: '/d', des: '系统D' }
            ]
        }
    }
}
</script>
<style lang="scss" scoped>
.home {
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.9);
    padding: 60px;
    overflow: hidden;
    .el-card {
        height: 160px;
        cursor: pointer;
        background: url('~imgs/card_bg.png') no-repeat center;
        background-size: 100% 100%;
        ::v-deep .el-card__body {
            width: 100%;
            height: 100%;
        }
        a {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
            color: #fff;
        }
    }
}
</style>
