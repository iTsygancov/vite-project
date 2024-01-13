import { getItem } from "@/api/items";
import EditForm from "@/components/ItemForm/ItemForm";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { LoaderFunction, useParams } from "react-router-dom";

const contactDetailQuery = (id: string) => ({
  queryKey: ["item", id],
  queryFn: async () => await getItem(id)
});

export const loader = (queryClient: QueryClient) =>
  (async ({ params }) => {
    const query = contactDetailQuery(params.id || "");

    return (
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchQuery(query))
    );
  }) satisfies LoaderFunction;

const EditPage = () => {
  const params = useParams();
  const { data: item } = useQuery(contactDetailQuery(params.id || ""));

  return item && <EditForm item={item} />;
};

export default EditPage;
