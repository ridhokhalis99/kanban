import CenteredModal from "../CenteredModal";
import { useForm, useFieldArray } from "react-hook-form";
import SecondaryButton from "../../Buttons/SecondaryButton";
import PrimaryButton from "../../Buttons/PrimaryButton";
import ColumnInput from "./components/ColumnInput";

interface columnForm {
  column: {
    name: string;
    value: string;
  }[];
}

const AddBoard = () => {
  const defaultValues = {
    column: [
      { name: "column", value: "To do" },
      { name: "column", value: "Doing" },
    ],
  };
  const { control, register } = useForm({ defaultValues });
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name: "column",
    }
  );

  const addColumn = () => {
    append({ name: "column", value: "test" });
  };

  const removeColumn = (index: number) => {
    remove(index);
  };

  const createBoard = () => {};

  return (
    <CenteredModal
      title="Add New Board"
      children={
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div>
            <h3 className="body-m input-label">Name</h3>
            <input placeholder="e.g. Web Design" />
          </div>

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
                return (
                  <ColumnInput
                    key={field.id}
                    onRemove={() => removeColumn(index)}
                    {...register(`column.${index}.value`)}
                  />
                );
              })}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 24,
            }}
          >
            <SecondaryButton text="+ Add New Column" onClick={addColumn} />
            <PrimaryButton text="Create New Board" onClick={createBoard} />
          </div>
        </div>
      }
    />
  );
};

export default AddBoard;
