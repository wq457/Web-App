export default [
    {   
        path:'/center',
        component:() => import('@/pages/Center'),
        meta:{
            show:true
        },
        children:[
            {
                path:'myorder',
                component:() => import('@/pages/Center/myOrder'),
            },
            {
                path:'groupOrder',
                component:() => import('@/pages/Center/groupOrder'),
            },
            {
                path:'/center',
                redirect:'/center/myorder'
            }
        ]
    },
    {   
        path:'/paysuccess',
        component:() => import('@/pages/PaySuccess'),
        meta:{
            show:true
        },
        beforeEnter: (to, from, next) => {
            console.log(from.path)
            if(from.path=='/pay'){
                next()
            }else{
                next(false)
            }
        }
    },
    {   
        path:'/pay',
        component:() => import('@/pages/Pay'),
        meta:{
            show:true
        },
          beforeEnter: (to, from, next) => {
            if(from.path=='/trade'){
                next()
            }else{
                next(false)
            }
        } 
    },
    {   
        path:'/trade',
        component:() => import('@/pages/Trade'),
        meta:{
            show:true
        },
         beforeEnter: (to, from, next) => {
            if(from.path=='/shopcart' || from.path=='login'){
                next()
            }else{
                next(false)
            }
        } 
    },
    {   
        name:'addcartsuccess',
        path:'/addcartsuccess',
        component:() => import('@/pages/AddCartSuccess'),
        meta:{
            show:true
        }
    },
    {   
        name:'shopcart',
        path:'/shopcart',
        component:() => import('@/pages/ShopCart'),
        meta:{
            show:true
        }
    },
    {
        path:'/home',
        component:() => import('@/pages/Home'),
        meta:{
            show:true
        }
    },
    {
        path:'/login',
        component:() => import('@/pages/Login'),
        meta:{
            show:false
        }
    },
    {
        path:'/search/:keyword?',
        component:() => import('@/pages/Search'),
        meta:{
            show:true
        },
        name:'search'
    },
    {
        path:'/register',
        component:() => import('@/pages/Register'),
        meta:{
            show:false
        }
    },
    {
        path:'/detail/:skuId',
        component:() => import('@/pages/Detail'),
        meta:{
            show:true
        }
    },
    {
        path:'*',
        redirect:'/home'
    }
]