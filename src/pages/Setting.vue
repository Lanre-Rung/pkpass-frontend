<template>
  <div class="set">
    <router-view></router-view>
    <div class="header">
      <h1>PASS DESIGNER</h1>
    </div>
    <div>
      <div style="background-color: rgb(238, 241, 246); "
           class="nav">
        <el-menu :default-openeds="[]">
          <el-submenu index="1">
            <el-menu-item slot="title"
                          @click="switchComponent('MetaData')"><i class="el-icon-document"></i>MetaData</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-picture"></i>Image&BGC</template>
            <el-menu-item-group>
              <el-menu-item index="2-1"
                            @click="switchComponent('logo')">Logo</el-menu-item>
              <el-menu-item index="2-2"
                            @click="switchComponent('strip')">Strip Image</el-menu-item>
              <el-menu-item index="2-3"
                            @click="switchComponent('icon')">Icon</el-menu-item>
              <el-menu-item index="2-4"
                            @click="switchComponent('BackgroundColor')">BackgroundColor</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-setting"></i>Fields</template>
            <el-menu-item-group>
              <el-menu-item index="3-1"
                            @click="switchComponent('Primary')">Primary Fields</el-menu-item>
              <el-menu-item index="3-2"
                            @click="switchComponent('Secondary')">Secondary Fields</el-menu-item>
              <el-menu-item index="3-3"
                            @click="switchComponent('Header')">Header Fields</el-menu-item>
              <el-menu-item index="3-4"
                            @click="switchComponent('Auxiliary')">Auxiliary Fields</el-menu-item>
              <el-menu-item index="3-5"
                            @click="switchComponent('Back')">Back Fields</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <el-menu-item slot="title"
                          @click="switchComponent('Personalization')"><i class="el-icon-user-solid"></i>Personalized
              Design</el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <el-menu-item slot="title"
                          @click="switchComponent('Trigger')"><i class="el-icon-mobile"></i>Trigger Mechanism</el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
      <el-container class="content">
        <el-main style="height: 1000px;">
          <div class="main">
            <!-- 上一张 -->
            <el-button type="primary"
                       round
                       style="margin-left: 300px;"
                       @click="prePass">上一个pass</el-button>
            <!-- pass样例展示 -->
            <div class="pass">
              <Pass :logo="pkpass.logo"
                    :strip="pkpass.strip"
                    :bgc="pkpass.backgroundColor"
                    :label="pkpass.labelColor"
                    :logoText="pkpass.logoText"></Pass>
              <!-- 创建pass按钮 -->
              <el-button type="primary"
                         @click="create(false)"
                         :disabled="isDisabled"
                         v-if="mode==='create'||mode==='temp'">创建<i class="el-icon-upload el-icon--right"></i></el-button>
              <!-- 导入pass按钮 -->
              <el-button type="primary"
                         @click="upload"
                         v-if="mode==='create'">导入<i class="el-icon-upload el-icon--right"></i></el-button>
              <!-- 修改按钮 -->
              <el-button type="primary"
                         @click="mulEdit"
                         v-if="mode==='edit'">确认修改<i class="el-icon-upload el-icon--right"></i></el-button>
              <!-- 保存为模板 -->
              <el-button plain
                         @click="savePass"
                         v-if="mode==='create'||mode==='edit'">存为模板</el-button>
              <!-- 修改模板 -->
              <el-button plain
                         @click="mulEdit()"
                         v-if="mode==='temp'">修改模板</el-button>
              <!-- 删除模板 -->
              <el-button type="danger"
                         v-if="mode==='temp'"
                         @click="deletePass">删除模板</el-button>
            </div>
            <!-- 1.基础数据 -->
            <div class="data">
              <MetaData v-if="currentComponent === 'MetaData'"
                        @form-submit="handleFormSubmit"
                        :metaData="metaData"></MetaData>
              <ImageEditor @edit-image="editImage"
                           :type="currentComponent"
                           :image="pkpass[currentComponent]"
                           :logoText="pkpass.logoText"
                           v-if="
                  currentComponent === 'logo' ||
                  currentComponent === 'strip' ||
                  currentComponent === 'icon'
                "></ImageEditor>
              <BackgroundColor @selectBgc="setBgc"
                               @selectLabel="setLabel"
                               @selectforegroundColor="setForegroundColor"
                               :backgroundColor="pkpass.backgroundColor"
                               :labelColor="pkpass.labelColor"
                               :foregroundColor="pkpass.foregroundColor"
                               v-if="currentComponent === 'BackgroundColor'" />
              <Field v-if="currentComponent === 'Header'"
                     :fields="HeaderFields"></Field>
              <Field v-if="currentComponent === 'Primary'"
                     :fields="PrimaryFields"></Field>
              <Field v-if="currentComponent === 'Secondary'"
                     :fields="SecondaryFields"></Field>
              <Field v-if="currentComponent === 'Auxiliary'"
                     :fields="AuxiliaryFields"></Field>
              <Field v-if="currentComponent === 'Back'"
                     :fields="BackFields"></Field>
              <Personalization v-if="currentComponent === 'Personalization'"
                               @Personalization="updatePersonalization"
                               :personalization="pkpass.personalization"
                               style="width: 800px"></Personalization>
              <Trigger v-if="currentComponent === 'Trigger'"
                       :pkpass="pkpass"
                       :trigger_form="trigger_form"
                       @update-trigger="updateTrigger"></Trigger>
            </div>
            <!-- 下一个 -->
            <el-button type="primary"
                       @click="nextPass"
                       round>下一个pass</el-button>
            <!-- 在你的组件模板中的合适位置 -->
            <div class="page">
              <p>当前PASS编号:{{ passId }}</p>
              <p>当前Pass：{{ currentPage }}/{{ totalPages }}</p>
            </div>
          </div>
        </el-main>
      </el-container>
    </div>
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
import JSZip from 'jszip';
export default {
  name: "Setting",
  props: ['id'],
  components: {
    Pass,
    MetaData,
    ImageEditor,
    BackgroundColor,
    Field,
    Personalization,
    Trigger,
  },
  data () {
    return {
      mode: 'create',
      edit_pkpass: {
        dataLocations: null,
        dataBeacons: null,
        dataPrimaryFields: null,
        dataSecondaryFields: null,
        dataHeaderFields: null,
        dataAuxiliaryFields: null,
        dataBackFields: null,
        dataRelevantDate: null,
        logo: null,
        strip: null,
        icon: null,
        backgroundColor: null,
        labelColor: null,
        foregroundColor: null,
        passType: null,
        logoText: null,
        personalization: null,
        passData: null,
      },
      pkpass: {
        dataLocations: [],
        dataBeacons: [],
        dataPrimaryFields: [],
        dataSecondaryFields: [],
        dataHeaderFields: [],
        dataAuxiliaryFields: [],
        dataBackFields: [],
        dataRelevantDate: null,
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
      metaData: {
        name: '',
        passTypeIdentifier: '',
        serialNumber: '',
        description: '',
        organizationName: '',
        teamIdentifier: '',
        appLaunchURL: '',
        authenticationToken: '',
        webServiceURL: ''
      },
      edit_metaData: {
        name: null,
        passTypeIdentifier: null,
        serialNumber: null,
        description: null,
        organizationName: null,
        teamIdentifier: null,
        appLaunchURL: null,
        authenticationToken: null,
        webServiceURL: null
      },
      trigger_form: {
        relevantDate: "",
        locations: [],
        beacons: [],
      },
      field: {
        headerFields: [],
        auxiliaryFields: [],
        backFields: [],
        secondaryFields: [],
        primaryFields: []
      },
      currentComponent: "MetaData",
      isFieldsMenuVisible: false,
      passData: null,
      passId: null,
      selectedIds: [],
      currentIdIndex: 0,
      HeaderFields: [],
      BackFields: [],
      AuxiliaryFields: [],
      PrimaryFields: [],
      SecondaryFields: [],
    };
  },
  computed: {
    isDisabled () {
      return !(this.metaData && this.pkpass.icon && this.pkpass.logo);
    },
    currentPage () {
      return this.currentIdIndex + 1; // 加1是因为索引通常从0开始，但用户看到的页面编号通常从1开始
    },
    totalPages () {
      return this.selectedIds.length;
    }
  },
  methods: {
    // 组件之间传值
    editImage (editData) {
      let temp = { ...this.pkpass };
      temp[editData.type] = editData.image;
      this.pkpass = { ...temp };
      if (editData.logoText) {
        this.pkpass.logoText = editData.logoText;
      }
    },
    setBgc (bgc) {
      let temp = { ...this.pkpass };
      temp.backgroundColor = bgc;
      this.pkpass = { ...temp };
    },
    setLabel (color) {
      let temp = { ...this.pkpass };
      temp.labelColor = color;
      this.pkpass = { ...temp };
      this.pkpass.labelColor = color;
      console.log('label', this.pkpass.labelColor)
    },
    setForegroundColor (color) {
      let temp = { ...this.pkpass };
      temp.foregroundColor = color;
      this.pkpass = { ...temp };
    },
    updatePersonalization (formData) {
      let temp = { ...this.pkpass };
      temp.personalization = formData;
      this.pkpass = { ...temp };
    },
    updateTrigger (formData) {
      let temp = { ...this.pkpass };
      temp.dataLocations = formData.locations;
      temp.dataBeacons = formData.beacons;
      temp.dataRelevantDate = formData.relevantDate[0];
      this.pkpass = { ...temp };
      this.$message.success("修改成功");
    },
    switchComponent (componentName) {
      this.currentComponent = componentName;
    },
    handleFormSubmit (formData) {
      this.metaData = formData;
    },
    //路由解析
    parseIdsFromQuery () {
      const idsQuery = this.$route.query.ids;
      if (idsQuery) {
        try {
          // 尝试将查询参数的字符串解析为JSON数组
          const ids = JSON.parse(decodeURIComponent(idsQuery));
          if (Array.isArray(ids)) {
            console.log('Received IDs:', ids);
            this.selectedIds = ids;
          } else {
            console.error('Query parameter "ids" is not an array');
          }
        } catch (e) {
          console.error('Error parsing query parameter "ids":', e);
        }
      }
    },
    // 创建pass
    create (isTemplate) {
      this.passData = Object.assign({}, this.metaData, this.pkpass);
      this.passData.ownerId = localStorage.getItem('merchantId');
      this.dataHeaderFields = this.HeaderFields
      if (isTemplate) {
        this.passData.isTemplate = isTemplate
      }
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
    //导入一个pass
    upload () {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.pkpass';
      input.click();
      // 监听文件选择后的变化
      input.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
          //解压文件
          this.convertAndExtractPkPass(file);
        }
      });
    },
    //解压pkpass文件 并读取
    convertAndExtractPkPass (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        (async () => {
          try {
            const arrayBuffer = e.target.result;
            const zip = await JSZip.loadAsync(arrayBuffer);
            const logoImagePath = 'logo.png';
            const stripImagePath = 'strip.png';
            const iconImagePath = 'icon.png';
            const passJsonPath = 'pass.json';
            const results = await Promise.all([
              zip.file(logoImagePath).async('base64'),
              zip.file(stripImagePath).async('base64'),
              zip.file(iconImagePath).async('base64'),
              zip.file(passJsonPath).async('text')
            ]);
            const [logoBase64, stripBase64, iconBase64, passJsonText] = results;
            // 设置pkpass的图片
            this.pkpass.logo = `data:image/png;base64,${logoBase64}`;
            this.pkpass.strip = `data:image/png;base64,${stripBase64}`;
            this.pkpass.icon = `data:image/png;base64,${iconBase64}`;

            // 解析pass.json文件的JSON数据
            const passJsonData = JSON.parse(passJsonText);
            console.log('pass.json文件内容：', passJsonData);

            //设置pass的属性
            Object.keys(passJsonData).forEach((key) => {
              if (this.pkpass.hasOwnProperty(key)) {
                this.pkpass[key] = passJsonData[key];
              }
            });
            //console.log('复制后的pkpass对象：', this.pkpass);

            //设置MetaData
            Object.keys(this.metaData).forEach((key) => {
              if (passJsonData.hasOwnProperty(key)) {
                this.metaData[key] = passJsonData[key];
              }
            });

            //提取fields字段部分
            // console.log(passJsonData.storeCard)
            const fields = passJsonData.storeCard
            this.pkpass.auxiliaryFields = fields.auxiliaryFields
            this.pkpass.backFields = fields.backFields
            this.pkpass.headerFields = fields.headerFields
            this.pkpass.primaryFields = fields.primaryFields
            this.pkpass.secondaryFields = fields.secondaryFields
            this.metaData = { ...this.metaData };
            this.pkpass = { ...this.pkpass };
            console.log('pkpass', this.pkpass)



          } catch (error) {
            console.error('读取文件或处理ZIP时出错：', error);
          }
        })();
      };
      reader.readAsArrayBuffer(file);
    },
    dataURLtoFile (dataurl, filename) {
      const byteCharacters = atob(dataurl);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'application/zip' });
      return new File([blob], filename);
    },
    //编辑pass
    checkMode () {
      if (this.$route.path.startsWith('/edit')) {
        this.mode = 'edit';
        this.parseIdsFromQuery();
        const minId = Math.min(...this.selectedIds);
        this.passId = minId;
        this.editPass(this.passId);
      } else if (this.$route.path.startsWith('/temp')) {
        this.mode = 'temp';
        this.passId = this.$route.query.ids;
        this.editPass(this.passId);
      } else {
        this.mode = 'create'
      }
    },
    editPass (id) {
      axios.get(`http://192.168.35.81:8081/pass/edit/${id}`)
        .then(response => {
          console.log(response)
          const file = response.data.fileData
          let logoBase64 = file['logo.png'];
          let iconBase64 = file['icon.png'];
          let stripBase64 = file['strip.png'];

          this.pkpass.logo = `data:image/png;base64,${logoBase64}`
          this.pkpass.icon = `data:image/png;base64,${iconBase64}`
          this.pkpass.strip = `data:image/png;base64,${stripBase64}`

          // console.log(this.pkpass.logo)
          Object.keys(file['pass.json']).forEach((key) => {
            if (this.pkpass.hasOwnProperty(key)) {
              this.pkpass[key] = file['pass.json'][key];
            }
          });


          //设置MetaData
          //设置MetaData
          Object.keys(this.metaData).forEach((key) => {
            if (file["pass.json"].hasOwnProperty(key)) {
              this.metaData[key] = file["pass.json"][key];
            }
            this.metaData['name'] = response.data.passData.name
          });

          this.trigger_form.locations = file["pass.json"].dataLocations;

          this.trigger_form.beacons = file["pass.json"].dataBeacons;

          this.trigger_form.relevantDate = [];
          if (file["pass.json"].dataRelevantDate) {
            this.trigger_form.relevantDate.push(
              file["pass.json"].dataRelevantDate
            );
          }

          //4.field
          for (let i = 0; i < file['pass.json'].dataAuxiliaryFields.length; i++) {
            if (file['pass.json'].dataAuxiliaryFields[i] && file['pass.json'].dataAuxiliaryFields[i].pkField) {
              this.AuxiliaryFields.push(file['pass.json'].dataAuxiliaryFields[i].pkField);
            }
          }
          for (let i = 0; i < file['pass.json'].dataBackFields.length; i++) {
            if (file['pass.json'].dataBackFields[i] && file['pass.json'].dataBackFields[i].pkField) {
              this.BackFields.push(file['pass.json'].dataBackFields[i].pkField);
            }
          } for (let i = 0; i < file['pass.json'].dataHeaderFields.length; i++) {
            if (file['pass.json'].dataHeaderFields[i] && file['pass.json'].dataHeaderFields[i].pkField) {
              this.HeaderFields.push(file['pass.json'].dataHeaderFields[i].pkField);
            }
          } for (let i = 0; i < file['pass.json'].dataPrimaryFields.length; i++) {
            if (file['pass.json'].dataPrimaryFields[i] && file['pass.json'].dataPrimaryFields[i].pkField) {
              this.PrimaryFields.push(file['pass.json'].dataPrimaryFields[i].pkField);
              //console.log('primary', this.PrimaryFields)
            }
          } for (let i = 0; i < file['pass.json'].dataSecondaryFields.length; i++) {
            if (file['pass.json'].dataSecondaryFields[i] && file['pass.json'].dataSecondaryFields[i].pkField) {
              this.SecondaryFields.push(file['pass.json'].dataSecondaryFields[i].pkField);
            }
          }
          console.log(this.field)
          //console.log('this.pkpass', this.pkpass)
          //  console.log(this.trigger_form)
          this.metaData = { ...this.metaData };
          this.pkpass = { ...this.pkpass };

          //二维码
          const barcodes = file['pass.json'].barcodes[0]
          let barcodesData = null;
          barcodesData.altText = barcodes.altText
          barcodesData.format = barcodes.format
          barcodesData.message = barcodes.message
          barcodesData.messageEncoding = barcodes.messageEncoding
        })
        .catch(error => {
          // console.error('Error fetching data:', error);
        });
    },
    //下一张pass
    nextPass () {
      if (this.currentIdIndex < this.selectedIds.length - 1) {
        this.currentIdIndex++;
        this.passId = this.selectedIds[this.currentIdIndex];
        this.editPass(this.passId);
      } else {
        this.$message({
          message: '当前已是最后一张Pass',
          type: 'warning'
        });
      }
    },
    //上一张pass
    prePass () {
      //this.selectedIds = [10, 11, 23];
      if (this.currentIdIndex > 0) {
        this.currentIdIndex--;
        this.passId = this.selectedIds[this.currentIdIndex];
        // this.$router.push({
        //   path: '/edit',
        //   query: {
        //     id: prevPassId
        //   }
        // });
        this.editPass(this.passId);
      } else {
        this.$message({
          message: '当前已是第一张Pass',
          type: 'warning'
        });
      }
    },
    //修改pass
    mulEdit () {
      const passData = Object.assign({}, this.edit_metaData, this.edit_pkpass);
      passData.ownerId = localStorage.getItem('merchantId');
      let ids = null;
      if (!this.selectedIds || this.selectedIds.length === 0) {
        ids = Array.of(this.passId);
      } else {
        ids = this.selectedIds
      }
      const data = {
        ids: ids,
        ...passData
      };
      console.log('data', data)
      axios.put('http://192.168.35.81:8081/pass/multiple', data)
        .then(response => {
          console.log('Multiple passes updated successfully:', response.data);
        })
        .catch(error => {
          console.error('Error updating multiple passes:', error);
        });
    },
    //保存为模板
    savePass () {
      const isTemplate = true
      this.create(isTemplate)
    },
    //删除Pass
    deletePass () {
      const ownerId = localStorage.getItem('merchantId')
      axios.delete(`http://192.168.35.81:8081/pass/${this.passId}?ownerId=${ownerId}`)
        .then(response => {
          // console.log(response);
          this.$message.error('该模板已删除')
          this.$router.push('/index')
        })
        .catch(error => {
          console.error('Error deleting pass:', error);
        });
    },
  },
  mounted () {
    this.checkMode();
    this.passId = this.selectedIds[this.currentIdIndex];
    //  console.log('aux', this.field.auxiliaryFields)
  },
  watch: {
    metaData: {
      handler (newVal, oldVal) {
        Object.keys(newVal).forEach(key => {
          if (newVal[key] !== oldVal[key]) {
            this.edit_metaData[key] = newVal[key];
          }
        });
      },
      deep: true
    },
    HeaderFields: {
      handler (newVal, oldVal) {
        let temp = { ...this.pkpass };
        temp.dataHeaderFields = newVal.map(field => ({
          pkField: {
            key: field.key,
            label: field.label,
            value: field.value
          },
          field: {
            changeMessageId: ''
          }
        }));
        this.pkpass = { ...temp };
      },
      deep: true
    },
    BackFields: {
      handler (newVal, oldVal) {
        let temp = { ...this.pkpass };
        temp.dataBackFields = newVal.map((field, index) => {
          if (field.changeMessageId) {
            return {
              field: {
                changeMessageId: field.changeMessageId
              }
            };
          } else {
            return {
              pkField: {
                key: field.key,
                label: field.label,
                value: field.value
              }
            };
          }
        })
        this.pkpass = { ...temp };
      },
      deep: true
    },
    AuxiliaryFields: {
      handler (newVal, oldVal) {
        let temp = { ...this.pkpass };
        temp.dataAuxiliaryFields = newVal.map(field => ({
          pkField: {
            key: field.key,
            label: field.label,
            value: field.value
          },
          field: {
            changeMessageId: ''
          }
        }));
        this.pkpass = { ...temp };
      },
      deep: true
    },
    PrimaryFields: {
      handler (newVal, oldVal) {
        let temp = { ...this.pkpass };
        temp.dataPrimaryFields = newVal.map(field => ({
          pkField: {
            key: field.key,
            label: field.label,
            value: field.value
          },
          field: {
            changeMessageId: ''
          }
        }));
        this.pkpass = { ...temp };
        console.log(this.pkpass.dataPrimaryFields)
      },
      deep: true
    },
    SecondaryFields: {
      handler (newVal, oldVal) {
        let temp = { ...this.pkpass };
        temp.dataSecondaryFields = newVal.map(field => ({
          pkField: {
            key: field.key,
            label: field.label,
            value: field.value
          },
          field: {
            changeMessageId: ''
          }
        }));
        this.pkpass = { ...temp };
      },
      deep: true
    },
    'pkpass.dataAuxiliaryFields': function (newVal, oldVal) {
      this.edit_pkpass.dataAuxiliaryFields = newVal.slice();
    },
    'pkpass.dataBackFields': function (newVal, oldVal) {
      this.edit_pkpass.dataBackFields = newVal.slice();
    },
    'pkpass.dataHeaderFields': function (newVal, oldVal) {
      this.edit_pkpass.dataHeaderFields = newVal.slice();
    },
    'pkpass.dataPrimaryFields': function (newVal, oldVal) {
      this.edit_pkpass.dataPrimaryFields = newVal.slice();
    },
    'pkpass.dataSecondaryFields': function (newVal, oldVal) {
      this.edit_pkpass.dataSecondaryFields = newVal.slice();
    },
    "pkpass.dataLocations": function (newVal, oldVal) {
      this.edit_pkpass.dataLocations = newVal.slice();
    },
    'pkpass.dataBeacons': function (newVal, oldVal) {
      this.edit_pkpass.dataBeacons = newVal.slice();
    },
    'pkpass.dataRelevantDate': function (newVal, oldVal) {
      this.edit_pkpass.dataRelevantDate = newVal;
    },
    'pkpass.logo': function (newVal, oldVal) {
      this.edit_pkpass.logo = newVal;
    },
    'pkpass.strip': function (newVal, oldVal) {
      this.edit_pkpass.strip = newVal;
    },
    'pkpass.icon': function (newVal, oldVal) {
      this.edit_pkpass.icon = newVal;
    },
    'pkpass.labelColor': function (newVal, oldVal) {
      this.edit_pkpass.labelColor = newVal;
    },
    'pkpass.backgroundColor': function (newVal, oldVal) {
      this.edit_pkpass.backgroundColor = newVal;
    }, 'pkpass.foregroundColor': function (newVal, oldVal) {
      this.edit_pkpass.foregroundColor = newVal;
    },
  }
};
</script>

<style>
/* 页面样式 */
/* 主体 */
.set {
  height: 100%;
  margin: 0;
}
.content {
  display: flex;
  align-items: center;
  height: 900px;
}
.header {
  width: 100%;
  position: fixed;
  text-align: center;
}
.main {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: row;
  margin: 0;
  justify-content: space-evenly;
  align-items: center;
}
.main .pass {
  /* margin-left: 300px; */
  width: 20%;
}
.main .data {
  display: flex;
}
.pass button {
  margin-top: 5%;
}
.nav {
  height: 100%;
  position: fixed;
  width: 300px;
}
.page {
  position: absolute;
  right: 100px;
  bottom: 100px;
}
</style>
