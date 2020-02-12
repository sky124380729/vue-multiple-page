<template>
    <section class="login">
        <div class="login__header">
            <img class="logo" src="~imgs/proLogo.png" alt="" />
            <h1 class="title">新世纪智慧社区管理系统</h1>
        </div>
        <div class="login__body">
            <el-form :model="form" ref="form" :rules="rules">
                <p class="title">系统登录</p>
                <el-form-item class="username" prop="username">
                    <el-input placeholder="请输入用户名" v-model.trim="form.username">
                        <template slot="prepend"><img class="prepend" src="~imgs/user.png" alt=""/></template>
                    </el-input>
                </el-form-item>
                <el-form-item class="password" prop="word">
                    <el-input type="password" placeholder="请输入密码" v-model="form.word" @keyup.native.enter="login">
                        <template slot="prepend"><img class="prepend" src="~imgs/password.png" alt=""/></template>
                    </el-input>
                </el-form-item>
                <div class="extraOperate">
                    <el-checkbox>五个工作日内免登录</el-checkbox>
                    <el-button type="text" @click="forgetPwd">忘记密码?</el-button>
                </div>
                <el-button class="loginBtn" type="primary" @click="login" :loading="loading">登录</el-button>
            </el-form>
            <div class="tips">
                <p>浏览提示：为了达到更好的浏览效果，推荐配置为1920*1080分辨率。</p>
                <p>建议使用谷歌、火狐及IE10以上版本浏览器。</p>
            </div>
        </div>
        <div class="login__footer">
            <img class="slogan" src="~imgs/slogan.png" alt="" />
            <span class="splitLine"></span>
            <h2 class="copyright">版权所有：苏州道盛易合科技有限公司</h2>
        </div>
    </section>
</template>

<script>
import Cookies from 'js-cookie'
import { login } from '@/apis'
export default {
    name: 'login',
    data() {
        return {
            loading: false,
            form: {
                username: 'aadmin',
                word: '123456'
            },
            rules: {
                username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                word: [{ required: true, message: '请输入密码', trigger: 'blur' }]
            }
        }
    },
    methods: {
        async login() {
            this.$refs.form.validate(valid => {
                if (!valid) return
                let form = new FormData()
                form.append('username', this.form.username)
                form.append('word', this.form.word)
                this.loading = true
                // 登录接口需要根据http状态码判断
                login(form)
                    .then(({ data: res }) => {
                        this.loading = false
                        const { token_type, access_token } = res
                        const token = `${token_type} ${access_token}`
                        Cookies.set('token', token, { expires: 7 })
                        this.$router.push('/')
                    })
                    .catch(({ response }) => {
                        if (response.status === 401) {
                            this.$message.error(response.data.error_description)
                        } else {
                            this.$message.error('未知错误!')
                        }
                        this.loading = false
                    })
            })
        },
        forgetPwd() {
            this.$message.info('暂未开放，尽情期待~')
        }
    }
}
</script>

<style lang="scss">
@import '~styles/mixins.scss';
.login {
    @include flex(space-between);
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background: url('~imgs/bg.png') no-repeat center;
    background-size: 100% 100%;
    &__header {
        @include flex;
        margin-top: vh(30);
        .logo {
            width: vw(90);
            height: vw(90);
        }
        .title {
            font-weight: bold;
            color: #66ffff;
            letter-spacing: 0.1em;
            @include font-size(36);
        }
    }
    &__body {
        align-self: flex-end;
        width: vw(540);
        margin-right: vw(326);
        color: #fff;
        .el-form {
            text-align: center;
            padding: 0 vw(110);
            height: vh(440);
            overflow: hidden;
            background: linear-gradient(0deg, rgba(10, 56, 102, 1) 0%, rgba(19, 100, 128, 1) 100%);
            box-shadow: 0px 10px 30px 0px rgba(7, 18, 48, 0.3);
            border-radius: 10px;
            .el-form-item__content {
                line-height: vh(48);
            }
            .username {
                margin-bottom: vh(33);
            }
            .password {
                margin-bottom: vh(12);
            }
            .title {
                // @include vh;
                font-size: vh(28);
                margin: vh(36) 0;
                letter-spacing: 0.1em;
                font-weight: 400;
            }
            .extraOperate {
                margin: 0 auto;
                @include flex(space-between);
            }
            .loginBtn {
                width: 100%;
                height: vh(54);
                background: #3e9ed5;
                @include font-size(18);
                margin-top: vh(30);
                span {
                    display: inline-block;
                    width: vw(54);
                    letter-spacing: 1em;
                }
            }
            .el-input {
                height: vh(48);
                .prepend {
                    width: vw(24);
                    height: vh(24);
                }
                .el-input__inner {
                    width: 100%;
                    height: 100%;
                    border-radius: 0;
                }
            }
            .el-checkbox__label {
                color: #fff;
                @include font-size(12);
            }
        }
        .tips {
            @include font-size(16);
            text-align: center;
            font-weight: 400;
            color: #8fadcc;
            margin-top: vh(36);
        }
    }
    &__footer {
        @include flex;
        margin-bottom: vh(66);
        .slogan {
            width: vw(105);
            height: vw(27);
        }
        .splitLine {
            display: inline-block;
            width: vw(2);
            height: vw(27);
            margin: 0 vw(24);
            background-color: #8fadcc;
        }
        .copyright {
            @include font-size(24);
            font-weight: 300;
            color: #8fadcc;
        }
    }
}
</style>
