function Alert({ type = "info", message }) {
  if (!message) return null;

  const styles = {
    success: "alert-success",
    error: "alert-error",
    info: "alert-info",
    warning: "alert-warning",
  };

  return (
    <div className={`alert ${styles[type]}`}>
      <span className="font-medium capitalize">{type}:</span>
      <span>{message}</span>
    </div>
  );
}

export default Alert;
