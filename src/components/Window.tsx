import { type ReactElement, type ReactNode, type ComponentType } from "react";
import { Modal, TitleBar, useModal } from "@react95/core";

interface WindowProps {
  id: string;
  icon: ReactElement<{ variant?: string }>;
  title: string;
  children: ReactNode;
  width?: number;
  height?: number;
  onClose: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SafeModal = Modal as unknown as ComponentType<any>;

const Window = ({ id, title, onClose, children, icon, width, height }: WindowProps) => {
  const { minimize } = useModal();
  
  return (
    <SafeModal
      id={id}
      icon={icon}
      title={title}
      titleBarOptions={[
        <TitleBar.Minimize
          style={{ marginBlock: "auto" }}
          key="minimize"
          onClick={() => minimize(id)}
        />,
        <TitleBar.Close
          style={{ marginBlock: "auto" }}
          key="close"
          onClick={onClose}
        />,
      ]}
    >
      <Modal.Content 
        width={width ? `${width}px` : "auto"} 
        height={height ? `${height}px` : "auto"}
        style={{ display: "flex", flexDirection: "column" }}
      >
        {children}
      </Modal.Content>
    </SafeModal>
  );
};

export default Window;
