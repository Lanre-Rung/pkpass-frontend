<template>
  <el-form :model="ruleForm"
           :rules="rules"
           ref="ruleForm"
           label-width="200px"
           class="demo-ruleForm">
    <el-form-item label="PASS NAME"
                  prop="name">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
    <el-form-item label="PASS TYPE IDENTIFIER"
                  prop="passTypeIdentifier">
      <el-input v-model="ruleForm.passTypeIdentifier"></el-input>
    </el-form-item>
    <el-form-item label="SERIAL NUMBER"
                  prop="serialNumber">
      <el-input v-model="ruleForm.serialNumber"></el-input></el-form-item>
    <el-form-item label="DESCRIPTION"
                  prop="description">
      <el-input v-model="ruleForm.description"></el-input>
    </el-form-item>
    <el-form-item label="ORGANIZATION NAME">
      <el-input v-model="ruleForm.organizationName"></el-input>
    </el-form-item>
    <el-form-item label="TEAM IDENTIFIER"
                  prop="teamIdentifier">
      <el-input v-model="ruleForm.teamIdentifier"></el-input>
    </el-form-item>
    <el-form-item label="APP LAUNCH URL">
      <el-input v-model="ruleForm.appLaunchURL"></el-input>
    </el-form-item>
    <el-form-item label="AUTHENTICATION TOKEN">
      <el-input v-model="ruleForm.authenticationToken"></el-input>
    </el-form-item>
    <el-form-item label="WEB SERVICE URL">
      <el-input v-model="ruleForm.webServiceURL"></el-input>
    </el-form-item>
    <el-button type="primary"
               @click="submitForm('ruleForm')">确定</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form>

</template>
<script>
export default {
  props: {
    ini: {
      type: Object
    }
  },
  data () {
    return {
      ruleForm: {
        name: '',
        ownerId: 1,
        serialNumber: '',
        description: '',
        organizationName: '',
        passTypeIdentifier: '',
        teamIdentifier: '',
        appLaunchURL: '',
        authenticationToken: '',
        webServiceURL: '',
      },
      rules: {
        name: [
          { required: true, message: '请输入相关描述', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        organizationName: [
          { required: true, message: '请输入相关组织名称', trigger: 'change' }
        ],
        passTypeIdentifier: [
          { required: true, message: '请输入PASS TYPE IDENTIFIER', trigger: 'change' }
        ],
        serialNumber: [
          { required: true, message: '请输入TEAM IDENTIFIER', trigger: 'change' }
        ]
      }
    };
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$message.success("修改成功");
          this.$emit('form-submit', this.ruleForm);
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm (formName) {
      this.$refs[formName].resetFields();
    },
  },
  mounted () {
    this.ruleForm = this.ini;
  },
}
</script>
<style scoped>
</style>