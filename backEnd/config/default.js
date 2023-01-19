const config = {
  // 启动端口
  port: 3000,

  // 数据库配置
  database: {
    DATABASE: 'robot',
    USERNAME: 'root',
    PASSWORD: '123456',
    PORT: '3306',
    HOST: 'localhost',
  },

  // 机器人配置
  robot: {
    ROBOT_NAME: '汐汐',
    ROBOT_URL: 'https://api.mlyai.com/reply',
    API_KEY: '5alxus5zumm0dxbi',
    API_SECRET: 'ywhtxft0',
  },

  // 消息类型枚举
  msgType: {
    USER: 1,
    SYSTEM: 2,
  },
};

module.exports = config;
