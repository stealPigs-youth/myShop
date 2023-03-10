import {reqGetCode,
reqUserRegister,
reqUserLogin,
reqUserInfo,
reqLogout} from '@/api'
import { nanoid } from 'nanoid'

const actions={
    async getCode({commit},phone){
        let result=await reqGetCode(phone)
        console.log(result)
        if(result.code==200){
            commit('GETCODE',result.data)
            return 'success'
        }
        else{
            return 'fail'
        }
    },
    async userRegister({commit},userData){
        let result=await reqUserRegister(userData)
        console.log(result)
        if(result.code==200){
            return 'success'
        }
        else{
            return 'fail'
        }
    },
    async userLogin({commit},userData){
        let result=await reqUserLogin(userData)
        if(result.code==200){
            localStorage.setItem('NANOID',nanoid())
            localStorage.setItem('TOKEN',result.data.token)
            return 'success'
        }
        else{
            return 'fail'
        }
    },
    async getUserInfo({commit}){
        let result=await reqUserInfo()
        if(result.code==200){
            commit('GETUSERINFO',result.data)
        }
    },
    async userLogout({commit}){
        let result=await reqLogout()
        if(result.code==200){
            commit("CLEARUSERINFO")
        }
    }
}
const mutations={
    GETCODE(state,code){
        state.code=code
    },
    USERLOGIN(state,token){
        state.token=token
    },
    GETUSERINFO(state,userInfo){
        state.userInfo=userInfo
    },
    CLEARUSERINFO(state){
        state.userInfo={}
        localStorage.removeItem('TOKEN')
        localStorage.removeItem('NANOID')
    }
}
const state={
    code:'',
    userInfo:{},
}
const getters={}
export default {
    actions,
    mutations,
    state,
    getters
}