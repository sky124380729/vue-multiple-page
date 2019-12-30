import Vue from 'vue'


declare module 'vue/types/vue' {
    interface Vue {

        $switchPage(comp:string,id?:string,view?:boolean):void

        $deepClone(obj:object):object
    }
}
