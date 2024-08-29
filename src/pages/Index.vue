<template>
  <div class="index">
    <div class="pass-list">
      <h2>可选择以下Pass：</h2>
      <div class="list">
        <!-- <ul>
          <li v-for="item in passList"
              :key="item.id"
              @show="checkOwnership(item)">
            <el-popover placement="right"
                        width="200"
                        trigger="click">
              <el-button size="mini"
                         type="text"
                         @click="goToEditPage(item.id)">编辑</el-button>
              <el-button type="danger"
                         plain
                         size="mini"
                         @click="deletePass(item.id)"
                         :disabled="item.ownerId !== merchantId">删除</el-button>
              <el-button type="primary"
                         plain
                         size="mini"
                         @click="changePermissions(item.id)"
                         :disabled="item.ownerId !== merchantId">修改权限</el-button>
              <el-button slot="reference"
                         type="text">{{ item.name }}</el-button>
            </el-popover>
          </li>
        </ul> -->
        <el-table :data="passList"
                  ref="multipleTable"
                  border
                  style="width: 100%;"
                  class="table">
          @selection-change="handleSelectionChange">
          <el-table-column type="selection"
                           width="55">
          </el-table-column>
          <el-table-column prop="id"
                           label="ID"
                           width="50">
          </el-table-column>
          <el-table-column prop="name"
                           label="Pass名称"
                           width="150">
          </el-table-column>
          <el-table-column prop="ownerId"
                           label="商户ID"
                           width="70">
          </el-table-column>
          <el-table-column prop="lastModified"
                           label="最后修改时间"
                           width="200">
          </el-table-column>
          <el-table-column prop="createdDate"
                           label="创建时间"
                           width="200">
          </el-table-column>
          <!-- 操作列 -->
          <el-table-column fixed="right"
                           label="操作"
                           width="160">
            <template slot-scope="scope">
              <el-button type="text"
                         @click="goToEditPage (scope.row.id)"
                         size="small">编辑</el-button>
              <el-button type="text"
                         @click="deletePass(scope.row.id)"
                         size="small">删除</el-button>
              <el-button type="text"
                         @click="changePermissions(scope.row.id)"
                         size="small">修改权限</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 权限——穿梭框 -->
        <div class="transfer-container">
          <el-transfer style="text-align: left;"
                       v-model="value"
                       v-if="PermissionStatus"
                       class="transfer"
                       filterable
                       :left-default-checked="[2, 3]"
                       :right-default-checked="[1]"
                       :titles="['无权限商户', '有权限商户']"
                       :button-texts="['删除权限', '添加权限']"
                       :format="{
        noChecked: '${total}',
        hasChecked: '${checked}/${total}'
      }"
                       @change="handleChange"
                       :data="data">
          </el-transfer>
          <i class="el-icon-close"
             @click="close"
             v-if="PermissionStatus"></i>
        </div>
      </div>
    </div>
    <div class="createPass">
      <h2>选择以下一种Pass类型并创建</h2>
      <ul class="pass-container">
        <li @click="goToSetPage">
          <img src="../assets/pass/boardingPass.png"
               alt="">
          <p>boardingPass</p>
        </li>
        <li @click="goToSetPage">
          <img src="../assets/pass/coupon.png"
               alt="">
          <p>coupon</p>
        </li>
        <li @click="goToSetPage">
          <img src="../assets/pass/generic.png"
               alt="">
          <p>generic</p>
        </li>
        <li @click="goToSetPage">
          <img src="../assets/pass/eventTicket.png"
               alt="">
          <p>eventTicket</p>
        </li>
        <li @click="goToSetPage">
          <img src="../assets/pass/storePass.png"
               alt="">
          <p>storePass</p>
        </li>
      </ul>
      <!-- 模板库 -->
      <div class="oldPass">
        <h2>
          从模板库中选择
        </h2>
        <el-checkbox-group v-model="imageCheckboxes">
          <el-checkbox label="我的模板"></el-checkbox>
          <el-checkbox label="商户联盟"></el-checkbox>
        </el-checkbox-group>
        <ul class="oldPass-container">
          <li @click="goToEditTemp (item.id)"
              v-for="item in templateList"
              :key="item.id">
            <img src="../assets/pass/boardingPass.png"
                 alt="">
            <p>{{item.name}}</p>
          </li>
        </ul>
      </div>

    </div>
  </div>
