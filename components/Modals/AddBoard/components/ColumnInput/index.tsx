import Image from "next/image";
import crossIcon from "../../../../../assets/icon-cross.svg";

interface ColumnInputProps {
  onRemove: Function;
  forwardRef: any;
}

const ColumnInput = ({ onRemove, forwardRef, ...props }: ColumnInputProps) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
      }}
    >
      <input ref={forwardRef} {...props} />
      <Image
        src={crossIcon.src}
        alt="close modal"
        width={crossIcon.width}
        height={crossIcon.height}
        style={{ cursor: "pointer" }}
        onClick={() => onRemove()}
      />
    </div>
  );
};

export default ColumnInput;
