import {reqGetCode,reqUserRegister,reqUserLogin} from '@/api'

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
        console.log(result)
    }
}
const mutations={
    GETCODE(state,code){
        state.code=code
    }
}
const state={
    code:''
}
const getters={}
export default {
    actions,
    mutations,
    state,
    getters
}