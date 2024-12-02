<template>
    <div class="box">
        <div ref="chart" style="width: 1300px;height:400px;">

        </div>
        <div class="word">用户生日分布</div>
    </div>
</template>
<script setup>
import * as echarts from 'echarts';
import { onMounted, ref } from 'vue';
import axios from 'axios';

const Month = ref(null);
const chart = ref();
var option;



var option;

onMounted(async () => {
    var chartDom = echarts.init(chart.value);

    const headers = {
        'Content-Type': 'application/json'
    }
    const response = await axios.get('https://localhost:7084/api/Basic/AllUsersBirthday', { headers });
    Month.value = response.data;  // 将数据保存到变量中
    console.log(Month)
    let January = Month.value.january;
    let February = Month.value.february;
    let March = Month.value.march;
    let April = Month.value.april;
    let May = Month.value.may;
    let June = Month.value.june;
    let July = Month.value.july;
    let August = Month.value.august;
    let September = Month.value.september;
    let October = Month.value.october;
    let November = Month.value.november;
    let December = Month.value.december;
    option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            
            left: '1%',
            right: '1%',
            bottom: '1%',
            containLabel: true,
            width:1300,
            height:360
        },
        xAxis: [
            {
                type: 'category',
                data: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                axisTick: {
                    alignWithLabel: true
                }
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: 'Count',
                type: 'bar',
                barWidth: '50%',
                data: [January, February, March, April, May, June, July, August, September, October, November, December]

            }
        ]
    };

    option && chartDom.setOption(option);
})




</script>
<style scoped>
.box{
    height: max-content;
    margin-left: auto;
    
    border: 10px;
    position: absolute;
    bottom: 10px;
    
}
.word{
    margin-left: auto;
    bottom: 10px;
    color: rgb(117, 93, 124);
}

</style>