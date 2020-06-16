<template>
  <el-form ref="postForm"
           :model="postForm">
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
              <el-form-item label="作者"
                            :label-width="labelWidth">
                <el-input v-model="postForm.author"
                          placeholder="作者" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="出版社"
                            :label-width="labelWidth">
                <el-input v-model="postForm.publisher"
                          placeholder="出版社" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="语言"
                            :label-width="labelWidth">
                <el-input v-model="postForm.language"
                          placeholder="语言" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="根文件"
                            :label-width="labelWidth">
                <el-input v-model="postForm.rootFile"
                          placeholder="根文件"
                          disabled />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="文件路径"
                            :label-width="labelWidth">
                <el-input v-model="postForm.filePath"
                          placeholder="filePath"
                          disabled />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="解压路径"
                            :label-width="labelWidth">
                <el-input v-model="postForm.unzipPath"
                          placeholder="解压路径"
                          disabled />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="封面路径"
                            :label-width="labelWidth">
                <el-input v-model="postForm.coverPath"
                          placeholder="封面路径"
                          disabled />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="图片名称"
                            :label-width="labelWidth">
                <el-input v-model="postForm.fileName"
                          placeholder="图片名称"
                          disabled />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="封面"
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
              <el-form-item label="目录"
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
    return {
      loading: false,
      postForm: {
        status: 'draft'
      },
      fileList: [],
      labelWidth: '120px',
      contentsTree: []
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
        unzipPath
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
        unzipPath
      }
      this.fileList = [{ name: originalName, url }]
      this.contentsTree = contentsTree
    },

    // 接收到子组件传递过来的上传成功数据结果
    onUploadSuccess (data) {
      console.log('data########', data)
      this.setData(data)
    },
    onUploadRemove () {

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
.preview-img {
  width: 270px;
  height: 340px;
}
</style>
