<template>
    <div class="drawing-container">
      <div id="tui-image-editor"></div>
    </div>
  </template>
  <script>
  import "tui-image-editor/dist/tui-image-editor.css";
  import "tui-color-picker/dist/tui-color-picker.css";
  import ImageEditor from "tui-image-editor";
  export default {
    data() {
      return {
        instance: null,
      };
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        this.instance = new ImageEditor(
          document.querySelector("#tui-image-editor"),
          {
            includeUI: {
              loadImage: {
                path: "src\assets\cat.jpg",
                name: "image",
              },
              initMenu: "draw", // 默认打开的菜单项
              menuBarPosition: "bottom", // 菜单所在的位置
            },
            theme:'light',
            cssMaxWidth: 800, // canvas 最大宽度
            cssMaxHeight: 400, // canvas 最大高度
          }
        );
        document.getElementsByClassName("tui-image-editor-main")[0].style.top = "60px"; // 图片距顶部工具栏的距离
      },
    },
  };
  </script>
  
  <style  scoped>
  .drawing-container {
    height: 600px;
    width: 1100px;
  }
  </style>
  