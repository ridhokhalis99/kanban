import CenteredModal from "../CenteredModal";
import { useForm, useFieldArray } from "react-hook-form";
import SecondaryButton from "../../Buttons/SecondaryButton";
import PrimaryButton from "../../Buttons/PrimaryButton";
import ColumnInput from "./components/ColumnInput";
import { isEmpty } from "lodash";

interface FormValues {
  board: string;
  column: {
    columnName: string;
  }[];
}

const AddBoard = () => {
  const defaultValues = {
    board: "",
    column: [{ columnName: "To do" }, { columnName: "Doing" }],
  };
  const { control, register, handleSubmit } = useForm<FormValues>({
    defaultValues,
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "column",
  });

  const addColumn = () => {
    append({ columnName: "" });
  };

  const removeColumn = (index: number) => {
    remove(index);
  };

  const createBoard = (formValues: FormValues) => {
    const { column } = formValues;
    console.log(formValues);
  };

  return (
    <CenteredModal
      title="Add New Board"
      children={
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div>
            <h3 className="body-m input-label">Name</h3>
            <input placeholder="e.g. Web Design" {...register("board")} />
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
                  const { ref, ...props } = register(
                    `column.${index}.columnName`
                  );
                  return (
                    <ColumnInput
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

export default AddBoard;
