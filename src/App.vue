<template>
  <div id="app">
    <el-container>
      <el-header>
        <div>
          <h1>PASS DESIGNER</h1>
        </div>
      </el-header>
      <el-container>
        <el-aside>
          <div class="nav">
            <ul>
              <li>MetaData</li>
              <li>Image&Background</li>
              <li>
                <a href="#"
                   v-on:click="toggleFieldsMenu">Fields</a>
                <div v-show="isFieldsMenuVisible">
                  <!-- 子菜单列表 -->
                  <ul>
                    <li>Field 1</li>
                    <li>Field 2</li>
                    <li>Field 3</li>
                  </ul>
                </div>
              </li>
              <li class="other-menu-item">Personalized Design</li>
              <li class="other-menu-item">Trigger Mechanism</li>
            </ul>
          </div>
        </el-aside>
        <el-main>
          <div class="main">
            <!-- pass样例展示 -->
            <div class="pass">
              <Pass></Pass>
            </div>
            <!-- 1.基础数据 -->
            <div class="data">
              <MetaData></MetaData>
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
import CreatePass from './components/CreatePass.vue';
// import SlideNav from './components/SlideNav.vue';
import MetaData from './components/MetaData.vue';
import Pass from './components/Pass.vue';
export default {
  name: 'App',
  components: {
    CreatePass,
    Pass,
    MetaData
  },
  data () {
    return {
      isFieldsMenuVisible: false
    };
  },
  method: {
    toggleFieldsMenu () {
      this.isFieldsMenuVisible = !this.isFieldsMenuVisible;
      if (this.isFieldsMenuVisible) {
        // 获取子菜单的高度
        this.adjustMenuPosition();
      }
    },
    adjustMenuPosition () {
      const fieldsItem = this.$refs.fields;
      const submenuHeight = fieldsItem.querySelector('.submenu').offsetHeight;
      // 计算Personalized Design和Trigger Mechanism的margin-top值
      const marginTop = `${submenuHeight}px`;
      this.$nextTick(() => {
        const otherMenuItems = this.$el.querySelectorAll('.other-menu-item');
        otherMenuItems.forEach(item => {
          item.style.marginTop = marginTop;
        });
      });
    }
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
li {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
a {
  color: inherit; /* 继承父元素的颜色 */
  text-decoration: none; /* 去除下划线 */
}

a:hover,
a:active,
a:focus {
  color: inherit; /* 保持颜色不变 */
  text-decoration: none; /* 去除悬停时的下划线 */
}
/* 页面样式 */
.nav {
  width: 200px;
  height: 800px;
  background-color: aquamarine;
  overflow: hidden;
}
.nav ul {
  padding: 0;
}
.nav li {
  height: 60px;
  border-bottom: 2px solid #fff;
  line-height: 60px;
  text-align: center;
}
/* 主体 */
.main {
  display: flex;
  width: 100%;
  flex-direction: row;
}
.main .data {
  margin-left: 250px;
}
.submenu {
  padding-left: 20px;
  background-color: #f9f9f9;
}
</style>
