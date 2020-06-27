import React, { useState, useEffect, useRef } from 'react';
import { message, Button, Input } from 'antd';
import { useRequest } from 'ahooks';
import { useImmer } from 'use-immer';
import moment from 'moment';
import styles from './index.module.less';
import { BASE_URL, MSG_TYPE } from '../constant';
import classnames from 'classnames';
import Websocket from '@/utils/webSocket';
import { ChatDataProps } from 'interfaces/common';

const { TextArea } = Input;

// 初始化聊天配置
const INITIAL_CHAT_CONFIG = {
  userName: '',
  userContent: '',
};

const HomePage = () => {
  const [webSocket, setWebSocket] = useState();
  const [chatConfig, setChatConfig] = useImmer(INITIAL_CHAT_CONFIG);
  const chatListRef = useRef<HTMLDivElement>(null);
  const { userName, userContent } = chatConfig;

  /** 渲染聊天内容 */
  const renderChatItem = (chatItem: ChatDataProps) => {
    const { id, time, userName, content, msgType } = chatItem;
    const timeString = moment(time).format('YYYY-MM-DD HH:mm:ss');
    return msgType === MSG_TYPE.user ? (
      <div
        className={classnames(
          styles.chatRow,
          userName === chatConfig.userName ? styles.myChatRow : {},
        )}
        key={id}
      >
        <div className={styles.releaseTime}>{timeString}</div>
        <div className={styles.userLine}>
          <div className={styles.nameWrap}>
            <span className={styles.userName}>{userName}</span>说:
          </div>
          <div className={styles.chatWord}>{content}</div>
        </div>
      </div>
    ) : (
      <div className={styles.systemMessage} key={id}>
        <span className={styles.userName}>{userName}</span>
        {content}
      </div>
    );
  };

  // 获取聊天室数据
  const { data: chatData, run: fetchData } = useRequest(
    `${BASE_URL}/chatData`,
    {
      formatResult: result => result.data,
      onError: () => {
        message.error('请求失败!');
      },
    },
  );

  // 连接服务器
  const handleConnect = () => {
    let webSocketIo;
    // 发送成功/回调
    const callback = () => {
      const dom = chatListRef.current;
      // 获取聊天室数据
      fetchData();
      if (dom) {
        const scrollHeight = dom.scrollHeight;
        dom.scrollTop = scrollHeight;
      }
    };

    // 断开连接回调
    const failCallback = () => {
      setChatConfig(config => {
        config.userName = '';
        config.userContent = '';
      });
    };
    if (!webSocket) {
      webSocketIo = new Websocket();
      const userName = localStorage.getItem('chatRoom-userName');
      setWebSocket(webSocketIo);
      setChatConfig(config => {
        config.userName = userName || '';
      });
    }
    webSocketIo && webSocketIo.handleConnect({ callback, failCallback });
  };

  // 修改聊天昵称
  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userName = e.target.value;
    setChatConfig(config => {
      config.userName = userName;
    });
  };

  // 修改了昵称
  const handleBlurName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const oldUserName = localStorage.getItem('chatRoom-userName');
    const userName = e.target.value;
    if (userName !== '' && userName !== oldUserName) {
      webSocket.handleSendSystemMessage({ userName, status: 'online' });
      localStorage.setItem('chatRoom-userName', userName);
    }
  };

  // 发送信息
  const handleSubmit = () => {
    if (userName === '') {
      alert('请先输入昵称!');
      return;
    }
    if (userContent.trim() === '') {
      alert('发送内容不可为空!');
      return;
    }
    webSocket.handleSendMessage({
      userName: userName,
      userContent: userContent,
    });
    setChatConfig(config => {
      config.userContent = '';
    });
  };

  useEffect(() => {
    // 连接至服务器
    handleConnect();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.chatWrap}>
        <div className={styles.chatHeader}>聊天室</div>
        <div ref={chatListRef} className={styles.chatList}>
          {chatData &&
            chatData.map((item: ChatDataProps) => renderChatItem(item))}
        </div>
        <div className={styles.sendBar}>
          <div className={styles.nameBar}>
            <Input
              className={styles.nameInput}
              placeholder="请输入昵称"
              onChange={handleChangeName}
              value={userName}
              onBlur={handleBlurName}
            />
            <Button className={styles.sendBtn} onClick={handleSubmit}>
              发送
            </Button>
          </div>
          <TextArea
            className={styles.wordInput}
            onChange={e => {
              const value = e.target.value;
              setChatConfig(config => {
                config.userContent = value;
              });
            }}
            placeholder="请输入要说的话"
            value={userContent}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
