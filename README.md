# Vue3-Uni-TS-Template基础模板

## [官方文档：https://fant-mini-plus.top](https://fant-mini-plus.top/fant-mini-plus/)

## [开发计划（规划中）](https://docs.qq.com/sheet/DSVZOdkhOalFPd2NZ?tab=csws7k&u=60ccbc87e7b04883b8c01ab07165a577)

关于开发计划的问题或者建议请先到[Gitee](https://gitee.com/fant-mini/uniapp-vue3-fant-ts)或者[Github](https://github.com/Moonofweisheng/uniapp-vue3-fant-ts)提出issue，或者在评论区发表评论，方便我记录问题以及安排后续的开发计划。（组件或者模板使用上有什么问题，希望增加什么组件或者模板页面都可以提）

#### 介绍
基于uni-app和fant-mini-plus的vue3项目基础模板，使用vue3、vite4、[fant-mini-plus](https://ext.dcloud.net.cn/plugin?id=11489)、pinia、[uni-mini-router](https://ext.dcloud.net.cn/plugin?id=11208)、axios、[fant-axios-adapter](https://ext.dcloud.net.cn/plugin?id=11817)开发，基于koa实现mock功能

#### 特性

- 🚀 使用vue3/vite4/pinia/axios等主流框架开发
- 🚀 引入fant-mini-plus组件库，开箱即用
- 💪 引入Eslint/Prettier，统一前端代码风格
- 💪 引入lint-staged/husky/commitlint/commitizen/standard-version，统一代码提交规范，自动生成版本发布日志
- 💪 使用pinia，并支持持久化存储
- 💪 提供koa-mock本地mock服务
- 💪 支持axios取消请求（基于requestTask.abort()实现）
## 注意！！！
>插件市场会将类似`.eslintrc.js`这种以`.`开头的文件忽略掉，故我将`.`改成了`_`上传。如果直接在插件市场下载，需要手动将`_`改为`.`，涉及文件及目录包含`_husky`、`_vscode`、`_env.development`、`_env.production`、`_eslintignore`、`_eslintrc.js`、`_git-cz.json`、`_gitignore`、`_prettierrc`。或者到[gitee](https://gitee.com/fant-mini/uniapp-vue3-fant-ts)上`clone`或`fork`


#### 项目依赖

| 功能 | 依赖库 |
| --- | --- |
| 组件库 | [fant-mini-plus](https://ext.dcloud.net.cn/plugin?id=11489) |
| 路由（name跳转和导航守卫） | [uni-mini-router](https://ext.dcloud.net.cn/plugin?id=11208) |
| 网络请求（支持取消请求） | `axios`  [fant-axios-adapter](https://ext.dcloud.net.cn/plugin?id=11817) |
| 代码规范 | `Eslint` `Prettier` |
| 提交规范 | `lint-staged` `husky` `commitlint` `commitizen` |
| 发布日志 | `standard-version` |
| 状态管理 | `pinia`（自定义插件实现持久化） |

#### 项目结构
```shell
uniapp-vue3-fant-ts
├─ .env.development----------------------------------环境变量文件dev时生效，VITE_BASEURL为接口地址
├─ .env.production-----------------------------------环境变量文件build时生效，VITE_BASEURL为接口地址
├─ .eslintignore-------------------------------------eslint豁免校验的配置，配置的文件免于eslint校验
├─ .eslintrc.js--------------------------------------eslint配置，指定eslint校验规则
├─ .gitignore
├─ .husky--------------------------------------------git hooks，此处配置了pre-commit和commit-msg两个
├─ .prettierrc---------------------------------------prettier配置，指定prettier校验规则
├─ .vscode-------------------------------------------vscode配置，实现保存的时候格式化
├─ CHANGELOG.md--------------------------------------版本发布日志
├─ README.md
├─ commitlint.config.js------------------------------commitlint配置文件
├─ index.html
├─ koa-mock------------------------------------------基于koa实现的本地mock项目
│    ├─ api------------------------------------------将接口返回的json放在此目录，接口即为api/文件名
├─ package.json
├─ src-----------------------------------------------项目资源目录
│    ├─ App.vue--------------------------------------uni的主组件，所有页面都是在App.vue下进行切换的，是页面入口文件
│    ├─ api------------------------------------------API文件，用于集中管理接口
│    ├─ http-----------------------------------------axios拦截器，用于自定义请求和响应拦截
│    ├─ main.ts--------------------------------------入口文件，主要作用是初始化vue实例、定义全局组件
│    ├─ manifest.json--------------------------------应用的配置文件，用于指定应用的名称、图标、权限等
│    ├─ model----------------------------------------API接口用到的typescript模型，集中管理
│    ├─ pages----------------------------------------业务页面
│    ├─ pages.json-----------------------------------页面全局配置，决定页面文件的路径、窗口样式、原生的导航栏、底部的原生tabbar 等
│    ├─ router---------------------------------------路由配置，导航守卫
│    ├─ static---------------------------------------资源文件，图片等
│    ├─ store----------------------------------------pinia配置，持久化存储
│    │    ├─ index.ts
│    │    └─ persist.ts------------------------------持久化插件
│    ├─ types.d.ts-----------------------------------typescript的声明文件
│    ├─ uni.scss-------------------------------------全局scss变量，无需引入可以直接使用
│    └─ uni_modules----------------------------------uni-app插件
│           ├─ fant-mini-plus------------------------一款vue3组件库
│           └─ mp-html-------------------------------富文本插件
├─ tsconfig.json-------------------------------------TypeScript 编译器的配置文件
├─ versionrc.js--------------------------------------standard-version的配置文件
├─ vite.config.ts------------------------------------用于配置 vite 的编译选项
└─ yarn.lock-----------------------------------------Yarn生成的锁文件，它用于记录在使用Yarn安装包时确切的依赖关系和版本号
```

#### 开发步骤

##### 注意！！！
>插件市场会将类似`.eslintrc.js`这种以`.`开头的文件忽略掉，故我将`.`改成了`_`上传。如果直接在插件市场下载，需要手动将`_`改为`.`，涉及文件及目录包含`_husky`、`_vscode`、`_env.development`、`_env.production`、`_eslintignore`、`_eslintrc.js`、`_git-cz.json`、`_gitignore`、`_prettierrc`。或者到[gitee](https://gitee.com/fant-mini/uniapp-vue3-fant-ts)上`clone`或`fork`

- 安装依赖  
  - 安装前端项目依赖：`yarn `
  - 安装mock项目依赖：`yarn mock:install`
- 运行
  - 运行前端项目：`yarn dev:h5` （其他平台命令在uni-app官网或者package.json中查看）
  - 运行mock项目：`yarn mock:dev`
- 提交代码
  - 暂存准备提交的代码（举例添加当前目录下的所有文件到暂存区）：`git add .`
  - 提交：`yarn commit`，输入之后回车，我们可以选择提交类型。
- 发布版本（此处操作会使package.json中的version变更，可以此为版本号对显示）
  - 大版本升级1.0.0->2.0.0：`yarn release-major`
  - 中版本升级1.0.0->1.1.0：`yarn release-minor`
  - 小版本升级（一般是补丁）1.0.0->1.0.1：`yarn release-patch`
  - 注意：`执行完发布版本的命令之后需要将执行终端中打印的命令将生成的tag推送到git。此操作完成之后会自动生成版本发布日志，可以用于对外发布`


#### 开发提示  
- 使用typescript开发可以提高前后端交互的效率，提升前端项目的健壮性。在开发过程中需要做到尽量减少使用any。
小程序样式变量统一定义在uni.scss中，作为规范，若设计稿上使用的颜色存在于uni.scss中，则使用uni.scss中的变量，如不存在则需要沟通是否新增变量。

- 提交代码时，feat和fix类型的提交尽量将任务单号作为前缀方便追踪改动关联的需求，如：feat: TASK-1000 新增某个功能。
- css原子化，如果有需要可以自行引入[UnoCSS](https://unocss.dev/)，本项目暂时不会使用。
#### 主要命令

##### 安装依赖
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

##### 运行
```sh
# 运行到h5
yarn dev:h5
```
##### 运行mock服务
```sh
yarn mock:dev
```


##### Lint and fix
```
yarn lint
```

##### 提交代码
```sh
git add .

yarn commit
```

##### 发布版本


``` sh
# 大版本
yarn release-major  

# 中版本
yarn release-minor

# 小版本
yarn release-patch
```

##### 持续集成

```sh

# 上传到微信小程序
yarn upload:mp-weixin  

# 上传到支付宝小程序
yarn upload:mp-alipay

# 上传到钉钉小程序
yarn upload:mp-dingtalk
```


## 联系我

有不明白或者建议可以扫码交流
#### QQ群
<img  src="https://fant-mini-plus.top/img/qq.jpg
" width="220" height="auto">

#### 微信群
<img src="https://fant-mini-plus.top/img/weixin.png
" width="220" height="auto">


