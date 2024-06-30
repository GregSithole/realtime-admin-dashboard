import { CalendarOutlined } from '@ant-design/icons';
import { Card, CardProps, List } from 'antd'
import React from 'react'
import { Text } from '../text';

const UpcomingEvents = () => {
	const [isLoading, setIsLoading] = React.useState(true);

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
				<List itemLayout='horizontal' dataSource={Array.from({ length: 5 }).map((_, index) => ({
					id: index,
				}))}>

				</List>
			) : (
				<List></List>
			)}
		</Card>
	)
}

export default UpcomingEvents