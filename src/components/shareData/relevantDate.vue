<template>
  <div>
    <h3 style="margin-left: 10%;">共享Relevantdate</h3>
    <el-table :data="shareData.relevantDate"
              style="width: 80%;margin-left: 10%; margin-top: 10px;">
      <el-table-column prop="changeMessageItem.changeMessageId"
                       label="ID"
                       width="100">
      </el-table-column>
      <el-table-column prop="changeMessageItem.relevantDate.date"
                       label="到期时间"
                       width="180">
      </el-table-column>
      <el-table-column prop="changeMessageItem.content"
                       label="触发信息"
                       width="180">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini"
                     type="primary"
                     v-if="type==='detail'"
                     @click="History(scope.row)">查看历史记录</el-button>
          <el-button size="mini"
                     type="primary"
                     v-if="type==='history'"
                     @click="Restore(scope.row)">恢复</el-button>
          <el-button size="mini"
                     type="primary"
                     v-if="type==='edit'"
                     @click="useRelevantDate(scope.row)">引入</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  props: {
    shareData: {
      Array
    }, type: {
      String
    }
  },
  methods: {
    History (row) {
      this.$emit('getUnionId', row.changeMessageItem.originalId)
    }, Restore (row) {
      this.$emit('restore', row.changeMessageItem.changeMessageId)
    }, useRelevantDate (row) {
      this.$emit('useRelevantDate', row)
    }
  }
}
</script>