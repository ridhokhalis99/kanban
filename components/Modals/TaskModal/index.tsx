import { useForm, useFieldArray } from "react-hook-form";
import ArrayListInput from "../BoardModal/ArrayListInput";
import CenteredModal from "../CenteredModal";
import PrimaryButton from "../../Buttons/PrimaryButton";
import SecondaryButton from "../../Buttons/SecondaryButton";
import { isEmpty } from "lodash";
import BoardDetail from "../../../interfaces/BoardDetail";
import { ErrorMessage } from "@hookform/error-message";
import useMutation from "../../../tools/useMutation";
import ModalProps from "../../../interfaces/ModalProps";

interface TaskModalProps extends ModalProps {
  boardDetail: BoardDetail;
  refetchBoardDetail: Function;
}

interface FormValues {
  title: string;
  description: string;
  subtasks: {
    name: string;
  }[];
  columnId: number;
}

const TaskModal = ({
  isOpen,
  toggle,
  boardDetail,
  refetchBoardDetail,
}: TaskModalProps) => {
  const { columns } = boardDetail;
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "subtasks",
  });

  const closeModal = () => {
    toggle();
    reset();
  };

  const { mutation: mutationCreateTask, loading } = useMutation({
    url: "/api/task",
    method: "post",
    afterSuccess: () => {
      refetchBoardDetail();
      closeModal();
    },
  });

  const createTask = (formValues: FormValues) => {
    mutationCreateTask(formValues);
  };

  const addSubtask = () => {
    append({ name: "" });
  };

  const removeSubtask = (index: number) => {
    remove(index);
  };

  return (
    <CenteredModal
      title="Add New Task"
      isOpen={isOpen}
      toggle={closeModal}
      children={
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div>
            <h3 className="body-m input-label">Title</h3>
            <input
              placeholder="e.g. Take coffee break"
              {...register("title", { required: "Please enter task title." })}
            />
            <ErrorMessage
              errors={errors}
              name="title"
              render={({ message }) => (
                <p className="error-message">{message}</p>
              )}
            />
          </div>

          <div>
            <h3 className="body-m input-label">Description</h3>
            <textarea
              placeholder="e.g. It’s always good to take a break. This 15 minute break will 
              recharge the batteries a little."
              rows={4}
              cols={50}
              {...register("description")}
            />
          </div>

          {!isEmpty(fields) && (
            <div>
              <h3 className="body-m input-label">Subtasks</h3>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                }}
              >
                {fields.map((field, index) => {
                  const { ref, ...props } = register(`subtasks.${index}.name`);
                  return (
                    <ArrayListInput
                      key={field.id}
                      onRemove={() => removeSubtask(index)}
                      forwardRef={ref}
                      errors={errors}
                      {...props}
                    />
                  );
                })}
              </div>
            </div>
          )}

          <div>
            <select {...register(`columnId`)}>
              {columns?.map(({ name, id }) => {
                return (
                  <option key={id} value={id}>
                    {name}
                  </option>
                );
              })}
            </select>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 24,
            }}
          >
            <SecondaryButton text="+ Add New Subtask" onClick={addSubtask} />
            <PrimaryButton
              text="Create New Task"
              onClick={handleSubmit(createTask)}
            />
          </div>
        </div>
      }
    />
  );
};

export default TaskModal;
