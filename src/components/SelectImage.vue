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
  name: 'SelectImage',
  data () {
    return {
      instance: null,
    };
  },
  mounted () {
    this.init();
    // 使用编辑组件
    // this.instance = new ImageEditor(
    //   document.querySelector('#tui-image-editor'),
    //   {
    //     includeUI: { // 表示使用它内置的 UI 控件
    //       loadImage: {
    //         path: url,// 照片路径
    //         name: this.imageName //图片名称
    //       }, // 默认加载的图片
    //       initMenu: 'draw', // 表示编辑器加载后，第一个被选中的操作菜单功能
    //       menu: [
    //         'crop', // 裁切
    //         'flip', // 翻转
    //         'rotate', // 旋转
    //         'draw', // 添加绘画
    //         'shape', // 添加形状
    //         'icon', // 添加图标
    //         'text', // 添加文本
    //         'mask', // 添加覆盖
    //         'filter' // 添加滤镜
    //       ], // 支持的菜单
    //       locale: localeZh, // 国际化对照字段
    //       theme: customTheme,// 自定义的主题配置
    //       usageStatistics: false,
    //       menuBarPosition: 'left'// 菜单位置栏的位置，有四个选项可选：'top', 'bottom', 'left', 'right'
    //     },
    //     cssMaxWidth: 1100, // 编辑器 Canvas 的最大宽度
    //     cssMaxHeight: 500, // 编辑器 Canvas 的最大高度
    //     selectionStyle: {
    //       cornerSize: 20,
    //       rotatingPointOffset: 70
    //     }
    //   })
  },
  methods: {
    init () {
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
          theme: 'light',
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
  width: 1000px;
}
</style>
  