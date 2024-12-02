<template>
    <div class="box">
        <el-row>
            <el-col :span="6">
                <el-statistic title="All users" :value="outputCount" />
            </el-col>
            <el-col :span="6">
                <el-statistic :value="outputMale">
                    <template #title>
                        <div style="display: inline-flex; align-items: center">
                            Ratio of men to women
                            <el-icon style="margin-left: 4px" :size="12">
                                <Male />
                            </el-icon>
                        </div>
                    </template>
                    <template #suffix>/{{outputFemale}}</template>
                </el-statistic>
            </el-col>
            <el-col :span="6">
                <el-statistic title="Total Live Room" :value="outputLive" />
            </el-col>
            <el-col :span="6">
                <el-statistic title="Senior User" :value="outputSenior">
                    <template #suffix>
                        <el-icon style="vertical-align: -0.125em">
                            <ChatLineRound />
                        </el-icon>
                    </template>
                </el-statistic>
            </el-col>
        </el-row>
    </div>

</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useTransition } from '@vueuse/core'
import { ChatLineRound, Male } from '@element-plus/icons-vue'
import axios from 'axios';
const user_count=ref(0);
const user_female=ref(0);
const user_male=ref(0);
const user_senior=ref(0);
const user_live=ref(0);
const outputCount = useTransition(user_count, {
    duration: 1500,
})

const outputSenior = useTransition(user_senior, {
    duration: 1500,
})

const outputFemale = useTransition(user_female, {
    duration: 10,
})
const outputMale = useTransition(user_male, {
    duration: 10,
})

const outputLive = useTransition(user_live, {
    duration: 1500,
})

onMounted(async()=>{
    const headers = {
        'Content-Type': 'application/json'
    }
    const user_count_response = await axios.get('https://localhost:7084/api/Basic/AllUsersCount', { headers });
    user_count.value = user_count_response.data;  // 将数据保存到变量中
    
    const user_female_response = await axios.get('https://localhost:7084/api/Basic/AllUsersMale', { headers });
    user_male.value = user_female_response.data; //男
    console.log()
    const user_male_response = await axios.get('https://localhost:7084/api/Basic/AllUsersFemale', { headers });
    user_female.value = user_male_response.data;  //女

    const user_senior_response = await axios.get('https://localhost:7084/api/Basic/DeepUser', { headers });
    user_senior.value = user_senior_response.data;

    const user_live_response = await axios.get('https://localhost:7084/api/Basic/AllUsersLive', { headers });
    user_live.value = user_live_response.data;
})


const source = ref(0)
const outputValue = useTransition(source, {
    duration: 1500,
})
source.value = 172000
</script>

<style scoped>
.el-col {
    text-align: center;
}

.box{
       
    right: 10px;
    width: 850px;
    position: absolute;
    border-radius: 10px;
    border: 5px;
    border-style: solid;
    top: 10px;
}
</style>