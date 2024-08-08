<template>
  <div class="trigger-controller">
    <el-form :model="form" ref="formRef" class="date-time-picker-form">
      <el-form-item label="地理位置" ref="locationTable" prop="locations">
        <Locations
          :propData="form.locations"
          @after-edit="checkLocationEditing"
          @after-save="checkLocationEditing"
          @after-delete="checkLocationEditing"
        ></Locations>
      </el-form-item>
      <el-form-item label="iBeacon" ref="beaconTable" prop="beacons">
        <EditableTable
          :propData="form.beacons"
          :tableConfig="beaconTableConfig"
          @after-edit="checkBeaconEditing"
          @after-save="checkBeaconEditing"
          @after-delete="checkBeaconEditing"
        ></EditableTable>
      </el-form-item>
      <el-form-item label="时间点" prop="relevantDate">
        <el-date-picker
          v-model="form.relevantDate"
          type="datetime"
          placeholder="选择日期和时间"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit" :disabled="isEditing"
          >保存</el-button
        >
        <el-button type="warning" @click="reset" :disabled="isEditing"
          >重置</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import EditableTable from "./Trigger/editableTable.vue";
import Locations from "./Trigger/Locations.vue";
export default {
  components: {
    Locations,
    EditableTable,
  },
  props: {
    pkpass: {
      Object,
    },
  },
  data() {
    return {
      form: {
        relevantDate: "",
        locations: [],
        beacons: [],
      },
      locationEditIndex: -1,
      beaconEditIndex: -1,
      formRef: null,
      isEditing: false,
      beaconTableConfig: {
        columns: [
          {
            id: "major",
            name: "主标识符",
            type: "number",
            min: 0,
            max: 65535,
          },
          {
            id: "minor",
            name: "次标识符",
            type: "number",
            min: 0,
            max: 65535,
          },
          {
            id: "proximityUUID",
            name: "UUID",
            type: "text",
            validator: this.validateUUID,
          },
          {
            id: "relevantText",
            name: "触发信息",
            type: "text",
            clearable: true,
          },
        ],
        majorCombo: ["proximityUUID"],
        message: {
          submit: "提交成功",
          maxLength: "不超过10个",
          repeat: "不能出现重复的UUID",
        },
        ex_buttons: ["submit"],
      },
    };
  },
  computed: {},
  methods: {
    validateUUID(value) {
      const uuidRegex =
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      if (!value.match(uuidRegex)) {
        this.$message.error("请输入合法的UUID");
        return false;
      }
      return true;
    },
    checkBeaconEditing(status) {
      this.beaconEditIndex = status.editIndex;
      this.checkEditing();
    },
    checkLocationEditing(status) {
      this.locationEditIndex = status.editIndex;
      this.checkEditing();
    },
    checkEditing() {
      if (this.beaconEditIndex == -1 && this.locationEditIndex == -1) {
        this.isEditing = false;
      } else {
        this.isEditing = true;
      }
    },
    submit() {
      console.log(this.form);
      this.$emit("update-trigger", this.form);
    },
    reset() {
      if (this.pkpass.locations) {
        this.form.locations = this.pkpass.locations.slice();
      }
      if (this.pkpass.beacons) {
        this.form.beacons = this.pkpass.beacons.slice();
      }
      if (this.pkpass.relevantDate) {
        this.form.relevantDate = this.pkpass.relevantDate;
      }
    },
  },
  mounted() {
    this.reset();
  },
};
</script>

<style scoped>
.trigger-controller {
  display: flex;
  width: 100%;
  flex-direction: row;
}
</style>