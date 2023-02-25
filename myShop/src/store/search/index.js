import { reqGetSearchInfo } from "@/api"
let actions={
    async getSearchList({commit},data={}){
        let result=await reqGetSearchInfo(data)
        if(result.code===200){
            commit("GETSEARCHLIST",result.data)
        }
    }
}
let mutations={
    GETSEARCHLIST(state,searchList){
        state.searchList=searchList
    }
}
let state={
    searchList:{}
}
let getters={
    goodsList(state){
        return state.searchList.goodsList||[]
    },
    trademarkList(state){
        return state.searchList.trademarkList||[]
    },
    attrsList(state){
        return state.searchList.attrsList||[]
    }

}

export default {
    actions,
    mutations,
    state,
    getters

}