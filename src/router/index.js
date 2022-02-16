import Vue from 'vue'
import Router from 'vue-router'
// import { asyncRoutes } from './routes'

Vue.use(Router)

/**
 * hidden: true                  如果设置为 true，该项菜单将不会显示在菜单栏中(默认为 false)
 * meta : {
    title: 'title'               菜单名
    icon: 'icon-name'            图标名
    fixed: true                  如果设置为 true，该项 tag 将一直存在 tag 栏中(默认为 false)
  }
 * */
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
export const constantRoutes = [
    {
        path: '/',
        name: 'gameIndex',
        component: () =>
            import ('../views/gameIndex'),
        meta: { title: 'Home-gameList' }
      },
      {
        path: '/gameList',
        name: 'gameList',
        component: () =>
            import ('../views/gameList'),
        meta: { title: 'gameList-GameWay' }
      },
      {
        path: '/gameDetail',
        name: 'gameDetail',
        component: () =>
            import ('../views/gameDetail'),
        meta: { title: 'gameDetail-GameWay' }
      },
      {
        path: '/gameNews',
        name: 'gameNews',
        component: () =>
            import ('../views/gameNews'),
        meta: { title: 'news-GameWay' }
      },
      {
        path: '/gameContents',
        name: 'gameContents',
        component: () =>
            import ('../views/gameContents'),
        meta: { title: 'contents-GameWay' }
      },
      {
        path: '/articledetails',
        name: 'articledetails',
        component: () =>
            import ('../views/articledetails'),
        meta: { title: 'Articledetails-GameWay' }
      },
      {
        path: '/calendardetails',
        name: 'calendardetails',
        component: () =>
            import ('../views/calendarDetail'),
        meta: { title: 'calendarDetail-GameWay' }
      },
      {
        path: '/about',
        name: 'About',
        component: () =>
            import ('../views/about'),
        meta: { title: 'About-GameWay' }
      },
      {
        path: '/signIn',
        name: 'signIn',
        component: () =>
            import ('../views/signIn'),
        meta: { title: 'signIn-GameWay' }
      },
      {
        path: '/create',
        name: 'Create',
        // redirect: '/create/user',
        meta: { title: 'create-GameWay' },
        component: () =>
        import ('../views/create/index'),
        // children:[
        //   {
        //     path: 'user',
        //     component: () =>
        //       import ('../views/create'),
        //     name: 'user',
        //     meta: {
        //       title: 'create-user-GameWay'
        //     }
            
        //   }
        // ]
      },
      {
        path: '/create/contents',
        name: 'Create-contents',
        // redirect: '/create/user',
        meta: { title: 'create-GameWay' },
        component: () =>
        import ('../views/create/contents'),
      }
]
const routes = [...constantRoutes]

export default new Router({
    linkActiveClass:'active',
    linkExactActiveClass:'active',
    // 跳转返回顶部
    scrollBehavior(to,from,saveTop){
      if(saveTop){
        return saveTop;
      }else{
        return {x:0,y:0}
      }
    },
    // mode: 'history',
    // base: '/',
    routes
})