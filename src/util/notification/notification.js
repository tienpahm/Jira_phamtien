import {message, notification} from "antd";

export const notifiFuncion = (type, message, description) => {
  notification[type]({
    message: message,
    description: description,
  });
};
