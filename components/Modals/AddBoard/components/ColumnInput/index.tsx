import Image from "next/image";
import crossIcon from "../../../../../assets/icon-cross.svg";

interface ColumnInputProps {
  onRemove: Function;
}

const ColumnInput = ({ onRemove, ...props }: ColumnInputProps) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
      }}
    >
      <input {...props} />
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
