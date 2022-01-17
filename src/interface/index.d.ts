export interface ICategory {
    id: string;
    title: string;
}

export interface IUser {
    id: string;
    firstName: string;
    email: string;
    status: true | false;
    birthday: string;
}

export interface IPost {
    id: string;
    title: string;
    user: { id: string };
    status: "published" | "draft" | "rejected";
    category: { id: string };
    createdAt: string;
}