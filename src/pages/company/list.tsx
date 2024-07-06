import CustomAvatar from '@/components/customAvatar';
import { Text } from '@/components/text';
import { COMPANIES_LIST_QUERY } from '@/graphql/queries';
import { currencyNumber } from '@/utilities';
import { SearchOutlined } from '@ant-design/icons';
import { CreateButton, DeleteButton, EditButton, FilterDropdown, List, useTable } from '@refinedev/antd'
import { getDefaultFilter, useGo } from '@refinedev/core'
import { Input, Space, Table } from 'antd';
import type { GetFieldsFromList } from "@refinedev/nestjs-query";
import type { CompaniesListQuery } from "@/graphql/types";


type Company = GetFieldsFromList<CompaniesListQuery>;

const CompanyList = ({ children }: React.PropsWithChildren) => {
	const go = useGo();
	const { tableProps, filters } = useTable({
		resource: 'companies',
		onSearch: (values) => {
			return [
				{
					field: 'name',
					operator: 'contains',
					value: values.name
				}
			]
		},
		sorters: {
			initial: [
				{ field: 'createdAt', order: 'desc' }
			]
		},
		filters: {
			initial: [
				{ field: 'name', operator: 'contains', value: undefined },
			]
		},
		pagination: {
			pageSize: 12,
		},
		meta: {
			gqlQuery: COMPANIES_LIST_QUERY
		},
	});

	return (
		<div>
			<List
				breadcrumb={false}
				headerButtons={() => (
					<CreateButton
						onClick={() => {
							go({
								to: {
									resource: 'companies',
									action: 'create'
								},
								options: {
									keepQuery: true,
								},
								type: 'replace'
							})
						}}
					/>
				)}
			>
				<Table {...tableProps} pagination={{ ...tableProps.pagination }}>
					<Table.Column<Company>
						key="name"
						dataIndex="name"
						title="Company Title"
						defaultFilteredValue={getDefaultFilter('id', filters)}
						filterIcon={<SearchOutlined />}
						filterDropdown={(props) => (
							<FilterDropdown {...props}>
								<Input placeholder='Search Company' />
							</FilterDropdown>
						)}
						render={(value, record) => (
							<Space>
								<CustomAvatar shape='square' name={record.name} src={record.avatarUrl} />
								<Text style={{ whiteSpace: 'nowrap' }}>{record.name}</Text>
							</Space>
						)}
					/>
					<Table.Column<Company>
						key="totalRevenue"
						dataIndex="totalRevenue"
						title="Open Deals amount"
						render={(value, company) => (
							<Text>
								{currencyNumber(company?.dealsAggregate?.[0].sum?.value || 0)}
							</Text>
						)}
					/>
					<Table.Column<Company>
						key="id"
						dataIndex="id"
						title="Actions"
						render={(value) => (
							<Space>
								<EditButton hideText size="small" recordItemId={value} />
								<DeleteButton hideText size="small" recordItemId={value} />
							</Space>
						)}
					/>
				</Table>
			</List>
			{children}

		</div>

	)
}

export default CompanyList