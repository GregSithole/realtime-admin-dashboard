import { CalendarOutlined } from '@ant-design/icons';
import { Badge, Card, CardProps, List } from 'antd'
import React from 'react'
import { Text } from '../text';
import UpcomingEventsSkeleton from '../skeleton/upcomingEvents';
import { getDate } from '@/utilities/helpers';
import { useList } from '@refinedev/core';
import { DASHBORAD_CALENDAR_UPCOMING_EVENTS_QUERY } from '@/graphql/queries';
import dayjs from 'dayjs';

const UpcomingEvents = () => {
	const { data, isLoading } = useList({
		resource: 'events',
		pagination: {
			pageSize: 5,
		},
		sorters: [
			{
				field: 'startDate',
				order: 'asc'
			}
		],
		filters: [
			{
				field: 'startDate',
				operator: 'lt',
				value: dayjs().format('YYYY-MM-DD'),
			}
		],
		meta: {
			gqlQuery: DASHBORAD_CALENDAR_UPCOMING_EVENTS_QUERY
		}
	});

	const styles: CardProps['styles'] = {
		header: {
			padding: '8px 16px',
		},
		body: {
			padding: '0 1rem',
		}
	};

	return (
		<Card
			style={{ height: '100%' }}
			styles={styles}
			title={
				<div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
					<CalendarOutlined />
					<Text size='sm' style={{ marginLeft: '0.7rem' }}>Upcoming Events</Text>
				</div>
			}>
			{isLoading ? (
				<List
					itemLayout='horizontal'
					dataSource={Array.from({ length: 5 }).map((_, index) => ({
						id: index,
					}))}
					renderItem={() => <UpcomingEventsSkeleton />}
				>
				</List>
			) : (
				<List
					itemLayout='horizontal'
					dataSource={data?.data || []}
					renderItem={(item) => {
						const renderDate = getDate(item.startDate, item.endDate)

						return (
							<List.Item>
								<List.Item.Meta
									avatar={<Badge color={item.color} />}
									title={<Text size='xs'>{renderDate}</Text>}
									description={<Text ellipsis={{ tooltip: true }} strong>{item.title}</Text>}
								/>
							</List.Item>
						)
					}} />
			)}
		</Card>
	)
}

export default UpcomingEvents