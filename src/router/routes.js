import Layout from '../layout'

/**
 * hidden: true                  如果设置为 true，该项菜单将不会显示在菜单栏中(默认为 false)
 * meta : {
    title: 'title'               菜单名
    icon: 'icon-name'            图标名
    fixed: true                  如果设置为 true，该项 tag 将一直存在 tag 栏中(默认为 false)
  }
 * */

export const asyncRoutes = [
    {
        path: '/game-manage',
        name: 'GameManage',
        component: Layout,
        redirect: '/game-manage/game-manage-list',
        meta: {
            title: '游戏管理',
            icon: 'vue-dsn-icon-zujian' //el-icon-s-check
        },
        children: [{
            path: 'game-manage-list',
            name: 'GameBannerList',
            component: () =>
                import ('../views/game-manage/index'),
            meta: {
                title: '游戏管理列表'
            }
        }, ]
    },
    {
        path: '/error-page',
        name: 'ErrorPage',
        component: Layout,
        redirect: '/error-page/page-401',
        meta: {
            title: '错误页面',
            icon: 'vue-dsn-icon-bug'
        },
        children: [{
                path: 'page-401',
                name: 'Page401',
                component: () =>
                    import ('../views/error-page/401'),
                meta: {
                    title: '401页面'
                }
            },
            {
                path: 'page-404',
                name: 'Page404',
                component: () =>
                    import ('../views/error-page/404'),
                meta: {
                    title: '404页面'
                }
            }
        ]
    }
]