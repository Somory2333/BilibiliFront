<template>

    <div class="header">
        <el-input v-model="input" type="number" class="header_input" style="width: 240px" placeholder="Please input" />
        <div class="header_button">
            <el-button ref="btn" type="primary" @click="func">确定</el-button>
        </div>
    </div>
    <div class="components-page-header-demo-content">
        <a-page-header :title=user_name class="site-page-header" :sub-title=user_birthday :avatar="{ src: user_icon }">

            <template #tags>
                <a-tag color="blue">{{ user_level }}</a-tag>
                <a-tag v-if="user_senior === 1" color="red">硬核会员</a-tag>
                <a-tag v-if="user_vip === 2 && timestamp < user_vipLose" color="pink">年度大会员</a-tag>
                <a-tag v-if="user_vip === 1 && timestamp < user_vipLose" color="pink">月度大会员</a-tag>
                <a-tag v-if="user_live === 1" color="green">直播中</a-tag>
            </template>

            <a-row class="content">
            <div class="">

            </div>
                <div style="flex: 1">
                    <p>
                        {{ user_descripration }}
                    </p>

                    <div>
                        <template v-for="item in iconLinks" :key="item.src">
                            <a class="example-link" :href="item.num === 1 ? user_info : user_liveurl" target="_blank">
                                <img class="example-link-icon" :src="item.src" :alt="item.text" />
                                {{ item.text }}
                            </a>
                        </template>
                    </div>
                </div>

                <div class="card" style="background-color: #ececec; padding: 0px">
                    <a-row :gutter="16">
                        <a-col :span="1181">
                            <a-card title="基本信息" :bordered="false">
                                <p>
                                    <a-descriptions size="small" :column="3">
                                        <a-descriptions-item label="获赞数">{{ user_like }}</a-descriptions-item>
                                        <a-descriptions-item label="投稿数">
                                            {{ user_submisson }}
                                        </a-descriptions-item>
                                        <a-descriptions-item label="关注数">{{ user_follow }}</a-descriptions-item>
                                        <a-descriptions-item v-if="user_vipLose !== 0" label="大会员到期时间">{{
                                            loseTime
                                        }}</a-descriptions-item>
                                        <a-descriptions-item label="粉丝勋章">
                                            {{ user_fan ? "有" : "无" }}
                                        </a-descriptions-item>

                                    </a-descriptions>
                                </p>
                            </a-card>
                        </a-col>

                    </a-row>
                </div>


            </a-row>
        </a-page-header>
    </div>



    <div class="cardpie">

        <a-card style="width: 1285px;height: 900px;" title="个人记录" :tab-list="tabList" :active-tab-key="key"
            @tabChange="key => onTabChange(key, 'key')">
            <template #customTab="item">
                <span v-if="item.key === 'tab1'">

                    <home-outlined />
                    {{ item.tab }}
                </span>
            </template>
            <template #extra>
                <a href="https://github.com/Somory2333/bilibiliGet" target="_blank">More</a>
            </template>

            <component :is="contentList[key]" ref="childRef" :msg="currentValue" />

        </a-card>
        <br />
        <br />



    </div>
</template>

<script setup>
import PersonCoin from '@/pages/PersonCoin.vue';
import PersonLike from '@/pages/PersonLike.vue';
import PersonWork from '@/pages/PersonWork.vue';
import PersonComment from 'C:\\Users\\Somory\\Desktop\\bfront\\init\\src\\pages\\PersonComment.vue';
import { onMounted, ref } from 'vue'
import axios from 'axios';
const childRef = ref(null);
const currentValue = ref(1);
const timestamp = new Date().getTime(); //1610075969354 
//https://images.weserv.nl/?url=
const input = ref('')
const user_info = ref();
const user_name = ref("Title");
const user_level = ref("Lv?");
const user_descripration = ref("个人简介");
const user_birthday = ref("")
const user_senior = ref(0)
const user_vip = ref();
const user_vipLose = ref();
const user_like = ref()
const user_follow = ref()
const user_submisson = ref()
const user_live = ref()
const user_fan = ref()
const user_liveurl = ref()
var dateVip
var Y;
var M;
var D;
var loseTime;
const user_icon = ref("https://avatars1.githubusercontent.com/u/8186664?s=460&v=4");
var user = ref();
var userCard = ref();

