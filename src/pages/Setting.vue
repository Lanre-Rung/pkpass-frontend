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
                  style="background-color: rgb(238, 241, 246)">
          <el-menu :default-openeds="['1', '3']">
            <el-submenu index="1">
              <template slot="title"><i class="el-icon-document"></i>MetaData</template>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title"><i class="el-icon-picture"></i>Image&BGC</template>
              <el-menu-item-group>
                <el-menu-item index="2-1">Logo</el-menu-item>
                <el-menu-item index="2-2">Icon</el-menu-item>
                <el-menu-item index="2-2">Strip Image</el-menu-item>
                <el-menu-item index="2-2">Footer Image</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title"><i class="el-icon-setting"></i>Fields</template>
              <el-menu-item-group>
                <el-menu-item index="3-3">Header Fields</el-menu-item>
                <el-menu-item index="3-1">Primary Fields</el-menu-item>
                <el-menu-item index="3-2">Secondary Fields</el-menu-item>
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
              <Pass></Pass>
            </div>
            <!-- 1.基础数据 -->
            <div class="data">
              <!-- <MetaData></MetaData> -->
              <SelectLogo></SelectLogo>
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
import MetaData from '../components/MetaData.vue';
import Pass from '../components/Pass.vue';
import SelectLogo from '../components/SelectLogo.vue'
export default {
  name: 'Setting',
  components: {
    Pass,
    MetaData,
    SelectLogo
  },
  data () {
    return {
      isFieldsMenuVisible: false
    };
  },
  methods: {
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
</style>
