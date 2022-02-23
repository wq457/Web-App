<template>
  <div class="pagination">
    <button :disabled="pageNo==1" @click="$emit('pageChange',pageNo-1)">上一页</button>
    <button v-if="pageNo > 3" @click="$emit('pageChange',1)" :class="{active:pageNo==1}">1</button>
    <button v-if="pageNo >= continues">···</button>

    <button
      v-for="(p, index) in startNumAndEndNum.end"
      :key="index"
      v-if="p >= startNumAndEndNum.start"
      @click="$emit('pageChange',p)"
      :class="{active:pageNo==p}"
    >
      {{ p }}
    </button>

    <button v-if="startNumAndEndNum.end < totalPage - 1">···</button>
    <button v-if="startNumAndEndNum.end < totalPage" @click="$emit('pageChange',totalPage)" :class="{active:pageNo==totalPage}">{{ totalPage }}</button>
    <button :disabled="pageNo==totalPage" @click="$emit('pageChange',pageNo+1)">下一页</button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["pageNo", "pageSize", "total", "continues"],
  computed: {
    totalPage() {
      return Math.ceil(this.total / this.pageSize);
    },
    startNumAndEndNum() {
      let { pageNo, continues, totalPage } = this;
        let start = pageNo - parseInt(continues / 2);
        let end = pageNo + parseInt(continues / 2);
      if (totalPage < continues) {
         start = 1;
         end = totalPage;
      } else {
        if (start < 1) {
          start = 1;
          end = continues;
        }
        if (end > totalPage) {
          end = totalPage;
          start = totalPage - continues + 1;
        }
      }
      return { start, end };    
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
.active{
    background-color: skyblue;
}
</style>
