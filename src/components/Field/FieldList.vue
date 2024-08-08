<template>
  <div>
    <div v-for="(field, index) in fields" :key="field.key">
      <FieldItem :field="field" :index="index" @delete="handleDelete" @edit="handleEdit" />
    </div>
    <div>
      <el-button type="primary" icon="el-icon-plus" @click="handleAdd"
        >添加</el-button
      >
    </div>
  </div>
</template>

<script>
import FieldItem from "./FieldItem.vue";
export default {
  components: {
    FieldItem,
  },
  props: {
    //从父组件中传来的fields
    fields: {},
  },
  methods: {
    // Handle delete event from FieldItem
    handleDelete(index) {
      if (index !== -1) {
        this.fields.splice(index, 1);
      }
    },
    handleEdit(field, index) {
      this.$emit("edit-field", field, index);
    },
    handleAdd() {
      const newField = {
        key: `字段${this.fields.length + 1}`,
        label: "值",
        value: "",
      };
      this.fields.push(newField);
    },
  },
};
</script>

<style scoped>
</style>
