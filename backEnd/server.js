// node端
//引入koa
const Koa = require("koa");
const app = new Koa();
//创建http服务
var server = require("http").createServer(app.callback());

//给http封装成io对象
var io = require("socket.io")(server);
// 建立链接
io.on("connection", function(socket) {
  console.log("connection: ");
  // io.emit代表广播，socket.emit代表私发
  socket.on("sendMessage", function(content) {
    /* */
    console.log("server sendMessage", content);
    socket.emit("getMessage", content);
  });
});

app.use(ctx => {
  ctx.response.body = "服务器运行中";
});

server.listen(3000);

console.log("server running");
