import axios from 'axios'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/store'
const requests = axios.create({
    baseURL:'/api',
    timeout:5000
})
requests.interceptors.request.use((config)=>{
    
   
    if(localStorage.getItem('TEMPID')){
        config.headers.userTempId = localStorage.getItem('TEMPID')
    }
    if(store.state.register.token){
        config.headers.token = store.state.register.token
    }
    nprogress.start()
    return config
})
requests.interceptors.response.use((res)=>{
    nprogress.done()
    return res.data
},(error)=>{
    return Promise.reject(new Error('fail'))
})
export default requests