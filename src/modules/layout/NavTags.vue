<template>
    <section>
        <div class="navTags">
            <div class="navTags__btn navTags__btn--left" :class="{ 'navTags__btn--disabled': !moveAble }" @click="move(-1)">
                <i class="el-icon-caret-left"></i>
            </div>
            <div class="navTags__box swiper-container">
                <div class="navTags__container swiper-wrapper">
                    <el-tag
                        @contextmenu.prevent.native="openMenu(item, $event)"
                        @click="$router.push({ name: item.name })"
                        :class="{ isActive: $route.path === item.path }"
                        closable
                        @close="closeTag(item)"
                        size="medium"
                        class="swiper-slide"
                        v-for="item in navTags"
                        :key="item.name"
                    >
                        <span class="dotted"></span>
                        <span>{{ item.title }}</span>
                    </el-tag>
                </div>
            </div>
            <div class="navTags__btn navTags__btn--right" :class="{ 'navTags__btn--disabled': !moveAble }" @click="move(1)">
                <i class="el-icon-caret-right"></i>
            </div>
            <el-dropdown @command="handleTag">
                <div class="navTags__btn">
                    <i class="el-icon-circle-close"></i>
                </div>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="closeAll">关闭所有</el-dropdown-item>
                    <el-dropdown-item command="closeOthers">关闭其他</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <ul class="contextmenu" v-show="visible" :style="{ left: left + 'px', top: top + 'px' }">
            <li @click="closeSelectedTag(selectedTag)">关闭</li>
            <li @click="closeOthersTags">关闭其他</li>
            <li @click="closeAllTags">关闭所有</li>
        </ul>
    </section>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import Swiper from 'swiper'
export default {
    name: 'navTags',
    data() {
        return {
            visible: false,
            top: 0,
            left: 0,
            selectedTag: {},
            swiper: null,
            moveAble: true
        }
    },
    watch: {
        $route: {
            handler(route) {
                this.addTag(route)
            },
            immediate: true
        },
        visible(value) {
            if (value) {
                document.body.addEventListener('click', this.closeMenu)
            } else {
                document.body.removeEventListener('click', this.closeMenu)
            }
        }
    },
    computed: {
        ...mapGetters(['navTags'])
    },
    methods: {
        ...mapMutations(['ADD_NAVTAGS', 'DEL_NAVTAGS', 'DEL_OTHER_NAVTAGS', 'DEL_ALL_NAVTAGS']),
        initSwiper() {
            this.swiper = new Swiper('.swiper-container', {
                slidesPerView: 'auto',
                loop: false,
                mousewheel: true,
                roundLengths: true,
                observer: true
            })
        },
        move(flag) {
            if (flag > 0) {
                this.swiper.slideNext()
            } else {
                this.swiper.slidePrev()
            }
        },
        handleTag(command) {
            if (command === 'closeOthers') {
                this.selectedTag = this.navTags.find(v => v.path === this.$route.path)
                this.closeOthersTags()
            } else {
                this.closeAllTags()
            }
        },
        // 添加标签
        addTag(route) {
            if (!route.name) return
            this.ADD_NAVTAGS({
                path: route.path,
                title: route.meta.title,
                name: route.name
            })
            this.$nextTick(() => {
                let index = [...document.querySelectorAll('.swiper-wrapper .el-tag')].findIndex(item => item.classList.contains('isActive'))
                this.swiper.slideTo(index)
            })
        },
        // 删除标签
        closeTag(tag) {
            // 控制路由重新跳转
            if (this.navTags.length === 1) {
                this.$router.push('/platform/index')
            } else if (this.$route.path === tag.path) {
                for (const [k, v] of this.navTags.entries()) {
                    if (v.path === tag.path) {
                        if (k !== this.navTags.length - 1) {
                            this.$router.push(this.navTags[k + 1])
                        } else if (k !== 0) {
                            this.$router.push(this.navTags[k - 1])
                        }
                        break
                    }
                }
            }
            // 执行删除操作
            this.DEL_NAVTAGS(tag)
        },
        closeSelectedTag(tag) {
            this.closeTag(tag)
            this.visible = false
        },
        closeOthersTags() {
            // 执行删除操作
            this.$router.push(this.selectedTag)
            this.DEL_OTHER_NAVTAGS(this.selectedTag)
        },
        closeAllTags() {
            this.DEL_ALL_NAVTAGS()
            this.$router.push('/platform/index')
        },
        openMenu(tag, e) {
            this.visible = true
            this.selectedTag = tag
            this.left = e.clientX
            this.top = e.clientY
        },
        closeMenu() {
            this.visible = false
        }
    },
    mounted() {
        this.initSwiper()
    }
}
</script>

<style lang="scss" scoped>
@import '~styles/mixins';
.navTags {
    display: flex;
    height: $height-tag;
    align-items: center;
    box-shadow: 0px 1px 10px 0px rgba(100, 100, 100, 0.2);
    flex-direction: start;
    font-size: 12px;
    &__box {
        overflow: hidden;
    }
    &__btn {
        @include flex;
        position: relative;
        background-color: #fff;
        z-index: 99;
        box-sizing: border-box;
        width: 28px;
        height: 28px;
        margin: 0 3px;
        text-align: center;
        cursor: pointer;
        font-size: 16px;
        border: 1px solid $-color--theme;
        color: $-color--theme;
        transition: color 0.3s, border-radius 0.2s;
        border-radius: 2px;
        &:not(.navTags__btn--disabled):hover {
            background-color: $-color--theme;
            color: #fff;
            border-radius: 50%;
        }
        &--disabled {
            border-color: #c2c5cc;
            color: #c2c5cc;
        }
    }
    &__box {
        flex: 1;
        padding: 0 5px;
        white-space: nowrap;
    }
    .el-tag {
        cursor: pointer;
        border-radius: 0;
        margin-right: 5px;
        background-color: #fff;
        color: #919499;
        border-radius: 2px;
        .dotted {
            position: relative;
            display: inline-block;
            top: 1px;
            margin-right: 6px;
            width: 10px;
            height: 10px;
            background-color: #919499;
            border-radius: 50%;
        }
        &.isActive {
            color: $-color--theme;
            border-color: $-color--theme;
            .dotted {
                background-color: $-color--theme;
            }
        }
    }
    .el-icon-circle-close {
        font-size: 18px;
    }
}
.contextmenu {
    margin: 0;
    background: #fff;
    z-index: 100;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 3px 3px 13px 1px rgba(0, 0, 0, 0.2);
    li {
        margin: 0;
        padding: 7px 16px;
        cursor: pointer;
        &:hover {
            background: #eee;
        }
    }
}
</style>
