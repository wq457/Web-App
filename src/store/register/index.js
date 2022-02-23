import {getCode,userRegister,userLogin,getUser,logout} from '@/api'
import {getToken,setToken,removeToken} from '@/utils/token'
const state = {
    code:'',
    token:getToken(),
    userInfoList:{}
}
const mutations = {
    GETCODEDATA(state,code){
        state.code = code
    },
    USERDATALOGIN(state,token){
        state.token = token
        setToken(token)
    },
    GETUSERINFO(state,userInfoList){
        state.userInfoList = userInfoList
    },
    EXITLOGIN(state){
        state.token = ''
        state.userInfoList = ''
        removeToken()
    }
}
const actions = {
    async getCodeData({commit},phone){
        let result = await getCode(phone)
        if(result.code == '200'){
            commit('GETCODEDATA',result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    async userDataRegister({commit},user){
        let result = await userRegister(user)
        if(result.code=='200'){
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    async userDataLogin({commit},data){
        let result = await userLogin(data)
        if(result.code=='200'){
            commit('USERDATALOGIN',result.data.token)
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    async getUserInfo({commit}){
        let result = await getUser()
        if(result.code=='200'){
            commit('GETUSERINFO',result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    async exitLogin({commit}){
        let result = await logout()
        if(result.code == '200'){
            commit('EXITLOGIN')
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