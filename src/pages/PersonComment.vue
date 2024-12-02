<template>
    <div ref="chart" style="width: 850px;height:850px;position: absolute;top:20% ;left: 20%;">

    </div>
</template>

<script setup>
import * as echarts from 'echarts';
import { onMounted, ref } from 'vue';
const chart = ref();
var option;
onMounted(() => {
    var chartDom = echarts.init(chart.value);
    option = {
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
            data: [
                'アニメ',
                '動画',
                '音乐',
                '知識',
                'ゲーム',
                '生活',
                '科学',
                '美食',
                'その他'
            ]
        },
        series: [
            
            {
                name: 'Access From',
                type: 'pie',
                radius: ['0%', '50%'],
                labelLine: {
                    length: 30
                },
                label: {
                    formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
                    backgroundColor: '#F6F8FC',
                    borderColor: '#8C8D8E',
                    borderWidth: 3,
                    borderRadius: 2,
                    rich: {
                        a: {
                            color: '#6E7079',
                            lineHeight: 22,
                            align: 'center'
                        },
                        hr: {
                            borderColor: '#8C8D8E',
                            width: '100%',
                            borderWidth: 1,
                            height: 0
                        },
                        b: {
                            color: '#4C5058',
                            fontSize: 14,
                            fontWeight: 'bold',
                            lineHeight: 33
                        },
                        per: {
                            color: '#fff',
                            backgroundColor: '#4C5058',
                            padding: [3, 4],
                            borderRadius: 4
                        }
                    }
                },
                data: [
                    { value: 1548, name: 'アニメ' },
                    { value: 2235, name: '動画' },
                    { value: 410, name: '音乐' },
                    { value: 851, name: '知識' },
                    { value: 2234, name: 'ゲーム' },
                    { value: 1747, name: '生活' },
                    { value: 335, name: '科学' },
                    { value: 402, name: '美食' },
                    { value: 1582, name: 'その他' }
                ]
            }
        ]
    };

    option && chartDom.setOption(option);
})

</script>

<style scoped></style>