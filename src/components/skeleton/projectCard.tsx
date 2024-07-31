import { Card, CardProps, Skeleton } from "antd";

const ProjectCardSkeleton = () => {
	const styles: CardProps['styles'] = {
		body: {
			display: 'flex',
			justifyContent: 'center',
			gap: '8px',
		}
	};

	return (
		<Card
			size='small'
			styles={styles}
			title={
				<Skeleton.Button
					active
					size='small'
					style={{
						width: '200px',
						height: '22px',
					}}
				/>
			}
		>
			<Skeleton.Button
				active
				size='small'
				style={{
					width: '200px',
				}}
			/>
			<Skeleton.Avatar active size='small' />
		</Card>
	);
};

export default ProjectCardSkeleton;