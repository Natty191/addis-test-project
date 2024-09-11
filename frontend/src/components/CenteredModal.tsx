/** @jsxImportSource theme-ui */
import Modal, { Props } from "react-modal";
import { useColorMode } from "theme-ui";

const CenteredModal = (props: Props) => {
  const [colorMode] = useColorMode();

  return (
    <Modal
      {...props}
      style={{
        content: {
          padding: 0,
          margin: 0,
          // width: "56rem",
          width: "max-content",
          height: "max-content",
          top: "50%",
          left: "50%",
          translate: "-50% -50%",
          border: "none",
          borderRadius: 0,
          background: "none",
        },
        overlay: {
          backdropFilter: "blur(5px)",
          background:
            colorMode === "light" ? "rgba(55,55,55,0.5)" : "rgba(0, 0, 0, 0.4)",
        },
      }}
    />
  );
};

export default CenteredModal;
