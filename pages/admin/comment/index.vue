<template>
  <div class="comment_table_content">
    <div class="table-search">
      <el-form ref="form" :inline="true" class="searchView">
        <div class="searchInput s">
          <el-form-item label="文章">
            <el-select v-model="ruleValue.articleId" placeholder="文章标题">
              <el-option
                v-for="item in article"
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
          <el-button
            class="search-btn"
            type="danger"
            style="margin-bottom:10px;"
            icon="el-icon-search"
            @click="commentSearch('search')"
          >
            搜索
          </el-button>
        </div>
      </el-form>
      <div class="table-content">
        <el-table
          v-loading="listLoading"
          :data="commentValue"
          style="width: 100%"
        >
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form
                label-position="left"
                inline
                class="demo-table-expand article_text"
              >
                <el-form-item
                  label="内容:"
                  style="width:90%;background:#f8f8f8;border:dashed 1px #eee;border-radius:5px;"
                >
                  <!-- eslint-disable-next-line vue/no-v-html -->
                  <div
                    class="bannerImg public_row"
                    v-html="props.row.comment_text"
                  />
                </el-form-item>
                <el-form-item
                  v-show="openReply == props.row.id"
                  label="回复:"
                  style="width:90%;"
                >
                  <el-input
                    id="textpanel"
                    v-model="content"
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 4 }"
                    class="comment-input"
                    placeholder="请输入内容"
                  />
                  <div class="opration">
                    <div class="emoji-panel-btn" @click="showEmojiPanel">
                      <!-- eslint-disable-next-line vue/html-self-closing -->
                      <img src="../../../static/images/face_logo.png" />
                    </div>
                    <span @click="onClickCode">code</span>
                    <div
                      class="comment-send-btn comment-send-btn-bounce"
                      @click="saveComment(props.row)"
                    >
                      回复
                    </div>
                    <emoji-panel
                      v-if="isShowEmojiPanel"
                      @emojiClick="appendEmoji"
                    />
                  </div>
                </el-form-item>
                <el-form-item label="操作:" style="width:90%;">
                  <el-button
                    v-show="props.row.reply_id == 0"
                    type="primary"
                    title="回复"
                    icon="el-icon-edit"
                    circle
                    @click="replyMsg(props.row)"
                  />
                  <el-button
                    type="danger"
                    title="删除"
                    icon="el-icon-delete"
                    circle
                    @click.native="del(props.row)"
                  />
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="名称" prop="comment_name" width="150" />
          <el-table-column label="QQ" prop="comment_qq" />
          <el-table-column label="邮箱" prop="comment_email" />
          <el-table-column label="状态" prop="status">
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.status === 1 ? 'success' : 'danger'"
                disable-transitions
              >
                {{ scope.row.status === 1 ? '通过' : '待审核' }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="评论/回复" prop="reply_id">
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.reply_id === 0 ? '' : 'info'"
                disable-transitions
              >
                {{ scope.row.reply_id === 0 ? '评论' : '回复' }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="设备" prop="device" />
          <el-table-column
            label="日期"
            prop="create_time"
            :formatter="formDates"
          />
          <el-table-column fixed="right" label="操作">
            <template v-if="scope.row.status != 1" slot-scope="scope">
              <el-button type="text" size="small" @click="byComment(scope.row)">
                通过
              </el-button>
              <el-button
                type="text"
                size="small"
                @click="refuseClick(scope.row)"
              >
                拒绝
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="page">
          <el-pagination
            background
            layout="prev, pager, next"
            :page-size="commentCount.pageSize"
            :total="commentCount.totelSize"
            :current-page="commentCount.page"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { formartTime } from '@/utils'
import EmojiPanel from '@/components/emoji'
import { filterHtml } from '@/utils'
export default {
  layout: 'frame',
  name: 'Comment',
  components: {
    EmojiPanel
  },
  data() {
    return {
      listLoading: false,
      isShowEmojiPanel: false,
      openReply: 0,
      content: '',
      ruleValue: {
        articleId: 'all',
        status: 2
      },
      articleList: [
        {
          value: 'all',
          label: '全部'
        },
        {
          value: 1,
          label: '测试文章1'
        },
        {
          value: 2,
          label: '测试文章2'
        }
      ],
      statusList: [
        {
          value: 2,
          label: '未审核'
        },
        {
          value: 1,
          label: '已审核'
        }
      ],
      comments: '',
      flat: true,
      page: 1,
      pageSize: 8
    }
  },
  computed: {
    ...mapGetters({
      articleTitle: 'article/articleList',
      commentList: 'comment/commentList'
    }),
    commentValue() {
      const comments = this.commentList
      if (comments.status) {
        let ret = comments.value.data
        ret.map(item => (item.openReply = false))
        return ret
      } else {
        return []
      }
    },
    commentCount() {
      const pagesStatus = this.commentList
      if (pagesStatus.status) {
        return pagesStatus.value
      } else {
        return []
      }
    },
    article() {
      const articleList = this.articleTitle
      if (articleList.totelSize > 0) {
        let arr = [
          {
            value: 'all',
            label: '全部'
          }
        ]
        for (let i = 0; i < articleList.data.length; i++) {
          let val = articleList.data[i]
          let das = {
            value: val.id,
            label:
              val.title.length > 8 ? val.title.slice(0, 16) + '...' : val.title
          }
          arr.push(das)
        }
        return arr
      } else {
        return []
      }
    }
  },
  mounted() {
    this.commentSearch('')
  },
  methods: {
    ...mapActions({
      getArticle: 'article/get',
      getComment: 'comment/getComment',
      updateComment: 'comment/updateComment',
      delComment: 'comment/delComment',
      backstageReply: 'comment/backstageReply'
    }),
    // 点击回复
    saveComment(row) {
      this.comments = this.content
        .replace(/:.*?:/g, this.emoji)
        .replace(/\[code]/g, '<pre class="hl">')
        .replace(/\[\/code]/g, '</pre>')
        .replace(/[|]*\n/, '')
        .replace(/&nbsp;/gi, '')
      // this.comments.replace(/\[code]/g, '<pre><code>')
      // this.comments.replace(/\[\/code]/g, '</code></pre>')
      const das = {
        articleId: row.article_id,
        replyId: row.id,
        commentText: this.comments
      }
      const text = filterHtml(das.commentText)
      if (text.length < 10) {
        this.$message.error('内容不能少于10个字符')
        return
      }
      this.backstageReply(das)
        .then(res => {
          if (res.status) {
            this.$message.success('回复成功')
            this.content = ''
            this.comments = ''
            this.openReply = 0
            this.isShowEmojiPanel = false
            return
          }
          this.$message.error(res.msg)
        })
        .catch(err => {
          this.$message.error(err)
        })
    },
    // 显示或隐藏表情
    showEmojiPanel() {
      this.isShowEmojiPanel = !this.isShowEmojiPanel
    },
    // 组装表情
    emoji(word) {
      // 生成html
      const type = word.substring(1, word.length - 1)
      return `<span class="emoji-item-common emoji-${type} emoji-size-small" ></span>`
    },
    // 连接表情与文本
    appendEmoji(text) {
      const el = document.getElementById('textpanel')
      this.content = el.value + ':' + text + ':'
    },
    // 导入代码
    onClickCode() {
      const el = document.getElementById('textpanel')
      this.content = el.value + '\n' + '[code]' + '\n\n' + '[/code]'
    },
    replyMsg(row) {
      if (this.openReply == row.id) {
        this.openReply = 0
      } else {
        this.openReply = row.id
      }
      this.content = ''
      this.comments = ''
      this.isShowEmojiPanel = false
      // this.openReply = !this.openReply
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
    // 搜索评论
    commentSearch(n) {
      let das = {
        id: this.ruleValue.articleId,
        status: this.ruleValue.status,
        page: this.page,
        pageSize: this.pageSize
      }
      if (this.flat) {
        this.flat = false
        this.comment(n, das)
        setTimeout(() => {
          this.flat = true
        }, 3000)
      } else {
        this.$message.error('点击过于频繁,请稍后再试..')
      }
    },
    // 通过
    byComment(row) {
      this.updateStatus({
        id: row.id,
        status: 1
      })
    },
    // 拒绝
    refuseClick(row) {
      this.updateStatus({
        id: row.id,
        status: 3
      })
    },
    // 删除
    del(row) {
      const that = this
      this.$confirm(`您确定执行删除操作?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          that.listLoading = true
          that
            .delComment({ id: row.id })
            .then(res => {
              if (res.status) {
                that.$message.success('删除成功')
                that.commentSearch('')
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
    // 更新状态
    updateStatus(query) {
      const that = this
      this.$confirm(
        `您正对该评论执行${query.status == 1 ? '（通过）' : '（拒绝）'}操作`,
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(() => {
          that.listLoading = true
          that
            .updateComment(query)
            .then(res => {
              that.listLoading = false
              if (res.status) {
                that.$message.success(
                  `执行审核评论${
                    query.status == 1 ? '（通过）' : '（拒绝）'
                  }操作成功`
                )
                that.commentSearch('')
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
    // 获取评论
    comment(n, query) {
      this.listLoading = true
      this.getComment(query)
        .then(() => {
          this.listLoading = false
          if (n != 'search') {
            this.getArticleList({ page: 1, pageSize: 100 })
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
        articleId: this.ruleValue.articleId,
        status: this.ruleValue.status,
        page: page,
        pageSize: this.pageSize
      }
      this.comment('', das)
    },
    // 格式化时间
    formDates(row, column) {
      const date = row[column.property]
      if (date === undefined) {
        return ''
      }
      return formartTime(date)
    }
  }
}
</script>

<style lang="scss">
@import '~assets/css/comment.scss';
.comment_table_content {
  .page {
    margin-top: 20px;
  }
  .article_text {
    .el-form-item__label {
      width: 100%;
      background: #409eff;
      color: #f8f8f8;
      margin-bottom: 10px;
      text-indent: 10px;
    }
    .el-form-item__content {
      padding: 0 10px;
      width: 100%;
      min-height: 40px;
      .opration {
        width: 518px;
      }
      .public_row {
        line-height: 26px;
        padding-left: 5px;
      }
      .emoji-item-common {
        margin: 0 3px;
      }
    }
    .hl {
      display: block;
      padding: 9.5px;
      margin: 10px 0 10px;
      font-size: 14px;
      line-height: 1.42857143;
      color: #333;
      word-break: break-all;
      word-wrap: break-word;
      border: 1px solid #ccc;
      border-radius: 4px;
      background: #eee;
    }
  }
}
</style>
