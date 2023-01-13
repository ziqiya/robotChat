# webSocket

使用了 webSocket + koa + mysql + react + 茉莉机器人 的智能聊天系统。

## 使用方法

### 环境安装

1. 先安装`mysql`并启动,使用 `Navicat for MySQL`软件，导入`database` 文件夹下的初始数据库到本地数据库。
2. 在 backEnd 文件夹中运行`yarn`，安装依赖。
3. 在 backEnd 文件夹中运行`yarn server`，运行服务器。

### 登录方法

#### 一、react 版

1. 进入 fontEnd/chat-room-react 文件夹，执行 `yarn`，安装依赖。
2. 安装完毕后，执行`yarn start` 即可启动客户端。

#### 二、h5 版

1. 进入 fontEnd 文件夹，用浏览器打开`h5/index.html`页面或者用`http-server`启动。

### 功能

1. 聊天室客户端开启后会自动连接至本地服务器，如果服务器已经开启，可以在聊天室页面中看到历史记录否则会弹窗报错。
2. 发送消息: 在打开的聊天室页面中先输入你的用户名，再输入发送内容，点击发送按钮即可发送。
3. 机器人会对你的每次消息进行智能回复，快去体验吧~

## 说明

本机器人使用的是茉莉机器人，可以自行百度添加机器人并获取 APIKey 和 ApiSecret。

[![RuanXuSong's github stats](https://github-readme-stats.vercel.app/api?username=RuanXuSong)](https://github.com/RuanXuSong/github-readme-stats)