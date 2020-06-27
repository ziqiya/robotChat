/**
 * @功能描述: Websocket类
 * @参数:
 * @返回值:
 */
class Websocket {
  constructor() {
    this.socket;
  }
  // 连接到服务器
  handleConnect(callback) {
    try {
      const _this = this;
      this.socket = io.connect(BASE_URL);
      this.socket.on('connect', function() {
        const userName = localStorage.getItem('chatRoom-userName');
        const userStatus = localStorage.getItem('chatRoom-userStatus');
        chatRoom.userName = userName;
        $('#name-input').val(userName);
        if (userName && userStatus !== 'online') {
          _this.handleSendSystemMessage(userName, 'online');
        }
        // 执行回调
        callback();
      });
      this.socket.on('getMessage', function(data) {
        // 服务端收到信息回调
        callback();
      });
      this.socket.on('disconnect', function() {
        alert('服务器已断开连接');
        this.userName = '';
        this.userContent = '';
        this.socket = null;
      });
    } catch (err) {
      console.log('err: ', err);
      alert('服务器未启动!');
    }
  }
  // 断开服务器
  handleDisconnect() {
    if (this.socket) {
      this.socket.disconnect(true);
    } else {
      alert('还未连接到服务器！');
    }
  }
  // 点击发送内容给服务器
  handleSendMessage(content) {
    if (this.socket) {
      this.socket.emit('sendMessage', content);
    } else {
      alert('请先连接到服务器！');
    }
  }
  /**
   * @功能描述: 发送系统消息
   * @参数: @param userName:用户名 @param status:用户状态(online/offline)
   * @返回值:
   */
  handleSendSystemMessage(userName, status) {
    if (status === 'online') {
      this.handleSendMessage({
        userName,
        userContent: '加入了聊天室',
        msgType: MSG_TYPE.system,
      });
    } else {
      this.handleSendMessage({
        userName,
        userContent: '离开了聊天室',
        msgType: MSG_TYPE.system,
      });
    }
    localStorage.setItem('chatRoom-userStatus', status);
  }
}
