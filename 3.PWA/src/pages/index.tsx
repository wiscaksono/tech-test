import { useState } from "react";
import { type NextPage } from "next";
import Layout from "~/components/Layout";
import {
  ChevronUpIcon,
  CurrencyDollarIcon,
  PresentationChartBarIcon,
  ReceiptPercentIcon,
} from "@heroicons/react/24/outline";
import { BarChart, Bar, Cell, XAxis, ResponsiveContainer } from "recharts";

import { api } from "~/utils/api";

const Home: NextPage = () => {
  const { data: inventoryData } = api.inventory.getAll.useQuery();

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
            <p className="flex-1 text-2xl font-semibold">
              {inventoryData &&
                inventoryData.filter((inventory) => inventory.stock === 0)
                  .length}
            </p>
          </div>
        </div>

        <SalesPurchase />

        <div className="col-span-4 flex flex-col gap-6">
          <div className="flex items-center gap-2.5 bg-white px-4 py-5 sm:rounded-lg sm:px-6 sm:shadow">
            <div className="flex-1 space-y-2.5">
              <h4 className="font-medium">Total Transaksi</h4>
              <p className="flex-1 text-2xl font-semibold">12</p>
            </div>
            <PresentationChartBarIcon className="h-12 w-12 text-indigo-600" />
          </div>

          <div className="flex items-center gap-2.5 bg-white px-4 py-5 sm:rounded-lg sm:px-6 sm:shadow">
            <div className="flex-1 space-y-2.5">
              <h4 className="font-medium">Sales</h4>
              <p className="flex-1 text-2xl font-semibold">289</p>
            </div>
            <ReceiptPercentIcon className="h-12 w-12 text-indigo-600" />
          </div>

          <div className="flex items-center gap-2.5 bg-white px-4 py-5 sm:rounded-lg sm:px-6 sm:shadow">
            <div className="flex-1 space-y-2.5">
              <h4 className="font-medium">Purchase</h4>
              <p className="flex-1 text-2xl font-semibold">289</p>
            </div>
            <CurrencyDollarIcon className="h-12 w-12 text-indigo-600" />
          </div>
        </div>

        <div className="col-span-6 flex flex-col gap-2.5 bg-white px-4 py-5 sm:rounded-lg sm:px-6 sm:shadow">
          <h4 className="font-medium">Inventory</h4>
          <div className="max-h-56 divide-y overflow-y-auto pr-2.5">
            {inventoryData &&
              inventoryData.map((inventory) => (
                <div className="flex justify-between" key={inventory.id}>
                  <p className="text-gray-600">{inventory.name}</p>
                  <span className="flex h-6 w-6 items-center justify-center rounded bg-indigo-600 text-white">
                    1
                  </span>
                </div>
              ))}
          </div>
        </div>
        <div className="col-span-6 flex flex-col gap-5 bg-white px-4 py-5 sm:rounded-lg sm:px-6 sm:shadow"></div>
      </section>
    </Layout>
  );
};

export default Home;

const SalesPurchase = () => {
  const data = [
    {
      name: "Jan",
      uv: 4000,
    },
    {
      name: "Feb",
      uv: 3000,
    },
    {
      name: "Mar",
      uv: 2000,
    },
    {
      name: "Apr",
      uv: 2780,
    },
    {
      name: "May",
      uv: 1890,
    },
    {
      name: "Jun",
      uv: 2390,
    },
    {
      name: "Jul",
      uv: 3490,
    },
    {
      name: "Aug",
      uv: 4000,
    },
    {
      name: "Sep",
      uv: 4000,
    },
    {
      name: "Oct",
      uv: 3490,
    },
    {
      name: "Nov",
      uv: 1890,
    },
  ];

  const [activeIndex, setActiveIndex] = useState(data.length - 1);

  function handleClick(
    event: React.MouseEvent<HTMLButtonElement>,
    index: number
  ): void {
    setActiveIndex(index);
  }

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth(); // 0-indexed
  const currentYear = currentDate.getFullYear();

  const lastMonthValue = data[currentMonth]?.uv;
  const thisYearValue = data.reduce((total, current) => {
    if (
      new Date().getFullYear() === currentYear &&
      data.indexOf(current) <= currentMonth
    ) {
      return total + current.uv;
    } else {
      return total;
    }
  }, 0);

  return (
    <div className="col-span-8 flex flex-col gap-5 bg-white px-4 py-5 sm:rounded-lg sm:px-6 sm:shadow">
      <h4 className="font-medium">Sales & Purchases</h4>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart width={150} height={40} data={data}>
          <Bar dataKey="uv" fill="#4f46e5" onClick={handleClick}>
            {data.map((_, index) => (
              <Cell
                cursor="pointer"
                fill={index === activeIndex ? "#f97316" : "#4f46e5"}
                key={`cell-${index}`}
              />
            ))}
          </Bar>
          <XAxis dataKey="name" tickLine={false} axisLine={false} />
        </BarChart>
      </ResponsiveContainer>
      <div className="grid grid-cols-4 place-items-center">
        <div className="space-y-1">
          <p className="font-semibold">Target</p>
          <span className="flex items-center justify-center gap-1 font-bold text-green-500">
            <ChevronUpIcon className="h-4 w-4" />
            231
          </span>
        </div>

        <div className="space-y-1">
          <p className="font-semibold">Last Week</p>
          <span className="flex items-center justify-center gap-1 text-center font-bold text-red-500">
            <ChevronUpIcon className="h-4 w-4" />
            231
          </span>
        </div>

        <div className="space-y-1">
          <p className="font-semibold">Last Month</p>
          <span className="flex items-center justify-center gap-1 text-center font-bold text-red-500">
            <ChevronUpIcon className="h-4 w-4" />
            {lastMonthValue}
          </span>
        </div>

        <div className="space-y-1">
          <p className="font-semibold">This Year</p>
          <span className="flex items-center justify-center gap-1 text-center font-bold text-green-500">
            <ChevronUpIcon className="h-4 w-4" />
            {thisYearValue}
          </span>
        </div>
      </div>
    </div>
  );
};
