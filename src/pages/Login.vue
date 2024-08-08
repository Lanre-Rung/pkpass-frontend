<template>
  <div class="login-form">
    <el-form :model="loginForm"
             :rules="loginRules"
             ref="loginForm"
             label-width="100px"
             class="demo-ruleForm">
      <el-form-item label="用户名"
                    prop="username">
        <el-input v-model="loginForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码"
                    prop="password">
        <el-input type="password"
                  v-model="loginForm.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="submitForm">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '密码长度不能少于6位', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitForm () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          alert('提交登录信息: ' + JSON.stringify(this.loginForm));

        } else {
          console.error('表单验证失败');
          return false;
        }
      });
    }
  }
};
</script>

<style>
.login-form {
  width: 50%;
  margin-top: 100px;
}
</style>