/**
 * @功能描述: 聊天室类
 * @参数:
 * @返回值:
 */
class ChatRoom {
  constructor() {
    this.chatData = [];
    this.userName = '';
    this.userContent = '';
  }
  fetchData = () => {
    const _this = this;
    $.ajax({
      url: `${BASE_URL}/chatData`,
      type: 'GET',
      async: false,
      success: function(result) {
        const chatData = result.data;
        this.chatData = chatData;
        const domArr =
          chatData && chatData.length > 0
            ? chatData.map(item => {
                const { time, userName, content, msgType } = item;
                const timeString = moment(time).format('YYYY-MM-DD HH:mm:ss');
                return msgType === MSG_TYPE.user
                  ? `<div class="chat-row ${userName === _this.userName ? 'my-chat-row' : ''}">
      <div class="release-time">${timeString}</div>
      <div class="user-line">
        <div class="name-wrap"><span class="user-name">${userName}</span>说:</div>
        <div class="chat-word">${content}</div>
      </div>
    </div>`
                  : `<div class="system-message"><span class="user-name">${userName}</span>${content}</div>`;
              })
            : [];
        const domString = domArr.join('');
        $('.chat-row,.system-message').remove();
        $('.chat-list').append(domString);
      },
    });
  };
}
