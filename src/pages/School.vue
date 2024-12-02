<template>
    <div class="box" ref="chart">

    </div>

</template>

<script setup>
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts';
import axios from 'axios';

const chart = ref();
const School = ref();

onMounted(async () => {
    var myChart = echarts.init(chart.value);
    var option;


    const headers = {
        'Content-Type': 'application/json'
    }
    const response = await axios.get('https://localhost:7084/api/Basic/School', { headers });
    School.value = response.data;  // 将数据保存到变量中
    // prettier-ignore
    let dataAxis = School.value.name;
    // prettier-ignore
 
    let data = School.value.count;
    let yMax = 135;
    let dataShadow = [];
    for (let i = 0; i < data.length; i++) {
        dataShadow.push(yMax);
    }
    option = {
        grid: {
            bottom: '3%',
            left: '3%',
            right: '3%'
        },
        title: {
            text: '学校数量',
            subtext: 'Feature Sample: Gradient Color, Shadow, Click Zoom'
        },
        xAxis: {
            data: dataAxis.slice(0, 10),
            axisLabel: {
                inside: true,
                color: '#000',
                rotate: 90,
                margin: 4,

            },
            axisTick: {
                show: false
            },
            axisLine: {
                show: false
            },
            z: 10
        },
        yAxis: {
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                color: '#999'
            },
            minInterval: 1
        },
        dataZoom: [
            {
                type: 'inside'
            }
        ],
        series: [
            {
                type: 'bar',
                showBackground: true,
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: '#83bff6' },
                        { offset: 0.5, color: '#188df0' },
                        { offset: 1, color: '#188df0' }
                    ])
                },
                emphasis: {
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: '#2378f7' },
                            { offset: 0.7, color: '#2378f7' },
                            { offset: 1, color: '#83bff6' }
                        ])
                    }
                },
                data: data.slice(0, 10)
            }
        ]
    };
    // Enable data zoom when user click bar.
    const zoomSize = 6;
    myChart.on('click', function (params) {
        console.log(dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)]);
        myChart.dispatchAction({
            type: 'dataZoom',
            startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
            endValue:
                dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)]
        });
    });


    option && myChart.setOption(option);
})

</script>

<style scoped>
.el-col {
    text-align: center;
}

.box {
    right: 10px;
    width: 850px;
    top: 85px;
    position: absolute;
    height: 277px;
    border-radius: 10px;
    border-style: solid;
}

.countdown-footer {
    margin-top: 8px;
}
</style>