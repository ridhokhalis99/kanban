import Image from "next/image";
import crossIcon from "../../../../../assets/icon-cross.svg";

interface ArrayListInputProps {
  onRemove: Function;
  forwardRef: any;
}

const ArrayListInput = ({
  onRemove,
  forwardRef,
  ...props
}: ArrayListInputProps) => {
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

export default ArrayListInput;
