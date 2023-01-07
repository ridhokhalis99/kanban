import { ReactElement } from "react";
import crossIcon from "../../../assets/icon-cross.svg";
import Image from "next/image";

interface CenteredModalProps {
  title: string;
  children: ReactElement;
}

const CenteredModal = ({ title, children }: CenteredModalProps) => {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 100,
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100vw",
          height: "100vh",
          background: "#000000",
          mixBlendMode: "normal",
          opacity: 0.5,
          position: "absolute",
        }}
      ></div>
      <div
        style={{
          padding: 32,
          backgroundColor: "white",
          position: "absolute",
          borderRadius: 6,
          width: 500,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <h2 className="heading-l" style={{ marginBottom: 24 }}>
            {title}
          </h2>
          <Image
            src={crossIcon.src}
            alt="close modal"
            width={crossIcon.width}
            height={crossIcon.height}
            style={{ cursor: "pointer" }}
          />
        </div>
        {children}
      </div>
    </div>
  );
};

export default CenteredModal;
