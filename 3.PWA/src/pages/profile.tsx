import Layout from "~/components/Layout";
import type { GetServerSidePropsContext } from "next";
import { useState, useEffect } from "react";
import { getSession, useSession } from "next-auth/react";
import { type RouterInputs, api } from "~/utils/api";

type UserProps = RouterInputs["user"]["updateById"];
type LocationProps = {
  id: string;
  name: string;
};

export default function Profile({ province }: { province: LocationProps[] }) {
  const { data } = useSession();
  const [values, setValues] = useState<UserProps>({
    id: data?.user.id || "",
    name: data?.user.name || "",
    email: data?.user.email || "",
    alamat: data?.user.alamat || "",
    bidangUsaha: data?.user.bidangUsaha || "",
    kecamatan: data?.user.kecamatan || "",
    kodepos: data?.user.kodepos || "",
    kotaKabupaten: data?.user.kotaKabupaten || "",
    NIB: data?.user.NIB || "",
    NPWP: data?.user.NPWP || "",
    provinsi: data?.user.provinsi || "",
  });

  const [kotaKabupaten, setKotaKabupaten] = useState<LocationProps[]>([]);

  const updateUser = api.user.updateById.useMutation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const selectedProvince = province.find(
          (prov) => prov.name === values.provinsi
        );
        if (selectedProvince) {
          const response = await fetch(
            `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${selectedProvince.id}.json`
          );
          if (response.ok) {
            const regencies: LocationProps[] =
              (await response.json()) as LocationProps[];
            setKotaKabupaten(regencies);
          } else {
            throw new Error("Failed to fetch data");
          }
        }
      } catch (error) {
        // Handle the error here
        console.error(error);
      }
    };

    void fetchData();
  }, [values.provinsi, province]);

  return (
    <Layout>
      <div className="space-y-6 sm:px-6 lg:col-span-9 lg:px-0">
        <section aria-labelledby="payment-details-heading">
          <form method="POST">
            <div className="shadow sm:overflow-hidden sm:rounded-md">
              <div className="bg-white px-4 py-6 sm:p-6">
                <div>
                  <h2
                    id="payment-details-heading"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Profile
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Update your profile information.
                  </p>
                </div>

                <div className="mt-6 grid grid-cols-4 gap-6">
                  <div className="col-span-4 sm:col-span-2">
                    <label
                      htmlFor="full-name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="full-name"
                      id="full-name"
                      autoComplete="full-name"
                      className="mt-2 block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
                      value={values.name}
                      onChange={(e) =>
                        setValues({ ...values, name: e.target.value })
                      }
                    />
                  </div>

                  <div className="col-span-4 sm:col-span-2">
                    <label
                      htmlFor="email-address"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Email address
                    </label>
                    <input
                      type="text"
                      name="email-address"
                      id="email-address"
                      autoComplete="email"
                      className="mt-2 block w-full rounded-md border-0 px-3 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
                      value={values.email}
                      onChange={(e) =>
                        setValues({ ...values, email: e.target.value })
                      }
                    />
                  </div>

                  <div className="col-span-4 sm:col-span-2">
                    <label
                      htmlFor="bidang-usaha"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Bidang Usaha
                    </label>
                    <input
                      type="text"
                      name="bidang-usaha"
                      id="bidang-usaha"
                      autoComplete="bidang-usaha"
                      className="mt-2 block w-full rounded-md border-0 px-3 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
                      value={values.bidangUsaha}
                      onChange={(e) =>
                        setValues({ ...values, email: e.target.value })
                      }
                    />
                  </div>

                  <div className="col-span-4 sm:col-span-1">
                    <label
                      htmlFor="NPWP"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      NPWP
                    </label>
                    <input
                      type="text"
                      name="NPWP"
                      id="NPWP"
                      autoComplete="NPWP"
                      className="mt-2 block w-full rounded-md border-0 px-3 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
                      value={values.NPWP}
                      onChange={(e) =>
                        setValues({ ...values, NPWP: e.target.value })
                      }
                    />
                  </div>

                  <div className="col-span-4 sm:col-span-1">
                    <label
                      htmlFor="alamat"
                      className="flex items-center text-sm font-medium leading-6 text-gray-900"
                    >
                      Alamat
                    </label>
                    <input
                      type="alamat"
                      name="alamat"
                      id="alamat"
                      autoComplete="alamat"
                      className="mt-2 block w-full rounded-md border-0 px-3 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
                      value={values.alamat}
                      onChange={(e) =>
                        setValues({ ...values, alamat: e.target.value })
                      }
                    />
                  </div>

                  <div className="col-span-4 sm:col-span-2">
                    <label
                      htmlFor="provinsi"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Provinsi
                    </label>
                    <select
                      id="provinsi"
                      name="provinsi"
                      autoComplete="provinsi"
                      className="mt-2 block w-full rounded-md border-0 bg-white px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
                      value={values.provinsi}
                      onChange={(e) => {
                        setValues({ ...values, provinsi: e.target.value });
                      }}
                    >
                      <option defaultChecked hidden></option>
                      {province.map((prov) => (
                        <option key={prov.id}>{prov.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="col-span-4 sm:col-span-2">
                    <label
                      htmlFor="kota-kabupaten"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Kota / Kabupaten
                    </label>
                    <select
                      id="kota-kabupaten"
                      name="kota-kabupaten"
                      autoComplete="kota-kabupaten"
                      className="mt-2 block w-full rounded-md border-0 bg-white px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
                      value={values.kotaKabupaten}
                      onChange={(e) =>
                        setValues({ ...values, kotaKabupaten: e.target.value })
                      }
                    >
                      <option defaultChecked hidden></option>
                      {kotaKabupaten.map((prov) => (
                        <option key={prov.id}>{prov.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                <button
                  type="button"
                  className="inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
                  onClick={() => {
                    updateUser.mutate(values);
                  }}
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </section>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);
  const res = await fetch(
    "https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json"
  );
  const province: LocationProps[] = (await res.json()) as LocationProps[];

  if (!session) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }

  return {
    props: { session, province },
  };
}
