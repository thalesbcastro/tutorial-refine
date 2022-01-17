import {
    List,
    TextField,
    TagField,
    DateField,
    Table,
    useMany,
    useTable,
    Select,
    useSelect,
    ShowButton,
    FilterDropdown,
    Space,
    EditButton,
} from "@pankod/refine";

import { IPost, ICategory, IUser } from "../../interface";

export const PostList: React.FC = () => {
    const { tableProps } = useTable<IPost>();
    const categoryIds = tableProps?.dataSource?.map((item) => item.category.id) ?? [];
    const usersIds = tableProps?.dataSource?.map((item) => item.user.id) ?? [];

    const { data: usersData } = useMany<IUser>({
        resource: "users",
        ids: usersIds,
        queryOptions: {
            enabled: usersIds.length > 0,
        },
    });

    const { data: categoriesData, isLoading } = useMany<ICategory>({
        // Acesso em toda a App
        resource: "categories",
        ids: categoryIds,
        queryOptions: {
            enabled: categoryIds.length > 0,
        },
    });

    const { selectProps: categorySelectProps } = useSelect<ICategory>({
        resource: "categories",
    });

    const { selectProps: userSelectProps } = useSelect<IUser>({
        resource: "users",
    })

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="title" title="title" />
                <Table.Column
                    dataIndex={["user", "id"]}
                    title="user"
                    render={(value) => {
                        if (isLoading) {
                            return <TextField value="Loading..." />
                        } else {
                            return (
                                <TextField
                                    value={
                                        usersData?.data.find(
                                            (item) => item.id === value,
                                        )?.firstName
                                    }
                                />
                            )
                        }
                    }}
                    filterDropdown={(props) => (
                        <FilterDropdown {...props}>
                            <Select
                                style={{ minWidth: 200 }}
                                mode="multiple"
                                placeholder="Select User"
                                {...userSelectProps}
                            />
                        </FilterDropdown>
                    )}
                />

                <Table.Column
                    dataIndex="status"
                    title="status"
                    render={(value) => <TagField value={value} />}
                />
                <Table.Column
                    dataIndex="createdAt"
                    title="createdAt"
                    render={(value) => <DateField format="LLL" value={value} />}
                />
                <Table.Column
                    dataIndex={["category", "id"]}
                    title="category"
                    render={(value) => {
                        if (isLoading) {
                            return <TextField value="Loading..." />
                        } else {
                            return (
                                <TextField
                                    value={
                                        categoriesData?.data.find(
                                            (item) => item.id === value,
                                        )?.title
                                    }
                                />
                            )
                        }
                    }}
                    filterDropdown={(props) => (
                        <FilterDropdown {...props}>
                            <Select
                                style={{ minWidth: 200 }}
                                mode="multiple"
                                placeholder="Select Category"
                                {...categorySelectProps}
                            />
                        </FilterDropdown>
                    )}
                />
                <Table.Column<IPost>
                    title="Actions"
                    dataIndex="actions"
                    render={(_text, record): React.ReactNode => {
                        return (
                            <Space>
                                <ShowButton
                                    size="small"
                                    recordItemId={record.id}
                                    hideText
                                />
                                <EditButton
                                    size="small"
                                    recordItemId={record.id}
                                    hideText
                                />
                            </Space>
                        );
                    }}
                />
            </Table>
        </List>
    );
};
