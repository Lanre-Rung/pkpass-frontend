<template>
  <div class="color-picker-container">
    <!-- 背景颜色 -->
    <div class="bgc">
      <h3>BackgroundColor</h3>
      <div class="preset-colors">
        <button v-for="preset in presetColors"
                :key="preset"
                :style="{ backgroundColor: preset }"
                @click=selectColor(preset)></button>
      </div>
      <div>
        <span>自定义颜色：</span>
        <el-color-picker v-model="selectedColor"></el-color-picker>
      </div>
    </div>
    <!-- 标签颜色 -->
    <div class="lable">
      <h3>LabelColor</h3>
      <div class="preset-colors">
        <button v-for="preset in presetColors"
                :key="preset"
                :style="{ backgroundColor: preset }"
                @click=selectLabelColor(preset)></button>
      </div>
      <div>
        <span>自定义颜色：</span>
        <el-color-picker v-model="lableColor"></el-color-picker>
      </div>
    </div>
    <!-- 前景颜色 -->
    <div class="foreground">
      <h3>Foregroung Color</h3>
      <div class="preset-colors">
        <button v-for="preset in presetColors"
                :key="preset"
                :style="{ backgroundColor: preset }"
                @click=selectforegroundColor(preset)></button>
      </div>
      <div>
        <span>自定义颜色：</span>
        <el-color-picker v-model="foregroundColor"></el-color-picker>
      </div>
    </div>
  </div>
</template>

<script>
import VueColorPicker from 'vue-color-picker';
export default {
  components: {
    VueColorPicker,
  },
  data () {
    return {
      selectedColor: '',
      lableColor: '',
      foregroundColor: '',
      presetColors: [
        '#FF6900',
        '#fcb900',
        '#7bdcb5',
        '#00d084',
        "#81dcfc",
        '#0693e3',
        '#eb144c',
        '#f78da7',
      ],
    };
  },
  methods: {
    hexToRgb (hex) {
      let r = parseInt(hex.slice(1, 3), 16);
      let g = parseInt(hex.slice(3, 5), 16);
      let b = parseInt(hex.slice(5, 7), 16);
      return `rgb(${r} , ${g} , ${b})`;
    },
    selectColor (color) {
      let rgb = this.hexToRgb(color);
      console.log(rgb)
      this.selectedColor = rgb;
    },
    selectLabelColor (preset) {
      let rgb = this.hexToRgb(preset);
      this.lableColor = rgb;
    },
    selectforegroundColor (preset) {
      let rgb = this.hexToRgb(preset);
      this.foregroundColor = rgb;
    },
  },
  watch: {
    selectedColor (newColor) {
      this.$emit('selectBgc', newColor);
    },
    lableColor (newcolor) {
      this.$emit('selectLabel', this.lableColor)
    },
    foregroundColor (newColor) {
      this.$emit('selectforegroundColor', this.foregroundColor)
    }
  },
};
</script>

<style scoped>
.color-picker-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}
.bgc,
.lable {
  margin-top: 50px;
  background-color: #f8f8f8;
}
.preset-colors {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.preset-colors button {
  width: 40px;
  height: 40px;
  margin: 8px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.preset-colors button:hover {
  border: 2px solid #fff;
}
</style>