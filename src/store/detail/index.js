import {reqDetail,sendCart} from '@/api'
import {getUid} from '@/utils/uuid'
const state = {
    detailList:{},
    uuid_token:getUid()
}
const mutations = {
    GETDETAIL(state,detailList){
        state.detailList = detailList
    }
}
const actions = {
    async getDetail({commit},skuid){
        let result = await reqDetail(skuid)
        if(result.code == '200'){
            commit('GETDETAIL',result.data)
        }
    },
    async sendCart({commit},{skuId,skuName}){
        let result = await sendCart(skuId,skuName)
        if(result.code == '200'){
            return 'ok'
        }else{
            return Promise.reject(new Error('fail'))
        }
    }
}
const getters = {
    categoryView(state){
        return state.detailList.categoryView || {}
    },
    skuInfo(state){
        return state.detailList.skuInfo || {}
    },
    spuSaleAttrList(state){
        return state.detailList.spuSaleAttrList || []
    }
}
export default {
    state,
    actions,
    mutations,
    getters
}