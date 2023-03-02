import requests from "./request";
import mockRequests from './mockAjax'
export const reqCategoryList=()=>{
    return requests({
        url:'/product/getBaseCategoryList',
        method:'get'
    })
}
export const reqGetBannerList=()=>{
    return mockRequests({
        url:'/banner',
        method:'get'
    })
}
export const reqFloorList=()=>{
    return mockRequests({
        url:'/floor',
        method:'get'
    })
}
export const reqGetSearchInfo=(data)=>{
    return requests({
        url:'/list',
        method:'post',
        data:data
    })
}
export const reqGoodsInfo=(goodId)=>{
    return requests({
        url:`/item/${goodId}`,
        method:'get'
    })
}
export const reqAddOrUpdateShopCart=(skuId,skuNum)=>{
    return requests({
        url:`/cart/addToCart/${skuId}/${skuNum}`,
        method:'post'
    })
   
}