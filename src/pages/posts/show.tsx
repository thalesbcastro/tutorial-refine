import { Show, useShow, Typography, Tag, useOne } from "@pankod/refine";

import { IPost, ICategory, IUser } from "../../interface";

const { Title, Text } = Typography;

export const PostShow = () => {
    const { queryResult } = useShow();
    const { data, isLoading } = queryResult;
    const record = data?.data;

    const { data: userData } = useOne<IUser>({
        resource: "users",
        id: record?.user.id || "",
        queryOptions: {
            enabled: !!record?.user.id,
        },
    })

    const { data: categoryData } = useOne<ICategory>({
        resource: "categories",
        id: record?.category.id || "",
        queryOptions: {
            enabled: !!record?.category.id,
        },
    });

    return (
        <Show isLoading={isLoading}>
            <Title level={5}>Title</Title>
            <Text>{record?.title}</Text>

            <Title level={5}>Status</Title>
            <Text>{record?.status}</Text>

            <Title level={5}>Category</Title>
            <Text>{categoryData?.data.title}</Text>

            <Title level={5}>User</Title>
            <Text>{userData?.data.firstName}</Text>

        </Show>
    )
};