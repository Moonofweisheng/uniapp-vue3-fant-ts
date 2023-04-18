# uniapp-vue3-fant-ts

#### 介绍
基于uni-app和fant-mini-plus的vue3项目基础模板，使用vue3、vite4、[fant-mini-plus](https://ext.dcloud.net.cn/plugin?id=11489)、pinia、[uni-mini-router](https://ext.dcloud.net.cn/plugin?id=11208)、axios、[fant-axios-adapter](https://ext.dcloud.net.cn/plugin?id=11817)开发，基于koa实现mock功能

#### 特性

- 🚀 使用vue3/vite4/pinia/axios等主流框架开发
- 🚀 引入fant-mini-plus组件库，开箱即用
- 💪 引入Eslint/Prettier，统一前端代码风格
- 💪 引入lint-staged/husky/commitlint/commitizen/standard-version，统一代码提交规范，自动生成版本发布日志
- 💪 使用pinia，并支持持久化存储
- 💪 提供koa-mock本地mock服务

#### 安装依赖
```
yarn 
```
或者  
```
npm install
```
##### 安装mock依赖
```
yarn mock:install
```
或者  
```
npm run mock:install
```

#### 运行
```sh
# 运行到h5
yarn dev:h5
```
##### 运行mock服务
```sh
yarn mock:dev
```


#### Lint and fix
```
yarn lint
```

#### 提交代码
```sh
git add .

yarn commit
```

#### 发布版本


``` sh
# 大版本
yarn release-major  

# 中版本
yarn release-minor

# 小版本
yarn release-patch
```

#### 开发提示  
- 使用typescript开发可以提高前后端交互的效率，提升前端项目的健壮性。在开发过程中需要做到尽量减少使用any。
小程序样式变量统一定义在uni.scss中，作为规范，若设计稿上使用的颜色存在于uni.scss中，则使用uni.scss中的变量，如不存在则需要沟通是否新增变量。

- 提交代码时，feat和fix类型的提交尽量将任务单号作为前缀方便追踪改动关联的需求，如：feat: TASK-1000 新增某个功能。