import { Card, CardProps, List, Space } from 'antd'
import { Text } from '../text'
import { UnorderedListOutlined } from '@ant-design/icons';
import LatestActivitiesSkeleton from '../skeleton/latestActivities';
import { useList } from '@refinedev/core';
import { DASHBOARD_LATEST_ACTIVITIES_AUDITS_QUERY, DASHBOARD_LATEST_ACTIVITIES_DEALS_QUERY } from '@/graphql/queries';
import dayjs from 'dayjs';
import CustomAvatar from '../customAvatar';

const DashboardLatestActivities = () => {
	const { data: audits, isLoading: isLoadingAudit, isError, error } = useList({
		resource: 'audits',
		meta: {
			gqlQuery: DASHBOARD_LATEST_ACTIVITIES_AUDITS_QUERY
		}
	});

	const dealsId = audits?.data.map((audit) => audit.targetId);

	const { data: deals, isLoading: isLoadingDeals } = useList({
		resource: 'deals',
		queryOptions: {
			enabled: !!dealsId?.length,
		},
		pagination: {
			mode: 'off',
		},
		filters: [
			{
				field: 'id',
				operator: 'in',
				value: dealsId,
			}
		],
		meta: {
			gqlQuery: DASHBOARD_LATEST_ACTIVITIES_DEALS_QUERY
		}
	});

	const styles: CardProps['styles'] = {
		header: {
			padding: '16px',
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
					<UnorderedListOutlined />
					<Text size='sm' style={{ marginLeft: '0.5rem' }}>Latest Activities</Text>
				</div>
			}>
			{isLoadingAudit ? (
				<List
					itemLayout='horizontal'
					dataSource={Array.from({ length: 5 }).map((_, index) => ({
						id: index,
					}))}
					renderItem={(_, index) => <LatestActivitiesSkeleton key={index} />}
				/>
			) : (
				<List
					itemLayout='horizontal'
					dataSource={audits?.data || []}
					renderItem={(item) => {
						const deal = deals?.data.find((deal) => deal.id == item.targetId) || undefined;
						return (
							<List.Item>
								<List.Item.Meta
									avatar={<CustomAvatar shape='square' size={48} src={deal?.company.avatarUrl} name={deal?.company.name} />}
									title={<Text size='xs'>{dayjs(deal?.createdAt).format('MMM DD, YYYY - HH:mm')}</Text>}
									description={
										<Space size={4}>
											<Text strong>{item.user?.name}</Text>
											<Text>{item.action === 'CREATE' ? 'created' : 'moved'}</Text>
											<Text strong>{deal?.title}</Text>
											<Text>deal</Text>
											<Text>{item.action === 'CREATE' ? 'in' : 'to'}</Text>
											<Text strong>{deal?.stage?.title}</Text>
										</Space>
									}
								/>
							</List.Item>
						)
					}} />
			)}
		</Card>
	)
}

export default DashboardLatestActivities