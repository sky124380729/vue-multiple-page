<template>
    <div class="login">
        <div class="login__header">
            <img src="~imgs/logo.png" width="160vw" alt="" />
            <p class="welcome">欢迎使用Basic后台系统</p>
        </div>
        <div class="login__body">
            <div class="login__box">
                <div class="body">
                    <h1>Basic后台管理系统</h1>
                    <el-form class="login_form" :model="form" ref="form" :rules="rules">
                        <el-form-item prop="username">
                            <el-input size="medium" prefix-icon="el-icon-user-solid" v-model.trim="form.username"></el-input>
                        </el-form-item>
                        <el-form-item prop="word">
                            <el-input size="medium" type="password" prefix-icon="el-icon-lock" v-model="form.word" @keyup.native.enter="login"></el-input>
                        </el-form-item>
                        <p class="clearfix">
                            <el-button class="fr" type="text" @click="forgetPwd">忘记密码？</el-button>
                        </p>
                        <m-button class="login-btn" type="primary" @click="login" :loading="loading">登 录</m-button>
                    </el-form>
                </div>
                <div class="footer">
                    建议使用chrome浏览器/IE11以上
                </div>
            </div>
        </div>
        <div class="login__footer">
            <img src="~imgs/logo.png" width="160vw" alt="" />
            <p class="copyright">版权所有：泉哥科技有限公司</p>
        </div>
    </div>
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
                word: '123'
            },
            rules: {
                username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                word: [{ required: true, message: '请输入密码', trigger: 'blur' }]
            }
        }
    },
    methods: {
        async login() {
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
        },
        forgetPwd() {
            this.$message.info('暂未开放，尽情期待~')
        }
    }
}
</script>

<style lang="scss" scoped>
@import '~styles/mixins';
@import '~styles/variables';
.login {
    display: flex;
    width: 100vw;
    height: 100vh;
    flex-direction: column;
    overflow: hidden;
    &__header {
        @include flex(flex-start);
        flex: 1;
        padding: 0 6%;
        .welcome {
            font-size: 22px;
            margin-left: 20px;
        }
    }
    &__footer {
        @include flex;
        flex: 1;
        .copyright {
            border-left: 1px solid #333;
            margin-left: 20px;
            padding-left: 20px;
        }
    }
    &__body {
        @include flex(flex-end);
        flex: 6;
        background: url('~imgs/background.jpg');
        background-size: 100% 100%;
    }
    &__box {
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        width: 360px;
        margin-right: 160px;
        border-radius: 6px;
        .body {
            flex: 1;
            color: $--color-theme;
            background-color: #fff;
            padding: 0 30px;
            h1 {
                height: 40px;
                line-height: 40px;
                margin: 20px 0;
                font-size: 22px;
                text-align: center;
            }
            .el-form-item {
                margin-bottom: 24px;
            }
            ::v-deep {
                .el-input__inner {
                    height: 42px;
                    line-break: 42px;
                    border-radius: 2px;
                }
                .el-input__icon {
                    line-height: 42px;
                    font-size: 18px;
                }
            }

            .login-btn {
                width: 100%;
                height: 38px;
                margin: 10px 0 20px;
                font-size: 14px;
                border-radius: 4px;
                letter-spacing: 0.1em;
            }
        }
        .footer {
            height: 60px;
            line-height: 60px;
            text-align: center;
            font-size: 14px;
            color: #999;
            background-color: #fafafa;
        }
    }
}

@media screen and (max-width: 1366px) {
    .login__box {
        width: 275px;
        .body {
            padding: 0 20px;
            h1 {
                height: 32px;
                line-height: 32px;
                margin: 15px 0;
                font-size: 18px;
                text-align: center;
            }
            .el-form-item {
                margin-bottom: 18px;
            }
            ::v-deep {
                .el-input__inner {
                    height: 32px;
                    line-height: 32px;
                }
                .el-input__icon {
                    line-height: 32px;
                    font-size: 16px;
                }
            }
            .login-btn {
                height: 32px;
                margin: 10px 0 20px;
                font-size: 12px;
            }
        }
        .footer {
            height: 32px;
            line-height: 32px;
            font-size: 10px;
        }
    }
}
</style>
