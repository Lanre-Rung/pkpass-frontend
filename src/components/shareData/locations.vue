 <!-- 3.location -->
<template>
  <div>
    <h3 style="margin-left: 10%;">共享Location</h3>
    <el-table :data="shareData.locations"
              fixed-header
              style="width: 80%;margin-left: 10%; margin-top: 10px;max-height: 30vh;overflow-y: auto;">
      <el-table-column prop="changeMessageItem.changeMessageId"
                       label="ID"
                       width="100">
      </el-table-column>
      <el-table-column prop="changeMessageItem.location.latitude"
                       label="经度"
                       width="180">
      </el-table-column>
      <el-table-column prop="changeMessageItem.location.longitude"
                       label="纬度"
                       width="180">
      </el-table-column>
      <el-table-column prop="changeMessageItem.location.altitude"
                       label="海拔"
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
                     @click="useLocations(scope.row)">引入</el-button>
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
    },
    useLocations (row) {
      // console.log(row)
      this.$emit('useLocations', row)
    }
  }
}
</script>