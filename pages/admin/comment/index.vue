<template>
  <div class="comment_table_content">
    <div class="table-search">
      <el-form ref="form" :inline="true" class="searchView">
        <div class="searchInput s">
          <el-form-item label="文章评论">
            <el-select v-model="ruleValue.articleId" placeholder="文章标题">
              <el-option
                v-for="item in articleList"
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
            @click="commentSearch"
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
                  style="width:90%;background:#f8f8f8;border:dashed 1px #eee;border-radius:5px;text-indent:10px;"
                >
                  <div class="bannerImg public_row">
                    {{ props.row.comment_text }}
                  </div>
                </el-form-item>
                <el-form-item label="操作:" style="width:90%;text-indent:10px;">
                  <el-button
                    type="primary"
                    title="回复"
                    icon="el-icon-edit"
                    circle
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
export default {
  layout: 'frame',
  name: 'Comment',
  data() {
    return {
      listLoading: false,
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
      page: 1,
      pageSize: 8
    }
  },
  computed: {
    ...mapGetters({
      commentList: 'comment/commentList'
    }),
    commentValue() {
      if (this.commentList.totelSize > 0) {
        return this.commentList.value
      } else {
        return []
      }
    },
    commentCount() {
      return this.commentList
    }
  },
  mounted() {
    this.commentSearch()
  },
  methods: {
    ...mapActions({
      getComment: 'comment/getComment',
      updateComment: 'comment/updateComment',
      delComment: 'comment/delComment'
    }),
    // 搜索评论
    commentSearch() {
      let das = {
        articleId: this.ruleValue.articleId,
        status: this.ruleValue.status,
        page: this.page,
        pageSize: this.pageSize
      }
      this.comment(das)
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
                that.commentSearch()
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
                that.commentSearch()
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
    comment(query) {
      this.listLoading = true
      this.getComment(query)
        .then(() => {
          this.listLoading = false
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
      this.comment(das)
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
.comment_table_content {
  .page {
    margin-top: 20px;
  }
}
</style>
