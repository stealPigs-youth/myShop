import { reqGoodsInfo,reqAddOrUpdateShopCart } from "@/api"
let actions={
    async getGoodInfo({commit},goodId){
        let result= await reqGoodsInfo(goodId)
        if(result.code==200){
            commit('GETGOODINFO',result.data)
        }
    },
    async addOrUpdateShopCart({commit},{skuId,skuNum}){
        if(localStorage.getItem('TOKEN')){
            let result=await reqAddOrUpdateShopCart(skuId,skuNum)
            if(result.code==200){
                return '成功'
            }
            else{
                return '失败'
            }
        }else{
            return '未登录'
        }
    }

}
let mutations={
    GETGOODINFO(state,goodInfo){
        state.goodInfo=goodInfo
    }
}
let state={
    goodInfo:{},
}
let getters={
    categoryView(state){
        return state.goodInfo.categoryView||{}
    },
    skuInfo(state){
        return state.goodInfo.skuInfo||{}
    },
    spuSaleAttrList(state){
        return state.goodInfo.spuSaleAttrList||[]
    }
}
export default {
    actions,
    mutations,
    state,
    getters
}