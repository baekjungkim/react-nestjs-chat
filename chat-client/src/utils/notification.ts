export function notify(msg: string) {
  console.log(Notification.permission);
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