const func = async () => {
    currentValue.value = Number(input.value);
    user_info.value = `https://space.bilibili.com/${input.value}`;
    const response = await axios.get(`https://localhost:7084/api/One/OneUser?mid=${input.value}`);
    user.value = response.data;
    user_icon.value = "https://images.weserv.nl/?url=" + user.value.face;
    user_name.value = user.value.name
    user_liveurl.value = user.value.liveUrl
    user_level.value = "Lv" + user.value.level
    user_vip.value = user.value.vip
    user_vipLose.value = user.value.vipLose
    user_live.value = user.value.liveStatus
    user_fan.value = user.value.fansbadge
    user_descripration.value = user.value.descripration
    user_senior.value = user.value.isSeniorMember
    user_birthday.value = user.value.birthday
    dateVip = new Date(user_vipLose.value)
    Y = dateVip.getFullYear() + '-';
    M = (dateVip.getMonth() + 1 < 10 ? +(dateVip.getMonth() + 1) : dateVip.getMonth() + 1) + '-';
    D = dateVip.getDate();
    loseTime = Y + M + D



    const responseCard = await axios.get(`https://localhost:7084/api/One/UserCard?mid=${input.value}`);
    userCard.value = responseCard.data
    user_like.value = userCard.value.like
    user_follow.value = userCard.value.follow
    user_submisson.value = userCard.value.submissions


    if (childRef.value) {
        childRef.value.func();
    }

};




const iconLinks = [
    {
        src: 'https://gw.alipayobjects.com/zos/rmsportal/NbuDUAuBlIApFuDvWiND.svg',
        text: '个人空间主页',
        num: 1
    },
    {
        src: 'https://gw.alipayobjects.com/zos/rmsportal/MjEImQtenlyueSmVEfUD.svg',
        text: '直播间',
        num: 2
    }
];



const tabList = [
    {
        key: 'tab1',
        tab: '点赞信息',
    },
    {
        key: 'tab2',
        tab: '投币信息',
    }, 
    {
        key: 'tab3',
        tab: '投稿信息',
    },
    {
        key: 'tab4',
        tab: '推荐信息',
    }
];
const contentList = ref({
    tab1: PersonLike,
    tab2: PersonCoin,
    tab3: PersonWork,
    tab4: PersonComment
})

const key = ref('tab1');
const noTitleKey = ref('app');
const onTabChange = (value, type) => {
    console.log(value, type);
    if (type === 'key') {
        key.value = value;
    } else if (type === 'noTitleKey') {
        noTitleKey.value = value;
    }
};

</script>

<style scoped>
.header_input {
    position: absolute;
    top: 10px;
    right: 150px;
}

.header {
    position: absolute;

    top: 0;
    width: 1316px;
    background-color: rgb(183, 234, 234);
    height: 50px;
    border-radius: 0px;


    left: 150px;
    border-bottom: 0px;
}

.header_button {
    text-align: center;
    position: absolute;
    right: 50px;
    top: 10px;
}

.card {
    position: absolute;
    top: 3px;
    right: 10px;
    height: 10px;
    width: 700px;
}

.cardpie {
    position: absolute;
    top: 233px;
    left: 170px;
}


.components-page-header-demo-content {
    left: 0px;
    width: 1316px;
    position: absolute;
    top: 50px;
    left: 150px;

    border-left: none;
    border-right: none;
    border-bottom: none;

    border-color: rgb(119, 119, 119);

}

#components-page-header-demo-content .image {
    margin: 0 0 0 60px;
    display: flex;
    align-items: center;
}

#components-page-header-demo-content .ant-page-header-rtl .image {
    margin: 0 60px 0 0;
}

#components-page-header-demo-content .example-link {
    line-height: 24px;
    margin-right: 16px;
}

[data-theme='compact'] #components-page-header-demo-content .example-link {
    line-height: 20px;
}

#components-page-header-demo-content .example-link-icon {
    margin-right: 8px;
}

[data-theme='compact'] #components-page-header-demo-content .example-link-icon {
    width: 20px;
    height: 20px;
}

#components-page-header-demo-content .ant-page-header-rtl .example-link {
    float: right;
    margin-right: 0;
    margin-left: 16px;
}

#components-page-header-demo-content .ant-page-header-rtl .example-link-icon {
    margin-right: 0;
    margin-left: 8px;
}

#components-page-header-demo-content .content p {
    margin-bottom: 1em;
    color: rgba(0, 0, 0, 0.85);
    overflow-wrap: break-word;
}

@media (max-width: 768px) {
    #components-page-header-demo-content .image {
        flex: 100%;
        margin: 24px 0 0;
    }
}
</style>