// node端
//引入koa
const Koa = require("koa");
const app = new Koa();
const mysql = require("./mysql");
//创建http服务
var server = require("http").createServer(app.callback());

const Router = require("koa-router");

var config = require("./config/default.js");

const { msgType } = config;

// 跨域请求
const cors = require("koa2-cors");

const router = new Router();

// 跨域配置
app.use(
  cors({
    origin: function(ctx) {
      return "*"; // 允许来自所有域名请求
    },
    exposeHeaders: ["WWW-Authenticate", "Server-Authorization"],
    maxAge: 5,
    credentials: true,
    allowMethods: ["GET", "POST", "DELETE"],
    allowHeaders: ["Content-Type", "Authorization", "Accept"]
  })
);

//给http封装成io对象
var io = require("socket.io")(server);
// 建立链接
io.on("connection", function(socket) {
  // io.emit代表广播，socket.emit代表私发
  socket.on("sendMessage", async function(content) {
    await mysql.addChatData(content);
    io.emit("getMessage", content);
  });
});

router.get("/chatData", async (ctx, next) => {
  const result = await mysql.getChatData();
  ctx.body = {
    code: 20000,
    data: result,
    message: "请求成功",
    success: true
  };
});

app.use(router.routes());

app.use(ctx => {
  ctx.response.body = "服务器运行中";
});

server.listen(3000, function() {
  console.log("Server listening on port 3000");
});
