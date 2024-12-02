<template>
  <div class="container">
    <Pie></Pie>
    <Birthday></Birthday>
    <Other></Other>
    <School></School>
    
  </div>
</template>

<script setup>
import Pie from '@/pages/Pie.vue';
import Birthday from '@/pages/Birthday.vue';
import Other from '@/pages/Other.vue';
import School from '@/pages/School.vue';
// 这里可以添加一些JavaScript逻辑，如果需要的话

</script>

<style scoped>
.container {
  position: absolute;
  left: 150px;
  top: 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin: 0px;
  border-radius: 8px;
  width: 1329px;
  height: 787px;
}
</style>
