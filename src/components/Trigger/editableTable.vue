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
    <el-button type="success" @click="handleSubmit" :disabled="isEditing()">
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
            {{ getCell(scope.row, column) }}
          </span>
          <el-date-picker
            v-else-if="column.type == 'date'"
            :type="column.type === 'date' ? 'datetime' : null"
            v-model="currentRow[getColumnBind(column.bind)]"
            @change="(value) => setCell(scope.row, column, value)"
            :format="column.type === 'date' ? column.format : null"
            :value-format="column.type === 'date' ? column.format : null"
          />
          <component
            v-else
            :is="getInputType(column.type)"
            :min="column.type === 'number' ? column.min : null"
            :max="column.type === 'number' ? column.max : null"
            :type="column.type === 'date' ? 'datetime' : null"
            :precision="column.precision || 0"
            v-model="currentRow[getColumnBind(column.bind)]"
            @change="(value) => setCell(scope.row, column, value)"
            :clearable="
              column.clearable !== undefined ? column.clearable : true
            "
            :format="column.type === 'date' ? column.format : null"
            :value-format="column.type === 'date' ? column.format : null"
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
            :disabled="isDisabled(row, 'edit')"
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
  </div>
</template>
  <script>
export default {
  props: {
    propData: {
      Array,
    },
    tableConfig: {
      columns: [],
      Object,
    },
  },
  data() {
    return {
      tableData: [],
      buttons: ["submit", "add", "delete", "edit"],
      inputTypes: {
        number: "el-input-number",
        date: "el-date-picker",
      },
      defaultValues: {
        number: 0,
      },
      tableStatus: {
        editIndex: -1,
      },
      currentRow: {},
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
    this.currentRow = this.createRow();
  },
  watch: {
    propData(newValue) {
      this.propData = newValue;
      this.tableData = newValue;
    },
  },
  methods: {
    getInputType(type) {
      if (this.inputTypes.type != undefined) {
        return this.inputTypes[type];
      }
      return "el-input";
    },
    getDefaultValue(type) {
      if (this.defaultValues.type != undefined) {
        return this.defaultValues[type];
      }
      if (type == "date") {
        return null;
      }
      return "";
    },
    getColumnBind(bind) {
      if (!Array.isArray(bind)) {
        return bind;
      }
      let keys = bind;
      for (let keyPath of keys) {
        if (!Array.isArray(keyPath)) {
          keys = [keys];
          break;
        }
      }
      for (let keyPath of keys) {
        if (Array.isArray(keyPath)) {
          let realId = "";
          for (let key of keyPath) {
            realId += "//" + key;
          }
          if (realId !== undefined) {
            return realId;
          }
        }
      }
      // Return undefined if no path results in a found value
      return undefined;
    },
    getCell(row, column) {
      let bind = column.bind;
      // If bind is a string, convert it to an array of one element for consistent processing
      let keys = Array.isArray(bind) ? bind : [bind];
      // Iterate over each path (each path is an array of keys)
      for (let keyPath of keys) {
        if (!Array.isArray(keyPath)) {
          keys = [keys];
          break;
        }
      }
      for (let keyPath of keys) {
        if (Array.isArray(keyPath)) {
          let result = row;
          // Iterate over the keys in the path
          for (let key of keyPath) {
            if (result && typeof result === "object" && key in result) {
              result = result[key];
            } else {
              // If any key in the path doesn't exist, break and try the next path
              result = undefined;
              break;
            }
          }
          // If the result is found, return it
          if (result !== undefined) {
            return result;
          }
        }
      }
      // Return undefined if no path results in a found value
      return undefined;
    },
    getCellById(row, id) {
      for (let column of this.tableConfig.columns) {
        if (column.id === id) {
          return this.getCell(row, column);
        }
      }
    },
    setCell(row, column, value) {
      let bind = column.bind;
      // Handle the case where 'bind' is a string or an array of strings
      let keys = Array.isArray(bind) ? bind : [bind];
      // Iterate over each path (each path is an array of keys)
      for (let keyPath of keys) {
        if (!Array.isArray(keyPath)) {
          keys = [keys];
          break;
        }
      }
      let set = false;
      for (let keyPath of keys) {
        // Use a copy of 'row' for each path to avoid overwriting in case of nested objects
        let current = row;
        for (let i = 0; i < keyPath.length; i++) {
          const key = keyPath[i];
          if (i < keyPath.length - 1) {
            // Navigate to the next level if not the last key
            if (current[key] === undefined) {
              current[key] = {};
            }
            current = current[key];
          } else {
            // Set the value at the last key
            current[key] = value;
            set = true;
          }
        }
        if (set) break;
      }
    },
    createRow(row, setBind = false) {
      let newRow = {};
      this.tableConfig.columns.forEach((column) => {
        if (row === undefined) {
          this.setCell(newRow, column, column.type === "number" ? 0 : "");
        } else {
          if (setBind) {
            newRow[this.getColumnBind(column.bind)] = this.getCell(row, column);
          } else {
            this.setCell(newRow, column, this.getCell(row, column));
          }
        }
      });
      return newRow;
    },
    handleEdit(row) {
      this.$emit("before-edit", this.tableStatus);
      this.tableStatus.editIndex = this.tableData.indexOf(row);
      this.currentRow = this.createRow(row, true);
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
      let newRow = this.createRow();
      this.tableData.push(newRow);
      this.$emit("after-add", this.tableStatus);
      this.handleEdit(newRow);
    },
    handleSubmit() {
      this.$message.success(this.tableConfig.message.submit);
      this.$emit("submit", this.tableData);
      // this.$emit("getBeacon", this.tableData);
    },
    isEditing() {
      return this.tableStatus.editIndex !== -1;
    },
    isDisabled(row, type) {
      if (row == null) return false;
      if (
        this.tableConfig.disabled != undefined &&
        this.tableConfig.disabled[type] &&
        this.tableConfig.disabled[type](row)
      ) {
        return true;
      }
    },
    cellCheck(row) {
      let validatorCheck = true;
      this.tableConfig.columns.forEach((column) => {
        if (column.validator && !column.validator(this.getCell(row, column))) {
          validatorCheck = false;
        }
      });
      if (!validatorCheck) {
        return false;
      }
      if (this.tableConfig.majorCombo) {
        // check for major combo to see if there's repetition
        const duplicateKey = this.tableData.some(
          (r) =>
            this.tableConfig.majorCombo.every(
              (key) => this.getCellById(r, key) === this.getCellById(row, key)
            ) && r !== row
        );
        if (duplicateKey) {
          this.$message.error(this.tableConfig.message.repeat);
          return false;
        }
      }
      // If all checks pass
      return true;
    },
    isRowEditing(row) {
      return this.tableData.indexOf(row) == this.tableStatus.editIndex;
    },
  },
};
</script>
  