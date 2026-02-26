function Alert({ type = "info", message }) {
  if (!message) return null;

  const styles = {
    success: "alert-success",
    error: "alert-error",
    info: "alert-info",
    warning: "alert-warning",
  };

  const icons = {
    success: "✔",
    error: "❌",
    info: "ℹ️",
    warning: "⚠️",
  };

  const alertStyle = styles[type] || styles.info;
  const icon = icons[type] || icons.info;

  return (
    <div
      className={`alert ${alertStyle} flex items-start justify-between gap-3 animate-in fade-in duration-300`}
    >
      <div className="flex items-start gap-2">
        <span className="text-base">{icon}</span>

        <div className="flex flex-wrap items-center gap-1">
          <span className="font-medium capitalize">{type}:</span>
          <span className="break-words">{message}</span>
        </div>
      </div>
    </div>
  );
}

export default Alert;
