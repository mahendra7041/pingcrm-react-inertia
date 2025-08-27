import { Link } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import FilterBar from "@/Components/FilterBar";
import Pagination from "@/Components/Pagination";
import Table from "@/Components/Table";
import { Trash2 } from "lucide-react";

function Index({ users }) {
  const {
    data,
    meta: { links },
  } = users;

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">Users</h1>

      <div className="flex items-center justify-between mb-6">
        <FilterBar />
        <Link
          className="btn-indigo focus:outline-none"
          href={route("users.create")}
        >
          <span>Create</span>
          <span className="hidden md:inline"> User</span>
        </Link>
      </div>

      <Table
        columns={[
          {
            label: "Name",
            name: "name",
            renderCell: (row) => (
              <div className="flex items-center">
                {row.photo && (
                  <img
                    src={row.photo}
                    alt={row.name}
                    className="w-5 h-5 mr-2 rounded-full"
                  />
                )}
                <span>{row.name}</span>
                {row.deleted_at && (
                  <Trash2 size={16} className="ml-2 text-gray-400" />
                )}
              </div>
            ),
          },
          { label: "Email", name: "email" },
          {
            label: "Role",
            name: "owner",
            colSpan: 2,
            renderCell: (row) => (row.owner ? "Owner" : "User"),
          },
        ]}
        rows={data}
        getRowDetailsUrl={(row) => route("users.edit", row.id)}
      />

      <Pagination links={links} />
    </div>
  );
}

Index.layout = (page) => <MainLayout title="Users">{page}</MainLayout>;

export default Index;
