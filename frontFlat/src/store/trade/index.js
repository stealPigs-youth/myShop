import { reqAddressInfo,reqOrderInfo } from "@/api"

const actions={
    async getUserAddress({commit}){
        let result=await reqAddressInfo()
        if(result.code==200){
            commit('GETUSERADDRESS',result.data)
        }
    },
    async getOrderInfo({commit}){
        let result=await reqOrderInfo()
        if(result.code=200){
            commit('GETORDERINFO',result.data)
        }
    }
}
const mutations={
    GETUSERADDRESS(state,address){
        state.address=address
    },
    GETORDERINFO(state,orderInfo){
        state.orderInfo=orderInfo
    }
}
const state={
    address:[],
    orderInfo:{}
}
const getters={
    detailArrayList(state){
        return state.orderInfo.detailArrayList||[]
    }
}
export default {
    actions,
    mutations,
    state,
    getters
}