<template>
  <div class="app-container">
    <div>
      <el-input v-model="listQuery.title"
                style="width:200px"
                placeholder="书名"
                class="filter-item"
                clearable
                @keyup.enter.native="handleFilter"
                @clear="handleFilter" />
      <el-input v-model="listQuery.author"
                style="width:200px"
                placeholder="作者"
                class="filter-item"
                clearable
                @keyup.enter.native="handleFilter"
                @clear="handleFilter" />
      <el-select v-model="categoryList"
                 placeholder="选择分类"
                 clearable
                 @change="handleFilter">
        <el-option v-for="item in categoryList"
                   :key="item.value"
                   :label="item.lable"
                   :value="item.value">111</el-option>
      </el-select>
      <el-button v-waves
                 type="primary"
                 icon="el-icon-search"
                 @click="handleFilter">搜索</el-button>
      <el-button type="primary"
                 icon="el-icon-circle-plus"
                 @click="handleCreate">新增</el-button>
      <el-checkbox v-model="showCover"
                   @change="changeShowCover">显示封面</el-checkbox>
    </div>
    <el-table :key="tableKey"
              v-loading="listLoading"
              :data="bookList"
              border
              fit
              highlight-current-row
              style="width:100%"
              @sort-change="sortChange">
      <el-table-column v-if="showCover"
                       label="封面"
                       width="150"
                       align="center">
        <template v-slot="{row :{cover}}">
          <a :href="cover"
             target="_blank">
            <img :src="cover"
                 style="width:80px;heigth:140px">
          </a>
        </template>
      </el-table-column>
      <el-table-column label="ID"
                       prop="_id"
                       sortable="custom"
                       align="center"
                       width="204px" />
      <el-table-column label="书名"
                       width="150"
                       align="center">
        <template v-slot="{row :{titleWrapper}}">
          <!-- v-html 表示把标签显示成html文本 -->
          <span v-html="titleWrapper" />
        </template>
      </el-table-column>
      <el-table-column label="作者"
                       width="150"
                       align="center">
        <template v-slot="{row :{authorWrapper}}">
          <span v-html="authorWrapper" />
        </template>
      </el-table-column>
      <el-table-column label="语言"
                       prop="language"
                       width="150"
                       align="center" />
      <el-table-column label="分类"
                       width="150"
                       align="center" />
      <el-table-column label="文件名称"
                       prop="fileName"
                       width="150"
                       align="center" />
      <el-table-column label="文件路径"
                       prop="filePath"
                       width="150"
                       align="center" />
      <el-table-column label="封面路径"
                       prop="coverPath"
                       width="150"
                       align="center" />
      <el-table-column label="解压路径"
                       prop="unzipPath"
                       width="150"
                       align="center" />
      <el-table-column label="上传人"
                       prop="createUser.username"
                       width="150"
                       align="center" />
      <el-table-column label="上传时间"
                       prop="createTime"
                       width="150"
                       align="center" />
      <el-table-column label="操作"
                       width="150"
                       align="center"
                       fixed="right">
        <template v-slot="{row :{fileName}}">
          <el-button type="text"
                     icon="el-icon-edit"
                     @click="handleUpdate(fileName)" />
        </template>
      </el-table-column>
    </el-table>
    <!-- 列表底部页签 -->
    <Pagination :total="total" />
  </div>
</template>

<script>

import Pagination from '../../components/Pagination'
import waves from '../../directive/waves'
import { getCategory, getBookList } from '../../api/book'

export default {
  components: {
    Pagination
  },
  directives: {
    waves
  },
  data () {
    return {
      listQuery: {},
      showCover: false,
      categoryList: [],
      tableKey: 0,
      listLoading: true,
      bookList: [],
      total: 0
    }
  },
  mounted () {
    // this.getCategoryList()
    this.getBookList()
  },
  created () {
    this.parseQuery()
  },
  methods: {
    // 显示高亮
    wrapperKerword (k, v) {
      function highlight (value) {
        return `<span style="color: red">${value}</span>`
      }
      if (!this.listQuery[k]) {
        return v
      } else {
        // 正则 i 表示不区分大小写 g 表示全局匹配
        return v.replace(new RegExp(this.listQuery[k], 'ig'), v => highlight(v))
      }
    },
    getBookList () {
      this.listLoading = true
      this.listQuery.action = 'get_list_book'
      getBookList(this.listQuery).then((res) => {
        this.bookList = res.data.bookList
        this.total = res.data.total
        this.listLoading = false
        this.bookList.forEach(item => {
          item.titleWrapper = this.wrapperKerword('title', item.title)
          item.authorWrapper = this.wrapperKerword('author', item.author)
        })
      })
    },
    parseQuery () {
      const listQuery = {
        pages: 1,
        pageSize: 10
      }
      this.listQuery = { ...listQuery, ...this.listQuery }
    },
    sortChange (data) {
      console.log('sortChange', data)
    },
    getCategoryList () {
      getCategory().then(() => {

      })
    },
    handleFilter () {
      this.getBookList()
    },
    handleCreate () {
      this.$router.push('/book/create')
    },
    handleUpdate (fileName) {
      console.log('fileName', fileName)
      this.$router.push(`/book/edit/${fileName}`)
    },
    changeShowCover (value) {
      this.showCover = value
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
