<template>
  <el-form ref="postForm"
           :model="postForm"
           :rules="rules">
    <!-- 吸顶效果 -->
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
          <EbookUpload :file-list="fileList"
                       :disabled="isEdit"
                       @onSuccess="onUploadSuccess"
                       @onRemove="onUploadRemove" />
        </el-col>
        <el-col :span="24">
          <el-form-item prop="title">
            <MdInput v-model="postForm.title"
                     :maxlength="100"
                     name="name"
                     required>
              书名</MdInput>
          </el-form-item>
          <el-row>
            <el-col :span="12">
              <el-form-item prop="author"
                            label="作者"
                            :label-width="labelWidth">
                <el-input v-model="postForm.author"
                          placeholder="作者" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="publisher"
                            label="出版社"
                            :label-width="labelWidth">
                <el-input v-model="postForm.publisher"
                          placeholder="出版社" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item prop="language"
                            label="语言"
                            :label-width="labelWidth">
                <el-input v-model="postForm.language"
                          placeholder="语言" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="rootFile"
                            label="根文件"
                            :label-width="labelWidth">
                <el-input v-model="postForm.rootFile"
                          placeholder="根文件"
                          disabled />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item prop="filePath"
                            label="文件路径"
                            :label-width="labelWidth">
                <el-input v-model="postForm.filePath"
                          placeholder="filePath"
                          disabled />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="unzipPath"
                            label="解压路径"
                            :label-width="labelWidth">
                <el-input v-model="postForm.unzipPath"
                          placeholder="解压路径"
                          disabled />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item prop="coverPath"
                            label="封面路径"
                            :label-width="labelWidth">
                <el-input v-model="postForm.coverPath"
                          placeholder="封面路径"
                          disabled />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="originalName"
                            label="文件名称"
                            :label-width="labelWidth">
                <el-input v-model="postForm.originalName"
                          placeholder="文件名称"
                          disabled />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item prop="cover"
                            label="封面"
                            label-width="60px">
                <a v-if="postForm.cover"
                   :href="postForm.cover"
                   target="_blank">
                  <img :src="postForm.cover"
                       class="preview-img">
                </a>
                <span v-else>无</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item prop="contents"
                            label="目录"
                            label-width="60px">
                <div v-if="postForm.contents && postForm.contents.length > 0">
                  <!-- 展示服务端返回的目录并用 el-tree 展示为树状列表 -->
                  <el-tree :data="contentsTree"
                           @node-click="onContentClick" />
                </div>
                <span v-else>无</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </el-form>
</template>

<script>

import Sticky from '../../../components/Sticky'
import Warning from './Warning'
import EbookUpload from '../../../components/EbookUpload'
import MdInput from '../../../components/MDinput'
import { createBook, editBook } from '../../../api/book'

const fields = {
  title: '书名',
  author: '作者',
  language: '语言',
  publisher: '出版社'
}
export default {
  components: {
    Sticky,
    Warning,
    EbookUpload,
    MdInput
  },
  props: {
    isEdit: Boolean
  },
  data () {
    const validateRequire = (rule, value, callback) => {
      if (value.length === 0) {
        callback(new Error(fields[rule.field] + '必须填写'))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      postForm: {
        status: 'draft'
      },
      fileList: [],
      labelWidth: '120px',
      contentsTree: [],
      rules: {
        title: [{ validator: validateRequire }],
        author: [{ validator: validateRequire }],
        language: [{ validator: validateRequire }],
        publisher: [{ validator: validateRequire }]
      }
    }
  },
  methods: {
    onContentClick (data) {
      if (data.text) {
        window.open(data.text)
      }
    },
    setData (data) {
      const {
        title,
        author,
        publisher,
        language,
        rootFile,
        cover,
        originalName,
        url,
        contents,
        contentsTree,
        fileName,
        coverPath,
        filePath,
        unzipPath,
        path
      } = data
      this.postForm = {
        title,
        author,
        publisher,
        language,
        rootFile,
        cover,
        url,
        originalName,
        contents,
        fileName,
        coverPath,
        filePath,
        unzipPath,
        path
      }
      this.fileList = [{ name: originalName, url }]
      this.contentsTree = contentsTree
    },
    // 删除电子书，清空列表
    setDefault () {
      this.contentsTree = []
      this.fileList = []
      // 调用resetFields()方法 表单必须有prop属性
      this.$refs.postForm.resetFields()
    },

    // 接收到子组件传递过来的上传成功数据结果
    onUploadSuccess (data) {
      this.setData(data)
    },
    onUploadRemove () {
      this.setDefault()
    },
    onSuccess () {

    },
    onRemove () {

    },
    showGuide () {
      console.log('showGuide...')
    },
    submitForm () {
      this.loading = true
      this.$refs.postForm.validate(async (valid, fields) => {
        if (valid) {
          const book = Object.assign({}, this.postForm)
          if (!this.isEdit) {
            // 新增图书
            book.action = 'create_book' // 服务端通过action字段判读新增或是跟新逻辑
            createBook(book).then((res) => {
              const { msg } = res
              this.$notify({
                title: '操作成功',
                message: msg,
                type: 'success',
                duration: 2000
              })
              this.loading = false
              this.setDefault()
            }).catch(() => {
              this.loading = false
            })
          } else {
            // 编辑图书
            editBook(book)
          }
        } else {
          this.$message(fields[Object.keys(fields)[0]][0].message)
          this.loading = false
        }
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.detail-container {
  padding: 40px 50px 20px;
}
.preview-img {
  width: 270px;
  height: 340px;
}
</style>
