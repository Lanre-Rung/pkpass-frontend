<template>
  <el-form ref="form" :model="form" :rules="rules" label-width="80px">
    <el-form-item label="字段名" prop="key">
      <el-input v-model="form.key"></el-input>
    </el-form-item>
    <el-form-item label="字段值" prop="value">
      <el-input v-model="form.value"></el-input>
    </el-form-item>
    <el-form-item label="字段标签">
      <el-input v-model="form.label"></el-input>
    </el-form-item>
    <el-form-item label="附加值">
      <el-input v-model="form.attributedValue"></el-input>
    </el-form-item>
    <el-form-item label="修改信息">
      <el-input v-model="form.changeMessage"></el-input>
    </el-form-item>
    <el-form-item label="数据类型">
      <el-select
        v-model="form.dataDetectorTypes"
        multiple
        placeholder="请选择活动区域"
      >
        <el-option
          label="电话"
          value="PKDataDetectorTypePhoneNumber"
        ></el-option>
        <el-option label="链接" value="PKDataDetectorTypeLink"></el-option>
        <el-option label="地址" value="PKDataDetectorTypeAddress"></el-option>
        <el-option
          label="日期"
          value="PKDataDetectorTypeCalendarEvent"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="数字样式">
      <el-select v-model="form.numberStyle" placeholder="请选择数字样式">
        <el-option
          v-for="style in numberStyles"
          :key="style.value"
          :label="style.label"
          :value="style.value"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="对齐方式">
      <el-select v-model="form.textAlignment" placeholder="请选择对齐方式">
        <el-option label="靠左" value="PKTextAlignmentLeft"></el-option>
        <el-option label="靠右" value="PKTextAlignmentRight"></el-option>
        <el-option label="居中" value="PKTextAlignmentCenter"></el-option>
        <el-option label="自然" value="PKTextAlignmentNatural"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="货币代码">
      <el-select
        v-model="form.currencyCode"
        filterable
        allow-create
        placeholder="请选择货币代码"
      >
        <el-option
          v-for="item in currencyCodes"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="无视时区">
      <el-checkbox
        v-model="form.ignoreTimeZone"
        name="无视时区"
      ></el-checkbox>
    </el-form-item>
    <el-form-item label="相对位置">
      <el-checkbox
        v-model="form.isRelative"
        name="相对位置"
      ></el-checkbox>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">修改</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      form: {
        key: "", // 字段名
        value: "", // 字段值
        attributedValue: "", // 附加值
        changeMessage: "", // 修改信息
        dataDetectorTypes: [], // 数据类型
        numberStyle: null, // 数字样式
        textAlignment: null, // 对齐方式
        currencyCode: null, // 货币代码
        ignoreTimeZone: false, // 无视时区
        isRelative: false, // 相对位置
      },
      rules: {
        key: [
          { required: true, message: '字段名是必填项', trigger: 'blur' },
        ],
        value: [
          { required: true, message: '字段值是必填项', trigger: 'blur' },
        ],
      },
      //货币代码
      currencyCodes: [
        {
          value: "USD",
          label: "USD",
        },
        {
          value: "EUR",
          label: "EUR",
        },
        {
          value: "CNY",
          label: "CNY",
        },
        {
          value: "GBP",
          label: "GBP",
        },
        {
          value: "JPY",
          label: "JPY",
        },
        {
          value: "AUD",
          label: "AUD",
        },
        {
          value: "CAD",
          label: "CAD",
        },
        {
          value: "CHF",
          label: "CHF",
        },
        {
          value: "INR",
          label: "INR",
        },
        {
          value: "BRL",
          label: "BRL",
        },
      ],
      numberStyles: [
        {
          value: "PKNumberStyleDecimal",
          label: "小数",
        },
        {
          value: "PKNumberStylePercent",
          label: "百分比",
        },
        {
          value: "PKNumberStyleScientific",
          label: "科学计数",
        },
        {
          value: "PKNumberStyleSpellOut",
          label: "拼写出数字",
        },
      ],
    };
  },
  props : {
    field : Object,
    index : Number,
  },
  methods: {
    //提交时
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$emit('update-field', this.form, this.index);
        } else {
          this.$message.error('请填入必填字段');
          return false;
        }
      });
    },
  },
  mounted() {
    // Initialize form with field data
    this.form = { ...this.field };
  },
};
</script>