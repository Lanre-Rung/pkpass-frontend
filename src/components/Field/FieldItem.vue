<template>
  <div class="pk-field">
    <div>Key: {{ field.key }}</div>
    <div>Label: {{ field.label }}</div>
    <div>Value: {{ field.value }}</div>
    <!-- Delete and Edit icons -->
    <i class="el-icon-delete"
       @click="deleteField"></i>
    <i class="el-icon-edit"
       @click="editField"></i>
  </div>
</template>

<script>
export default {
  props: {
    field: Object,
    index: Number,
  },
  methods: {
    deleteField () {
      this.$emit('delete', this.index);
    },
    editField () {
      this.$emit('edit', this.field, this.index);
    }
  }
};
</script>

<style scoped>
.pk-field {
  margin-top: 20px;
}
</style>