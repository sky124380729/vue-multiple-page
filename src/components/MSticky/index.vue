// 目前只支持app-main区间的sticky

<template>
    <div :style="{ height: height + 'px', zIndex: zIndex }" class="m-sticky">
        <div :class="className" :style="{ top: isSticky ? stickyTop + 'px' : '', zIndex: zIndex, position: position, width: width, height: height + 'px' }">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'mSticky',
    props: {
        stickyTop: {
            type: Number,
            default: 0
        },
        zIndex: {
            type: Number,
            default: 1
        },
        className: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            active: false,
            position: '',
            width: undefined,
            height: undefined,
            isSticky: false
        }
    },
    activated() {
        this.handleResize()
    },
    mounted() {
        this.height = this.$el.getBoundingClientRect().height
        const wrapper = document.querySelector('.app-main')
        wrapper && wrapper.addEventListener('scroll', this.handleScroll)
        window.addEventListener('resize', this.handleResize)
    },
    destroyed() {
        const wrapper = document.querySelector('.app-main')
        wrapper && wrapper.removeEventListener('scroll', this.handleScroll)
        window.removeEventListener('resize', this.handleResize)
    },
    methods: {
        sticky() {
            if (this.active) {
                return
            }
            this.position = 'fixed'
            this.active = true
            this.width = this.width + 'px'
            this.isSticky = true
        },
        handleReset() {
            if (!this.active) {
                return
            }
            this.reset()
        },
        reset() {
            this.position = ''
            this.width = 'auto'
            this.active = false
            this.isSticky = false
        },
        handleScroll() {
            const width = this.$el.getBoundingClientRect().width
            this.width = width || 'auto'
            const offsetTop = this.$el.getBoundingClientRect().top
            if (offsetTop < this.stickyTop) {
                this.sticky()
                return
            }
            this.handleReset()
        },
        handleResize() {
            if (this.isSticky) {
                this.width = this.$el.getBoundingClientRect().width + 'px'
            }
        }
    }
}
</script>
