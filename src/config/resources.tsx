import { DashboardOutlined, ProjectOutlined, ShopOutlined } from "@ant-design/icons";
import { IResourceItem } from "@refinedev/core";

/**
 * Resources configuration.
 */
export const resources: IResourceItem[] = [
	{
		name: 'dashboard',
		list: '/',
		meta: {
			label: "Dashboard",
			icon: <DashboardOutlined />,
		}
	},
	{
		name: 'companies',
		list: '/companies',
		show: '/companies/:id',
		create: '/companies/new',
		edit: '/companies/edit/:id',
		meta: {
			icon: <ShopOutlined />,
			label: 'Companies',
		}
	},
	{
		name: 'tasks',
		list: '/tasks',
		create: '/tasks/new',
		edit: '/tasks/edit/:id',
		meta: {
			icon: <ProjectOutlined />,
			label: 'Tasks',
		}
	},
];