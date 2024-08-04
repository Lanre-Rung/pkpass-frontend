<template>
  <div class="card">
    <div class="card-header">
      <img :src="logo"
           alt="Logo"
           class="logo">
      <div class="header-text">
        <div class="logo-text">{{ logoText }}</div>
        <div class="points">
          <div>POINTS</div>
          <div>{{ points }}</div>
        </div>
      </div>
    </div>
    <div class="card-strip">
      <img :src="strip"
           alt="Strip"
           class="strip-image">
    </div>
    <div class="card-section">
      <div class="section-title">NAME</div>
      <div class="section-content">{{ name }}</div>
    </div>
    <div class="card-section">
      <div class="section-title">NUMBER</div>
      <div class="section-content">{{ formattedNumber }}</div>
    </div>
    <div class="card-section">
      <div class="section-title">TIER</div>
      <div class="section-content">{{ tier }}</div>
    </div>
    <div class="barcode">
      <img src="barcode.png"
           alt="Barcode"
           class="barcode-image">
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      logoText: '',
      name: '',
      number: '',
      tier: '',
      points: '',
      logo: '',
      strip: ''
    };
  },
  computed: {
    formattedNumber () {
      return this.number.replace(/(\d{4})(?=\d)/g, '$1 ');
    },
    formattedPoints () {
      return this.points.toLocaleString();
    }
  },
  mounted () {
    this.fetchPassContent();
  },
  methods: {
    fetchPassContent () {
      fetch('/api/online/p/content')
        .then(response => response.json())
        .then(data => {
          this.logoText = data.logoText;
          this.name = data.NAME;
          this.number = data.NUMBER;
          this.tier = data.TIER;
          this.points = data.POINTS.toLocaleString();
          this.logo = 'data:image/png;base64,' + data['logo.png'];
          this.strip = 'data:image/png;base64,' + data['strip.png'];
        })
        .catch(error => console.error('Error loading pass content:', error));
    }
  }
};
</script>
<style scoped>
.card {
  width: 380px;
  height: 610px;
  background-color: rgb(107, 96, 253);
  border-radius: 15px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  position: relative;
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
  color: rgb(253, 251, 255); /* 文字变成白色 */
}
.points {
  text-align: right;
  font-weight: 12px;
  color: rgb(253, 251, 255); /* 文字变成白色 */
}
.card-strip {
  height: 170px;
}
.strip-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.card-section {
  padding: 10px;
}
.section-title {
  font-size: 16px; /* 调大字号 */
  font-weight: 10px;
  margin-left: 15px;
  color: rgb(253, 251, 255); /* 文字变成白色 */
}
.section-content {
  font-size: 24px; /* 调大字号 */
  margin-top: 5px;
  margin-left: 15px;
  color: rgb(253, 251, 255); /* 文字变成白色 */
}
.barcode {
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
</style>