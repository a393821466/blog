<template>
  <div>
    <div class="table-search">
      <el-form ref="form" :inline="true" class="searchView">
        <div class="searchInput s">
          <el-form-item label="文章标题">
            <el-input
              v-model="ruleValue.title"
              type="text"
              class="filter-item"
              placeholder="请输入文章标题"
            />
          </el-form-item>
          <el-form-item label="精选">
            <el-select v-model="ruleValue.hot" placeholder="是否精选">
              <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="所属菜单">
            <el-select v-model="ruleValue.menus" placeholder="是否精选">
              <el-option
                v-for="item in menusList"
                :key="item.id"
                :label="item.subMenu"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="轮播图">
            <el-select v-model="ruleValue.banner" placeholder="是否属于轮播图">
              <el-option
                v-for="item in bannerList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="ruleValue.status" placeholder="选择状态">
              <el-option
                v-for="item in statusList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </div>
        <div class="searchButton s">
          <div class="searchButtonCrean" />
          <el-button
            class="search-btn"
            type="danger"
            style="margin-bottom:10px;"
            icon="el-icon-search"
            @click="articleSearch"
          >
            搜索
          </el-button>
          <el-button
            class="addUser-btn"
            type="primary"
            icon="el-icon-plus"
            @click="addArticle"
          >
            添加文章
          </el-button>
        </div>
      </el-form>
    </div>
    <div class="table-content">
      <el-table v-loading="listLoading" :data="article" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="图片:" style="width:45%">
                <div class="bannerImg">
                  <el-image
                    slot="reference"
                    style="width: 100%;"
                    :src="props.row.image"
                    lazy
                  />
                </div>
              </el-form-item>
              <el-form-item label="摘要:" style="width:50%">
                <span>{{ props.row.summary }}</span>
              </el-form-item>
              <el-form-item label="内容:" style="width:100%">
                <!-- eslint-disable-next-line vue/no-v-html-->
                <div class="content" v-html="props.row.content" />
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="标题" prop="title" width="150" />
        <el-table-column label="所属菜单" prop="menuId" :formatter="menu" />
        <el-table-column label="作者" prop="autor" />
        <el-table-column label="精选" prop="hot">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.hot === 1 ? '' : 'info'"
              disable-transitions
            >
              {{ scope.row.hot === 1 ? '是' : '否' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="轮播图" prop="showHome">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.showHome === 1 ? '' : 'warning'"
              disable-transitions
            >
              {{ scope.row.showHome === 1 ? '是' : '否' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="状态" prop="status">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.status === 1 ? 'success' : 'danger'"
              disable-transitions
            >
              {{ scope.row.status === 1 ? '启用' : '禁用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="浏览人数" prop="viewerNum" />
        <el-table-column
          label="创建日期"
          prop="create_time"
          :formatter="formDates"
        />
        <el-table-column fixed="right" label="操作" width="120">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleClick(scope.row)">
              修改
            </el-button>
            <el-button type="text" size="small" @click="delrticle(scope.row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="page">
        <el-pagination
          background
          layout="prev, pager, next"
          :page-size="articleList.pageSize"
          :total="articleList.totelSize"
          :current-page="articleList.page"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
    <add-article-box
      :article-dialog="addFlatData"
      @closeAddArticle="closeAddArticle"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import addArticleBox from './addArticle'
import { formartTime } from '@/utils'
import { setTimeout } from 'timers'
export default {
  layout: 'frame',
  name: 'Article',
  components: {
    addArticleBox
  },
  data() {
    return {
      ruleValue: {
        title: '',
        menus: 'all',
        banner: 'all',
        status: 'all',
        hot: 'all'
      },
      listLoading: false,
      bannerList: [
        {
          value: 'all',
          label: '全部'
        },
        {
          value: '1',
          label: '是'
        },
        {
          value: '2',
          label: '否'
        }
      ],
      statusList: [
        {
          value: 'all',
          label: '全部'
        },
        {
          value: '1',
          label: '启用'
        },
        {
          value: '2',
          label: '禁用'
        }
      ],
      options2: [
        {
          value: 'all',
          label: '全部'
        },
        {
          value: '1',
          label: '精选文章'
        },
        {
          value: '2',
          label: '非精选文章'
        }
      ],
      addFlatData: {
        flat: false,
        value: {},
        type: 'add'
      },
      page: 1,
      pageSize: 10,
      flat: true
    }
  },
  computed: {
    ...mapGetters({
      articleList: 'article/articleList',
      getMenu: 'menu/menuList'
    }),
    // eslint-disable-next-line vue/return-in-computed-property
    article() {
      if (this.articleList.data) {
        return this.articleList.data
      }
    },
    // eslint-disable-next-line vue/return-in-computed-property
    menusList() {
      if (this.getMenu.length >= 0) {
        let das = [
          {
            id: 'all',
            subMenu: '全部'
          }
        ]
        das = das.concat(this.getMenu)
        return das
      }
    }
  },
  created() {
    this.getMenuList()
    this.getArticleList({ page: this.page, pageSize: this.pageSize })
  },
  methods: {
    ...mapActions({
      getArticle: 'article/get',
      getMenuList: 'menu/get',
      delArticle: 'article/del'
    }),
    // 搜索
    articleSearch() {
      const that = this
      if (that.flat) {
        that.flat = false
        that.getArticleList(this.ruleValue)
        setTimeout(() => {
          that.flat = true
        }, 3000)
      } else {
        that.$message.error('手速过快')
      }
    },
    // 添加文章
    addArticle() {
      this.addFlatData.flat = true
      this.addFlatData.value = {}
      this.addFlatData.type = 'add'
    },
    // 修改文章
    handleClick(row) {
      this.addFlatData.flat = true
      this.addFlatData.value = row
      this.addFlatData.type = 'update'
    },
    // 查找文章
    getArticleList(query) {
      this.listLoading = true
      this.getArticle(query)
        .then(res => {
          this.listLoading = false
          if (!res.status) {
            this.$message.error(res.msg)
          }
        })
        .catch(err => {
          this.listLoading = false
          this.$message.error(err)
        })
    },
    // 分页
    handleCurrentChange(page) {
      let das = {
        title: this.ruleValue.title,
        banner: this.ruleValue.banner,
        status: this.ruleValue.status,
        hot: this.ruleValue.hot,
        page: page,
        pageSize: this.pageSize
      }
      this.getArticleList(das)
    },
    // 删除文章
    delrticle(row) {
      const that = this
      this.$confirm(`您确定要删除标题:(${row.title})文章？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          that.listLoading = true
          that
            .delArticle({ id: row.id })
            .then(res => {
              that.listLoading = false
              that.getArticleList({ page: this.page, pageSize: this.pageSize })
              if (!res.status) {
                that.$message.error(res.msg)
              }
            })
            .catch(err => {
              that.listLoading = false
              that.$message.error(err)
            })
        })
        .catch(() => {
          console.log('取消删除')
        })
    },
    // 格式化所属菜单
    menu(row) {
      const menu = this.getMenu
      if (menu.length > 0) {
        let menuName = menu.filter(item => {
          return item.id == row.menuId
        })
        return menuName[0].subMenu
      }
    },
    // 格式化时间
    formDates(row, column) {
      const date = row[column.property]
      if (date === undefined) {
        return ''
      }
      return formartTime(date)
    },
    // 关闭添加文章弹窗
    closeAddArticle(val) {
      this.addFlatData.flat = val
    }
  }
  // async asyncData() {
  //   const { data } = await axios.get(
  //     'http://66520.wang/mock/5d6f3c4e1934679bc56140bd/annount'
  //   )
  //   return { info: data.data }
  // }
}
</script>

<style lang="scss" scoped>
.searchInput {
  margin-top: 10px;
}
.page {
  margin: 20px 0;
}
.table-content {
  margin-top: 10px;
}
</style>
