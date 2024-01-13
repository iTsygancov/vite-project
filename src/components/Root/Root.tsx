import { DataTable } from "../ui/data-table";
import { columns } from "./columns";
import { ItemsList } from "@/lib/types";

type RootProps = {
  items: ItemsList | undefined;
};

const Root = ({ items }: RootProps) => {
  return (
    <div className='flex min-h-screen flex-col bg-gray-100 dark:bg-gray-900'>
      <main className='flex-1 overflow-y-auto overflow-x-hidden bg-gray-100 dark:bg-gray-900'>
        <div className='container mx-auto px-6 py-8'>
          <h3 className='text-3xl font-medium text-gray-700 dark:text-gray-200'>
            List of Records
          </h3>
          {items && <DataTable columns={columns} data={items.items} />}
        </div>
      </main>
    </div>
  );
};
export default Root;
