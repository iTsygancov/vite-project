import { getItems } from "@/api/items";
import Root from "@/components/Root/Root";
import { QueryClient, useQuery } from "@tanstack/react-query";

const contactDetailQuery = () => ({
  queryKey: ["items"],
  queryFn: async () => getItems()
});

export const loader = (queryClient: QueryClient) => async () => {
  const query = contactDetailQuery();

  return (
    queryClient.getQueryData(query.queryKey) ??
    (await queryClient.fetchQuery(query))
  );
};

function RootPage() {
  const { data: items } = useQuery(contactDetailQuery());

  return <Root items={items} />;
}

export default RootPage;
