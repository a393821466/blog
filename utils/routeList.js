export const nodeList = [
  {
    path: '/admin/home',
    name: 'home',
    meta: {
      requireAuth: false,
      title: '首页',
      icon: 'example',
      list: ['/admin/home']
    }
  },
  {
    path: '/admin/menu',
    name: 'admin',
    meta: {
      title: '数据管理',
      requireAuth: false,
      icon: 'example',
      list: ['/admin/menu', '/admin/article']
    },
    children: [
      {
        path: '/admin/menu',
        name: 'menu',
        meta: {
          title: '菜单管理',
          requireAuth: false
        }
      },
      {
        name: 'article',
        path: '/admin/article',
        meta: {
          title: '文章管理',
          requireAuth: false
        }
      }
    ]
  }
]
