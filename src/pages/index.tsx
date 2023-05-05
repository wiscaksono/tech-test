import { type NextPage } from "next";
import Layout from "~/components/Layout";
import { ChevronUpIcon } from "@heroicons/react/24/outline";

const Home: NextPage = () => {
  return (
    <Layout title="Create T3 App">
      <h3 className="mb-5 text-2xl font-semibold leading-6 text-gray-900">
        Order Statistic
      </h3>

      <section className="grid grid-cols-12 gap-6">
        <div className="col-span-3 flex flex-col gap-5 bg-white px-4 py-5 sm:rounded-lg sm:px-6 sm:shadow">
          <h4 className="font-medium">Total Selling</h4>
          <div className="flex items-center gap-2.5">
            <p className="flex-1 text-2xl font-semibold">890</p>
            <div className="flex flex-col items-center gap-1 text-indigo-600">
              <ChevronUpIcon className="h-4 w-4" />
              <span className="text-sm font-medium">20.5%</span>
            </div>
          </div>
        </div>

        <div className="col-span-3 flex flex-col gap-5 bg-white px-4 py-5 sm:rounded-lg sm:px-6 sm:shadow">
          <h4 className="font-medium">Expired Inventory</h4>
          <div className="flex items-center gap-2.5">
            <p className="flex-1 text-2xl font-semibold">5</p>
          </div>
        </div>

        <div className="col-span-3 flex flex-col gap-5 bg-white px-4 py-5 sm:rounded-lg sm:px-6 sm:shadow">
          <h4 className="font-medium">Out of Stock Inventory</h4>
          <div className="flex items-center gap-2.5">
            <p className="flex-1 text-2xl font-semibold">12</p>
          </div>
        </div>

        <div className="col-span-8 flex flex-col gap-5 bg-white px-4 py-5 sm:rounded-lg sm:px-6 sm:shadow">
          <h4 className="font-medium">Total Selling</h4>
          <div className="flex items-center gap-2.5">
            <p className="flex-1 text-2xl font-semibold">890</p>
            <div className="flex flex-col items-center gap-1 text-indigo-600">
              <ChevronUpIcon className="h-4 w-4" />
              <span className="text-sm font-medium">20.5%</span>
            </div>
          </div>
        </div>

        <div className="col-span-4 flex flex-col gap-6">
          <div className="flex flex-col gap-5 bg-white px-4 py-5 sm:rounded-lg sm:px-6 sm:shadow">
            <h4 className="font-medium">Total Selling</h4>
            <div className="flex items-center gap-2.5">
              <p className="flex-1 text-2xl font-semibold">890</p>
              <div className="flex flex-col items-center gap-1 text-indigo-600">
                <ChevronUpIcon className="h-4 w-4" />
                <span className="text-sm font-medium">20.5%</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-5 bg-white px-4 py-5 sm:rounded-lg sm:px-6 sm:shadow">
            <h4 className="font-medium">Total Selling</h4>
            <div className="flex items-center gap-2.5">
              <p className="flex-1 text-2xl font-semibold">890</p>
              <div className="flex flex-col items-center gap-1 text-indigo-600">
                <ChevronUpIcon className="h-4 w-4" />
                <span className="text-sm font-medium">20.5%</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-5 bg-white px-4 py-5 sm:rounded-lg sm:px-6 sm:shadow">
            <h4 className="font-medium">Total Selling</h4>
            <div className="flex items-center gap-2.5">
              <p className="flex-1 text-2xl font-semibold">890</p>
              <div className="flex flex-col items-center gap-1 text-indigo-600">
                <ChevronUpIcon className="h-4 w-4" />
                <span className="text-sm font-medium">20.5%</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
