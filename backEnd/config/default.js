const config = {
  // 启动端口
  port: 3000,

  // 数据库配置
  database: {
    DATABASE: "first",
    USERNAME: "root",
    PASSWORD: "123456",
    PORT: "3306",
    HOST: "localhost"
  },

  // 消息类型枚举
  msgType: {
    USER: 1,
    SYSTEM: 2
  }
};

module.exports = config;
