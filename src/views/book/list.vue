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
                 icon="el-icon-search">搜索</el-button>
      <el-button type="primary"
                 icon="el-icon-circle-plus"
                 @click="handleCreate">新增</el-button>
      <el-checkbox v-model="showCover"
                   @change="changeShowCover">显示封面</el-checkbox>
    </div>
    <el-table />
    <Pagination :total="0" />
  </div>
</template>

<script>

import Pagination from '../../components/Pagination'
import waves from '../../directive/waves'
import { getCategory } from '../../api/book'

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
      categoryList: []
    }
  },
  mounted () {
    this.getCategoryList()
  },
  methods: {
    getCategoryList () {
      getCategory().then(() => {

      })
    },
    handleFilter () {
      console.log('handleFilter')
    },
    handleCreate () {
      this.$router.push('/book/create')
    },
    changeShowCover (value) {
      this.showCover = value
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
