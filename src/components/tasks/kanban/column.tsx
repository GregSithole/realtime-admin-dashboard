import { Text } from "@/components/text";
import { PlusOutlined } from "@ant-design/icons";
import { useDroppable } from "@dnd-kit/core"
import { Badge, Button, Space } from "antd";

const KanbanColumn = ({ children }: React.PropsWithChildren) => {

	const { isOver, setNodeRef, active } = useDroppable({
		id: '',
		data: ''
	});

	const count = 2;
	const description = 'Description';
	const title = 'Title';

	const onAddClickHandler = () => {
	};

	return (
		<div style={{ display: 'flex', flexDirection: 'column', padding: '0 16px' }} ref={setNodeRef}>
			<div style={{ padding: '12px' }}>
				<Space style={{ width: '100%', justifyContent: 'space-between' }}>
					<Space>
						<Text ellipsis={{ tooltip: 'TITLE TO DO' }} size="xs" strong style={{ textTransform: 'uppercase', whiteSpace: 'noWrap' }}>
							{title}
						</Text>
						{!!count && <Badge count={count} color="cyan" />}
					</Space>
					<Button shape="circle" icon={<PlusOutlined />} onClick={onAddClickHandler} />
				</Space>
				{description}
			</div>
			<div style={{ flex: 1, overflow: active ? 'unset' : 'scroll', border: '2px dashed transparent', borderColor: isOver ? '#000040' : 'transparent', borderRadius: '4px' }}>
				<div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
					{children}
				</div>
			</div>
		</div>
	)
}

export default KanbanColumn