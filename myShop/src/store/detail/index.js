import { reqGoodsInfo } from "@/api"
let actions={
    async getGoodInfo({commit},goodId){
        let result= await reqGoodsInfo(goodId)
        if(result.code==200){
            commit('GETGOODINFO',result.data)
        }
    }
}
let mutations={
    GETGOODINFO(state,goodInfo){
        state.goodInfo=goodInfo
    }
}
let state={
    goodInfo:{}
}
let getters={
    categoryView(state){
        return state.goodInfo.categoryView||{}
    },
    skuInfo(state){
        return state.goodInfo.skuInfo||{}
    }
}
export default {
    actions,
    mutations,
    state,
    getters
}