<template>
  <div>
    <el-container class="main" :style="{ height: tabHeight + 'px' }">
      <el-header class="main-header" :style="{ backgroundColor: navColor }">
        <div class="logo">
          <h3>后台管理系统</h3>
        </div>
        <el-dropdown trigger="click">
          <span class="el-head-img">
            <el-avatar
              shape="square"
              src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
              size="medium"
            />
            <span class="el-dropdown-link" style="line-height:60px;">
              您好,{{ info.nicename
              }}<i class="el-icon-arrow-down el-icon--right" />
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-user-solid">
                个人设置
              </el-dropdown-item>
              <el-dropdown-item icon="el-icon-s-unfold" @click.native="logouts">
                登出
              </el-dropdown-item>
            </el-dropdown-menu>
          </span>
        </el-dropdown>
      </el-header>
      <el-container class="aside">
        <el-aside :width="tabWidth + 'px'">
          <el-menu
            router
            :default-active="defaultPath"
            :text-color="textColor"
            :active-text-color="activeColor"
            class="el-menu-vertical-demo"
            @select="handleSelect"
          >
            <template v-for="(item, index) in nodeList">
              <el-menu-item
                v-if="!item.children"
                :key="index"
                :index="item.path + ''"
                class="submenu-title-noDropdown"
              >
                <span>{{ item.meta.title }}</span>
              </el-menu-item>
              <el-submenu v-else :key="item.name" :index="item.path">
                <template slot="title">
                  <i :class="item.meta.icon" />
                  <span>{{ item.meta.title }}</span>
                </template>
                <el-menu-item-group v-if="item.children">
                  <el-menu-item
                    v-for="(node, idx) in item.children"
                    :key="idx"
                    :index="node.path"
                  >
                    {{ node.meta.title }}
                  </el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </template>
          </el-menu>
        </el-aside>
        <div class="body-main">
          <div class="breadcrumbs">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item>
                您所在位置:
              </el-breadcrumb-item>
              <!-- <el-breadcrumb-item
                v-for="(item, index) in breadArr"
                :key="index"
                :to="{ path: item.path }"
              >
                {{ item.meta.title }}
              </el-breadcrumb-item> -->
              <el-breadcrumb-item
                v-for="(item, index) in breadcrumbList"
                :key="index"
                :to="{ path: item.path }"
                @click.native="goPath(item)"
              >
                {{ item.meta.title }}
              </el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <el-main :style="{ height: tabHeight - 110 + 'px' }">
            <nuxt />
          </el-main>
        </div>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// import qs from 'qs'
import { nodeList } from '@/utils/routeList'
import { setSession, getSession, clearALLsession } from '@/utils/storage'
import { mapActions, mapGetters } from 'vuex'
export default {
  layout: 'frame',
  name: 'Frame',
  middleware: 'auth',
  data() {
    return {
      tabWidth: 200,
      tabHeight: 1000,
      // bgColor: '#303133',
      navColor: '#409EFF',
      textColor: '#666',
      activeColor: '#409EFF',
      levelList: '',
      defaultPath: '/admin/home',
      breadList: [],
      breadArr: []
      // allRouters: []
    }
  },
  computed: {
    ...mapGetters({
      userInfo: 'user/userInfo'
    }),
    nodeList() {
      return nodeList
    },
    info() {
      return this.userInfo
    },
    breadcrumbList() {
      let breadcrumbs = []
      let r = this.nodeList
      this.breadList.map(item => {
        for (let i = 0; i < r.length; i++) {
          if (item === r[i].path) {
            breadcrumbs.push(r[i])
            if (r[i].children) {
              r = r[i].children
            }
            break
          }
        }
      })
      return breadcrumbs
    }
  },
  watch: {
    $route(to) {
      let getRoutePath = getSession('breadLocation')
      let arrPath = new Array(to.path)
      this.handleSelect(to.path, !getRoutePath ? arrPath : getRoutePath)
    }
  },
  mounted() {
    let getRoutePath = getSession('breadLocation')
    const getUser = getSession('userInfo')
    this.defaultPath = this.$route.path
    this.$router.push({ path: this.$route.path })
    const dH = window.screen.availHeight - 100
    if (dH < 700) {
      this.tabHeight = 700
    } else {
      this.tabHeight = dH
    }
    const normalRoute = !getRoutePath
      ? new Array(this.defaultPath)
      : getRoutePath
    this.handleSelect(normalRoute[normalRoute.length - 1], normalRoute)
    this.getUserInfo({ id: getUser.id })
  },
  methods: {
    ...mapActions({
      logout: 'common/logout',
      getUserInfo: 'user/userInfos'
    }),
    logouts() {
      const that = this
      this.$confirm(`您确定登出？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          that
            .logout()
            .then(res => {
              if (res.status) {
                window.location.replace('/logsin')
                clearALLsession()
              }
            })
            .catch(err => {
              that.$message.error(err)
            })
        })
        .catch(() => {
          console.log('取消登出')
        })
    },
    goPath(item) {
      if (!item.children) {
        return
      }
      this.handleSelect(item.path, new Array(item.path, item.path))
    },
    handChange() {
      this.$emit('hand-change', this.breadcrumbList)
    },
    handleSelect(key, indexPath) {
      setSession('breadLocation', indexPath)
      this.breadList = indexPath
      this.defaultPath = key
      // this.breadArr = []
      // this.allRouters.forEach(item => {
      //   if (item.meta.list.indexOf(key) > -1) {
      //     this.breadArr[0] = item
      //     if (item.children) {
      //       this.breadArr[0].children = item.children.map(items => {
      //         if (items.path == key) {
      //           items.checks = 1
      //         } else {
      //           items.checks = 0
      //         }
      //         return items
      //       })
      //     }
      //   }
      // })
    }
  }
}
</script>

<style lang="scss">
@import '../assets/css/emoji.css'; // 导入精灵图样式
</style>
<style scoped lang="scss">
$header-height: 50px;
$background-color: rgb(253, 253, 253);
$color: #dddddd;
* {
  text-decoration-line: none;
}
.main {
  min-width: 800px;
  overflow: hidden;

  .main-header {
    background-color: $background-color;
    color: $color;
    border-bottom: 1px solid #ddd;
    line-height: 60px;
    .logo {
      color: #fff;
      float: left;
      font-size: 23px;
    }
    .el-dropdown {
      cursor: pointer;
      float: right;
    }
    .el-dropdown-link {
      color: #f8f8f8;
    }
  }
}
.aside {
  overflow: visible;
  height: 100%;
  background-color: $background-color;
  color: $color;
  aside {
    overflow: visible;
    height: 100%;
    background-color: $background-color;
    color: $color;
    border-right: 1px solid #ddd;
    .menu {
      width: 100%;
      border-right: 0;
    }
    .el-menu {
      border-right: none;
    }
    .el-menu-item {
      min-width: 100px;
    }
  }
}
.el-avatar {
  float: left;
  margin-top: 10px;
  margin-right: 5px;
  &:focus {
    outline: none;
  }
}
.body-main {
  width: 100%;
  .breadcrumbs {
    padding: 16px;
    border-bottom: 1px solid #eee;
  }
  .el-main {
    padding: 5px 20px;
  }
}
</style>
