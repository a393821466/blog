<template>
  <div class="dialogArticle">
    <el-dialog
      ref="lookArticle"
      title="文章内容"
      :destroy-on-close="true"
      :visible.sync="lookArticleDialog.flat"
      :before-close="handleClose"
    >
      <div class="lookContent">
        <div class="article-container public_row">
          <mavon-editor
            v-model="lookArticleDialog.value.content"
            style="height: 100%"
            :ishljs="true"
            :default-open="'preview'"
            :editable="false"
            :subfield="false"
            :code-style="codeStyle"
            :toolbars-flag="false"
          />
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'LookArticle',
  props: {
    lookArticleDialog: {
      type: [Object, Array],
      required: true
    }
  },
  data() {
    return {
      codeStyle: 'vs2015'
    }
  },
  watch: {
    lookArticleDialog(n) {
      console.log(n)
    }
  },
  methods: {
    // 关闭查看框
    handleClose() {
      this.$emit('lookArticleDialog', false)
    }
  }
}
</script>

<style lang="scss">
.dialogArticle {
  .markdown-body pre {
    padding: 0;
  }
  .article-container {
    box-sizing: border-box;
    flex: 1;
    overflow: hidden;
    background: #fff;
    padding: 10px;
  }
  .el-dialog {
    width: 800px;
  }
}
</style>
