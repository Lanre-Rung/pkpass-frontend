<template>
  <div class="color-picker-container">
    <div class="bgc">
      <h3>BackgroundColor</h3>
      <div class="preset-colors">
        <button v-for="preset in presetColors"
                :key="preset"
                :style="{ backgroundColor: preset }"
                @click=selectColor(preset)></button>
      </div>
    </div>
    <div class="lable">
      <h3>LabelColor</h3>
      <div class="preset-colors">
        <button v-for="preset in presetColors"
                :key="preset"
                :style="{ backgroundColor: preset }"
                @click=selectLabelColor(preset)></button>
      </div>
    </div>
    <vue-color-picker v-model="selectedColor"
                      :presetColors="presetColors"></vue-color-picker>
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
    selectColor (color) {
      this.selectedColor = color;
      console.log(this.selectedColor)
      this.$emit('selectBgc', this.selectedColor)
    },
    selectLabelColor (preset) {
      this.lableColor = preset;
      this.$emit('selectLabel', this.lableColor)
    }
  },
  // watch: {
  //   // 监听 selectedColor 的变化
  //   selectedColor (newColor) {
  //     console.log(this.selectedColor)
  //     this.$emit('selectBgc', newColor);
  //     console.log(this.selectedColor.hex.replace('ff', '') || '#')
  //   },
  // },
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