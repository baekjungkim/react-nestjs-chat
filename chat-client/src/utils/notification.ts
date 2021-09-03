import { notification } from "antd";
import { Message } from '../hooks/useMessage';

export function chromNotificationByNewMsgOtherChat(msg: string) {
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  }
  else if (Notification.permission === "granted") {
    const notification = new Notification("새로운 메시지가 도착했습니다", {body: msg});
  }

  else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function (permission) {
      if (permission === "granted") {
        const notification = new Notification("새로운 메시지가 도착했습니다", {body: msg});
      }
    });
  }
}

export function innerNotificationByNewMsgOtherChat(msg: Message, onClick: Function) {
  notification.open({
    message: '새로운 메시지가 도착했습니다',
    description: msg.msg,
    onClick: () => {
      onClick();
      // window.location.href = `/chat/${msg.chat.id}`
    },
  });
}