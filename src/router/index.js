import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import routes from './routes'
import store from '@/store'
let originPush = VueRouter.prototype.push
let originReplace = Vue.prototype.replace

VueRouter.prototype.push = function(location,reject,resolve){
    if(reject && resolve){
        originPush.call(this,location,reject,resolve)
    }else {
        originPush.call(this,location,() => {},() => {})
    }
}
VueRouter.prototype.replace = function(location,reject,resolve){
    if(reject && resolve){
        originReplace.call(this,location,reject,resolve)
    }else {
        originReplace.call(this,location,() => {},() => {})
    }
}
let router = new VueRouter({
    routes,
    scrollBehavior(to, from, savedPosition) {
        return { y: 0 }
      },
})
router.beforeEach(async (to,from,next)=>{
    let token = store.state.register.token
    let name = store.state.register.userInfoList.name
    if(token){
        if(to.path=='/login'){
            next('/')
        }else{
            if(name){
                next()
            }else{
                try {
                    await store.dispatch('getUserInfo')
                    next()
                } catch (error) {
                    store.dispatch('exitLogin')
                    next('/login')
                }
            }
           
        }
    }else{
        let toPath = to.path
        if(toPath.indexOf('/trade')!=-1 || toPath.indexOf('/pay')!=-1 || toPath.indexOf('/center')!=-1){
            next('/login/?register=' + toPath)
        }else{
            next()
        }
    }
})
export default router