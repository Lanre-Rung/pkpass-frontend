<template>
  <div>
    <div>
      <!-- Display the selected latitude and longitude -->
      <div class="map-info">
        <span>纬度: {{ formOne.lat }}</span>
        <span>经度: {{ formOne.lng }}</span>
      </div>
      <div style="margin: 10px">
        <el-select
          v-model="keywords"
          filterable
          remote
          reserve-keyword
          placeholder="请输入地址"
          :remote-method="remoteMethod"
          :clearable="true"
          size="mini"
          @change="currentSelect"
          style="width: 100%"
        >
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.name"
            :value="item.id"
            class="one-text"
          >
            <span style="float: left">{{ item.name }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{
              item.district
            }}</span>
          </el-option>
        </el-select>
      </div>
      <div
        id="container"
        style="width: 100%; height: 50vh; z-index: 999999999999"
      ></div>
      <p class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="confirmChoose">确定</el-button>
      </p>
    </div>
  </div>
</template>   
<script>
import AMapLoader from "@amap/amap-jsapi-loader";

window._AMapSecurityConfig = {
  // 安全密钥
  securityJsCode: "00431ddb2bff75d6e56633df8e77fb41",
};
export default {
  props: {
    currentRow: Object,
  },
  data() {
    return {
      map: null,
      // 标记点
      marker: "",
      // 地址逆解析
      geoCoder: null,
      // 搜索提示
      AutoComplete: null,
      // 搜索关键字
      keywords: "",
      // 位置信息
      // 搜索提示信息
      options: [],
      formOne: {
        lng: "0",
        lat: "0",
        address: "0",
        adcode: "", //地区编
      },
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      AMapLoader.load({
        // 你申请的Key
        key: "31fead1869dc2719016544c9abc68294",
        version: "2.0",
        // 需要用到的插件
        plugins: ["AMap.Geocoder", "AMap.AutoComplete"],
      })
        .then((AMap) => {
          this.map = new AMap.Map("container", {
            viewMode: "3D", //是否为3D地图模式
            zoom: 17, //初始化地图级别
            center: [this.currentRow.latitude, this.currentRow.longitude], //初始化地图中心点位置
          });
          //地址逆解析插件
          this.geoCoder = new AMap.Geocoder({
            city: "010", //城市设为北京，默认：“全国”
            radius: 1000, //范围，默认：500
          });
          AMap.plugin("AMap.AutoComplete", () => {
            let autoOptions = {
              city: "010",
              input: "tipinput", //下面设置的input的id
              outPutDirAuto: true,
            };
            this.AutoComplete = new AMap.AutoComplete(autoOptions);
          });
          //点击获取经纬度;
          this.map.on("click", (e) => {
            // 获取经纬度
            this.formOne.lng = e.lnglat.lng;
            this.formOne.lat = e.lnglat.lat;
            this.keywords = "";
            setTimeout(() => {
              this.keywords = this.formOne.address;
            }, 200);
            // 清除点
            this.removeMarker();
            // 标记点
            this.setMapMarker();
          });
        })
        .catch((err) => {
          // 错误
          console.log(err);
        });
    },
    // 标记点
    setMapMarker() {
      // 自动适应显示想显示的范围区域
      this.map.setFitView();
      this.marker = new AMap.Marker({
        map: this.map,
        position: [this.formOne.lng, this.formOne.lat],
      });
      // 逆解析地址
      this.toGeoCoder();
      this.map.setFitView();
      this.map.add(this.marker);
    },
    // 清除点
    removeMarker() {
      if (this.marker) {
        this.map.remove(this.marker);
      }
    },
    // 逆解析地址
    toGeoCoder() {
      let lnglat = [this.formOne.lng, this.formOne.lat];
      this.geoCoder.getAddress(lnglat, (status, result) => {
        if (status === "complete" && result.regeocode) {
          this.formOne.address = result.regeocode.formattedAddress;
        }
      });
    },
    // 搜索
    remoteMethod(query) {
      if (query !== "") {
        setTimeout(() => {
          this.AutoComplete.search(query, (status, result) => {
            console.log(result.tips);
            this.options = result.tips;
          });
        }, 200);
      } else {
        this.options = [];
      }
    },
    // 选中提示
    currentSelect(val) {
      // 清空时不执行后面代码
      if (!val) {
        return;
      }
      console.log("---------aaaaaasssssssssssss");
      let list = this.options.find((item) => item.id == val);
      console.log(list);
      this.formOne = {
        lng: list.location.lng,
        lat: list.location.lat,
        address: list.district + list.address,
        adcode: list.adcode,
      };
      // 清除点
      this.removeMarker();
      // 标记点
      this.setMapMarker();
    },
    confirmChoose() {
      this.$emit("choose", this.formOne);
    },
    cancel() {
      this.$emit("cancel");
    },
  },
};
</script>

<style scoped>
.map-info {
  display: flex;
  justify-content: space-evenly;
  flex-direction: row;
  width: 100%;
}
.dialog-footer {
  display: flex;
  justify-content: space-evenly;
  flex-direction: row;
  width: 100%;
}
</style>