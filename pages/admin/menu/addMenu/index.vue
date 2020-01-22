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
            v-model="ruleVlue.menus"
            placeholder="请选择"
            @change="hanldSelect(ruleVlue.menus)"
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
      menuType: 1,
      ruleVlue: {
        masterMenu: '',
        subMenu: '',
        menus: 1,
        url: '',
        sort: 100,
        description: '',
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
      loading: false
    }
  },
  watch: {
    menuDialog: {
      handler(n) {
        this.dialogTitle = n.type == 'add' ? '添加路由' : '修改路由'
        if (n.type == 'update') {
          console.log('修改')
        }
      },
      deep: true
    }
  },
  methods: {
    // 关闭对话框
    handleClose() {
      this.$emit('closeMenuDialog', false)
    },
    // 选择类型
    hanldSelect(e) {
      this.menuType = e
    },
    onConfirm() {
      console.log('提交')
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
