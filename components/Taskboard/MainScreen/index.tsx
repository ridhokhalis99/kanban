import ColumnDetail from "../../../interfaces/ColumnDetail";
import TaskDetail from "../../../interfaces/TaskDetail";
import { countBy, isEmpty } from "lodash";
import { Dispatch } from "react";
import BoardDetail from "../../../interfaces/BoardDetail";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import useMutation from "../../../tools/useMutation";
interface MainScreenProps {
  columns: ColumnDetail[];
  setTaskDetail: Dispatch<TaskDetail>;
  toggleBoardModal: Function;
  boardDetail: BoardDetail;
}

const MainScreen = ({
  columns,
  setTaskDetail,
  toggleBoardModal,
  boardDetail,
}: MainScreenProps) => {
  const { mutation: updateColumn } = useMutation({
    url: "http://localhost:3001/column",
  });

  const onDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    const sourceColumn = columns.find(
      ({ name }) => name === source.droppableId
    );
    const destinationColumn = columns.find(
      ({ name }) => name === destination.droppableId
    );
    const sourceTasks = sourceColumn?.tasks;
    const destinationTasks = destinationColumn?.tasks;
    const [removed] = sourceTasks?.splice(source.index, 1) || [];
    destinationTasks?.splice(destination.index, 0, removed);
    const newColumns = columns.map((column, index) => {
      column.tasks = column.tasks?.map((task, index) => {
        task.order = index;
        return task;
      });
      return column;
    });
    updateColumn({ columns: newColumns });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="main-container">
        {columns.map(({ name, tasks }: ColumnDetail, index) => {
          return (
            <div key={index} className="column-parent">
              <p className="heading-s uppercase">
                {name} ({tasks?.length})
              </p>
              <Droppable droppableId={name} key={index}>
                {(provided) => (
                  <div
                    className="task-container"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {!isEmpty(tasks) ? (
                      tasks?.map((task: TaskDetail, index) => {
                        const { name, sub_tasks, id } = task;
                        const finishedSubtasks =
                          countBy(sub_tasks, ({ is_finished }) => is_finished)
                            .true || 0;
                        const numberOfSubtasks = sub_tasks?.length;

                        return (
                          <Draggable key={id} draggableId={name} index={index}>
                            {(provided) => (
                              <div
                                key={index}
                                className="task-item"
                                onClick={() => setTaskDetail(task)}
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <h2 className="heading-m">{name}</h2>
                                <p className="body-m text-grey-82">
                                  {finishedSubtasks} of {numberOfSubtasks}{" "}
                                  substasks
                                </p>
                              </div>
                            )}
                          </Draggable>
                        );
                      })
                    ) : (
                      <div className="empty-column" />
                    )}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          );
        })}
        <div
          onClick={() =>
            toggleBoardModal({
              type: "addColumn",
              currentBoardDetail: boardDetail,
            })
          }
          className="new-column cursor-pointer"
        >
          <h2 className="heading-xl text-grey-82 new-column-text">
            + New Column
          </h2>
        </div>
      </div>
    </DragDropContext>
  );
};

export default MainScreen;
