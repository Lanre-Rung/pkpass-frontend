<template>
  <div class="nav">
    <ul>
      <li>MetaData</li>
      <li>Image&BackgroundColor</li>
      <li>Header Fields</li>
      <li>Primary Fields</li>
      <li>Secondary Fields</li>
    </ul>
  </div>
</template>
<script>
export default{
  name:'SlideNav'
}
</script>
<style>
.nav{
  width: 200px;
  height: 900px;
  background-color: #ccc;
}
.nav ul{
  padding: 0;
}
.nav li{
  height: 180px;
  border-bottom: 2px solid #fff;
  line-height: 180px;
  text-align: center;
}
</style>