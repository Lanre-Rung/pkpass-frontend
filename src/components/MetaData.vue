<template>
  <el-form :model="ruleForm"
           :rules="rules"
           ref="ruleForm"
           label-width="200px"
           class="demo-ruleForm">
    <el-form-item label="DESCRIPTION"
                  prop="description">
      <el-input v-model="ruleForm.description"></el-input>
    </el-form-item>
    <el-form-item label="ORGANIZATION NAME"
                  prop="organization_name">
      <el-input v-model="ruleForm.organization_name"></el-input>
    </el-form-item>
    <el-form-item label="PASS TYPE IDENTIFILE"
                  prop="type">
      <el-input v-model="ruleForm.type"></el-input>
    </el-form-item>
    <el-form-item label="TEAM IDENTIFILE"
                  prop="team">
      <el-input v-model="ruleForm.team"></el-input>
    </el-form-item>
    <el-form-item label="APP LAUNCH URL">
      <el-input v-model="ruleForm.url"></el-input>
    </el-form-item>
    <el-form-item label="ASSOCIATED STORE IDENTIFILES">
      <el-input v-model="ruleForm.associated"></el-input>
    </el-form-item>
    <el-form-item label="AUTHENTICATION TOKEN">
      <el-input v-model="ruleForm.token"></el-input>
    </el-form-item>
    <el-form-item label="WEB SERVICE URL">
      <el-input v-model="ruleForm.service"></el-input>
    </el-form-item>
    <el-form-item label="GROUPING IDENTIFILEs">
      <el-input v-model="ruleForm.grouping"></el-input>
    </el-form-item>
    <el-button type="primary"
               @click="submitForm('ruleForm')">确定</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form>

</template>
<script>
export default {
  data () {
    return {
      ruleForm: {
        description: '',
        organization_name: '',
        type: '',
        team: '',
        url: '',
        associated: '',
        token: '',
        service: '',
        grouping: ''
      },
      rules: {
        description: [
          { required: true, message: '请输入相关描述', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        organization_name: [
          { required: true, message: '请输入相关组织名称', trigger: 'change' }
        ],
        type: [
          { required: true, message: '请输入PASS TYPE IDENTIFILE', trigger: 'change' }
        ],
        team: [
          { required: true, message: '请输入TEAM IDENTIFILE', trigger: 'change' }
        ]
      }
    };
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm (formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>
<style scoped>
</style>