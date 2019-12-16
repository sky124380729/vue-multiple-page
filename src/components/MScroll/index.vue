<template>
    <div class="m-scroll" ref="mScroll">
        <div class="m-scroll__wrapper" :style="{ transform: `translate(0px, ${this.posY}px)` }">
            <div class="vdom" ref="vdom">
                <slot></slot>
            </div>
            <div class="vdom" v-html="copyHtml"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MScroll',
    props: {
        // 步长
        step: {
            type: Number,
            default: 0.5
        },
        // 延时
        delay: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            reqFrame: '',
            copyHtml: '',
            posY: 0
        }
    },
    mounted() {
        this._initMove()
        window.addEventListener('resize', () => {
            this._initMove()
        })
    },
    methods: {
        _initMove() {
            this._cancel()
            this.copyHtml = ''
            this.$nextTick(() => {
                const mScroll = this.$refs.mScroll
                if (!mScroll) return
                const mScrollHeight = mScroll.offsetHeight
                const vdom = mScroll.querySelector('.vdom')
                const wrapperHeight = vdom.offsetHeight
                // 如果高度超出就滚动
                if (wrapperHeight > mScrollHeight) {
                    this.copyHtml = this.$refs.vdom.innerHTML
                    this.timer && clearTimeout(this.timer)
                    this.timer = setTimeout(() => {
                        this._move(wrapperHeight)
                    }, this.delay)
                } else {
                    this._cancel()
                }
            })
        },
        _move(H) {
            // i为帧数，60Hz的显示器1s即为60帧
            let i = 0
            const handler = () => {
                this.posY = i * this.step
                i === -Math.ceil(H / this.step) ? (i = 0) : i--
                this.reqFrame = requestAnimationFrame(handler)
            }
            this.reqFrame = requestAnimationFrame(handler)
        },
        _cancel() {
            this.posY = 0
            cancelAnimationFrame(this.reqFrame)
        }
    },
    beforeDestroy() {
        this._cancel()
        this.timer && clearTimeout(this.timer)
    }
}
</script>

<style lang="scss" scoped>
.m-scroll {
    height: 100%;
    overflow: hidden;
    transition: all 0ms ease-in 0s;
}
</style>
