<template>
  <div class="card"
       :style="BackgroundColor">
    <div class="card-header">
      <!-- Logo  -->
      <img v-if="logo"
           :src="processedLogo"
           alt="Logo"
           class="logo" />
      <div v-else
           class="default-logo"></div>
      <div class="header-text">
        <div class="logo-text"
             :style="LabelColor">{{ logoText }}</div>
        <div class="points"
             :style="LabelColor">
          <div>POINTS</div>
          <div>{{ points }}</div>
        </div>
      </div>
    </div>
    <div class="card-strip">
      <img v-if="strip"
           :src="processedStrip"
           alt="Strip"
           class="strip-image" />
      <div v-else
           class="default-strip"></div>
    </div>
    <div class="card-section"
         :style="LabelColor">
      <div class="section-title">NAME</div>
      <div class="section-content">{{ name }}</div>
    </div>
    <div class="card-section"
         :style="LabelColor">
      <div class="section-title">NUMBER</div>
      <div class="section-content">{{ formattedNumber }}</div>
    </div>
    <div class="card-section"
         :style="LabelColor">
      <div class="section-title">TIER</div>
      <div class="section-content">{{ tier }}</div>
    </div>
    <div class="barcode">
      <img v-if="barcode"
           :src="barcode"
           alt="Barcode"
           class="barcode-image" />
      <div v-else
           class="default-barcode"></div>
    </div>
  </div>
</template>
<script>
import BackgroundColor from "./BackgroundColor.vue";

export default {
  props: {
    logo: {
      type: String,
    },
    strip: {
      type: String,
    },
    bgc: {
      type: String,
    },
    label: {
      type: String,
    },
    logoText: {
      type: String,
    },
  },
  data () {
    return {
      // logoText: '',
      name: "",
      number: "",
      tier: "",
      points: "",
      barcode: "",
      localLogo: this.logo,
      localStrip: this.strip
    };
  },
  computed: { 
    formattedNumber () {
      return this.number.replace(/(\d{4})(?=\d)/g, "$1 ");
    },
    formattedPoints () {
      return this.points.toLocaleString();
    },
    //设置背景颜色
    BackgroundColor () {
      return {
        backgroundColor: this.bgc,
      };
    },
    LabelColor () {
      return {
        color: this.label,
      };
    },
    processedLogo () {
      return this.logo.startsWith('data:image/png;base64,')
        ? this.logo
        : `data:image/png;base64,${this.logo}`;
    },
    processedStrip () {
      return this.strip.startsWith('data:image/png;base64,')
        ? this.strip
        : `data:image/png;base64,${this.strip}`;
    }
  },
  mounted () {

  },
  methods: {

  },
};
</script>
<style scoped>
.card {
  position: relative;
  width: 380px;
  height: 610px;
  background-color: #f8f8f8;
  border-radius: 15px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}
.card-header {
  display: flex;
  align-items: center;
  height: 60px;
  padding: 0 10px;
}
.logo {
  height: 40px;
}
.header-text {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-left: 10px;
}
.logo-text {
  font-size: 20px; /* 调大字号 */
  font-weight: 12px;
  /* color: rgb(253, 251, 255); 文字变成白色 */
}
.points {
  text-align: right;
  font-weight: 12px;
  /* color: rgb(253, 251, 255); 文字变成白色 */
}
.card-strip {
  height: 170px;
}
.strip-image,
.default-strip {
  width: 100%;
  height: 100%;
}
.card-section {
  padding: 10px;
}
.section-title {
  font-size: 16px; /* 调大字号 */
  font-weight: 10px;
  margin-left: 15px;
  /* color: rgb(253, 251, 255); 文字变成白色 */
}
.section-content {
  font-size: 24px; /* 调大字号 */
  margin-top: 5px;
  margin-left: 15px;
  /* color: rgb(253, 251, 255); 文字变成白色 */
}
.barcode,
.default-barcode {
  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  width: 220px;
  height: 100px;
}
.barcode-image {
  width: 100%;
  height: 100%;
}
.default-logo {
  width: 64px;
  height: 40px;
  background-color: #ccc;
}
.default-strip {
  width: 100%;
  height: 170px;
  background-color: #ccc;
}
.default-barcode {
  background-color: #ccc;
}
</style>