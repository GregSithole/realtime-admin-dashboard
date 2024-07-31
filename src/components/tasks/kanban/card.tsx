import CustomAvatar from '@/components/customAvatar';
import { Text } from '@/components/text';
import { TextIcon } from '@/components/textIcon';
import { User } from '@/graphql/schema.types';
import { getDateColor } from '@/utilities';
import { ClockCircleOutlined, DeleteOutlined, EyeOutlined, MoreOutlined } from '@ant-design/icons';
import { useDelete, useNavigation } from '@refinedev/core';
import type { MenuProps } from "antd";
import { Button, Card, ConfigProvider, Dropdown, Space, Tag, theme, Tooltip } from 'antd';
import dayjs from 'dayjs';
import { memo, useMemo } from 'react'
import { text } from 'stream/consumers';

interface ProjectCardProps {
	id: string;
	title: string;
	updatedAt: string;
	dueDate?: string;
	users?: {
		id: string;
		name: string;
		avatarUrl?: User['avatarUrl'];
	}[];
};

const ProjectCard = ({ id, title, dueDate, users }: ProjectCardProps) => {

	const { token } = theme.useToken();

	const { edit } = useNavigation()
	const { mutate: deleteTask } = useDelete();

	const dropdownItem = useMemo(() => {
		const dropdownItems: MenuProps['items'] = [
			{
				label: 'View card',
				key: '1',
				icon: <EyeOutlined />,
				onClick: () => {
					edit('tasks', id, 'replace')
				}
			},
			{
				danger: true,
				label: 'Delete card',
				key: '2',
				icon: <DeleteOutlined />,
				onClick: () => {
					deleteTask({
						resource: 'tasks',
						id,
						meta: {
							operation: 'delete',
						}
					});
				}
			}
		];
		return dropdownItems;
	}, [users]);

	const dueDateOptions = useMemo(() => {
		if (!dueDate) {
			return null;
		}

		const date = dayjs(dueDate);

		return {
			color: getDateColor({ date: dueDate }) as string,
			text: date.format('MMM DD')
		}
	}, [dueDate]);

	return (
		<ConfigProvider theme={{
			components: {
				Tag: {
					colorText: token.colorTextSecondary,
				},
				Card: {
					headerBg: 'transparent',
				}
			}
		}}>
			<Card
				size='small'
				title={<Text ellipsis={{ tooltip: title }}>{title}</Text>}
				onClick={() => edit('tasks', id, 'replace')}
				extra={
					<Dropdown
						trigger={["click"]}
						menu={{
							items: dropdownItem,
							onPointerDown: (e) => e.stopPropagation(),
							onClick: (e) => e.domEvent.stopPropagation(),
						}}
						placement='bottom'
						arrow={{ pointAtCenter: true }}>
						<Button
							type='text'
							shape='circle'
							icon={<MoreOutlined style={{ transform: 'rotate(90deg)' }} />}
							onPointerDown={(e) => e.stopPropagation()}
							onClick={(e) => e.stopPropagation()}
						/>
					</Dropdown>
				}>
				<div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px' }}>
					<TextIcon style={{ marginRight: '4px' }} />
					{dueDateOptions && (
						<Tag
							icon={<ClockCircleOutlined />}
							style={{ padding: '0 4px', marginInline: '0', backgroundColor: dueDateOptions.color === 'default' ? 'transparent' : 'unset' }}
							color={dueDateOptions.color}
							bordered={dueDateOptions.color !== 'default'}>
							{dueDateOptions.text}
						</Tag>
					)}
					{!!users?.length && (
						<Space size={4} wrap direction='horizontal' align='center' style={{ display: 'flex', justifyContent: 'flex-end', marginLeft: 'auto', marginRight: 0 }}>
							{users.map((user) => (
								<Tooltip key={user.id} title={user.name}>
									<CustomAvatar name={user.name} src={user.avatarUrl} />
								</Tooltip>
							))}
						</Space>
					)}
				</div>
			</Card>
		</ConfigProvider>
	)
}

export default ProjectCard

export const ProjectCardMemo = memo(ProjectCard, (prev, next) => {
	return (
		prev.id === next.id &&
		prev.title === next.title &&
		prev.dueDate === next.dueDate &&
		prev.users?.length === next.users?.length &&
		prev.updatedAt === next.updatedAt
	)
});