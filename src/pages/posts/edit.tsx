import { useForm, Form, Input, Select, Edit, useSelect } from "@pankod/refine";
import { IPost } from "../../interface";

export const PostEdit: React.FC = () => {
    const { formProps, saveButtonProps, queryResult } = useForm<IPost>();

    const { selectProps: userSelectProps } = useSelect<IPost>({
        resource: "users",
        defaultValue: queryResult?.data?.data.user.id,
    });

    const { selectProps: categorySelectProps } = useSelect<IPost>({

        resource: "categories",
        defaultValue: queryResult?.data?.data.category.id,
    });
    return (
        <Edit saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Form.Item label="Title" name="title">
                    <input type="text" />
                </Form.Item>

                <Form.Item label="Status" name="status">
                    <Select
                        options={[
                            {
                                label: "Published",
                                value: "published"
                            },
                            {
                                label: "Draft",
                                value: "draft"
                            },
                            {
                                label: "Rejected",
                                value: "rejected"
                            },
                        ]}
                    />
                </Form.Item>

                <Form.Item label="User" name={["user", "id"]}>
                    <Select {...userSelectProps} />
                </Form.Item>

                <Form.Item label="Category" name={["category", "id"]}>
                    <Select {...categorySelectProps} />
                </Form.Item>
            </Form>
        </Edit>
    );
}