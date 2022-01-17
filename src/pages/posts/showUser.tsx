import { Show, useShow, Typography, useOne } from "@pankod/refine";

import { IPost, ICategory, IUser } from "../../interface";

const { Title, Text } = Typography;

export const PostShowUser = () => {
    const { queryResult } = useShow();
    const { data, isLoading } = queryResult;
    const record = data?.data;

    const { data: userData } = useOne<IUser>({
        resource: "users",
        id: record?.user.id || "",
        queryOptions: {
            enabled: !!record?.user.id,
        },
    });

    return (
        <Show isLoading={isLoading}>
            <Title level={5}>First Name</Title>
            <Text>{userData?.data.firstName}</Text>

            <Title level={5}>E-mail</Title>
            <Text>{userData?.data.email}</Text>

            <Title level={5}>Birthday</Title>
            <Text>{userData?.data.birthday}</Text>

        </Show>
    )
}