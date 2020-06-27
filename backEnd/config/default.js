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

  // 机器人配置
  robot: {
    ROBOT_NAME: "汐汐AI",
    ROBOT_URL: "http://i.itpk.cn/api.php",
    API_KEY: "7f3330b99848ff10e05be1c9f12bf9c2",
    API_SECRET: "eaae41n1wedc"
  },

  // 消息类型枚举
  msgType: {
    USER: 1,
    SYSTEM: 2
  }
};

module.exports = config;