</template>
<script>
/* eslint-disable */
import axios from 'axios';
import { eventBus } from '../main';
export default ({
  props: ['id'],
  data () {
    return {
      merchantId: localStorage.getItem('merchantId') || null,
      passList: [],
      templateList: [],
      visible: false,
      popoverVisible: {},
      PermissionStatus: false,
      popoverVisible: false,
      data: [],
      exist: [],
      rest: [],
      value: [],
      passId: '',
      selectedTemplate: 1,
      imageCheckboxes: ["我的模板"],
    };
  },
  mounted () {
    this.fetchPassList();
    // this.fetchTemplate();
    this.fetchImages()
  },
  watch: {
    imageCheckboxes () {
      this.fetchImages();
    },
  },
  computed: {
    mode () {
      return this.$route.meta.mode || (this.passId ? 'edit' : 'create');
    },
    isCreating () {
      return this.mode === 'create';
    },
    isEditing () {
      return this.mode === 'edit';
    }
  },
  methods: {
    //获取pass列表
    fetchPassList () {
      const merchantId = 14;
      const url = `http://192.168.35.81:8081/pass/merchant_id/${merchantId}`;
      axios.get(url)
        .then(response => {
          this.passList = response.data;
        })
        .catch(error => {
          console.error('请求失败：', error);
        });
    },
    //获取模板列表
    fetchTemplate () {
      const merchantId = 14;
      const url = `http://192.168.35.81:8081/pass/merchant_id/${merchantId}?template=true`;
      axios.get(url)
        .then(response => {
          this.templateList = response.data;
        })
        .catch(error => {
          console.error('请求失败：', error);
        });
    },
    getMerchantTemp () {
      const merchantId = 1;
      const data = {
        types: [
          "Pass"
        ],
        merchantId: 1
      }
      const url = `http://192.168.35.81:8081/union/asset/union_id`;
      axios.post(url, data)
        .then(response => {
          this.templateList = response.data;
        })
        .catch(error => {
          console.error('请求失败：', error);
        });
    },
    async fetchImages () {
      this.templateList = [];
      // const merchantId = localStorage.getItem("merchantId");

      try {
        if (this.imageCheckboxes.includes("我的模板")) {
          const merchantId = 1;
          const url = `http://192.168.35.81:8081/pass/merchant_id/${merchantId}?template=true`;
          const response = await axios.get(url);
          console.log(response)
          this.templateList = this.templateList.concat(response.data);
        }

        if (this.imageCheckboxes.includes("商户联盟")) {
          const merchantId = 1;
          const data = {
            types: [
              "Pass"
            ],
            merchantId: 1
          }
          const url = `http://192.168.35.81:8081/union/asset/union_id`;
          const response = await axios.post(url, data);
          // console.log(response)
          const passtemp = response.data.map((item) => item.pass);
          // console.log(passtemp)
          this.templateList = this.templateList.concat(passtemp);
        }
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    },
    //创建Pass 页面跳转
    goToSetPage () {
      this.$router.push('/create');
    },
    goToEditPage () {
      const selectedRows = this.$refs.multipleTable.selection;
      if (selectedRows.length === 0) {
        this.$message.warning('请先勾选')
        return;
      }
      if (selectedRows.every(row => row.id !== undefined && row.id !== null && row.id !== '')) {
        const ids = selectedRows.map(row => row.id);
        const idsString = JSON.stringify(ids);
        const minIdRow = selectedRows.reduce((acc, cur) => {
          return (acc.id < cur.id) ? acc : cur;
        });
        this.$router.push({
          path: `/edit`,
          query: { ids: idsString }
        });
      } else {
        console.error('选中的行中存在无效的id');
      }
    },
    goToEditTemp (id) {
      this.$router.push({
        path: `/temp`,
        query: { ids: id }
      });
    },
    //修改权限
    changePermissions (passId) {
      this.PermissionStatus = true
      this.passId = passId;
      const url = 'http://192.168.35.81:8081/permission';
      const params = { id: passId };
      axios.get(url, { params: params })
        .then(response => {
          const { exist, rest } = response.data;
          this.exist = exist
          this.rest = rest
          this.data = exist.concat(rest).map(item => ({
            key: item.id,
            label: item.name,
            disabled: false
          }));
          this.value = this.exist.map(item => item.id); // 假设exist数组中的项是初始选中的
        })
        .catch(error => {
          console.error('There was an error!', error);
        });
    },
    handleChange (value, direction, movedKeys) {
      if (direction === 'left') {
        // 删除权限
        movedKeys.forEach(key => {
          const index = this.exist.findIndex(existItem => existItem.id === key);
          if (index !== -1) {
            this.exist.splice(index, 1);
          }
        });
      } else if (direction === 'right') {
        // 添加权限
        movedKeys.forEach(key => {
          const item = this.data.find(item => item.key === key);
          if (item) {
            const modifiedItem = {
              email: null,
              phone: null,
              id: item.key,
              name: item.label,
              password: null
            };
            if (!this.exist.some(existItem => existItem.id === modifiedItem.id)) {
              this.exist.push(modifiedItem);
              // console.log(this.exist)
            }
          }
        });
      }
      //发送请求
      const merchants = this.exist.map(item => ({ id: item.id }));
      const url = `http://192.168.35.81:8081/permission?id=${this.passId}`
      console.log(merchants)
      console.log(url)
      axios.post(url, merchants, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          console.log('Permission updated successfully:', response.data);
        })
        .catch(error => {
          console.error('There was an error updating permissions:', error);
        });
    },
    //删除pass
    deletePass (passId) {
      //const ownerId = this.merchantId;
      const ownerId = 1
      this.passId = passId;
      axios.delete(`http://192.168.35.81:8081/pass/${this.passId}?ownerId=${ownerId}`).then(response => {
        this.$nextTick(() => {
          this.passList = this.passList.filter(item => item.id !== this.passId);
        });
        this.fetchPassList();
      })
    },
    //关闭穿梭框
    close () {
      this.PermissionStatus = false
    },
  },
})
</script>
<style scoped>
.index {
  display: flex;
  flex-direction: row;
}
.pass-list,
.createPass {
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 100%;
  margin-top: 20px;
  margin-left: 200px;
  text-align: center;
}
.list {
  display: flex;
  flex-direction: row;
  width: 900px;
}
.table {
  text-align: center;
  align-items: center;
  justify-content: center;
}
.createPass {
  width: 700px;
  margin-left: 650px;
}
.right {
  width: 160px;
}
.createPass li img {
  width: 90px;
  height: 120px;
}
.transfer-container {
  position: relative;
}
.transfer {
  display: flex;
  flex-direction: row;
  z-index: 9999;
  width: 700px;
  margin-top: 200px;
  margin-left: 30px;
  align-items: center;
  justify-content: center;
}
.el-transfer__buttons {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.el-icon-close {
  position: absolute;
  right: -15px;
  top: 180px;
}
.pass-container {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}
.oldPass-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap; /* 允许元素换行 */
  list-style: none; /* 移除列表的默认样式 */
  padding: 0; /* 移除内边距 */
  margin: 0; /* 移除外边距 */
}

.oldPass-container li {
  flex: 1 0 calc(20% - 10px);
  margin-right: 10px;
  box-sizing: border-box;
  padding: 0;
}

.oldPass-container li:nth-child(5n + 1):nth-last-child(n + 5),
.oldPass-container li:nth-child(5n + 1):nth-last-child(n + 5) ~ li {
  margin-right: 0;
}

.oldPass-container li:first-child {
  margin-left: 0;
}

.oldPass-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20%, 1fr));
  gap: 10px;
}
</style>