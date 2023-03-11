import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
let originPush=VueRouter.prototype.push
let originReplace=VueRouter.prototype.replace
VueRouter.prototype.push=function(location,resolve,reject){
    if(resolve&&reject){
        originPush.call(this,location,resolve,reject)
    }
    else{
        originPush.call(this,location,()=>{},()=>{})
    }
}
VueRouter.prototype.replace=function(location,resolve,reject){
    if(resolve&&reject){
        originReplace.call(this,location,resolve,reject)
    }
    else{
        originReplace.call(this,location,()=>{},()=>{})
    }
}
const router=new VueRouter({
    routes:[
        {
            path:"/home",
            component:()=>import('@/pages/Home'),
            meta:{showFooter:true,pass:true}
        },
        {
            path:"/login",
            component:()=>import('@/pages/Login'),
            meta:{pass:true}
        },
        {
            path:"/register",
            component:()=>import('@/pages/Register'),
            meta:{pass:true}
        },
        {
            path:"/search/:keywords",
            name:'search',
            component:()=>import('@/pages/Search'),
            meta:{showFooter:true,pass:true}
        },
        {
            path:'/detail/:goodId',
            component:()=>import('@/pages/Detail'),
            meta:{pass:true}
        },
        {
            path:'/addcartsuccess',
            component:()=>import('@/pages/AddCartSuccess'),
            meta:{showFooter:true}
        },
        {
            path:'/shopcart',
            component:()=>import('@/pages/ShopCart'),
            
        },
        {
            path:'/trade',
            component:()=>import('@/pages/Trade'),
            beforeEnter(to,from,next){
                if(from.path==='/shopcart'){
                    next()
                }
                else{
                    next('/')
                }
            }
        },
        {
            path:'/pay',
            component:()=>import('@/pages/Pay')
        },
        {
            path:'/paysuccess',
            component:()=>import('@/pages/PaySuccess')
        },
        {
            path:'/center',
            component:()=>import('@/pages/Center')
        },
        {
            path:'*',
            redirect:"/home"
        }
    ],
    scrollBehavior(to,from,savePosition){
        return {y:0}
    },
    mode:"history",
})

router.beforeEach(function(to,from,next){
    console.log('to',to)
    console.log('from',from)
    if(localStorage.getItem('TOKEN')){
        next()
    }
    else{
        if(to.meta.pass){
            next()
        }
        else{
            next('/login')
        }
       
    }
})

export default router