<template>
  <div class="set">
    <el-container>
      <el-header>
        <div>
          <h1>PASS DESIGNER</h1>
        </div>
      </el-header>
      <el-container>
        <el-aside
          width="200px"
          style="background-color: rgb(238, 241, 246); overflow: hidden"
        >
          <el-menu :default-openeds="['1', '3']">
            <el-submenu index="1">
              <el-menu-item slot="title" @click="switchComponent('MetaData')"
                ><i class="el-icon-document"></i>MetaData</el-menu-item
              >
            </el-submenu>
            <el-submenu index="2">
              <template slot="title"
                ><i class="el-icon-picture"></i>Image&BGC</template
              >
              <el-menu-item-group>
                <el-menu-item index="2-1" @click="switchComponent('logo')"
                  >Logo</el-menu-item
                >
                <el-menu-item index="2-2" @click="switchComponent('strip')"
                  >Strip Image</el-menu-item
                >
                <el-menu-item index="2-3" @click="switchComponent('icon')"
                  >Icon</el-menu-item
                >
                <el-menu-item
                  index="2-4"
                  @click="switchComponent('BackgroundColor')"
                  >BackgroundColor</el-menu-item
                >
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title"
                ><i class="el-icon-setting"></i>Fields</template
              >
              <el-menu-item-group>
                <el-menu-item index="3-1" @click="switchComponent('Primary')"
                  >Primary Fields</el-menu-item
                >
                <el-menu-item index="3-2" @click="switchComponent('Secondary')"
                  >Secondary Fields</el-menu-item
                >
                <el-menu-item index="3-3" @click="switchComponent('Header')"
                  >Header Fields</el-menu-item
                >
                <el-menu-item index="3-4" @click="switchComponent('Auxiliary')"
                  >Auxiliary Fields</el-menu-item
                >
                <el-menu-item index="3-5" @click="switchComponent('Back')"
                  >Back Fields</el-menu-item
                >
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="4">
              <el-menu-item
                slot="title"
                @click="switchComponent('Personalization')"
                ><i class="el-icon-user-solid"></i>Personalized
                Design</el-menu-item
              >
            </el-submenu>
            <el-submenu index="5">
              <el-menu-item slot="title" @click="switchComponent('Trigger')"
                ><i class="el-icon-mobile"></i>Trigger Mechanism</el-menu-item
              >
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <div class="main">
            <!-- pass样例展示 -->
            <div class="pass">
              <Pass
                :logo="pkpass.logo"
                :strip="pkpass.strip"
                :bgc="pkpass.backgroundColor"
                :label="pkpass.labelColor"
                :logoText="pkpass.logoText"
              ></Pass>
              <!-- 创建pass按钮 -->
              <el-button type="primary" @click="create" :disabled="isDisabled"
                >上传<i class="el-icon-upload el-icon--right"></i
              ></el-button>
              <!-- 导入pass按钮 -->
              <el-button type="primary" @click="create" :disabled="isDisabled"
                >导入<i class="el-icon-upload el-icon--right"></i
              ></el-button>
            </div>
            <!-- 1.基础数据 -->
            <div class="data">
              <MetaData
                v-if="currentComponent === 'MetaData'"
                @form-submit="handleFormSubmit"
                :ini="ruleForm"
              ></MetaData>
              <ImageEditor
                @edit-image="editImage"
                :type="currentComponent"
                :image="pkpass[currentComponent]"
                v-if="currentComponent === 'logo' || currentComponent === 'strip' || currentComponent === 'icon'"
              ></ImageEditor>
              <BackgroundColor
                @selectBgc="setBgc"
                @selectLabel="setLabel"
                @selectforegroundColor="setForegroundColor"
                v-if="currentComponent === 'BackgroundColor'"
              />
              <Field
                v-if="currentComponent === 'Header'"
                :fields="pkpass.headerFields"
              ></Field>
              <Field
                v-if="currentComponent === 'Primary'"
                :fields="pkpass.primaryFields"
              ></Field>
              <Field
                v-if="currentComponent === 'Secondary'"
                :fields="pkpass.secondaryFields"
              ></Field>
              <Field
                v-if="currentComponent === 'Auxiliary'"
                :fields="pkpass.auxiliaryFields"
              ></Field>
              <Field
                v-if="currentComponent === 'Back'"
                :fields="pkpass.backFields"
              ></Field>
              <Personalization
                v-if="currentComponent === 'Personalization'"
                @Personalization="updatePersonalization"
                style="width: 800px"
              ></Personalization>
              <Trigger
                v-if="currentComponent === 'Trigger'"
                :pkpass="pkpass"
                @update-trigger="updateTrigger"
              ></Trigger>
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
import axios from "axios";
import MetaData from "../components/MetaData.vue";
import Pass from "../components/Pass.vue";
import ImageEditor from "../components/ImageEditor.vue";
import BackgroundColor from "../components/BackgroundColor.vue";
import Field from "../components/Field.vue";
import Personalization from "../components/Personalization/Personalization.vue";
import Trigger from "../components/Trigger.vue";

export default {
  name: "Setting",
  components: {
    Pass,
    MetaData,
    ImageEditor,
    BackgroundColor,
    Field,
    Personalization,
    Trigger,
  },
  data() {
    return {
      pkpass: {
        locations: [],
        beacons: [],
        primaryFields: [],
        secondaryFields: [],
        headerFields: [],
        auxiliaryFields: [],
        backFields: [],
        logo: "",
        strip: "",
        icon: "",
        backgroundColor: "",
        labelColor: "",
        foregroundColor: "",
        passType: "PKGenericPass",
        logoText: "",
        personalization: null,
        passData: null,
      },
      currentComponent: "MetaData",
      ruleForm: {},
      isFieldsMenuVisible: false,
    };
  },
  computed: {
    isDisabled() {
      return !(this.ruleForm && this.icon && this.logo);
    },
  },
  methods: {
    // 组件之间传值
    editImage(editData){
      this.pkpass[editData.type] = editData.image;
      if (editData.logoText){
        this.pkpass.logoText = editData.logoText;
      }
    },
    setBgc(bgc) {
      this.backgroundColor = bgc;
    },
    setLabel(color) {
      this.pkpass.labelColor = color;
    },
    setForegroundColor(color) {
      this.pkpass.foregroundColor = color;
    },
    updatePersonalization(event) {
      this.personalization = event;
    },
    updateTrigger(formData) {
      this.pkpass.locations = formData.locations;
      this.pkpass.beacons = formData.locations;
      this.$message.success("修改成功");
    },
    switchComponent(componentName) {
      this.currentComponent = componentName;
    },
    handleFormSubmit(formData) {
      this.ruleForm = formData;
    },
    // 创建pass
    create() {
      this.passData = Object.assign({}, this.ruleForm, pkpass);
      console.log(this.passData);
      axios
        .post("http://192.168.35.81:8081/pass", this.passData, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log("数据发送成功", response);
        })
        .catch((error) => {
          console.error("数据发送失败", error);
        });
    },
  },
};
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
.main .pass {
  margin-left: 100px;
}
.main .data {
  display: flex;
  margin-left: 200px;
}
.pass button {
  margin-top: 30px;
}
</style>
