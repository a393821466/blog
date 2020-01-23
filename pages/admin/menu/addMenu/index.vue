<template>
  <div class="dialogMenu">
    <el-dialog
      ref="menuDialog"
      :title="dialogTitle"
      :visible.sync="menuDialog.flat"
      :before-close="handleClose"
    >
      <el-form ref="ruleForm" :model="ruleVlue">
        <el-form-item label="类型" :label-width="formLabelWidth" prop="menu">
          <el-select
            v-model="ruleVlue.type"
            placeholder="请选择"
            :disabled="dialogType == 'update'"
            @change="hanldSelect(ruleVlue.type)"
          >
            <el-option
              v-for="item in getMenu"
              :key="item.id"
              :label="item.value"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          v-show="menuType == 1"
          label="模块名称"
          :label-width="formLabelWidth"
          prop="masterMenu"
        >
          <el-input
            v-model="ruleVlue.masterMenu"
            auto-complete="off"
            :disabled="dialogType == 'update'"
            placeholder="输入模块名称..."
          />
        </el-form-item>
        <el-form-item
          label="菜单名称"
          :label-width="formLabelWidth"
          prop="subMenu"
        >
          <el-input
            v-model="ruleVlue.subMenu"
            auto-complete="off"
            placeholder="输入菜单名称..."
          />
        </el-form-item>
        <el-form-item label="URL地址" :label-width="formLabelWidth" prop="url">
          <el-input
            v-model="ruleVlue.url"
            auto-complete="off"
            placeholder="输入URL地址..."
          />
        </el-form-item>
        <el-form-item
          label="选择模块"
          :label-width="formLabelWidth"
          prop="masterId"
        >
          <el-select v-model="ruleVlue.masterId" placeholder="请选择">
            <el-option
              v-for="item in getModuleMenu"
              :key="item.id"
              :label="item.masterMenu"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          v-show="menuType == 1"
          label="是否菜单"
          :label-width="formLabelWidth"
        >
          <el-radio
            v-for="(item, idx) in isMenu"
            :key="idx"
            v-model="ruleVlue.isMenu"
            :label="item.id"
            :disabled="dialogType == 'update'"
          >
            {{ item.value }}
          </el-radio>
        </el-form-item>
        <el-form-item label="排序" :label-width="formLabelWidth" prop="sort">
          <el-input
            v-model="ruleVlue.description"
            type="textarea"
            :rows="2"
            placeholder="输入详情..."
          />
        </el-form-item>
        <el-form-item label="图标" :label-width="formLabelWidth" prop="icon">
          <el-input
            v-model="ruleVlue.icon"
            auto-complete="off"
            placeholder="输入图标..."
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">
          取 消
        </el-button>
        <el-button
          type="primary"
          :loading="loading"
          @click.native.prevent="onConfirm"
        >
          确 定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'AddMenu',
  props: {
    menuDialog: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      formLabelWidth: '80px',
      dialogTitle: '-',
      dialogType: '',
      menuType: 1,
      ruleVlue: {
        masterMenu: '',
        subMenu: '',
        type: 1,
        url: '',
        sort: 100,
        masterId: 0,
        description: '',
        isMenu: 2,
        icon: ''
      },
      getMenu: [
        {
          id: 1,
          value: '模块'
        },
        {
          id: 2,
          value: '菜单'
        }
      ],
      isMenu: [
        {
          id: 1,
          value: '是'
        },
        {
          id: 2,
          value: '否'
        }
      ],
      loading: false
    }
  },
  computed: {
    ...mapGetters({
      getModuleMenu: 'menu/moduleMenu'
    })
  },
  watch: {
    menuDialog: {
      handler(n) {
        this.dialogTitle = n.type == 'add' ? '添加路由' : '修改路由'
        this.dialogType = n.type
        if (n.type == 'update') {
          this.ruleVlue.id = n.value.id
          this.ruleVlue.masterMenu = n.value.masterMenu
          this.ruleVlue.subMenu = n.value.subMenu
          this.ruleVlue.type = n.value.type
          this.ruleVlue.url = n.value.url
          this.ruleVlue.sort = n.value.sort
          this.ruleVlue.masterId = n.value.masterId
          this.ruleVlue.description = n.value.description
          this.ruleVlue.icon = n.value.icon
          this.menuType = n.value.type
        } else {
          this.clearInput()
        }
        if (n && this.getModuleMenu.length <= 0) {
          this.getMenuList()
        }
      },
      deep: true
    }
  },
  methods: {
    ...mapActions({
      getMenuList: 'menu/getIsMenu',
      addMenu: 'menu/add',
      updateMenu: 'menu/update',
      getlikeMenu: 'menu/likeGet'
    }),
    // 复位
    clearInput() {
      this.ruleVlue.masterMenu = ''
      this.ruleVlue.subMenu = ''
      this.ruleVlue.type = 1
      this.ruleVlue.url = ''
      this.ruleVlue.sort = 100
      this.ruleVlue.masterId = 0
      this.ruleVlue.description = ''
      this.ruleVlue.isMenu = 2
      this.ruleVlue.icon = ''
    },
    // 关闭对话框
    handleClose() {
      this.$emit('closeMenuDialog', false)
    },
    // 选择类型
    hanldSelect(e) {
      this.menuType = e
    },
    // 提交
    onConfirm() {
      if (this.ruleVlue.masterId === '') {
        this.$message.error('模块还未选择')
        return
      }
      this.sendRequest(this.ruleVlue)
    },
    // 发送请求
    sendRequest(query) {
      const that = this
      this.loading = true
      if (this.menuDialog.type == 'add') {
        that
          .addMenu(query)
          .then(res => {
            if (res.status) {
              that.$message.success('添加成功')
              that.loading = false
              that.clearInput()
              that.handleClose()
              that.getAllMenu()
            }
          })
          .catch(err => {
            that.loading = false
            that.$message.error(err)
          })
      } else {
        that
          .updateMenu(query)
          .then(res => {
            if (res.status) {
              that.$message.success('更新成功')
              that.loading = false
              that.handleClose()
              that.getAllMenu()
            }
          })
          .catch(err => {
            that.loading = false
            that.$message.error(err)
          })
      }
    },
    // 获取菜单列表
    getAllMenu(query) {
      this.listLoading = true
      this.getlikeMenu(query)
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
    }
  }
}
</script>

<style lang="scss">
.dialogMenu {
  .el-dialog {
    width: 800px;
  }
}
@media (max-width: 639px) {
  .dialogMenu {
    .el-dialog {
      width: 90%;
      margin-bottom: 10vh;
    }
  }
}
</style>
