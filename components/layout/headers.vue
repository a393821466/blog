<template>
  <div>
    <div class="header">
      <div class="header-center">
        <el-row>
          <el-col :span="14">
            <div class="grid-content bg-purple">
              <span class="header-logo">
                <nuxt-link :to="{ path: '/' }">
                  忘忧
                </nuxt-link>
              </span>
              <span class="header-txt">记录与生活、工作、学习相关的点滴。</span>
            </div>
          </el-col>
          <el-col :span="10">
            <div class="grid-content bg-purple-light">
              <el-menu
                :default-active="activeIndex"
                class="menu"
                mode="horizontal"
                @select="handleSelect"
              >
                <el-menu-item index="1">
                  <i class="el-icon-s-home" />
                  <span>首页</span>
                </el-menu-item>
                <el-submenu index="2">
                  <template slot="title">
                    <i class="el-icon-menu" />
                    <span>分类</span>
                  </template>
                  <el-menu-item index="2-1">
                    <i class="el-icon-menu" />
                    <span>分类1</span>
                  </el-menu-item>
                  <el-menu-item index="2-2">
                    <i class="el-icon-menu" />
                    <span>分类2</span>
                  </el-menu-item>
                  <el-menu-item index="2-3">
                    <i class="el-icon-menu" />
                    <span>分类3</span>
                  </el-menu-item>
                </el-submenu>
                <el-menu-item index="3">
                  <i class="el-icon-video-camera-solid" />
                  <span>视频</span>
                </el-menu-item>
                <el-menu-item index="4">
                  <i class="el-icon-s-promotion" />
                  <span>时间轴</span>
                </el-menu-item>
              </el-menu>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Headers',
  data() {
    return {
      activeIndex: '1'
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style lang="scss">
.header {
  padding: 8px;
  overflow: hidden;
  background: #fff;
  height: 52px;
  border-bottom: #eee 1px solid;
  .header-center {
    width: 1200px;
    margin: 0 auto;
    .header-logo {
      color: #1e90ff;
      font-size: 24px;
      text-align: left;
      a {
        color: #1890ff;
        text-decoration: none;
        background-color: transparent;
        outline: none;
        cursor: pointer;
        -webkit-transition: color 0.3s;
        transition: color 0.3s;
        -webkit-text-decoration-skip: objects;
        &:hover {
          text-decoration: none;
          outline: 0;
        }
      }
    }
    .menu {
      border-bottom: none;
      li {
        border-bottom: none;
        line-height: 40px;
        height: 40px;
        position: relative;
        &::before {
          content: '';
          width: 5px;
          height: 5px;
          position: absolute;
          right: 8px;
          top: 8px;
          border-radius: 50%;
          background: #999;
          z-index: 999;
        }
        &.is-active {
          &::before {
            background: #1890ff;
          }
        }
        .el-submenu__title {
          border-bottom: none;
          line-height: 40px;
          height: 40px;
        }
      }
    }
    .header-txt {
      font-size: 14px;
      color: #999;
      display: inline-block;
      padding-left: 5px;
    }
  }
}
@media (max-width: 639px) {
  .header-center {
    width: 100%;
  }
}
</style>
