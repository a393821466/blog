export const nodeList = [
  {
    path: '/admin/home',
    name: 'home',
    meta: {
      requireAuth: false,
      title: '概括',
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
      },
      {
        name: 'comment',
        path: '/admin/comment',
        meta: {
          title: '评论管理',
          requireAuth: false
        }
      }
    ]
  },
  {
    path: '/admin/setting',
    name: 'system',
    meta: {
      title: '全局管理',
      requireAuth: false,
      icon: 'example',
      list: ['/admin/setting']
    },
    children: [
      {
        path: '/admin/setting',
        name: 'setting',
        meta: {
          title: '基础配置',
          requireAuth: false
        }
      }
    ]
  }
]
