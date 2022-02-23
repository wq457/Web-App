import { showCart,deleteCart,changeChecked } from "@/api"
const state = {
    cartList:[]
}
const mutations = {
    GETCART(state,cartList){
        state.cartList = cartList
    }
}
const actions = {
    async getCart({commit}){
        let result = await showCart()
        if(result.code=='200'){
            commit('GETCART',result.data)
        }
    },
    async deleteCartList({commit},skuId){
        let result = await deleteCart(skuId)
        if(result.code == '200'){
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    async changeCheck({commit},{skuId,isChecked}){
        let result = await changeChecked(skuId,isChecked)
        if(result.code == '200'){
            return 'ok'
        }else{
            return Promise.reject(new Error('falie'))
        }
    },
    async deleteAllSelected({getters,dispatch}){
        let promiseAll = []
        getters.cartData.cartInfoList.forEach(item=>{
            let result = item.isChecked == '1'?dispatch('deleteCartList',item.skuId):''
            promiseAll.push(result)
        })
        return Promise.all(promiseAll)
    },
    async changeAll({getters,dispatch},isChecked){
        let promiseAll = []
        getters.cartData.cartInfoList.forEach(item=>{
            let result = dispatch('changeCheck',{skuId:item.skuId,isChecked})
            promiseAll.push(result)
        })
        return Promise.all(promiseAll)
    }
}
const getters = {
    cartData(state){
        return state.cartList[0] || {}
    }
}
export default {
    state,
    mutations,
    actions,
    getters
}