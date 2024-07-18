import { KanbanBoard, KanbanBoardContainer } from "@/components/tasks/kanban/board"
import KanbanColumn from "@/components/tasks/kanban/column"

const TaskList = () => {
	return (
		<>
			<KanbanBoardContainer>
				<KanbanBoard>
					<KanbanColumn>

					</KanbanColumn>
					<KanbanColumn>

					</KanbanColumn>
				</KanbanBoard>
			</KanbanBoardContainer>
		</>
	)
}

export default TaskList