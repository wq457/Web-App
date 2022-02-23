import { getAddress,getOrder } from "@/api"
const state = {
    userAddressList:[],
    orderList:{}
}
const mutations = {
    GETUSERADDRESS(state,data){
        state.userAddressList = data
    },
    GETORDERDATA(state,data){
        state.orderList = data
    }
}
const actions = {
    async getUserAddress({commit}){
        let result = await getAddress()
        if(result.code=='200'){
            commit('GETUSERADDRESS',result.data)
        }
    },
    async getOrderData({commit}){
        let result = await getOrder()
        if(result.code=='200'){
            commit('GETORDERDATA',result.data)
        }
    }
}
const getters = {}
export default {
    state,
    actions,
    mutations,
    getters
}