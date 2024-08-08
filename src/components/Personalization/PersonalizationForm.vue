<template>
  <el-form ref="form"
           :model="form"
           :rules="rules"
           label-width="80px">
    <el-form-item label="描述"
                  prop="description">
      <el-input placeholder="请输入内容"
                v-model="form.description"
                clearable>
      </el-input>
    </el-form-item>
    <el-form-item label="包含内容"
                  prop="requiredPersonalizationFields">
      <el-checkbox-group v-model="form.requiredPersonalizationFields">
        <el-checkbox v-for="item in checkboxItems"
                     :key="item.value"
                     :label="item.value">
          {{ item.label }}
        </el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="条款"
                  prop="termsAndConditions"
                  class="terms-item">
      <div class="editor-preview-container">
        <vue-html5-editor ref="editor"
                          @change="contentChange"
                          :content="form.termsAndConditions"
                          :height="400"
                          :z-index="1000"></vue-html5-editor>
        <div class="terms-preview"
             v-html="form.termsAndConditions"></div>
      </div>
    </el-form-item>
    <el-form-item>
      <el-button type="primary"
                 @click="submitForm()">保存</el-button>
      <el-button @click="resetForm()">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data () {
    return {
      form: {
        description: "",
        requiredPersonalizationFields: [],
        termsAndConditions: "",
      },
      rules: {
        description: [
          { required: true, message: "请输入描述", trigger: "blur" },
        ],
        requiredPersonalizationFields: [
          {
            type: "array",
            required: true,
            message: "请至少选择一项包含内容",
            trigger: "change",
          },
        ],
      },
      checkboxItems: [
        { value: "PKPassPersonalizationFieldName", label: "名称" },
        { value: "PKPassPersonalizationFieldPostalCode", label: "邮编" },
        { value: "PKPassPersonalizationFieldEmailAddress", label: "邮箱地址" },
        { value: "PKPassPersonalizationFieldPhoneNumber", label: "电话号码" },
      ],
    };
  },
  props: {
    personalization: Object,
  },
  methods: {
    // 内容更新时
    contentChange (result) {
      this.form.termsAndConditions = result;
    },
    //提交时
    submitForm () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$emit("update-personalization", this.form);
        } else {
          this.$message.error("请填入必填字段");
          return false;
        }
      });
    },
    resetForm () {
      console.log(this.personalization);
      this.form = Object.assign({}, this.personalization);
    },
  },
  mounted () {
    this.form = Object.assign({}, this.personalization);
    // console.log(this.form)
  },
};
</script>

<style>
.terms-item {
  position: relative;
}

.editor-preview-container {
  display: flex;
  justify-content: space-between;
}

.editor-preview-container .vue-html5-editor {
  flex: 1;
  margin: 0 10px;
  max-width: 50%;
}

.editor-preview-container .content,
.editor-preview-container .terms-preview {
  flex: 1;
  margin: 0 10px;
  overflow: auto;
  max-height: 500px;
}

.terms-preview {
  border: 1px solid #ccc;
  padding: 10px;
}
.terms-item a {
  text-decoration: underline; /* Adds an underline to links */
  color: #0066cc; /* Sets the color of the links */
}
.terms-item a:hover:after {
  position: relative;
  content: attr(href);
  white-space: nowrap;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  padding: 5px;
  border-radius: 5px;
  left: 0;
  bottom: 100%;
  margin-bottom: 10px;
  color: #333;
  font-size: 0.8em;
  z-index: 20;
}
</style>