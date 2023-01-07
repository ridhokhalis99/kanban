import CenteredModal from "../CenteredModal";
import { useForm, useFieldArray } from "react-hook-form";
import SecondaryButton from "../../Buttons/SecondaryButton";
import PrimaryButton from "../../Buttons/PrimaryButton";
import ArrayListInput from "./components/ArrayListInput";
import { isEmpty } from "lodash";
import { ErrorMessage } from "@hookform/error-message";

interface BoardModalProps {
  isOpen: boolean;
  toggle: Function;
}

interface FormValues {
  board: string;
  columns: {
    name: string;
  }[];
}

const BoardModal = ({ isOpen, toggle }: BoardModalProps) => {
  const defaultValues = {
    board: "",
    columns: [{ name: "To do" }, { name: "Doing" }],
  };
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues,
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "columns",
  });

  const addColumn = () => {
    append({ name: "" });
  };

  const removeColumn = (index: number) => {
    remove(index);
  };

  const createBoard = (formValues: FormValues) => {
    const { columns } = formValues;
    console.log(formValues);
  };

  return (
    <CenteredModal
      title="Add New Board"
      isOpen={isOpen}
      toggle={toggle}
      children={
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div>
            <h3 className="body-m input-label">Name</h3>
            <input
              placeholder="e.g. Web Design"
              {...register("board", { required: "Please enter board name." })}
            />
            <ErrorMessage
              errors={errors}
              name="board"
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

          {!isEmpty(fields) && (
            <div>
              <h3 className="body-m input-label">Columns</h3>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                }}
              >
                {fields.map((field, index) => {
                  const { ref, ...props } = register(`columns.${index}.name`);
                  return (
                    <ArrayListInput
                      key={field.id}
                      onRemove={() => removeColumn(index)}
                      forwardRef={ref}
                      {...props}
                    />
                  );
                })}
              </div>
            </div>
          )}

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 24,
            }}
          >
            <SecondaryButton text="+ Add New Column" onClick={addColumn} />
            <PrimaryButton
              text="Create New Board"
              onClick={handleSubmit(createBoard)}
            />
          </div>
        </div>
      }
    />
  );
};

export default BoardModal;
