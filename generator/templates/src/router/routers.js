import Layout from '@/layout/layout'

// 无权限公用路由表
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/redirect')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login-page" */ '@/views/login/login'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "404-page" */ '@/views/error-pages/error404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import(/* webpackChunkName: "dashboard-page" */ '@/views/dashboard/dashboard'),
      meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
    }]
  },
  {
    path: '/documentation',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Documentation',
        component: () => import(/* webpackChunkName: "documentation-page" */ '@/views/documentation/documentation'),
        meta: { title: 'Documentation', icon: 'documentation', affix: true }
      }
    ]
  },
  {
    path: '/nested-groups',
    component: Layout,
    name: 'NestedGroups',
    redirect: '/nested-groups/group1',
    meta: {
      title: 'NestedGroups',
      icon: 'component',
      groupSet: ['Group1', 'Group2']
    },
    children: [
      {
        path: 'group1',
        name: 'Group1',
        component: () => import(/* webpackChunkName: "nested-groups-group1-page" */'@/views/nested/menu1/index'),
        meta: { title: 'Group1', group: 'Group1', groupSet: ['Group1-1'] },
        redirect: '/nested-groups/group1/group1-1',
        children: [
          {
            path: 'group1-1',
            name: 'Group1-1',
            component: () => import(/* webpackChunkName: "nested-groups-menu1-1-page" */'@/views/nested/menu1/menu1-1'),
            meta: { title: 'Group1-1', group: 'Group1-1' }
          },
          {
            path: 'group1-2',
            name: 'Group1-2',
            component: () => import(/* webpackChunkName: "nested-groups-menu1-2-page" */'@/views/nested/menu1/menu1-2'),
            meta: { title: 'Group1-2', group: 'Group1-1', groupSet: ['Group1-2-1', 'Group1-2-2'] },
            redirect: '/nested-groups/group1/group1-2/group1-2-1',
            children: [
              {
                path: 'group1-2-1',
                name: 'Group1-2-1',
                component: () => import(/* webpackChunkName: "nested-groups-menu1-2-1-page" */'@/views/nested/menu1/menu1-2/menu1-2-1'),
                meta: { title: 'Group1-2-1', group: 'Group1-2-1' }
              },
              {
                path: 'group1-2-2',
                name: 'Group1-2-2',
                component: () => import(/* webpackChunkName: "nested-groups-menu1-2-2-page" */'@/views/nested/menu1/menu1-2/menu1-2-2'),
                meta: { title: 'Group1-2-2', group: 'Group1-2-2' }
              }
            ]
          },
          {
            path: 'group1-3',
            name: 'Group1-3',
            component: () => import(/* webpackChunkName: "nested-groups-menu1-3-page" */'@/views/nested/menu1/menu1-3'),
            meta: { title: 'Group1-3', group: 'Group1-1' }
          }
        ]
      },
      {
        path: 'group2',
        name: 'Group2',
        component: () => import(/* webpackChunkName: "nested-groups-group2-page" */'@/views/nested/menu2/index'),
        meta: { title: 'group2', group: 'Group2' }
      }
    ]
  },
  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        name: 'Menu1',
        component: () => import(/* webpackChunkName: "nested-menu1-page" */'@/views/nested/menu1/index'),
        meta: { title: 'Menu1' },
        redirect: '/nested/menu1/menu1-1',
        children: [
          {
            path: 'menu1-1',
            name: 'Menu1-1',
            component: () => import(/* webpackChunkName: "nested-menu1-1-page" */'@/views/nested/menu1/menu1-1'),
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            name: 'Menu1-2',
            component: () => import(/* webpackChunkName: "nested-menu1-2-page" */'@/views/nested/menu1/menu1-2'),
            meta: { title: 'Menu1-2' },
            redirect: '/nested/menu1/menu1-2/menu1-2-1',
            children: [
              {
                path: 'menu1-2-1',
                name: 'Menu1-2-1',
                component: () => import(/* webpackChunkName: "nested-menu1-2-1-page" */'@/views/nested/menu1/menu1-2/menu1-2-1'),
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                name: 'Menu1-2-2',
                component: () => import(/* webpackChunkName: "nested-menu1-2-2-page" */'@/views/nested/menu1/menu1-2/menu1-2-2'),
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            name: 'Menu1-3',
            component: () => import(/* webpackChunkName: "nested-menu1-3-page" */'@/views/nested/menu1/menu1-3'),
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        name: 'Menu2',
        component: () => import(/* webpackChunkName: "nested-menu2-page" */'@/views/nested/menu2/index'),
        meta: { title: 'menu2' }
      }
    ]
  },
  {
    path: '/external-link',
    component: Layout,
    children: [
      {
        path: 'https://cn.vuejs.org/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

// 需要权限判断的动态路由表(异步挂载)
export const asyncRouters = []
