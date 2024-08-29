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
      <EditableTable
        :propData="form.relevantDate"
        :tableConfig="relevantDateConfig"
        @after-edit="checkRelevantDateEditing"
        @after-save="checkRelevantDateEditing"
        @after-delete="checkRelevantDateEditing"
      ></EditableTable>
      <el-form-item>
        <el-button type="primary" @click="submit" :disabled="isEditing"
          >保存</el-button
        >
        <el-button type="warning" @click="reset" :disabled="isEditing"
          >重置</el-button
        >
        <el-button @click="getTemp" :disabled="isEditing">选择模板</el-button>
      </el-form-item>
    </el-form>
    <!-- 触发信息模板对话框 -->
    <el-dialog title="模板" :visible.sync="tempShow" width="70%" center>
      <locations
        :shareData="shareData"
        :type="'edit'"
        @useLocations="useLocations"
      ></locations>
      <!-- 4.beacon -->
      <beacon
        :shareData="shareData"
        :type="'edit'"
        @useBeacon="useBeacon"
      ></beacon>
      <!-- 6.date-->
      <relevantDate
        :shareData="shareData"
        :type="'edit'"
        @useRelevantDate="useRelevantDate"
      ></relevantDate>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="tempShow = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import EditableTable from "./Trigger/editableTable.vue";
import Locations from "./Trigger/Locations.vue";
import locations from "../components/shareData/locations.vue";
import beacon from "../components/shareData/beacon.vue";
import field from "../components/shareData/field.vue";
import relevantDate from "../components/shareData/relevantDate.vue";
import axios from "axios";
export default {
  components: {
    Locations,
    EditableTable,
    locations,
    beacon,
    field,
    relevantDate,
  },
  props: {
    pkpass: {
      Object,
    },
    trigger_form: {
      Object,
    },
  },
  data() {
    return {
      form : {
        relevantDate: [],
        locations: [],
        beacons: [],
      },
      locationEditIndex: -1,
      beaconEditIndex: -1,
      relevantDateEditIndex: -1,
      formRef: null,
      isEditing: false,
      beaconTableConfig: {
        columns: [
          {
            id: "major",
            bind: [
              ["pkBeacon", "major"],
              ["beacon", "major"],
            ],
            name: "主标识符",
            type: "number",
            min: 0,
            max: 65535,
          },
          {
            id: "minor",
            bind: [
              ["pkBeacon", "minor"],
              ["beacon", "minor"],
            ],
            name: "次标识符",
            type: "number",
            min: 0,
            max: 65535,
          },
          {
            id: "proximityUUID",
            bind: [
              ["pkBeacon", "proximityUUID"],
              ["beacon", "proximityUUID"],
            ],
            name: "UUID",
            type: "text",
            validator: this.validateUUID,
          },
          {
            id: "relevantText",
            bind: [["pkBeacon", "relevantText"], ["content"]],
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
        maxLength: 10,
        ex_buttons: ["submit"],
        disabled: {
          edit: this.checkTemplate,
        },
      },
      relevantDateConfig: {
        columns: [
          {
            id: "date",
            bind: [
              ["pkRelevantDate"],
              ["relevantDate", "date"],
            ],
            validator: this.validateDate,
            name: "日期",
            type: "date",
            format : "yyyy-MM-ddTHH:mm:ssZ",
          },
        ],
        maxLength: 1,
        message: {
          submit: "提交成功",
          maxLength: "已有触发时间",
        },
        ex_buttons: ["submit"],
        disabled: {
          edit: this.checkTemplate,
        },
      },
      tempShow: false,
      shareData: {
        image: [],
        pass: [],
        locations: [],
        beacon: [],
        relevantDate: [],
        field: [],
        changeMsg: [],
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
    validateDate(value){
      if (value == null || value == ""){
        this.$message.error("请选择日期");
        return false;
      }
      return true
    },
    checkTemplate(row) {
      return (
        row.location != undefined ||
        row.beacon != undefined ||
        row.relevantDate != undefined
      );
    },
    checkRelevantDateEditing(status) {
      this.relevantDateEditIndex = status.editIndex;
      this.checkEditing();
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
      if (
        this.beaconEditIndex == -1 &&
        this.locationEditIndex == -1 &&
        this.relevantDateEditIndex == -1
      ) {
        this.isEditing = false;
      } else {
        this.isEditing = true;
      }
    },
    submit() {
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
        this.form.relevantDate = this.pkpass.relevantDate.slice();
      }
    },
    getTemp() {
      this.tempShow = true;
      let requestData = {
        merchantId: 14,
        types: ["Pass", "Image", "ChangeMessage"],
      };
      axios
        .post("http://192.168.35.81:8081/union/asset/union_id", requestData)
        .then((response) => {
          let data = response.data;
          this.shareData.pass = data.filter((item) => item.type === 0);
          this.shareData.image = data.filter((item) => item.type === 1);
          this.shareData.changeMsg = data.filter((item) => item.type === 2);
          this.shareData.locations = data.filter((item) => item.type === 3);
          this.shareData.beacon = data.filter((item) => item.type === 4);
          this.shareData.field = data.filter((item) => item.type === 5);
          this.shareData.relevantDate = data.filter((item) => item.type === 6);
          console.log(this.shareData.locations)
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
    useLocations(row) {
      const duplicateKey = this.form.locations.some(
        (r) =>
          (r.pkLocation != undefined &&
            r.pkLocation.latitude === row.changeMessageItem.location.latitude &&
            r.pkLocation.longitude ===
              row.changeMessageItem.location.longitude &&
            r.pkLocation.altitude ===
              row.changeMessageItem.location.altitude) ||
          (r.location != undefined &&
            r.location.latitude === row.changeMessageItem.location.latitude &&
            r.location.longitude === row.changeMessageItem.location.longitude &&
            r.location.altitude === row.changeMessageItem.location.altitude)
      );
      if (duplicateKey) {
        this.$message.error("不能出现经纬度、海拔均相同的location信息！");
        return false;
      }
      if (this.form.locations.length >= this.beaconTableConfig.maxLength) {
        this.$message.error(this.beaconTableConfig.message.maxLength);
        return false;
      }
      this.form.locations.push(row.changeMessageItem);
      this.form.locations = [...this.form.locations];
      this.$message.success("加入成功");
    },
    useBeacon(row) {
      const duplicateKey = this.form.beacons.some(
        (r) =>
          (r.pkBeacon != undefined &&
            r.pkBeacon.proximityUUID ===
              row.changeMessageItem.beacon.proximityUUID) ||
          (r.beacon != undefined &&
            r.beacon.proximityUUID ===
              row.changeMessageItem.beacon.proximityUUID)
      );
      if (duplicateKey) {
        this.$message.error("不能出现UUID相同的beacon信息！");
        return false;
      }
      if (this.form.beacons.length >= this.beaconTableConfig.maxLength) {
        this.$message.error(this.beaconTableConfig.message.maxLength);
        return false;
      }
      this.form.beacons.push(row.changeMessageItem);
      this.form.beacons = [...this.form.beacons];
      this.$message.success("加入成功");
    },
    useRelevantDate(row) {
      if (this.form.relevantDate.length >= this.relevantDateConfig.maxLength) {
        this.$message.error(this.relevantDateConfig.message.maxLength);
        return false;
      }
      this.form.relevantDate.push(row.changeMessageItem);
      this.$message.success("加入成功");
      this.form = { ...this.form };
    },
  },
  mounted() {
    this.reset();
    this.form = this.trigger_form;
    console.log(this.form);
  },
  watch: {
    pkpass() {
      this.reset();
    },
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