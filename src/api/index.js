import requests from './request'
import requestsMock from './requestMock'
export const reqCatagory = () => {
    return requests({
        url:'/product/getBaseCategoryList',
        method:'GET'
    })
}
export const reqBanner = () => {
    return requestsMock({
        url:'/banner',
        method:'GET'
    })
}
export const reqFloor = () => {
    return requestsMock({
        url:'/floor',
        method:'GET'
    })
}
export const reqSearch = (params) => {
    return requests({
        url:'/list',
        method:'POST',
        data:params
    })
}
export const reqDetail = (skuid) => {
    return requests({
        url:`/item/${skuid}`,
        method:'GET'
    })
}
export const sendCart = (skuId,skuNum) => {
    return requests({
        url:`/cart/addToCart/${ skuId }/${ skuNum }`,
        method:'POST'
    })
}
export const showCart = () => {
    return requests({
        url:`/cart/cartList`,
        method:'GET'
    })
}
export const deleteCart = (skuId) => {
    return requests({
        url:`/cart/deleteCart/${skuId}`,
        method:'DELETE'
    })
}
export const changeChecked = (skuId,isChecked) => {
    return requests({
        url:`/cart/checkCart/${skuId}/${isChecked}`,
        method:'GET'
    })
}
export const getCode = (phone) => {
    return requests({
        url:`/user/passport/sendCode/${phone}`,
        method:'GET'
    })
}
export const userRegister = (data) => {
    return requests({
        url:`/user/passport/register`,
        method:'POST',
        data
    })
}
export const userLogin= (data) => {
    return requests({
        url:`/user/passport/login`,
        method:'POST',
        data
    })
}
export const getUser= () => {
    return requests({
        url:`/user/passport/auth/getUserInfo`,
        method:'GET',
    })
}
export const logout= () => {
    return requests({
        url:`/user/passport/logout`,
        method:'GET',
    })
}
export const getAddress = ()=>{
    return requests({
        url:'/user/userAddress/auth/findUserAddressList',
        method:'GET'
    })
}
export const getOrder = ()=>{
    return requests({
        url:'/order/auth/trade',
        method:'GET'
    })
}
export const sendOrder = (tradeNo,data)=>{
    return requests({
        url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,
        method:'POST',
        data
    })
}
export const getPay = (orderId)=>{
    return requests({
        url:`/payment/weixin/createNative/${orderId}`,
        method:'GET'
    })
}
export const getPayStatus = (orderId)=>{
    return requests({
        url:`/payment/weixin/queryPayStatus/${orderId}`,
        method:'GET'
    })
}
export const getOrderList = (page,limit)=>{
    return requests({
        url:`/order/auth/${page}/${limit}`,
        method:'GET'
    })
}