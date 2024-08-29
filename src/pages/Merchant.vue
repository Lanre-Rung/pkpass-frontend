<template>
  <div class="container">
    <!-- 头部个人信息 -->
    <div class="merchant">
      <img src="../assets/cat.jpg"
           alt="">
      <h1>{{ username }}</h1>
    </div>
    <canvas ref="myCanvas"
            width="1000"
            height="180">
    </canvas>
    <!-- 我的change-msg模板 -->
    <div class="change_msg">
      <div class="header"
           @click="toggleTable">
        <h3> change_message模板</h3>
        <i class="el-icon-caret-bottom"
           v-if="change_msg===true"></i>
        <i class=" el-icon-caret-left"
           v-if="change_msg===false  "></i>

      </div>
      <!-- history_msg -->
      <el-table :data="msgData"
                v-if="change_msg"
                style="width: 100%; margin-left: 400px;margin-top: 10px;">
        <el-table-column prop="assetId"
                         label="ID"
                         width="80">
        </el-table-column>
        <!-- 1.field -->
        <el-table-column label="FIELD">
          <el-table-column prop="field.fileContent.key"
                           label="KEY"
                           width="120">
          </el-table-column>
          <el-table-column prop="field.fileContent.label"
                           label="LABEL"
                           width="120">
          </el-table-column>
          <el-table-column prop="field.fileContent.value"
                           label="VALUE"
                           width="150">
          </el-table-column>

        </el-table-column>
        <!-- 2.location -->
        <el-table-column label="LOCATION">
          <el-table-column prop="location.latitude"
                           label="Latitude"
                           width="120">
          </el-table-column>
          <el-table-column prop="location.longitude"
                           label="Longitude"
                           width="120">
          </el-table-column>
          <el-table-column prop="location.altitude"
                           label="Altitude"
                           width="120">
          </el-table-column>

        </el-table-column>
        <!-- 3.IBeacon -->
        <el-table-column label="iBeacon">
          <el-table-column prop="beacon.id"
                           label="NAME"
                           width="120">
          </el-table-column>
          <el-table-column prop="beacon.proximityUUID"
                           label="proximityUUID"
                           width="120">
          </el-table-column>

        </el-table-column>
        <!-- 4.date -->
        <el-table-column label="relevantDate"
                         prop="relevantDate.date"
                         width="160">
        </el-table-column>
        <el-table-column label="content"
                         prop="content"
                         width="160">
        </el-table-column>
        <template v-slot:append>
          <el-button type="primary"
                     size="normal"
                     style="margin-left:-670px;"
                     @click="addMsg">新增</el-button>
        </template>
      </el-table>
      <!-- 新增msg对话框 -->
      <el-dialog title="新增change_msg"
                 :visible.sync="DialogVisible"
                 width="50%"
                 center>
        <div class="custom-pagination-container">
          <!-- 自定义分页器按钮 -->
          <div class="custom-pagination">
            <span v-for="componentName in components"
                  :key="componentName"
                  :class="{ active: currentComponent === componentName }"
                  @click="switchComponent(componentName)">
              {{ componentName | capitalize }}
            </span>
          </div>
        </div>
        <FieldEdit v-if="currentComponent==='FieldEdit'"
                   @change_form="handleFieldUpdate"></FieldEdit>
        <locations v-if="currentComponent==='Locations'"
                   @locations="getLocations"></locations>
        <RelevantDate v-if="currentComponent==='RelevantDate'"
                      v-model="form.relevantDate"
                      @update:relevantDate="getDate"
                      :label="'时间点'"></RelevantDate>
        <EditableTable v-if="currentComponent==='editableTable'"
                       :propData="form.beacons"
                       :tableConfig="beaconTableConfig"
                       @after-edit="checkBeaconEditing"
                       @after-save="checkBeaconEditing"
                       @after-delete="checkBeaconEditing"
                       @submit="getBeacon"></EditableTable>

        <el-form ref="form"
                 label-width="80px">
          <el-form-item label="content">
            <el-input v-model="requestData.content"></el-input>
          </el-form-item>
          <el-form-item label="name">
            <el-input v-model="requestData.name"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer"
              class="dialog-footer">
          <el-button @click="DialogVisible = false">取 消</el-button>
          <el-button type="primary"
                     @click="upload">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- 我所在的联盟 -->
    <div class="change_msg">
      <div class="header"
           @click="toggleUnion">
        <h3>所在的联盟</h3>
        <i class="el-icon-caret-bottom"
           v-if="union===true"></i>
        <i class=" el-icon-caret-left"
           v-if="union===false  "></i>
      </div>
      <!-- 联盟列表 -->
      <el-table :data="unionData"
                v-if="union"
                stripe
                style="width: 80%; margin-left: 450px;margin-top: 10px;">
        <el-table-column prop="id"
                         label="ID"
                         width="180">
        </el-table-column>
        <el-table-column prop="name"
                         label="联盟名"
                         width="180">
        </el-table-column>
        <el-table-column prop="ownerId"
                         label="管理者">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini"
                       @click="handleEdit(scope.$index, scope.row)">修改</el-button>
            <el-button size="mini"
                       type="primary"
                       @click="UnionDetail(scope.row)">查看详情</el-button>
          </template>
        </el-table-column>
        <template v-slot:append>
          <el-button type="primary"
                     size="normal"
                     style="margin-left:-670px;"
                     @click="unionDialog = true">创建联盟</el-button>
        </template>
      </el-table>
      <!-- 创建联盟对话框 -->
      <el-dialog title="创建联盟"
                 :visible.sync="unionDialog"
                 width="30%"
                 center>
        <el-form ref="form"
                 label-width="80px">
          <el-form-item label="联盟名">
            <el-input v-model="unionName"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer"
              class="dialog-footer">
          <el-button @click="unionDialog = false">取 消</el-button>
          <el-button type="primary"
                     @click="createUnion">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 修改联盟信息对话框  -->
      <el-dialog title="修改"
                 :visible.sync="editUnion"
                 width="30%"
                 center>
        <el-form ref="form"
                 label-width="80px">
          <el-form-item label="联盟名">
            <el-input v-model="unionName"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer"
              class="dialog-footer">
          <el-button @click="editUnion = false">取 消</el-button>
          <el-button type="primary"
                     @click="editUnionName">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 查看详情对话框 -->
      <el-dialog title="详情"
                 :visible.sync="unionDetail"
                 width="70%"
                 fixed-header
                 style="max-height: 90vh;overflow-y: auto;"
                 center>
        <!-- 商户列表 -->
        <h3 style="margin-left: 10%;">联盟商户</h3>
        <el-table :data="memData"
                  stripe
                  fixed-header
                  style="width: 80%;margin-left: 10%; margin-top: 10px;max-height: 30vh;overflow-y: auto;">
          <el-table-column prop="id"
                           label="商户ID"
                           fixed
                           width="100">
          </el-table-column>
          <el-table-column prop="name"
                           label="商户名"
                           width="180">
          </el-table-column>
          <el-table-column prop="phone"
                           label="电话号码"
                           width="180">
          </el-table-column>
          <el-table-column prop="email"
                           label="电子邮箱"
                           width="180">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini"
                         type="primary"
                         @click="DelMem(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button size="mini"
                   type="primary"
                   style="margin-left: 550px;margin-top: 30px;"
                   @click="addMem=true">添加成员</el-button>
        <!-- 1.pass -->
        <h3 style="margin-left: 10%;">共享Pass模板</h3>
        <el-table :data="shareData.pass"
                  fixed-header
                  style="width: 80%;margin-left: 10%; margin-top: 10px;max-height: 30vh;overflow-y: auto;">
          <el-table-column prop="id"
                           label="ID"
                           width="100">
          </el-table-column>
          <el-table-column prop="name"
                           label="Pass名"
                           width="180">
          </el-table-column>
          <el-table-column prop="ownerId"
                           label="所有者ID"
                           width="180">
          </el-table-column>
        </el-table>
        <!-- 2.图片 -->
        <h3 style="margin-left: 10%;">共享图片</h3>
        <el-table :data="shareData.image"
                  fixed-header
                  style="width: 80%;margin-left: 10%; margin-top: 10px;max-height: 30vh;overflow-y: auto;">
          <el-table-column prop="image.id"
                           label="ID"
                           width="100">
          </el-table-column>
          <el-table-column prop="name"
                           label="图片名"
                           width="180">
          </el-table-column>
          <el-table-column prop="ownerId"
                           label="所有者ID"
                           width="180">
          </el-table-column>
        </el-table>
        <!-- 3.change msg 
        <h3 style="margin-left: 10%;">共享change message</h3>
        <el-table :data="shareData.changeMsg.changeMessageItem"
                  style="width: 80%;margin-left: 10%; margin-top: 10px;">
          <el-table-column prop="changeMessageId"
                           label="ID"
                           width="100">
          </el-table-column>
          <el-table-column prop="name"
                           label="图片名"
                           width="180">
          </el-table-column>
          <el-table-column prop="ownerId"
                           label="所有者ID"
                           width="180">
          </el-table-column>
        </el-table> -->
        <locations :shareData="shareData"
                   :type="'detail'"
                   @getUnionId="getUnionId"></locations>
        <!-- 4.beacon -->
        <beacon :shareData="shareData"
                :type="'detail'"
                @getUnionId="getUnionId"></beacon>
        <!-- 5.field-->
        <field :shareData="shareData.field"
               :type="'detail'"
               @getUnionId="getUnionId"></field>
        <!-- 6.date-->
        <relevantDate :shareData="shareData"
                      :type="'detail'"
                      @getUnionId="getUnionId"></relevantDate>
        <span slot="footer"
              class="dialog-footer">
          <el-button type="primary"
                     @click="unionDetail=false">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 添加联盟成员对话框  -->
      <el-dialog title="添加成员"
                 :visible.sync="addMem"
                 width="30%"
                 center>
        <el-form ref="form"
                 label-width="80px">
          <el-form-item label="商户ID">
            <el-input v-model="merchant"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer"
              class="dialog-footer">
          <el-button @click="addMem = false">取 消</el-button>
          <el-button type="primary"
                     @click="addUnionMem">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 历史记录对话框 -->
      <el-dialog title="添加成员"
                 :visible.sync="history"
                 width="70%"
                 center>
        <locations :shareData="historyData"
                   :type="'history'"
                   @getUnionId="getUnionId"
                   @restore="restore"
                   v-if="type==='location'"></locations>
        <!-- 4.beacon -->
        <beacon :shareData="historyData"
                :type="'history'"
                @getUnionId="getUnionId"
                @restore="restore"
                v-if="type==='beacon'"></beacon>
        <!-- 5.field-->
        <field :shareData="historyData"
               :type="'history'"
               @getUnionId="getUnionId"
               @restore="restore"
               v-if="type==='field'"></field>
        <!-- 6.date-->
        <relevantDate :shareData="historyData"
                      :type="'history'"
                      @getUnionId="getUnionId"
                      @restore="restore"
                      v-if="type==='date'"></relevantDate>
        <span slot="footer"
              class="dialog-footer">
          <el-button type="primary"
                     @click="history=false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import FieldEdit from '../components/Field/FieldEdit.vue';
