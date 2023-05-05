import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Layout from "~/components/Layout";
import { api, type RouterInputs, type RouterOutputs } from "~/utils/api";

export default function Inventory() {
  const { data, refetch } = api.inventory.getAll.useQuery();
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedData, setSelectedData] = useState(data && data[0]);

  return (
    <Layout>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Inventory
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the inventory in your account
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            onClick={() => setOpenCreateModal(!openCreateModal)}
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add Inventory
          </button>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Stock
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Expired
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                    >
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {data &&
                    data.map((data) => (
                      <tr key={data.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          {data.name}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {data.stock}
                        </td>
                        <td
                          className={`mx-3 my-4 inline-flex items-center justify-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                            data.isExpired
                              ? "bg-red-50 text-red-600 ring-red-600/20"
                              : "bg-green-50 text-green-600 ring-green-600/20"
                          }`}
                        >
                          {data.isExpired.toString().toUpperCase()}
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <button
                            onClick={() => {
                              setSelectedData(data);
                              setOpenEditModal(true);
                            }}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            Edit<span className="sr-only">, {data.name}</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <CreateModal
        open={openCreateModal}
        setOpen={setOpenCreateModal}
        refetch={refetch}
      />
      <EditModal
        data={selectedData}
        open={openEditModal}
        setOpen={setOpenEditModal}
        refetch={refetch}
      />
    </Layout>
  );
}

const CreateModal = ({
  open,
  setOpen,
  refetch,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  refetch: () => void;
}) => {
  type ValuesProps = RouterInputs["inventory"]["create"];

  const [values, setValues] = useState<ValuesProps>();
  const cancelButtonRef = useRef(null);

  const addInventory = api.inventory.create.useMutation({
    onSuccess: () => {
      refetch();
      setOpen(false);
    },
  });

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <form className="bg-white md:col-span-2">
                  <div className="grid grid-cols-1 gap-x-3 gap-y-4 sm:grid-cols-6">
                    <div className="col-span-full">
                      <label
                        htmlFor="inventory-name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Name
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="inventory-name"
                          id="inventory-name"
                          autoComplete="inventory-name"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          onChange={(e) =>
                            setValues({ ...values, name: e.target.value })
                          }
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="stock"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Stock
                      </label>
                      <div className="mt-2">
                        <input
                          type="number"
                          name="stock"
                          id="stock"
                          autoComplete="stock"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="expired"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Expired
                      </label>
                      <div className="mt-2">
                        <select
                          id="expired"
                          name="expired"
                          autoComplete="expired"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                          <option>false</option>
                          <option>true</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 sm:mt-8 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                      onClick={() => values && addInventory.mutate(values)}
                      disabled={!values}
                    >
                      Add Inventory
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

const EditModal = ({
  data,
  open,
  setOpen,
  refetch,
}: {
  data: RouterOutputs["inventory"]["getAll"][0];
  open: boolean;
  setOpen: (open: boolean) => void;
  refetch: () => void;
}) => {
  type ValuesProps = RouterInputs["inventory"]["create"];

  const [values, setValues] = useState<ValuesProps>(data);
  const cancelButtonRef = useRef(null);

  const addInventory = api.inventory.create.useMutation({
    onSuccess: () => {
      refetch();
      setOpen(false);
    },
  });

  const deleteInventory = api.inventory.deleteById.useMutation({
    onSuccess: () => {
      refetch();
      setOpen(false);
    },
  });

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <form className="bg-white md:col-span-2">
                  <div className="grid grid-cols-1 gap-x-3 gap-y-4 sm:grid-cols-6">
                    <div className="col-span-full">
                      <label
                        htmlFor="inventory-name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Name
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="inventory-name"
                          id="inventory-name"
                          autoComplete="inventory-name"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          defaultValue={data?.name}
                          onChange={(e) =>
                            setValues({ ...values, name: e.target.value })
                          }
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="stock"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Stock
                      </label>
                      <div className="mt-2">
                        <input
                          type="number"
                          name="stock"
                          id="stock"
                          autoComplete="stock"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          defaultValue={data?.stock}
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="expired"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Expired
                      </label>
                      <div className="mt-2">
                        <select
                          id="expired"
                          name="expired"
                          autoComplete="expired"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                          defaultValue={data?.isExpired.toString()}
                        >
                          <option>false</option>
                          <option>true</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 sm:mt-8 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                      onClick={() => values && addInventory.mutate(values)}
                      disabled={!values}
                    >
                      Edit Inventory
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-red-50 px-3 py-2 text-sm font-semibold text-red-500 shadow-sm ring-1 ring-inset ring-red-300 sm:col-start-1 sm:mt-0"
                      onClick={() => deleteInventory.mutate({ id: data?.id })}
                      ref={cancelButtonRef}
                    >
                      Delete
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
