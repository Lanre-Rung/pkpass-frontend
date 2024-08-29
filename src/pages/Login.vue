<template>
  <el-card class="auth-card">
    <el-tabs v-model="activeTab">
      <el-tab-pane label="登录"
                   name="login">
        <!-- 登录表单 -->
        <el-form :model="loginForm"
                 :rules="loginRules"
                 ref="loginForm">
          <el-form-item label="邮箱/手机号"
                        prop="emailOrPhone">
            <el-input v-model="loginForm.emailOrPhone"></el-input>
          </el-form-item>
          <el-form-item label="密码"
                        prop="password">
            <el-input type="password"
                      v-model="loginForm.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
                       @click="submitLoginForm">登录</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="注册"
                   name="register">
        <!-- 注册表单 -->
        <el-form :model="registerForm"
                 :rules="registerRules"
                 ref="registerForm">
          <el-form-item label="商户名称"
                        prop="name">
            <el-input v-model="registerForm.name"></el-input>
          </el-form-item>
          <el-form-item label="邮箱"
                        prop="email">
            <el-input v-model="registerForm.email"></el-input>
          </el-form-item>
          <el-form-item label="手机号"
                        prop="phone">
            <el-input v-model="registerForm.phone"></el-input>
          </el-form-item>
          <el-form-item label="密码"
                        prop="password">
            <el-input type="password"
                      v-model="registerForm.password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码"
                        prop="confirmPassword">
            <el-input type="password"
                      v-model="registerForm.confirmPassword"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
                       @click="submitRegisterForm">注册</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="忘记密码"
                   name="forgot">
        <!-- 忘记密码表单 -->
        <el-form :model="forgotForm"
                 :rules="forgotRules"
                 ref="forgotForm">
          <el-form-item label="邮箱/手机号"
                        prop="username">
            <el-input v-model="forgotForm.username"></el-input>
          </el-form-item>
          <el-form-item label="新密码"
                        prop="newPassword">
            <el-input type="password"
                      v-model="forgotForm.newPassword"></el-input>
          </el-form-item>
          <el-form-item label="确认新密码"
                        prop="confirmNewPassword">
            <el-input type="password"
                      v-model="forgotForm.confirmNewPassword"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
                       @click="submitForgotForm">重置密码</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
import axios from "axios";
export default {
  data () {
    return {
      activeTab: 'login', // 默认选中登录
      loginForm: {
        emailOrPhone: '',
        password: ''
      },
      registerForm: {
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
      },
      forgotForm: {
        username: '',
        newPassword: '',
        confirmNewPassword: ''
      },
      loginRules: {
        emailOrPhone: [
          { required: true, message: '请输入邮箱/手机号', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '密码长度不能少于6位', trigger: 'blur' }
        ]
      },
      registerRules: {
        name: [
          { required: true, message: '请输入邮箱/手机号', trigger: 'blur' },
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          // { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '密码长度不能少于6位', trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, message: '请确认密码', trigger: 'blur' },
          { validator: this.confirmPasswordValidator, trigger: 'blur' }
        ]
      },
      forgotRules: {
        username: [
          { required: true, message: '请输入邮箱/手机号', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { min: 6, message: '密码长度不能少于6位', trigger: 'blur' }
        ],
        confirmNewPassword: [
          { required: true, message: '请确认新密码', trigger: 'blur' },
          { validator: this.confirmPasswordValidator, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    confirmPasswordValidator (rule, value, callback) {
      if (value !== this.registerForm.password) {
        callback(new Error('两次输入的密码不一致'));
      } else {
        callback();
      }
    },
    submitLoginForm () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.login()
        }
      });
    },
    submitRegisterForm () {
      this.$refs.registerForm.validate((valid) => {
        if (valid) {
          this.registerUser();
        }
      });
    },
    submitForgotForm () {
      this.$refs.forgotForm.validate((valid) => {
        if (valid) {
          alert('密码重置成功');
          // 这里添加忘记密码逻辑
        }
      });
    },
    registerUser () {
      const registerData = {
        name: this.registerForm.name,
        email: this.registerForm.email,
        phone: this.registerForm.phone,
        password: this.registerForm.password
      };
      axios.post('http://192.168.35.81:8081/merchants/signup', registerData)
        .then(response => {
          console.log('注册成功，服务器响应：', response);
          if (response.data === 'email exists') {
            alert('该邮箱已被注册过，请重新填写')
          }
          else if (response.data === 'phone exists') {
            alert('该电话号码已被注册过，请重新填写')
          }
          else {
            this.$message.success('注册成功！');
            localStorage.setItem('name', this.registerForm.name);
            console.log(localStorage.getItem('name'))
            this.activeTab = 'login'
          }
        })
        .catch(error => {
          console.error('注册失败：', error);
          this.$message.error('注册失败，请稍后重试。');
        });
    },
    login () {
      const loginData = this.loginForm
      axios.post('http://192.168.35.81:8081/merchants/login', loginData)
        .then(response => {
          console.log('登录成功，服务器响应：', response);
          const merchantId = JSON.stringify(response.data);
          localStorage.setItem('merchantId', merchantId);
          this.$router.push('/index');
        })
        .catch(error => {
          console.error('登录失败：', error);
          this.$message.error('登录失败，请稍后重试。');
        });
    }
  }
};
</script>

<style scoped>
.auth-card {
  width: 360px;
  margin: 100px auto;
}
</style>