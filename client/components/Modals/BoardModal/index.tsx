import CenteredModal from "../CenteredModal";
import { useForm, useFieldArray } from "react-hook-form";
import SecondaryButton from "../../Buttons/SecondaryButton";
import PrimaryButton from "../../Buttons/PrimaryButton";
import ArrayListInput from "../../Input/ArrayListInput";
import { isEmpty } from "lodash";
import { ErrorMessage } from "@hookform/error-message";
import useMutation from "../../../tools/useMutation";
import BoardDetail from "../../../interfaces/BoardDetail";
import ColumnDetail from "../../../interfaces/ColumnDetail";
import { Dispatch, useEffect } from "react";
import { AxiosResponse } from "axios";
import { board } from "@prisma/client";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { toast } from "react-hot-toast";

interface BoardModalProps {
  isOpen: boolean;
  toggle: Function;
  refetchBoards: Function;
  setBoardDetail: Dispatch<BoardDetail>;
  setCurrentBoard: Dispatch<board>;
  type?: "add" | "edit" | "addColumn" | "";
  currentBoardDetail?: BoardDetail;
}

interface FormValues {
  board: string;
  columns: {
    name: string | null;
    columnId?: number;
  }[];
}

const BoardModal = ({
  isOpen,
  toggle,
  refetchBoards,
  type,
  currentBoardDetail,
  setBoardDetail,
  setCurrentBoard,
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
      return { name, columnId: id };
    }),
  };

  const {
    control,
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues,
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "columns",
  });

  const { mutation: mutationCreate, loading: loadingCreate } = useMutation({
    url: "/board",
    method: "post",
    formatter: ({ data }: AxiosResponse) => data,
    afterSuccess: ({
      data: board,
      message,
    }: {
      data: board;
      message: string;
    }) => {
      refetchBoards();
      setCurrentBoard(board);
      closeModal();
      toast.success(message);
    },
  });

  const { mutation: mutationUpdate, loading: loadingUpdate } = useMutation({
    url: `/board/${currentBoardDetail?.id}`,
    formatter: ({ data }: AxiosResponse) => data,
    afterSuccess: ({
      data: boardDetail,
      message,
    }: {
      data: BoardDetail;
      message: string;
    }) => {
      setBoardDetail(boardDetail);
      closeModal();
      toast.success(message);
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
    formValues.columns = formValues?.columns?.map(
      ({ name, columnId }, index) => {
        return { name, order: index, id: columnId };
      }
    );
    isEdit || isAddColumn
      ? mutationUpdate(formValues)
      : mutationCreate(formValues);
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

  const onDragEnd = (result: any) => {
    const { destination, source } = result;
    if (!destination) return;
    if (destination.droppableId !== source.droppableId) return;
    if (destination.index === source.index) return;

    const newColumns = [...fields];
    const [removed] = newColumns.splice(source.index, 1);
    newColumns.splice(destination.index, 0, removed);
    reset({ ...getValues(), columns: newColumns });
  };

  const isLimitColumns = fields.length >= 5;

  return (
    <CenteredModal
      title={isEdit || isAddColumn ? "Edit board" : "Add new board"}
      isOpen={isOpen}
      toggle={closeModal}
    >
      <div className="children-form-container">
        <div>
          <h3 className="body-m input-label">Name</h3>
          <input
            placeholder="e.g. Web Design"
            {...register("board", { required: "Please enter board name." })}
          />
          <ErrorMessage
            errors={errors}
            name="board"
            render={({ message }) => <p className="error-message">{message}</p>}
          />
        </div>

        {!isEmpty(fields) && (
          <div>
            <h3 className="body-m array-input-label">Columns</h3>
            <div className="array-input-container">
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="column">
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                      {fields.map((field, index) => {
                        const { ref, ...props } = register(
                          `columns.${index}.name`,
                          {
                            required: "Please enter column name.",
                          }
                        );
                        const isRemoveDisabled = !!columns?.find(
                          ({ name }: ColumnDetail) => name === field?.name
                        )?.tasks?.length;
                        return (
                          <Draggable
                            key={field.id}
                            draggableId={field.id}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={{
                                  ...provided.draggableProps.style,
                                  marginTop: 12,
                                }}
                              >
                                <ArrayListInput
                                  key={field.id}
                                  onRemove={() => removeColumn(index)}
                                  isRemoveDisabled={isRemoveDisabled}
                                  forwardRef={ref}
                                  errors={errors}
                                  {...props}
                                />
                              </div>
                            )}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </div>
          </div>
        )}

        <div className="buttons-container">
          {!isLimitColumns && (
            <SecondaryButton text="+ Add New Column" onClick={addColumn} />
          )}
          <PrimaryButton
            text={isEdit || isAddColumn ? "Save Changes" : "Create New Board"}
            onClick={handleSubmit(onSubmit)}
          />
        </div>
      </div>
    </CenteredModal>
  );
};

export default BoardModal;
