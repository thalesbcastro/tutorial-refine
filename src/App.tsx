import { Refine } from "@pankod/refine";
import routerProvider from "@pankod/refine-react-router";
import dataProvider from "@pankod/refine-simple-rest";

import "@pankod/refine/dist/styles.min.css";

import { PostList } from "./pages/posts/list";
import { PostShow } from "./pages/posts/show";
import { PostEdit } from "./pages/posts/edit";
import { PostCreate } from "./pages/posts/create";

const App: React.FC = () => {
  return (
    <Refine // É o root componente de uma aplicação com Refine
      routerProvider={routerProvider}
      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
      // Resources representa os endpoints de uma API. E "name" representa todo
      // resource simples que deveria dar match em um dos endpoints da API.
      resources={[{
        name: "posts",
        list: PostList,
        show: PostShow,
        edit: PostEdit,
        create: PostCreate,
        canDelete: true,
      }]}
    />
  );
};

export default App;