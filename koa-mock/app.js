const Koa = require('koa')
const Router = require("koa-router");
const app = new Koa()
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const glob = require("glob");
const cors = require('@koa/cors');

const fs = require("fs");

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))


// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})
app.use(cors());

const router = new Router({ prefix: "/api" });
const routerMap = {}; // 存放 文件路径与路由 的 映射
let content = '' // api/list 目录

// console.log(index.routes,'index.routes');
glob.sync('./api/**/*.json').forEach((item, i) => {
  let apiJsonPath = item && (item.replace(/\\/g, '/')).split("api")[1];
  let apiPath = apiJsonPath.replace(".json", "");

  content += apiPath + '\n'
  router.get('/list', (ctx, next)=> { // => /api/list/
    ctx.body = content
  })

  router.get(apiPath, (ctx, next) => {
    try {
      let jsonStr = fs.readFileSync(item).toString();
      ctx.body = {
        data: JSON.parse(jsonStr),
        code: 2000,
        success: true,
        msg:'成功了'
      };
    } catch (err) {
      ctx.body = {
        status: 404,
        type: "false"
      };
      ctx.throw("服务器错误: ", 500);
    }
  });
  router.post(apiPath, (ctx, next) => {
    try {
      let jsonStr = fs.readFileSync(item).toString();
      ctx.body = {
        data: JSON.parse(jsonStr),
        code: 2000,
        success: true,
        msg:'成功了'
      };
    } catch (err) {
      ctx.body = {
        status: 404,
        type: "false"
      };
      ctx.throw("服务器错误: ", 500);
    }
  });
  routerMap[apiJsonPath] = apiPath;
})
// routes
app.use(router.routes()).use(router.allowedMethods());
// app.use(index.routes(), index.allowedMethods())
// app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
