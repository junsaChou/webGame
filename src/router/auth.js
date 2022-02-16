import router from './index'
// import { getToken, getUserInfo } from '../utils/cookie'
// 白名单列表
// const whiteList = ['/login']

router.beforeEach((to, from, next) => {
    if ( to.query.address ){
        document.title = to.query.address +' - '+ document.title;
    }else if(to.query.title){
        document.title = to.query.title +' - '+ document.title;
    }else{
        document.title = 'GameWay';
    }
    // if( to.name === 'gameDetail' ){
    //     if ( to.query.address ){
    //         document.title = to.query.address +' - '+ document.title;
    //     }
    // }else{
    //     document.title = 'GameWay';
    // }
    next()

})