<template>
  <div>
    <h3 style="margin-left: 10%;">共享Field</h3>
    <el-table :data="shareData"
              fixed-header
              style="width: 80%;margin-left: 10%; margin-top: 10px;max-height: 30vh;overflow-y: auto;">
      <el-table-column prop="assetId'"
                       label="ID"
                       width="100">
      </el-table-column>
      <el-table-column prop="changeMessageItem.field.fileContent.key"
                       label="key"
                       width="180">
      </el-table-column>
      <el-table-column prop="changeMessageItem.field.fileContent.value"
                       label="value"
                       width="180">
      </el-table-column>
      <el-table-column prop="changeMessageItem.field.fileContent.label"
                       label="label"
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
                     @click="UseTrigger(scope.row)">引入</el-button>
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>
<script>
export default {
  props: {
    shareData: {
      Object
    },
    type: {
      String
    }
  },
  methods: {
    History (row) {
      this.$emit('getUnionId', row.changeMessageItem.originalId)
    },
    Restore (row) {
      this.$emit('restore', row.changeMessageItem.changeMessageId)
    },
    UseTrigger (row) {
      this.$emit('useTrigger', row)
    }
  }
}
</script>