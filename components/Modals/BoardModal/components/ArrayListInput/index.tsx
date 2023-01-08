import Image from "next/image";
import crossIcon from "../../../../../assets/icon-cross.svg";
import { ErrorMessage } from "@hookform/error-message";

interface ArrayListInputProps {
  onRemove: Function;
  forwardRef: any;
  name: string;
  errors?: any;
}

const ArrayListInput = ({
  onRemove,
  forwardRef,
  errors,
  name,
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
          style={{ cursor: "pointer" }}
          onClick={() => onRemove()}
        />
      </div>
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => (
          <p
            style={{
              fontSize: 12,
              marginTop: 4,
              color: "#EA5555",
            }}
          >
            {message}
          </p>
        )}
      />
    </div>
  );
};

export default ArrayListInput;
