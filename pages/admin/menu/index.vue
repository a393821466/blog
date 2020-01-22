<template>
  <div class="menu_table_content">
    <div class="table-search">
      <el-form ref="form" :inline="true" class="searchView">
        <div class="searchInput s">
          <el-form-item label="模块名称">
            <el-input
              v-model="ruleValue.masterMenu"
              type="text"
              class="filter-item"
              placeholder="请输入模块名称"
            />
          </el-form-item>
          <el-form-item label="菜单URL">
            <el-input
              v-model="ruleValue.url"
              type="text"
              class="filter-item"
              placeholder="请输入菜单URL"
            />
          </el-form-item>
          <el-form-item label="类型">
            <el-select v-model="ruleValue.type" placeholder="菜单类型">
              <el-option
                v-for="item in typeList"
                :key="item.id"
                :label="item.value"
                :value="item.id"
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
            @click="menuSearch"
          >
            搜索
          </el-button>
          <el-button
            class="addUser-btn"
            type="primary"
            icon="el-icon-plus"
            @click="addMenu"
          >
            添加路由
          </el-button>
        </div>
        <div class="table-content">
          <el-table
            :data="getMenus"
            style="width: 100%;margin-bottom: 20px;"
            row-key="id"
            :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
          >
            <el-table-column prop="masterMenu" label="模块名称" />
            <el-table-column prop="subMenu" label="菜单名称" />
            <el-table-column label="类型">
              <template slot-scope="scope">
                <el-tag
                  :type="scope.row.type === 1 ? '' : 'info'"
                  disable-transitions
                >
                  {{ scope.row.type === 1 ? '模块' : '菜单' }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="url" label="URL地址" />
            <el-table-column prop="sort" label="排序" sortable />
            <el-table-column prop="description" label="详情" />
            <el-table-column prop="icon" label="图标" />
            <el-table-column
              prop="create_time"
              label="创建时间"
              :formatter="formDates"
            />
            <el-table-column fixed="right" label="操作">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  size="small"
                  @click="handleClick(scope.row)"
                >
                  修改
                </el-button>
                <el-button type="text" size="small" @click="delMenu(scope.row)">
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-form>
    </div>
    <menu-dialog :menu-dialog="dialogData" @closeMenuDialog="closeMenuDialog" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import menuDialog from './addMenu'
import { formartTime } from '@/utils'
export default {
  layout: 'frame',
  name: 'About',
  components: {
    menuDialog
  },
  data() {
    return {
      ruleValue: {
        masterMenu: '',
        type: 'all',
        url: ''
      },
      typeList: [
        {
          id: 'all',
          value: '全部'
        },
        {
          id: '1',
          value: '模块'
        },
        {
          id: '2',
          value: '菜单'
        }
      ],
      listLoading: false,
      flat: true,
      dialogData: {
        type: 'add',
        value: {},
        flat: false
      }
    }
  },
  computed: {
    ...mapGetters({
      getMenu: 'menu/allMenu'
    }),
    getMenus() {
      return this.getMenu.length > 0 ? this.getMenu : []
    }
  },
  mounted() {
    this.getAllMenu()
  },
  methods: {
    ...mapActions({
      getMenuList: 'menu/likeGet'
    }),
    // 搜索菜单
    menuSearch() {
      const that = this
      if (that.flat) {
        that.flat = false
        that.getAllMenu(this.ruleValue)
        setTimeout(() => {
          that.flat = true
        }, 3000)
      } else {
        that.$message.error('手速过快')
      }
    },
    // 添加菜单
    addMenu() {
      this.dialogData.flat = true
      this.dialogData.value = {}
      this.dialogData.type = 'add'
    },
    // 修改菜单
    handleClick(row) {
      console.log(row)
    },
    // 删除菜单
    delMenu(row) {
      console.log(row)
    },
    // 获取菜单列表
    getAllMenu(query) {
      this.listLoading = true
      this.getMenuList(query)
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
    // 格式化时间
    formDates(row, column) {
      const date = row[column.property]
      if (date === undefined) {
        return ''
      }
      return formartTime(date)
    },
    // 关闭对话框
    closeMenuDialog(val) {
      this.dialogData.flat = val
    }
  }
}
</script>

<style lang="scss">
.searchInput {
  margin-top: 10px;
}
</style>
