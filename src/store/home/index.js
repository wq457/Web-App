import { reqCatagory,reqBanner,reqFloor } from "@/api"
const state = {
   categoryList:[],
   bannerList:[],
   floorList:[]
}
const mutations = {
    CATEGORYLIST(state,categoryList){
        state.categoryList = categoryList
    },
    GETBANNERLIST(state,bannerList){
        state.bannerList = bannerList
    },
    GETFLOORLIST(state,floorList){
        state.floorList = floorList
    }

}
const actions = {
    async categorylist({commit}){
        let result = await reqCatagory()
        commit('CATEGORYLIST',result.data)
    },
    async getBannerList({commit}){
        let result = await reqBanner()
        commit('GETBANNERLIST',result.data)
    },
    async getFloorList({commit}){
        let result = await reqFloor()
        if(result.code=='200'){
            commit('GETFLOORLIST',result.data)
        }
    }
}
const getters = {}
export default {
    state,
    mutations,
    actions,
    getters
}