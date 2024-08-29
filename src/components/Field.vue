<template>
  <div class="field-controller">
    <!-- 字段列表视图 -->
    <div v-if="currentView === 'list'">
      <FieldList :fields="fields"
                 @edit-field="handleEditField" />
    </div>

    <!-- 字段编辑视图 -->
    <div v-if="currentView === 'edit'">
      <FieldEdit :field="currentField"
                 :index="currentIndex"
                 @update-field="handleUpdateField"
                 @cancel-edit="switchView" />
    </div>
  </div>
</template>

<script>
import FieldList from "./Field/FieldList.vue";
import FieldEdit from "./Field/FieldEdit.vue";

export default {
  components: {
    FieldList,
    FieldEdit,
  },
  props: {
    fields: [],
  },
  data () {
    return {
      // 当前激活的视图
      currentView: "list",
      // 当前正在编辑的字段
      currentField: null,
      currentIndex: 0,
    };
  },
  methods: {
    // 切换当前视图
    switchView () {
      this.currentView = this.currentView === "list" ? "edit" : "list";
      if (this.currentView === "edit") {
      }
    },
    // 处理从列表中选择字段进行编辑的事件
    handleEditField (field, index) {
      this.currentField = field;
      this.currentIndex = index;
      this.switchView(); // 切换到编辑视图
    },
    // 处理字段更新的事件
    handleUpdateField (updatedField, index) {
      if (index !== -1) {
        this.fields.splice(index, 1, updatedField);
      } else {
        this.fields.push(updatedField);
      }
      // 更新后切换回列表视图
      this.switchView();
    },
  },
  mounted () {
    // console.log(this.fields)
  }
};
</script>

<style scoped>
.field-controller {
  display: flex;
  width: 100%;
  flex-direction: row;
  height: 100%;
  max-height: 100%;
  overflow: auto;
}
</style>