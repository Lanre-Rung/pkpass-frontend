<template>
  <div>
    <div v-for="(field, index) in fields"
         :key="field.key">
      <FieldItem :field="field"
                 :index="index"
                 @delete="handleDelete"
                 @edit="handleEdit" />
    </div>
    <div>
      <el-button type="primary"
                 icon="el-icon-plus"
                 @click="handleAdd">添加</el-button>
      <el-button type="primary"
                 icon="el-icon-plus"
                 @click="addTemp">选择模板</el-button>
    </div>
    <el-dialog title="Field模板"
               :visible.sync="filedShow"
               width="70%"
               center>
      <field :shareData="shareData"
             :type="'edit'"
             @useTrigger="useTrigger"></field>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="filedShow = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import FieldItem from "./FieldItem.vue";
import axios from "axios";
import field from "../shareData/field.vue";
export default {
  components: {
    FieldItem,
    field
  },
  props: {
    fields: {},
  },
  data () {
    return {
      filedShow: false,
      shareData: [],
      field: {}
    }
  },
  methods: {
    // Handle delete event from FieldItem
    handleDelete (index) {
      if (index !== -1) {
        this.fields.splice(index, 1);
      }
    },
    handleEdit (field, index) {
      this.$emit("edit-field", field, index);
    },
    handleAdd () {
      const newField = {
        key: `字段${this.fields.length + 1}`,
        label: "标签",
        value: "值",
      };
      this.fields.push(newField);
    },
    addTemp () {
      this.filedShow = true
      let requestData = {
        merchantId: 14,
        types: ["Field"]
      };
      axios.post(`http://192.168.35.81:8081/union/asset/union_id`, requestData).then(response => {
        // console.log(response)
        this.shareData = response.data
      })
    },
    useTrigger (row) {
      console.log('row', row)
      this.field = row.changeMessageItem.field.fileContent
      this.fields.push(this.field)
      this.$message.success('引入成功！')
    }
  },
};
</script>

<style scoped>
</style>
