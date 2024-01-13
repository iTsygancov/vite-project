import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

const Header = () => {
  return (
    <>
      <main className='flex flex-col'>
        <header className='w-full bg-white px-6 py-4 shadow dark:bg-gray-800'>
          <div className='flex items-center justify-between'>
            <h1 className='text-xl font-semibold text-gray-700 dark:text-gray-200'>
              <Link to='/'>Record Management</Link>
            </h1>
            <div className='flex items-center space-x-4'>
              <Button className='dark:border-gray-200 dark:text-gray-200'>
                <Link to='item/add'>Create Record</Link>
              </Button>
            </div>
          </div>
        </header>
        <Outlet />
      </main>
    </>
  );
};
export default Header;
