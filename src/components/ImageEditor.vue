<template>
  <div class="drawing-container">
    <label for="LogoText">LogoText:</label>
<<<<<<< HEAD
    <el-input
      v-if="editData.type == 'logo'"
      id="logoText"
      type="text"
      placeholder="LogoText"
      v-model="this.logoText"
      style="margin-top: -00px; width: 50%"
    ></el-input>
    <div id="tui-image-editor" style="margin-top: 30px"></div>
=======
    <el-input v-if="editData.type == 'logo'"
              id="logoText"
              type="text"
              placeholder="LogoText"
              v-model="this.logoText"
              style="margin-top: -00px; width: 50%"></el-input>
    <div id="tui-image-editor"
         style="margin-top: 30px"></div>
>>>>>>> 1cf6dfa988af12619cf7fb7af99c16816ebb3662
    <el-row class="btn">
      <el-button round @click="selectAndUploadImage">本地上传</el-button>
      <el-button type="primary" round @click="openDialog">仓库上传</el-button>
      <el-button type="primary" round @click="uploadImg">确认</el-button>
      <el-button round @click="saveImg">保存图片</el-button>
    </el-row>
    <!-- 图片列表模态框 -->
<<<<<<< HEAD
    <el-dialog
      :visible.sync="dialogVisible"
      width="50%"
      top="100px"
      title="图片预览"
      class="dialog"
    >
=======
    <el-dialog :visible.sync="dialogVisible"
               width="50%"
               top="100px"
               title="图片预览"
               class="dialog">
>>>>>>> 1cf6dfa988af12619cf7fb7af99c16816ebb3662
      <el-checkbox-group v-model="imageCheckboxes">
        <el-checkbox label="我的图片"></el-checkbox>
        <el-checkbox label="商户联盟"></el-checkbox>
      </el-checkbox-group>
<<<<<<< HEAD
      <div
        v-for="(image, index) in paginatedImages"
        :key="index"
        class="image-list-item"
      >
        <img
          :src="image.content"
          alt="Image"
          class="preview-image"
          @click="selectImage(image.content)"
        />
      </div>

      <!-- 分页器 -->
      <el-pagination
        :total="images.length"
        :current-page="pageIndex"
        background
        layout="prev, pager, next"
        class="pagination"
        @current-change="handlePageChange"
      >
=======
      <div v-for="(image, index) in paginatedImages"
           :key="index"
           class="image-list-item">
        <img :src="image.content"
             alt="Image"
             class="preview-image"
             @click="selectImage(image.content)" />
      </div>

      <!-- 分页器 -->
      <el-pagination :total="images.length"
                     :current-page="pageIndex"
                     background
                     layout="prev, pager, next"
                     class="pagination"
                     @current-change="handlePageChange">
>>>>>>> 1cf6dfa988af12619cf7fb7af99c16816ebb3662
      </el-pagination>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
  <script>
