import Vue from 'vue'
import VueLazyload from 'vue-lazyload'
import catImg from '@/assets/cat.jpeg'

Vue.use(VueLazyload,{
    loading:catImg
})