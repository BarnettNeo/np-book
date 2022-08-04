# np-book

### 图书分享交友小程序
技术栈：基于uniapp和unicloud、vue2及vuex，组件库uni-ui

### 使用说明
 - 注册自己的微信小程序并获取appid和secret
 - 将appid和secret填写到云函数文件夹cloudfunctions/common/wx-common/index.js中
 - 注册自己的uniCloud服务，并创建关联一个阿里云服务空间
 - 云数据库每个数据表需配置索引，如：
 ![](README_files/1.jpg)