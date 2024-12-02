<template>
  <div class="sidebar" :class="{'is-collapsed': isCollapsed}">
  <button>Toggle</button>
  <nav>
    <ul>
      <li :class="{ active: activeLink === 'link1' }" @click="setActiveLink('link1')"><router-link to="/Home">首页</router-link></li>
      <li :class="{ active: activeLink === 'link2' }" @click="setActiveLink('link2')"><router-link to="/Person">用户</router-link></li>
      <li :class="{ active: activeLink === 'link3' }" @click="setActiveLink('link3')"><router-link to="/Hot">热门视频</router-link></li>
      
    </ul>
  </nav>
</div>

<div>
  <router-view>
  
</router-view>
</div>

</template>
  
<script setup>
import { ref } from 'vue';

const isCollapsed = ref(false);
const activeLink = ref(null);



const setActiveLink = (link) => {
  activeLink.value = link;
};
</script>

  
  <style scoped>
  .sidebar {
    position: fixed; /* 将侧边栏固定在页面左侧 */
    top: 0; /* 顶部对齐 */
    left: 0; /* 左侧对齐 */
    height: 100%; /* 使侧边栏的高度撑满整个页面高度 */
    width: 150px; /* 默认宽度 */
    background-color: #34495e; /* 背景颜色 */
    transition: width 0.3s; /* 平滑宽度变化的过渡效果 */
    overflow-x: hidden; /* 防止内容溢出 */
    box-shadow: 3px 0px 10px rgba(0, 0, 0, 0.5); /* 添加阴影效果 */
    color: #fff; /* 文字颜色 */
  }

  .router-link-active, .router-link-exact-active {
  color: #2c838e; /* 激活状态下的颜色，例如 Vue 的绿色 */
}

 /* 直接设置 .active 类的颜色 */
.sidebar li.active a {
  color: #f39c12; /* 激活链接的颜色 */
}
.active a {
  color: #f39c12; /* 激活链接的颜色 */
}
  
  .sidebar li {
  padding: 10px 0; /* 列表项内边距 */
  display: flex; /* 使用 Flexbox 布局 */
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
}

.sidebar a {
  color: #bdc3c7; /* 链接颜色 */
  padding: 10px 15px; /* 链接内边距 */
  text-decoration: none; /* 去除下划线 */
  display: block; /* 使链接占据整行 */
  width: 100%; /* 确保链接的可点击区域扩展到整个列表项 */
  text-align: center; /* 文字居中 */
  transition: color 0.3s; /* 链接颜色变化的过渡效果 */
}
  .sidebar a:hover {
    color: rgb(34, 172, 203); /* 鼠标悬停时的链接颜色 */
  }
  
  .sidebar ul {
    list-style-type: none; /* 去除列表标记 */
    padding: 0; /* 去除内边距 */
  }
  button {
  background-color: #2980b9; /* 按钮背景颜色 */
  color: #fff; /* 按钮文字颜色 */
  border: none; /* 去除边框 */
  padding: 10px; /* 按钮内边距 */
  width: 100%; /* 按钮宽度 */
  cursor: pointer; /* 鼠标悬停时的指针样式 */
  text-align: center; /* 确保按钮内的文字居中 */
}
  
  button:hover {
    background-color: #56b1dc; /* 鼠标悬停时的按钮背景颜色 */
  }
  </style>
  
  