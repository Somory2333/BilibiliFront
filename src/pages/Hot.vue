<template>
  <div class="common-layout">

    <el-header>
      <div>
        <a-page-header style="border: 1px solid rgb(235, 237, 240)" title="Title" sub-title="This is a subtitle"
          @back="() => null" />
      </div>
    </el-header>
    <el-main>
      <el-card style="max-width: 1300px;height: 700px;">
        <template #header>
          <div class="card-header">
            <span>一周热点</span>
          </div>
        </template>

        <div class="Bar" ref="chart" style="height: 600px;width: 1400px;"></div>
      </el-card>

    </el-main>

  </div>
</template>

<script setup>
import * as echarts from 'echarts';
import { onMounted, ref } from 'vue';

const chart = ref();
var option;

onMounted(() => {

  var chartDom = echarts.init(chart.value);
  // There should not be negative values in rawData
  const rawData = [
    [3, 2, 1, 2, 2, 3, 2],//动画
    [3, 2, 1, 4, 3, 2, 1],//番剧
    [2, 2, 1, 2, 1, 1, 2],//国创
    [1, 1, 1, 1, 1, 0, 0],//音乐
    [0, 0, 0, 0, 0, 0, 1],//舞蹈
    [2, 2, 3, 3, 3, 4, 4],//游戏
    [0, 0, 0, 1, 0, 0, 0],//知识
    [0, 0, 0, 0, 0, 0, 0],//科技
    [0, 0, 0, 0, 0, 0, 0],//运动    
    [0, 0, 0, 0, 0, 0, 0],//汽车
    [3, 2, 2, 2, 3, 3, 4],//生活    
    [1, 1, 1, 1, 0, 1, 1],//美食
    [0, 1, 0, 0, 0, 0, 0],//动物圈
    [0, 0, 0, 1, 0, 0, 0],//鬼畜
    [0, 0, 0, 0, 0, 0, 0],//时尚
    [0, 0, 0, 0, 0, 0, 0],//纪录片
    [1, 2, 2, 1, 1, 2, 2],//娱乐
  ];
  const totalData = [];
  for (let i = 0; i < rawData[0].length; ++i) {
    let sum = 0;
    for (let j = 0; j < rawData.length; ++j) {
      sum += rawData[j][i];
    }
    totalData.push(sum);
  }
  const grid = {
    left: 100,
    right: 100,
    top: 50,
    bottom: 50
  };
  const gridWidth = chartDom.getWidth() - grid.left - grid.right;
  const gridHeight = chartDom.getHeight() - grid.top - grid.bottom;
  const categoryWidth = gridWidth / rawData[0].length;
  const barWidth = categoryWidth * 0.6;
  const barPadding = (categoryWidth - barWidth) / 2;
  const series = [
    '动画',
    '番剧',
    '国创',
    '音乐',
    '舞蹈',
    '游戏',
    '知识',
    '科技',
    '运动',
    '汽车',
    '生活',
    '美食',
    '动物圈',
    '鬼畜',
    '时尚',
    '纪录片',
    '娱乐'
  ].map((name, sid) => {
    return {
      name,
      type: 'bar',
      stack: 'total',
      barWidth: '60%',
      label: {
        show: true,
        formatter: (params) => Math.round(params.value * 1000) / 10 + '%'
      },
      data: rawData[sid].map((d, did) =>
        totalData[did] <= 0 ? 0 : d / totalData[did]
      )
    };
  });
  const color = ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de'];
  const elements = [];
  for (let j = 1, jlen = rawData[0].length; j < jlen; ++j) {
    const leftX = grid.left + categoryWidth * j - barPadding;
    const rightX = leftX + barPadding * 2;
    let leftY = grid.top + gridHeight;
    let rightY = leftY;
    for (let i = 0, len = series.length; i < len; ++i) {
      const points = [];
      const leftBarHeight = (rawData[i][j - 1] / totalData[j - 1]) * gridHeight;
      points.push([leftX, leftY]);
      points.push([leftX, leftY - leftBarHeight]);
      const rightBarHeight = (rawData[i][j] / totalData[j]) * gridHeight;
      points.push([rightX, rightY - rightBarHeight]);
      points.push([rightX, rightY]);
      points.push([leftX, leftY]);
      leftY -= leftBarHeight;
      rightY -= rightBarHeight;
      elements.push({
        type: 'polygon',
        shape: {
          points
        },
        style: {
          fill: color[i],
          opacity: 0.25
        }
      });
    }
  }
  option = {
    legend: {
      selectedMode: false
    },
    grid,
    yAxis: {
      type: 'value'
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    series,
    graphic: {
      elements
    }
  };

  option && chartDom.setOption(option);
})






</script>

<style scoped>
.el-header {
  background-color: rgb(255, 255, 255);
  position: absolute;
  top: 0px;
  left: 150px;
  width: 1331px;
  align-content: center;
}

.el-main {
  position: absolute;
  width: 1331px;
  height: 727px;
  top: 60px;
  left: 150px;

  background-color: rgb(255, 255, 255);
}

.Bar {
  position: absolute;
  top: 100px;
  left: -30px;
}
</style>