<!-- DateTimePickerForm.vue -->
<template>
  <div class="date-time-picker-form">
    <el-form>
      <el-form-item :label="label"
                    prop="relevantDate">
        <el-date-picker v-model="datePickerValue"
                        type="datetime"
                        :placeholder="placeholder">
        </el-date-picker>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  props: {
    relevantDate: {
      type: [String, Date]
    },
    label: {
      type: String,
      default: '时间点'
    },
    placeholder: {
      type: String,
      default: '选择日期和时间'
    }
  },
  data () {
    return {
      datePickerValue: null
    };
  },
  created() {
    this.datePickerValue = this.relevantDate; // 在组件创建后设置值
  },
  watch: {
    relevantDate: {
      handler(newValue) {
        this.datePickerValue = newValue; 
      },
      immediate: true 
    },
    datePickerValue (newValue) {
      // console.log(newValue)
      this.$emit('update:relevantDate', newValue);
    }
  }
};
</script>