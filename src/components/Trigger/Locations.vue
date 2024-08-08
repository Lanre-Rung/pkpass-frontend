<template>
  <div class="p-10">
    <el-button
      v-if="buttons.includes('add')"
      type="success"
      @click="handleAddRow"
      :disabled="isEditing()"
    >
      添加
    </el-button>
    <el-button
      v-if="buttons.includes('submit')"
      type="success"
      @click="handleSubmit"
      :disabled="isEditing()"
    >
      保存
    </el-button>
    <el-table :data="tableData" border>
      <el-table-column
        v-for="column in tableConfig.columns"
        :key="column.id"
        :label="column.name"
        :prop="column.id"
      >
        <template #default="scope">
          <span v-if="scope.$index !== tableStatus.editIndex">
            {{ scope.row[column.id] }}
          </span>
          <component
            v-else
            :is="column.type === 'number' ? 'el-input-number' : 'el-input'"
            v-model="scope.row[column.id]"
            :min="column.type === 'number' ? column.min || -180 : null"
            :max="column.type === 'number' ? column.max || 180 : null"
            :precision="column.precision || 0"
          />
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button
            v-if="buttons.includes('edit')"
            :icon="isRowEditing(row) ? 'el-icon-check' : 'el-icon-edit'"
            :type="isRowEditing(row) ? 'primary' : 'default'"
            @click="toggleEdit(row)"
          >
          </el-button>
          <el-button
            v-if="isRowEditing(row)"
            icon="el-icon-location"
            @click="showMap(row)"
          >
          </el-button>
          <el-button
            v-if="buttons.includes('delete')"
            icon="el-icon-delete"
            link
            @click="handleDelete(row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="选择经纬度"
      :visible.sync="isMapVisible"
      :append-to-body="true"
      custom-class="map-dialog"
    >
      <MapContainer
        :currentRow="currentRow"
        @choose="onMapUpdateRow"
        @cancel="cancel"
      />
    </el-dialog>
  </div>
</template>
  <script>
import MapContainer from "./MapContainer.vue";
export default {
  components: {
    MapContainer,
  },
  props: {
    propData: {
      Array,
    },
  },
  data() {
    return {
      isMapVisible: false,
      buttons: ["submit", "add", "delete", "edit"],
      tableStatus: {
        editIndex: -1,
      },
      currentRow: {},
      tableData: [],
      tableConfig: {
        columns: [
          {
            id: "latitude",
            name: "纬度",
            type: "number",
            validator: this.validateLatitude,
            min: -90,
            max: 90,
            precision: 6,
          },
          {
            id: "longitude",
            name: "经度",
            type: "number",
            validator: this.validateLongitude,
            min: -180,
            max: 180,
            precision: 6,
          },
          {
            id: "relevantText",
            name: "触发信息",
            type: "text",
          },
        ],
        maxLength: 10,
        majorCombo: ["latitude", "longitude"],
        message: {
          submit: "提交成功",
          maxLength: "不超过10个",
          repeat: "不能出现重复的经纬度",
        },
        ex_buttons: ["submit"],
      },
    };
  },
  mounted() {
    this.tableData = this.propData;
    if (!this.tableData) {
      this.tableData = [];
    }
    if (this.tableConfig.buttons) {
      this.buttons = this.tableConfig.buttons;
    }
    if (this.tableConfig.ex_buttons) {
      this.buttons = this.buttons.filter(
        (button) => !this.tableConfig.ex_buttons.includes(button)
      );
    }
  },
  watch :{
    propData(newValue){
      this.propData = newValue;
      this.tableData = newValue;
    }
  },
  methods: {
    handleEdit(row) {
      this.$emit("before-edit", this.tableStatus);
      this.tableStatus.editIndex = this.tableData.indexOf(row);
      this.$emit("after-edit", this.tableStatus);
    },
    handleSave() {
      this.$emit("before-save", this.tableStatus);
      this.tableStatus.editIndex = -1;
      this.$emit("after-save", this.tableStatus);
    },
    toggleEdit(row) {
      if (!this.cellCheck(row)) return;
      if (this.tableData.indexOf(row) == this.tableStatus.editIndex) {
        this.handleSave();
      } else {
        this.handleEdit(row);
      }
    },
    handleDelete(row) {
      this.$emit("before-delete", this.tableStatus);
      if (this.tableData.indexOf(row) == this.tableStatus.editIndex) {
        this.tableStatus.editIndex = -1;
      } else if (!this.cellCheck(row)) {
        return;
      }
      this.tableData.splice(this.tableData.indexOf(row), 1);
      this.$emit("after-delete", this.tableStatus);
    },
    handleAddRow() {
      this.$emit("before-add", this.tableStatus);
      if (
        this.tableConfig.maxLength &&
        this.tableData.length >= this.tableConfig.maxLength
      ) {
        this.$message.error(this.tableConfig.message.maxLength);
        return;
      }
      const newRow = {};
      this.tableConfig.columns.forEach((column) => {
        newRow[column.id] = column.type === "number" ? 0 : "";
      });
      this.tableData.push(newRow);
      this.$emit("after-add", this.tableStatus);
      this.handleEdit(newRow);
    },
    handleSubmit() {
      this.$message.success(this.tableConfig.message.submit);
      this.$emit("submit", this.tableData);
    },
    isEditing() {
      return this.tableStatus.editIndex !== -1;
    },
    cellCheck(row) {
      let validatorCheck = true;
      this.tableConfig.columns.forEach((column) => {
        if (column.validator && !column.validator(row[column.id])) {
          validatorCheck = false;
        }
      });
      if (!validatorCheck) {
        return false;
      }
      // check for major combo to see if there's repetition
      const duplicateKey = this.tableData.some(
        (r) =>
          this.tableConfig.majorCombo.every((key) => r[key] === row[key]) &&
          r !== row
      );
      if (duplicateKey) {
        this.$message.error(this.tableConfig.message.repeat);
        return false;
      }
      // If all checks pass
      return true;
    },
    isRowEditing(row) {
      return this.tableData.indexOf(row) == this.tableStatus.editIndex;
    },
    validateLatitude(value) {
      if (typeof value !== "number" || value < -90 || value > 90) {
        this.$message.error("纬度必须是一个数字，且范围在-90到90之间");
        return false;
      }
      return true;
    },
    validateLongitude(value) {
      if (typeof value !== "number" || value < -180 || value > 180) {
        this.$message.error("经度必须是一个数字，且范围在-180到180之间");
        return false;
      }
      return true;
    },
    showMap(row) {
      this.currentRow = row;
      this.isMapVisible = true;
    },
    onMapUpdateRow(formOne) {
      this.currentRow.latitude = formOne.lat;
      this.currentRow.longitude = formOne.lng;
      this.isMapVisible = false;
    },
    cancel() {
      this.isMapVisible = false;
    },
  },
};
</script>

<style scoped>
/* .map-container{
  position: absolute;
} */
</style>
  