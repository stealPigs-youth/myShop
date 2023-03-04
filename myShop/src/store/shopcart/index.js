import { reqCartList } from "@/api"
const actions={
    async getCartList({commit}){
        let result=await reqCartList()
        if(result.code==200){
            commit('GETCARTLIST',result.data)
            console.log('1')
        }
    }
}
const mutations={
    GETCARTLIST(state,data){
        state.cartList=data
    }
}
const state={
    cartList:[]
}
const getters={
    cartInfoList(state){
        if(state.cartList[0]){
            return state.cartList[0].cartInfoList||[]
        }
        else{
            return []
        }
    }
}
export default{
    actions,
    mutations,
    state,
    getters
}