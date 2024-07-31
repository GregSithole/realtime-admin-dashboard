import { MarkdownField } from "@refinedev/antd";

import { Typography, Space, Tag } from "antd";

import dayjs from "dayjs";

import { Text, UserTag } from "@/components";
import { getDateColor } from "@/utilities";

import { Task } from "@/graphql/schema.types";

type DescriptionProps = {
	description?: Task["description"];
};

type DueDateProps = {
	dueData?: Task["dueDate"];
};

type UserProps = {
	users?: Task["users"];
};

export const DescriptionHeader = ({ description }: DescriptionProps) => {
	if (description) {
		return (
			<Typography.Paragraph ellipsis={{ rows: 8 }}>
				<MarkdownField value={description} />
			</Typography.Paragraph>
		);
	}

	return <Typography.Link>Add task description</Typography.Link>;
};

export const DueDateHeader = ({ dueData }: DueDateProps) => {
	if (dueData) {
		const color = getDateColor({
			date: dueData,
			defaultColor: "processing",
		});

		const getTagText = () => {
			switch (color) {
				case "error":
					return "Overdue";

				case "warning":
					return "Due soon";

				default:
					return "Processing";
			}
		};

		return (
			<Space size={[0, 8]}>
				<Tag color={color}>{getTagText()}</Tag>
				<Text>{dayjs(dueData).format("MMMM D, YYYY - h:ma")}</Text>
			</Space>
		);
	}

	return <Typography.Link>Add due date</Typography.Link>;
};

export const UsersHeader = ({ users = [] }: UserProps) => {
	if (users.length > 0) {
		return (
			<Space size={[0, 8]} wrap>
				{users.map((user) => (
					<UserTag key={user.id} user={user} />
				))}
			</Space>
		);
	}

	return <Typography.Link>Assign to users</Typography.Link>;
};
