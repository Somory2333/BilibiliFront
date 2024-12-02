<template>
  <div class="box">
    <div class="upbox">用户等级数量</div>
    
    <div ref="chart"  style="width: 450px;height:350px;position: absolute;top:7% ;left: 0%;"></div>
  
  </div>
  
</template>

<script setup>
import * as echarts from 'echarts';
import { onMounted, ref } from 'vue';
import axios from 'axios';

const chart = ref();
var option;

// 创建一个响应式变量来存储从后端获取的数据
const Level = ref(null);






onMounted(async () => {
  
  
    const headers={
      'Content-Type': 'application/json'
    }
    const response = await axios.get('https://localhost:7084/api/Basic/AllUsersLevel',{headers});
    Level.value = response.data;  // 将数据保存到变量中
    

    console.log(Level.value)
  
  
  var chartDom = echarts.init(chart.value);
  option = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '5%',
      left: 'center'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 30,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: Level.value.level2Count, name: 'Lv2' },
          { value: Level.value.level3Count, name: 'Lv3' },
          { value: Level.value.level4Count, name: 'Lv4' },
          { value: Level.value.level5Count, name: 'Lv5' },
          { value: Level.value.level6Count, name: 'Lv6' }
        ]
      }
    ]
  };
  option && chartDom.setOption(option);
})




</script>
<style scoped>
.box{

  left: 20px;
  top: 10px;
  box-shadow: 0 0 10px rgba(0,0,0,0.2);
  transition: box-shadow 0.3s ease-in-out;
  position: absolute;
  height: 350px;
  width: 430px;
  border-radius: 10px;
  background-color: rgb(251, 240, 246);
}

.box:hover {
  box-shadow: 0 0 20px rgba(0,0,0,0.4);
}

 .upbox{
  position: absolute;
  top: 10px;
  right: 10px;
  left: 10px;
  bottom: 0;
  margin: auto;
  color: black;
 }
</style>
