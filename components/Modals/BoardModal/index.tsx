import CenteredModal from "../CenteredModal";
import { useForm, useFieldArray } from "react-hook-form";
import SecondaryButton from "../../Buttons/SecondaryButton";
import PrimaryButton from "../../Buttons/PrimaryButton";
import ArrayListInput from "./ArrayListInput";
import { isEmpty } from "lodash";
import { ErrorMessage } from "@hookform/error-message";
import useMutation from "../../../tools/useMutation";
import BoardDetail from "../../../interfaces/BoardDetail";
import ColumnDetail from "../../../interfaces/ColumnDetail";
import { useEffect } from "react";

interface BoardModalProps {
  isOpen: boolean;
  toggle: Function;
  refetchBoards: Function;
  type?: "add" | "edit" | "addColumn" | "";
  currentBoardDetail?: BoardDetail;
}

interface FormValues {
  board: string;
  columns: {
    name: string | null;
  }[];
}

const BoardModal = ({
  isOpen,
  toggle,
  refetchBoards,
  type,
  currentBoardDetail,
}: BoardModalProps) => {
  const isEdit = type === "edit";
  const isAddColumn = type === "addColumn";

  const { name, columns } = currentBoardDetail || {};

  const defaultValues = {
    board: "",
    columns: [{ name: "To do" }, { name: "Doing" }, { name: "Done" }],
  };

  const defaultValuesEdit = {
    board: name,
    columns: columns?.map(({ name, id }: ColumnDetail) => {
      return { name, id };
    }),
  };

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues,
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "columns",
  });

  const { mutation: mutationCreate, loading: loadingCreate } = useMutation({
    url: "http://localhost:3001/board",
    method: "post",
    afterSuccess: () => {
      refetchBoards();
      closeModal();
    },
  });

  const { mutation: mutationUpdate, loading: loadingUpdate } = useMutation({
    url: `http://localhost:3001/board/${currentBoardDetail?.id}`,
    afterSuccess: () => {
      refetchBoards();
      closeModal();
    },
  });

  const closeModal = () => {
    reset();
    toggle();
  };

  const addColumn = () => {
    append({ name: "" });
  };

  const removeColumn = (index: number) => {
    remove(index);
  };

  const onSubmit = async (formValues: FormValues) => {
    isEdit ? mutationUpdate(formValues) : mutationCreate(formValues);
  };

  useEffect(() => {
    if (isEdit || isAddColumn) {
      if (isAddColumn)
        return reset({
          ...defaultValuesEdit,
          columns: [...(defaultValuesEdit.columns || []), { name: "" }],
        });
      return reset(defaultValuesEdit);
    }

    reset(defaultValues);
  }, [isEdit, currentBoardDetail]);

  return (
    <CenteredModal
      title={isEdit ? "Edit board" : "Add new board"}
      isOpen={isOpen}
      toggle={closeModal}
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
                <p className="error-message">{message}</p>
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
                  const { ref, ...props } = register(`columns.${index}.name`, {
                    required: "Please enter column name.",
                  });
                  const isRemoveDisabled = !!columns?.find(
                    ({ name }: ColumnDetail) => name === field?.name
                  )?.tasks?.length;
                  return (
                    <ArrayListInput
                      key={field.id}
                      onRemove={() => removeColumn(index)}
                      isRemoveDisabled={isRemoveDisabled}
                      forwardRef={ref}
                      errors={errors}
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
              text={isEdit ? "Save Changes" : "Create New Board"}
              onClick={handleSubmit(onSubmit)}
            />
          </div>
        </div>
      }
    />
  );
};

export default BoardModal;