import "tui-image-editor/dist/tui-image-editor.css";
import "tui-color-picker/dist/tui-color-picker.css";
// import ImageEditor from "tui-image-editor";
import axios from "axios";
const ImageEditor = require("tui-image-editor");
const localeZh = {
  // override default English locale to your custom
  Crop: "裁剪",
  ZoomIn: "放大",
  ZoomOut: "缩小",
  Hand: "拖拽",
  History: "历史记录",
  DeleteAll: "全部删除",
  Delete: "删除",
  Undo: "撤销",
  Redo: "反撤销",
  Reset: "重置",
  Flip: "镜像",
  Rotate: "旋转",
  Draw: "画",
  Shape: "形状标注",
  Icon: "图标标注",
  Text: "文字标注",
  Mask: "遮罩",
  Filter: "滤镜",
  Bold: "加粗",
  Italic: "斜体",
  Underline: "下划线",
  Left: "左对齐",
  Center: "居中",
  Right: "右对齐",
  Color: "颜色",
  "Text size": "字体大小",
  Custom: "自定义",
  Square: "正方形",
  Apply: "应用",
  Cancel: "取消",
  "Flip X": "X 轴",
  "Flip Y": "Y 轴",
  Range: "区间",
  Stroke: "描边",
  Fill: "填充",
  Circle: "圆",
  Triangle: "三角",
  Rectangle: "矩形",
  Free: "曲线",
  Straight: "直线",
  Arrow: "箭头",
  "Arrow-2": "箭头2",
  "Arrow-3": "箭头3",
  "Star-1": "星星1",
  "Star-2": "星星2",
  Polygon: "多边形",
  Location: "定位",
  Heart: "心形",
  Bubble: "气泡",
  "Custom icon": "自定义图标",
  "Load Mask Image": "加载蒙层图片",
  Grayscale: "灰度",
  Blur: "模糊",
  Sharpen: "锐化",
  Emboss: "浮雕",
  "Remove White": "除去白色",
  Distance: "距离",
  Brightness: "亮度",
  Noise: "噪音",
  "Color Filter": "彩色滤镜",
  Sepia: "棕色",
  Sepia2: "棕色2",
  Invert: "负片",
  Pixelate: "像素化",
  Threshold: "阈值",
  Tint: "色调",
  Multiply: "正片叠底",
  Blend: "混合色",
};
const customTheme = {
  // image 左上角度图片
  "common.bi.image": require("../assets/cat.jpg"),
  "common.bisize.width": "0px",
  "common.bisize.height": "0px",
  "common.backgroundImage": "none",
  "common.backgroundColor": "#f3f4f6",
  "common.border": "1px solid #444",

  // header
  "header.backgroundImage": "none",
  "header.backgroundColor": "#f3f4f6",
  "header.border": "0px",
  "header.display": "none",

  // load button
  "loadButton.backgroundColor": "#fff",
  "loadButton.border": "1px solid #ddd",
  "loadButton.color": "#222",
  "loadButton.fontFamily": "NotoSans, sans-serif",
  "loadButton.fontSize": "12px",
  "loadButton.display": "none", // 可以直接隐藏掉

  // download button
  "downloadButton.backgroundColor": "#fdba3b",
  "downloadButton.border": "1px solid #fdba3b",
  "downloadButton.color": "#fff",
  "downloadButton.fontFamily": "NotoSans, sans-serif",
  "downloadButton.fontSize": "12px",
  "downloadButton.display": "none", // 可以直接隐藏掉

  // icons default
  "menu.normalIcon.color": "#8a8a8a",
  "menu.activeIcon.color": "#555555",
  "menu.disabledIcon.color": "#434343",
  "menu.hoverIcon.color": "#e9e9e9",
  "submenu.normalIcon.color": "#8a8a8a",
  "submenu.activeIcon.color": "#e9e9e9",

  "menu.iconSize.width": "24px",
  "menu.iconSize.height": "24px",
  "submenu.iconSize.width": "32px",
  "submenu.iconSize.height": "32px",

  // submenu primary color
  "submenu.backgroundColor": "#1e1e1e",
  "submenu.partition.color": "#858585",

  // submenu labels
  "submenu.normalLabel.color": "#858585",
  "submenu.normalLabel.fontWeight": "lighter",
  "submenu.activeLabel.color": "#fff",
  "submenu.activeLabel.fontWeight": "lighter",

  // checkbox style
  "checkbox.border": "1px solid #ccc",
  "checkbox.backgroundColor": "#fff",

  // rango style
  "range.pointer.color": "#fff",
  "range.bar.color": "#666",
  "range.subbar.color": "#d1d1d1",

  "range.disabledPointer.color": "#414141",
  "range.disabledBar.color": "#282828",
  "range.disabledSubbar.color": "#414141",

  "range.value.color": "#fff",
  "range.value.fontWeight": "lighter",
  "range.value.fontSize": "11px",
  "range.value.border": "1px solid #353535",
  "range.value.backgroundColor": "#151515",
  "range.title.color": "#fff",
  "range.title.fontWeight": "lighter",

  // colorpicker style
  "colorpicker.button.border": "1px solid #1e1e1e",
  "colorpicker.title.color": "#fff",
};
export default {
  name: "ImageEditor",
  props: {
    type: String,
    image: String,
    logoText: String,
  },
  data() {
    return {
      instance: null, // 编辑图片实例
      editData: {
        type: "",
        image: "",
      },
      dialogVisible: false,
      images: [],
      fileName: "",
      maxPage: 0,
      pageCount: 8,
      pageIndex: 1,
      imageDataUrl: "",
      imageCheckboxes: ["我的图片"],
    };
  },
  mounted() {
    this.init();
    this.reset();
  },
  computed: {
    isReady() {
      return this.editData.image;
    },
<<<<<<< HEAD
    paginatedImages() {
=======
    paginatedImages () {
>>>>>>> 1cf6dfa988af12619cf7fb7af99c16816ebb3662
      const start = (this.pageIndex - 1) * this.pageCount;
      const end = this.pageIndex * this.pageCount;
      return this.images.slice(start, end);
    },
  },
  watch: {
    type() {
      this.reset();
    },
    image() {
      this.reset();
    },
<<<<<<< HEAD
    imageCheckboxes() {
=======
    imageCheckboxes () {
>>>>>>> 1cf6dfa988af12619cf7fb7af99c16816ebb3662
      this.fetchImages();
    },
  },
  methods: {
    handlePageChange(newPageIndex) {
      this.pageIndex = newPageIndex;
    },
    //从仓库获取图片
<<<<<<< HEAD
    async fetchImages() {
=======
    async fetchImages () {
>>>>>>> 1cf6dfa988af12619cf7fb7af99c16816ebb3662
      this.images = [];
      const merchantId = localStorage.getItem("merchantId");

      try {
        if (this.imageCheckboxes.includes("我的图片")) {
          const url = `http://192.168.35.81:8081/image/owner_id/${merchantId}`;
          const response = await axios.get(url);
          this.images = this.images.concat(response.data);
        }

        if (this.imageCheckboxes.includes("商户联盟")) {
          const requestData = {
            types: ["Image"],
            merchantId: merchantId,
          };
          const url = `http://192.168.35.81:8081/union/asset/union_id`;
          const response = await axios.post(url, requestData);
<<<<<<< HEAD
=======
          console.log(response)
>>>>>>> 1cf6dfa988af12619cf7fb7af99c16816ebb3662
          const imagesFromResponse = response.data.map((item) => item.image);
          this.images = this.images.concat(imagesFromResponse);
        }
      } catch (error) {
        console.error("Error fetching images:", error);
      }
      this.maxPage = 1 + Math.floor(this.images.length / this.pageCount);
      this.pageIndex = 1;
      await this.$nextTick();
    },
    reset() {
      this.editData.type = this.type;
      if (this.image) {
        this.loadImage(this.ensurePngPrefix(this.image));
      } else {
        this.loadImage("");
      }
    },
    init() {
      this.instance = new ImageEditor(
        document.querySelector("#tui-image-editor"),
        {
          includeUI: {
            loadImage: {
              // path: require("../assets/cat.jpg"),
              name: "image",
            },
            initMenu: "draw", // 默认打开的菜单项
            menuBarPosition: "right", // 菜单所在的位置
            menu: [
              "crop", // 裁切
              "flip", // 翻转
              "rotate", // 旋转
              "draw", // 添加绘画
              "shape", // 添加形状
              "icon", // 添加图标
              "text", // 添加文本
              "mask", // 添加覆盖
              "filter", // 添加滤镜
            ], // 支持的菜单
            locale: localeZh, // 国际化对照字段
            theme: customTheme, // 自定义的主题配置
            usageStatistics: false,
          },
          cssMaxWidth: 500, // canvas 最大宽度
          cssMaxHeight: 400, // canvas 最大高度
        }
      );
      document.getElementsByClassName("tui-image-editor-main")[0].style.top =
        "60px"; // 图片距顶部工具栏的距离
    },
    //选择图片并显示在图片编辑器上
    selectAndUploadImage() {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      input.onchange = (event) => {
        const file = event.target.files[0];
        if (file) {
          this.fileName = file.name;
          const reader = new FileReader();
          reader.onload = (e) => {
            this.imageDataUrl = e.target.result;
            this.loadImage(this.ensurePngPrefix(this.imageDataUrl));
          };
          reader.readAsDataURL(file);
        }
      };
      input.click();
    },
<<<<<<< HEAD
    ensurePngPrefix(base64String) {
=======
    ensurePngPrefix (base64String) {
>>>>>>> 1cf6dfa988af12619cf7fb7af99c16816ebb3662
      const pngPrefix = "data:image/png;base64,";
      if (!base64String.startsWith(pngPrefix)) {
        return pngPrefix + base64String;
      }
      return base64String;
    },
<<<<<<< HEAD
    loadImage(url) {
=======
    loadImage (url) {
>>>>>>> 1cf6dfa988af12619cf7fb7af99c16816ebb3662
      this.instance = new ImageEditor(
        document.querySelector("#tui-image-editor"),
        {
          includeUI: {
            loadImage: {
              path: url,
              name: "image",
            },
            initMenu: "draw", // 默认打开的菜单项
            menuBarPosition: "right", // 菜单所在的位置
            menu: [
              "crop", // 裁切
              "flip", // 翻转
              "rotate", // 旋转
              "draw", // 添加绘画
              "shape", // 添加形状
              "icon", // 添加图标
              "text", // 添加文本
              "mask", // 添加覆盖
              "filter", // 添加滤镜
            ], // 支持的菜单
            locale: localeZh, // 国际化对照字段
            theme: customTheme, // 自定义的主题配置
            usageStatistics: false,
          },
          cssMaxWidth: 500, // canvas 最大宽度
          cssMaxHeight: 400, // canvas 最大高度
        }
      );
      document.getElementsByClassName("tui-image-editor-main")[0].style.top =
        "60px";
    },
    //图片完成编辑之后上传到服务器，显示在样例pass上
    uploadImg() {
      this.editData.image = this.instance.toDataURL();
      this.$emit("edit-image", this.editData);
    },
    openDialog() {
      this.fetchImages();
      this.dialogVisible = true;
    },
    //保存图片到服务器
    saveImg() {
      if (!this.fileName) {
        this.fileName = "undefined";
      }
      const data = {
        name: this.fileName,
        type: 1,
        ownerId: localStorage.getItem("merchantId") || 1,
        content: this.instance.toDataURL(),
      };
      axios
        .post(`http://192.168.35.81:8081/image`, data)
        .then((response) => {
          this.$message.success("上传成功");
          console.log("Image uploaded successfully:", response.data);
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
        });
    },
<<<<<<< HEAD
    selectImage(img) {
=======
    selectImage (img) {
>>>>>>> 1cf6dfa988af12619cf7fb7af99c16816ebb3662
      this.imageDataUrl = img;
      this.loadImage(img);
      this.dialogVisible = false;
    },
  },
};
</script>
  <style  scoped>
.drawing-container {
  height: 500px;
  width: 700px;
  margin-top: -100px;
}
.btn {
  margin-top: 20px;
}

.image-list-item {
  margin: 10px;
  display: inline;
}
.preview-image {
  width: auto;
  height: 60px;
  /* cursor: pointer; */
  transition: transform 0.3s ease;
}

.preview-image:hover {
  transform: scale(1.1); /* 鼠标悬浮时放大图片 */
}
.dialog-footer {
  height: 200px;
}
.pagination {
  top: 900px;
}
</style>
  