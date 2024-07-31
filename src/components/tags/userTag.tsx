import { Space, Tag } from "antd";

import { User } from "@/graphql/schema.types";
import CustomAvatar from "../customAvatar";

type Props = {
	user: User;
};

export const UserTag = ({ user }: Props) => {
	return (
		<Tag
			key={user.id}
			style={{
				padding: 2,
				paddingRight: 8,
				borderRadius: 24,
				lineHeight: "unset",
				marginRight: "unset",
			}}
		>
			<Space size={4}>
				<CustomAvatar
					src={user.avatarUrl}
					name={user.name}
					style={{ display: "inline-flex" }}
				/>
				{user.name}
			</Space>
		</Tag>
	);
};