import { h } from "vue";
import { MessageRenderMessage, NAlert } from "naive-ui";

export const renderMessage: MessageRenderMessage = (props) => {
  const { type } = props;
  return h(
    NAlert,
    {
      closable: props.closable,
      onClose: props.onClose,
      type: type === "loading" ? "default" : type,
      title:
        type === "error"
          ? "失败"
          : type === "success"
          ? "成功"
          : type === "warning"
          ? "警告"
          : undefined,
      style: {
        boxShadow: "var(--n-box-shadow)",
        maxWidth: "calc(100vw - 32px)",
        width: "480px",
      },
    },
    {
      default: () => props.content,
    }
  );
};