import FieldList from '../components/Field/FieldList.vue';
import EditableTable from '../components/Trigger/editableTable.vue';
import Locations from '../components/Trigger/Locations.vue';
import RelevantDate from '../components/Trigger/RelevantDate.vue';
import locations from '../components/shareData/locations.vue';
import beacon from '../components/shareData/beacon.vue';
import field from '../components/shareData/field.vue';
import relevantDate from '../components/shareData/relevantDate.vue';
import axios from 'axios';
export default {
  components: {
    FieldEdit,
    EditableTable,
    Locations,
    RelevantDate,
    FieldList,
    locations,
    beacon,
    field,
    relevantDate
  },
  data () {
    return {
      msgData: [],
      change_msg: true,
      union: true,
      username: '',
      DialogVisible: false,
      unionDialog: false,
      editUnion: false,
      addMem: false,
      unionDetail: false,
      history: false,
      currentPage: 1,
      currentComponent: 'FieldEdit',
      components: ['FieldEdit', 'editableTable', 'Locations', 'RelevantDate'],
      type: '',
      form: {
        relevantDate: "",
        beacons: [],
      },
      field: [],
      beaconTableConfig: {
        columns: [
          {
            id: "major",
            name: "主标识符",
            type: "number",
            min: 0,
            max: 65535,
          },
          {
            id: "minor",
            name: "次标识符",
            type: "number",
            min: 0,
            max: 65535,
          },
          {
            id: "proximityUUID",
            name: "UUID",
            type: "text",
            validator: this.validateUUID,
          },
          {
            id: "relevantText",
            name: "触发信息",
            type: "text",
            clearable: true,
          },
        ],
        majorCombo: ["proximityUUID"],
        message: {
          submit: "提交成功",
          maxLength: "不超过10个",
          repeat: "不能出现重复的UUID",
        },
        ex_buttons: ["submit"],
      },
      location: null,
      index: 0,
      content: '',
      name: '',
      requestData: {
        field: {
          fileContent: {
            key: "",
            label: "",
            value: ""
          }
        },
        relevantDate: {
          date: ""
        },
        location: {
          latitude: null,
          longitude: null,
          altitude: null,
          relevantText: ""
        },
        beacon: {
          name: "",
          proximityUUID: "",
          relevantText: ""
        },
        content: '',
        name: '',
        ownerId: 1
      },
      unionName: '',
      unionId: '',
      merchant: '',
      memData: [],
      shareData: {
        image: [],
        pass: [],
        locations: [],
        beacon: [],
        relevantDate: [],
        field: [],
        changeMsg: []
      },
      historyData: {
        image: [],
        pass: [],
        locations: [],
        beacon: [],
        relevantDate: [],
        field: [],
        changeMsg: []
      }
    }
  },
  mounted () {
    this.username = localStorage.getItem('name')
    this.drawBlueLine();
    this.getChangeMsg()
    this.getUnion()
  },
  methods: {
    toggleTable () {
      this.change_msg = !this.change_msg
    },
    toggleUnion () {
      this.union = !this.union
    },
    switchComponent (componentName) {
      this.currentComponent = componentName;
    },
    drawBlueLine () {
      const canvas = this.$refs.myCanvas;
      if (canvas.getContext) {
        const ctx = canvas.getContext('2d');
        ctx.strokeStyle = 'skyblue';
        ctx.lineWidth = 5;
        ctx.moveTo(10, 180);
        ctx.lineTo(1000, 180);
        ctx.stroke();
      }
    },
    addMsg () {
      this.DialogVisible = true
    },
    handlePageChange (newPage) {
      this.currentPage = newPage;
      this.$nextTick(() => {
        this.currentComponent = this.components[newPage - 1];
      });
    },
    handleFieldUpdate (formData) {
      if (this.field.length <= this.index) {
        this.field[this.index] = {};
      }
      this.requestData.field.fileContent.key = formData.key;
      this.requestData.field.fileContent.label = formData.label;
      this.requestData.field.fileContent.value = formData.value;
    },
    getUnionId (id) {
      this.originalId = id
      console.log('id', this.originalId)
      this.History()
    },
    getLocations (location) {
      // this.location = location
      this.requestData.location.latitude = location[0].latitude;
      this.requestData.location.longitude = location[0].longitude;
      this.requestData.location.relevantText = location[0].relevantText;
      this.requestData.location.altitude = location[0].altitude || null;
    },
    getDate (date) {
      this.requestData.relevantDate.date = date
    },
    getBeacon (beacon) {
      this.requestData.beacon.proximityUUID = beacon[0].proximityUUID
      this.requestData.beacon.relevantText = beacon[0].relevantText
    },
    checkBeaconEditing (status) {
      this.beaconEditIndex = status.editIndex;
      this.checkEditing();
    },
    checkLocationEditing (status) {
      this.locationEditIndex = status.editIndex;
      this.checkEditing();
    },
    checkEditing () {
      if (this.beaconEditIndex == -1 && this.locationEditIndex == -1) {
        this.isEditing = false;
      } else {
        this.isEditing = true;
      }
    },
    upload () {
      console.log(this.requestData)
      axios.post('http://192.168.35.81:8081/change_message', this.requestData)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.error('Error during upload:', error);
        });
    },
    getChangeMsg () {
      // const id = localStorage.getItem('merchantId');
      const id = 1
      axios.get(`http://192.168.35.81:8081/change_message/owner_id/${id}`)
        .then(response => {
          //  console.log(response.data);
          this.msgData = response.data
          console.log(this.msgData)
        })
        .catch(error => {
          console.error('Error when fetching change message:', error);
        });
    },
    createUnion () {
      let data = {
        name: this.unionName,
        ownerId: localStorage.getItem('merchantId')
      }
      console.log(data)
      axios.post(`http:http://192.168.35.81:8081/union`, data).then(response => {
        console.log(response)
      })
    },
    getUnion () {
      axios.get(`http://192.168.35.81:8081/union/merchant_id/1`).then(response => {
        // console.log(response)
        this.unionData = response.data
      })
    },
    editUnionName () {
      let data = {
        id: this.unionId,
        name: this.unionName
      }
      console.log(data)
      axios.put(`http://192.168.35.81:8081/union`, data).then(response => {
        console.log(response)
      })
    },
    addUnionMem () {
      let data = {
        "unionId": this.unionId,
        "merchantId": this.merchant,
        "isAdministrator": 0
      }
      axios.post(`http://192.168.35.81:8081/union/member`, data).then(response => {
        // console.log(response)
        if (response.data === 1) {
          this.$message.success('添加商户成员成功')
        } else {
          this.$message.warning(response.data)
        }
      })
    },
    handleEdit (index, row) {
      this.editUnion = true
      this.unionId = row.id
    },
    UnionDetail (row) {
      this.unionId = row.id
      this.unionDetail = true
      axios.get(`http://192.168.35.81:8081/union/member/${this.unionId}?includingOwner=true`).then(response => {
        this.memData = response.data
      })

      let requestData = {
        unionIds: [this.unionId],
        types: ["Pass", "Image", "ChangeMessage"],
      };
      axios.post('http://192.168.35.81:8081/union/asset/union_id', requestData)
        .then(response => {
          console.log(response);
          let data = response.data
          this.shareData.pass = data.filter(item => item.type === 0);
          this.shareData.image = data.filter(item => item.type === 1);
          this.shareData.changeMsg = data.filter(item => item.type === 2);
          this.shareData.locations = data.filter(item => item.type === 3);
          this.shareData.beacon = data.filter(item => item.type === 4);
          this.shareData.field = data.filter(item => item.type === 5);
          this.shareData.relevantDate = data.filter(item => item.type === 6);
          // console.log(this.shareData.locations)
        })
        .catch(error => {
          console.error('Error:', error);
        });

    },
    DelMem (row) {
      let data = {
        unionId: this.unionId,
        merchantId: row.id
      }
      // console.log('data', data)
      axios.delete(`http://http://192.168.35.81:8081/union/member`, data).then(response => {
        console.log(response)
      })
    },
    History () {
      axios.get(`http://192.168.35.81:8081/change_message/history/${this.originalId}`).then(response => {
        console.log(response)
        this.history = true
        // console.log(this.historyData)
        if (response.data[0].type === 3) {
          this.historyData.locations = {}
          const transformedData = response.data.map(item => {
            return {
              changeMessageItem: item
            };
          });
          this.historyData.locations = transformedData;
          this.type = 'location'
        } else if (response.data[0].type === 4) {
          this.historyData.beacon = {}
          const transformedData = response.data.map(item => {
            return {
              changeMessageItem: item
            };
          });
          this.historyData.beacon = transformedData;
          this.type = 'beacon'
        } else if (response.data[0].type === 5) {
          this.historyData.field = {}
          const transformedData = response.data.map(item => {
            return {
              changeMessageItem: item
            };
          });
          this.historyData.field = transformedData;
          this.type = 'field'
        } else if (response.data[0].type === 6) {
          this.historyData.date = {}
          const transformedData = response.data.map(item => {
            return {
              changeMessageItem: item
            };
          });
          this.historyData.date = transformedData;
          this.type = 'date'
        }
      })
    },
    restore (id) {
      axios.put(`http://192.168.35.81:8081/change_message/restore/${id}`).then(response => {
        // console.log(response)
        if (response.status === 200) {
          this.$message.success('恢复历史记录成功')
          this.History()
          let requestData = {
            unionId: this.unionId,
            types: ["Pass", "Image", "ChangeMessage"]
          };
          axios.post('http://192.168.35.81:8081/union/asset/union_id', requestData)
            .then(response => {
              console.log(response);
              let data = response.data
              this.shareData.pass = data.filter(item => item.type === 0);
              this.shareData.image = data.filter(item => item.type === 1);
              this.shareData.changeMsg = data.filter(item => item.type === 2);
              this.shareData.locations = data.filter(item => item.type === 3);
              this.shareData.beacon = data.filter(item => item.type === 4);
              this.shareData.field = data.filter(item => item.type === 5);
              this.shareData.relevantDate = data.filter(item => item.type === 6);
              // console.log(this.shareData.locations)
            })
        }
      })
    }
  },
  filters: {
    capitalize (str) {
      return str.charAt(0).toUpperCase() + str.slice(1).replace(/_/g, ' ');
    }
  },
};
</script>
<style scoped>
.merchant {
  position: relative;
  display: flex;
  flex-direction: column-reverse;
}
.merchant h1 {
  position: absolute;
  right: 65%;
  top: 60px;
}
.merchant img {
  position: absolute;
  right: 70%;
  top: 50px;
  height: 100px;
  width: 100px;
  border-radius: 10px;
}
.header {
  flex-direction: row;
  text-align: left;
  margin-left: 450px;
}
.header i {
  margin-left: 10px;
  margin-top: 5px;
}
.custom-pagination-container {
  text-align: center;
  margin-bottom: 20px;
}
.custom-pagination span {
  cursor: pointer;
  padding: 5px 10px;
  margin: 0 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.custom-pagination span.active {
  background-color: #409eff;
  color: white;
  border-color: #409eff;
}
.scrollable-dialog {
  max-height: 70vh;
  overflow-y: auto;
}
</style>