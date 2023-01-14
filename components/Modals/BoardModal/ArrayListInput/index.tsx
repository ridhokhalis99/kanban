import Image from "next/image";
import crossIcon from "../../../../assets/icon-cross.svg";
import { ErrorMessage } from "@hookform/error-message";

interface ArrayListInputProps {
  onRemove: Function;
  forwardRef: any;
  name: string;
  isRemoveDisabled?: boolean;
  errors?: any;
}

const ArrayListInput = ({
  onRemove,
  forwardRef,
  errors,
  name,
  isRemoveDisabled,
  ...props
}: ArrayListInputProps) => {
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}
      >
        <input ref={forwardRef} name={name} {...props} />
        <Image
          src={crossIcon.src}
          alt="close modal"
          width={crossIcon.width}
          height={crossIcon.height}
          style={isRemoveDisabled ? { opacity: 0.3 } : { cursor: "pointer" }}
          onClick={() => !isRemoveDisabled && onRemove()}
        />
      </div>
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => <p className="error-message">{message}</p>}
      />
    </div>
  );
};

export default ArrayListInput;
