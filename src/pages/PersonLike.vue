<template>
    <div class="pieimg" ref="chart" style="height: 600px ;width: 600px;"></div>
    <div class="list">
        <a-list item-layout="vertical" size="large" :pagination="pagination" :data-source="listData">
            <template #footer>
                <div>
                    <b>ant design vue</b>
                    footer part
                </div>
            </template>
            <template #renderItem="{ item }">
                <a-list-item key="item.title">
                    <template #actions>
                        <span v-for=" action in actions" :key="action.icon">
                            <component :is="action.icon" style="margin-right: 8px" />
                            {{ action.text(item) }}
                        </span>
                    </template>
                    <template #extra>
                        <a :href="item.video" target="_blank">
                            <img width="272" :src="item.imageSrc" />
                        </a>
                    </template>
                    <a-list-item-meta :description="item.description">
                        <template #title>
                            <a :href="item.auther" target="_blank">{{ item.title }}</a>
                        </template>
                        <template #avatar><a-avatar :src="item.avatar" /></template>
                    </a-list-item-meta>
                    {{ item.content }}
                </a-list-item>
            </template>
        </a-list>
    </div>
</template>


<script setup>
import * as echarts from 'echarts';
import { onMounted, ref } from 'vue';
import { StarOutlined, LikeOutlined, MessageOutlined } from '@ant-design/icons-vue';
import axios from 'axios';
import { toRefs, defineProps } from 'vue'
const props = defineProps({
    //子组件接收父组件传递过来的值
    msg: Number,
})
var option;
var videoRate = [];

const actions = ref([
    {
        icon: StarOutlined,
        text: (item) => { return item.favorite },
    },
    {
        icon: LikeOutlined,
        text: (item) => { return item.like },
    },
    {
        icon: MessageOutlined,
        text: (item) => { return item.reply },
    },
]);

const videoFace = ref([]);
var chartDom;
const chart = ref();
const like = ref(0);
const arrayLength = ref(6);
const listData = ref([]);
for (let i = 0; i < arrayLength.value; i++) {
    listData.value.push({
        href: 'https://www.antdv.com/',
        title: `ant design vue part ${i}`,
        avatar: 'https://joeschmoe.io/api/v1/random',
        description:
            '',
        content:
            'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
    });
}

const func =
    async () => {
        if (props.msg !== undefined) {
            const response = await axios.get(`https://localhost:7084/api/GetVideo/LikeVideo?vmid=${props.msg}`);
            console.log(response.data)
            //console.log(response.data[1].title)
            listData.value.length = 0;
            videoFace.value.length = 0;

            arrayLength.value = response.data.length;
            //console.log(response.data.length)
            for (let i = 0; i < arrayLength.value; i++) {
                listData.value.push({
                    href: `https://space.bilibili.com/${props.msg}`,
                    auther: `https://space.bilibili.com/${response.data[i].auther_mid}`,
                    title: response.data[i].auther_name,
                    avatar: "https://images.weserv.nl/?url=" + response.data[i].auther_face,
                    imageSrc: "https://images.weserv.nl/?url=" + response.data[i].video_pic,
                    description:
                        response.data[i].title,
                    content:
                        response.data[i].desc,
                    video: "https://www.bilibili.com/video/" + response.data[i].bvid,
                    favorite: response.data[i].favorite,
                    like: response.data[i].like,
                    reply: response.data[i].reply
                });
                videoFace.value.push({
                    url: "https://images.weserv.nl/?url=" + response.data[i].video_pic
                }

                )
                like.value = response.data[i].like
            }

            videoRate.value = aggregateData(response.data).map(item => ({
                value: item[0],  // 第一个元素作为 value
                name: item[1]    // 第二个元素作为 name
            }));

            console.log(videoRate)
            console.log(option.series[0].data)
            option.series[0].data = videoRate.value;
            console.log(option.series[0].data)
            chartDom.setOption(option)
        }
    }

onMounted(async () => {

    if (props.msg !== undefined) {
        const response = await axios.get(`https://localhost:7084/api/GetVideo/LikeVideo?vmid=${props.msg}`);
        console.log(response.data)
        //console.log(response.data[1].title)
        listData.value.length = 0;
        videoFace.value.length = 0;

        arrayLength.value = response.data.length;
        //console.log(response.data.length)
        for (let i = 0; i < arrayLength.value; i++) {
            listData.value.push({
                href: `https://space.bilibili.com/${props.msg}`,
                auther: `https://space.bilibili.com/${response.data[i].auther_mid}`,
                title: response.data[i].auther_name,
                avatar: "https://images.weserv.nl/?url=" + response.data[i].auther_face,
                imageSrc: "https://images.weserv.nl/?url=" + response.data[i].video_pic,
                description:
                    response.data[i].title,
                content:
                    response.data[i].desc,
                video: "https://www.bilibili.com/video/" + response.data[i].bvid,
                favorite: response.data[i].favorite,
                like: response.data[i].like,
                reply: response.data[i].reply
            });
            videoFace.value.push({
                url: "https://images.weserv.nl/?url=" + response.data[i].video_pic
            }

            )
            like.value = response.data[i].like
        }

        videoRate.value = aggregateData(response.data).map(item => ({
            value: item[0],  // 第一个元素作为 value
            name: item[1]    // 第二个元素作为 name
        }));

        console.log(videoRate)
        console.log(option.series[0].data)
        option.series[0].data = videoRate.value;
        console.log(option.series[0].data)
        chartDom.setOption(option)
    }
})

const pagination = {
    onChange: page => {
        console.log(page);
    },
    pageSize: 2,
};




function aggregateData(videos) {
    const countMap = new Map();

    // Count each tname
    videos.forEach(video => {
        if (video.tname) {
            countMap.set(video.tname, (countMap.get(video.tname) || 0) + 1);
        } else {
            console.error('Missing tname in video:', video);
        }
    });

    // Convert map to an array of [value, name] pairs
    const dataArray = Array.from(countMap, ([name, value]) => [value, name]);

    console.log(dataArray)
    return dataArray;
}



defineExpose({ func })

onMounted(() => {


    chartDom = echarts.init(chart.value);


    option = {
        title: {
            text: '类别分析图',
            subtext: '喜好',
            left: 'center'
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            left: 'left'
        },
        series: [
            {
                name: 'Access From',
                type: 'pie',
                radius: '50%',
                data: [{ value: 1048, name: 'Search Engine' },
                { value: 735, name: 'Direct' },
                { value: 580, name: 'Email' },
                { value: 484, name: 'Union Ads' },
                { value: 300, name: 'Video Ads' }],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };

    option && chartDom.setOption(option);



})

</script>

<style scoped>
.pieimg {
    position: absolute;
    top: 200px;
    left: 30px;
}

.list {

    top: 130px;
    position: absolute;
    right: 10px;
    left: 580px;
    height: auto;

}
</style>