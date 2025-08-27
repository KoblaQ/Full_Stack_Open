const Notification = ({ message, notificationType }) => {
  const color = notificationType === "error" ? "red" : "green";
  const notificationStyle = {
    color: color,
  };
  if (message === null) {
    return null;
  }
  return (
    <div style={notificationStyle} className="notification">
      {message}
    </div>
  );
};

export default Notification;
