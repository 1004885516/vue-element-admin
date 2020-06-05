<template>
  <el-form ref="postForm"
           :model="postForm">
    <sticky :class-name="'sub-navbar'">
      <el-button v-if="!isEdit"
                 @click="showGuide">显示帮助</el-button>
      <el-button v-loading="loading"
                 type="success"
                 style="margin-left: 10px"
                 @click="submitForm">
        {{ isEdit ? '编辑图书' : '新增图书' }}</el-button>
    </sticky>
    <div class="detail-container">
      <el-row>
        <Warning />
        <el-col :span="24">
          <!-- 上传控件具体样式 -->
          <EbookUpload />
        </el-col>
        <el-col :span="24" />
      </el-row>
    </div>
  </el-form>
</template>

<script>

import Sticky from '../../../components/Sticky'
import Warning from './Warning'
import EbookUpload from '../../../components/EbookUpload'

export default {
  components: {
    Sticky,
    Warning,
    EbookUpload
  },
  props: {
    isEdit: Boolean
  },
  data () {
    return {
      loading: false,
      postForm: {
        status: 'draft'
      }
    }
  },
  methods: {
    showGuide () {
      console.log('showGuide...')
    },
    submitForm () {
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 1000)
    }
  }
}
</script>

<style lang='scss' scoped>
.detail-container {
  padding: 40px 50px 20px;
}
</style>
