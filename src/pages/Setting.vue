<template>
  <div class="set">
    <el-container>
      <el-header>
        <div>
          <h1>PASS DESIGNER</h1>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px"
                  style="background-color: rgb(238, 241, 246);overflow: hidden;">
          <el-menu :default-openeds="['1', '3']">
            <el-submenu index="1"
                        @click="switchComponent('MetaData')">
              <!-- <template slot="title"><i class="el-icon-document"></i>MetaData</template> -->
              <el-menu-item slot="title"
                            @click="switchComponent('MetaData')"><i class="el-icon-document"></i>MetaData</el-menu-item>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title"><i class="el-icon-picture"></i>Image&BGC</template>
              <el-menu-item-group>
                <el-menu-item index="2-1"
                              @click="switchComponent('Logo')">Logo</el-menu-item>
                <!-- <el-menu-item index="2-2">Icon</el-menu-item> -->
                <el-menu-item index="2-2"
                              @click="switchComponent('Stript')">Strip Image</el-menu-item>
                <el-menu-item index="2-3"
                              @click="switchComponent('BackgroundColor')">BackgroundColor</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title"><i class="el-icon-setting"></i>Fields</template>
              <el-menu-item-group>
                <el-menu-item index="3-3"
                              @click="switchComponent('Header')">Header Fields</el-menu-item>
                <el-menu-item index="3-1"
                              @click="switchComponent('Primary')">Primary Fields</el-menu-item>
                <el-menu-item index="3-2"
                              @click="switchComponent('Secondary')">Secondary Fields</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title"><i class="el-icon-user-solid"></i>Personalized Design</template>
            </el-submenu>
            <el-submenu index="5">
              <template slot="title"><i class="el-icon-mobile"></i>Trigger Mechanism</template>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <div class="main">
            <!-- pass样例展示 -->
            <div class="pass">
              <Pass :logo="logo"
                    :strip="strip"
                    :bgc="backgroundColor"
                    :label="labelColor"
                    :logoText="logoText"></Pass>
              <!-- 创建pass按钮 -->
              <el-button type="primary"
                         @click="create">创建<i class="el-icon-upload el-icon--right"></i></el-button>
            </div>
            <!-- 1.基础数据 -->
            <div class="data">
              <MetaData v-if="currentComponent === 'MetaData'"
                        @form-submit="handleFormSubmit"></MetaData>
              <SelectLogo @selectLogo="setLogo"
                          @setLogoText="setLogoText"
                          v-if="currentComponent === 'Logo'"></SelectLogo>
              <SelectStript @selectStrip="setStrip"
                            v-if="currentComponent === 'Stript'"></SelectStript>
              <BackgroundColor @selectBgc="setBgc"
                               @selectLabel="setLabel"
                               v-if="currentComponent === 'BackgroundColor'" />
              <Field v-if="currentComponent === 'Header'"></Field>
              <Field v-if="currentComponent === 'Primary'"></Field>
              <Field v-if="currentComponent === 'Secondary'"></Field>
              <PersonalDesign v-if="currentComponent === 'PersonalDesign'"></PersonalDesign>
            </div>
          </div>
        </el-main>
      </el-container>
      <el-footer>
        <div>
          <h1>底部</h1>
        </div>
      </el-footer>
    </el-container>

  </div>
</template>

<script>
import axios from 'axios';
import MetaData from '../components/MetaData.vue';
import Pass from '../components/Pass.vue';
import SelectLogo from '../components/SelectLogo.vue'
import SelectStript from '../components/SelectStript.vue';
import BackgroundColor from '../components/BackgroundColor.vue';
import Field from '../components/Field.vue';
import qs from 'qs'
export default {
  name: 'Setting',
  components: {
    Pass,
    MetaData,
    SelectLogo,
    SelectStript,
    BackgroundColor,
    Field,
  },
  data () {
    return {
      isFieldsMenuVisible: false,
      logo: '',
      strip: '',
      backgroundColor: '',
      labelColor: '',
      passType: 'PKGenericPass',
      currentComponent: 'MetaData',
      formData: null,
      logoText: '',
      passData: null
    };
  },
  methods: {
    // 组件之间传值
    setLogo (logo) {
      this.logo = logo
    },
    setStrip (strip) {
      this.strip = strip
    },
    switchComponent (componentName) {
      this.currentComponent = componentName;
    },
    setBgc (bgc) {
      this.backgroundColor = bgc
    },
    setLabel (color) {
      this.labelColor = color
    },
    setLogoText (text) {
      this.logoText = text
    },
    handleFormSubmit (formData) {
      this.formData = formData
    },
    // 创建pass
    create () {
      this.passData = Object.assign({}, this.formData, {
        backgroundColor: this.backgroundColor,
        labelColor: this.labelColor,
        logoText: this.logoText
      });
      console.log(this.passData)
      axios.post('http://192.168.35.81:8081/pass/create', this.passData, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

        .then(response => {
          console.log('数据发送成功', response);
        })
        .catch(error => {
          console.error('数据发送失败', error);
        });
    }
  }
}
</script>

<style>
/* 页面样式 */
/* 主体 */
.main {
  display: flex;
  width: 100%;
  height: 700px;
  flex-direction: row;
}
.main .data {
  margin-left: 200px;
}
.pass button {
  margin-top: 30px;
}
</style>
