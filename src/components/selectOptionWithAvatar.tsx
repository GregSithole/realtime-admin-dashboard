import CustomAvatar from "./customAvatar"
import { Text } from "./text"

type Props = {
	avatarUrl?: string
	name: string
	shape?: 'circle' | 'square'
}

const SelectOptionWithAvatar = ({ avatarUrl, name, shape }: Props) => {
	return (
		<div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
			<CustomAvatar shape={shape} size={24} src={avatarUrl} name={name} />
			<Text>{name}</Text>
		</div>
	)
}

export default SelectOptionWithAvatar