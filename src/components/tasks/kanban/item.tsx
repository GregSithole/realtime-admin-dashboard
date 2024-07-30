import { DragOverlay, useDraggable, UseDraggableArguments } from '@dnd-kit/core'
import React from 'react'

interface Props {
	id: string;
	data?: UseDraggableArguments['data'];
}

const KanbanItem = ({ children, id, data }: React.PropsWithChildren<Props>) => {
	const { attributes, listeners, setNodeRef, active, } = useDraggable({
		id,
		data,
	});

	return (
		<div style={{ position: 'relative' }}>
			<div ref={setNodeRef} {...attributes} {...listeners} style={{ opacity: active ? (active.id === id ? 1 : 0.5) : 1, borderRadius: '8px', position: 'relative', cursor: 'grab' }}>
				{active?.id === id && (
					<DragOverlay zIndex={1000}>
						<div style={{
							borderRadius: '8px',
							boxShadow: 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;',
							cursor: 'grabbing',
						}}>
							{children}
						</div>
					</DragOverlay>
				)}
				{children}
			</div>
		</div>
	)
}

export default KanbanItem