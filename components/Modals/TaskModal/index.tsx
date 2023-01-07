import { useForm, useFieldArray } from "react-hook-form";
import ArrayListInput from "../BoardModal/components/ArrayListInput";
import CenteredModal from "../CenteredModal";
import PrimaryButton from "../../Buttons/PrimaryButton";
import SecondaryButton from "../../Buttons/SecondaryButton";
import { isEmpty } from "lodash";

interface TaskModalProps {
  isOpen: boolean;
  toggle: Function;
}

interface FormValues {
  title: string;
  description: string;
  subtasks: {
    subtaskName: string;
  }[];
  columnId: number;
}

const TaskModal = ({ isOpen, toggle }: TaskModalProps) => {
  const { control, register, handleSubmit } = useForm<FormValues>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "subtasks",
  });

  const createTask = (formValues: FormValues) => {
    const { title, description, subtasks, columnId } = formValues;
    console.log(formValues);
  };

  const addSubtask = () => {
    append({ subtaskName: "" });
  };

  const removeSubtask = (index: number) => {
    remove(index);
  };

  return (
    <CenteredModal
      title="Add New Task"
      isOpen={isOpen}
      toggle={toggle}
      children={
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div>
            <h3 className="body-m input-label">Title</h3>
            <input
              placeholder="e.g. Take coffee break"
              {...register("title")}
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
                  const { ref, ...props } = register(
                    `subtasks.${index}.subtaskName`
                  );
                  return (
                    <ArrayListInput
                      key={field.id}
                      onRemove={() => removeSubtask(index)}
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
