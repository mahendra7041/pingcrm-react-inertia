import { Link } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import FilterBar from "@/Components/FilterBar";
import Pagination from "@/Components/Pagination";
import Table from "@/Components/Table";
import { Trash2 } from "lucide-react";

function Index({ organizations }) {
  const {
    data,
    meta: { links },
  } = organizations;

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">Organizations</h1>

      <div className="flex items-center justify-between mb-6">
        <FilterBar />
        <Link
          className="btn-indigo focus:outline-none"
          href={route("organizations.create")}
        >
          <span>Create</span>
          <span className="hidden md:inline"> Organization</span>
        </Link>
      </div>

      <Table
        columns={[
          {
            label: "Name",
            name: "name",
            renderCell: (row) => (
              <>
                {row.name}
                {row.deleted_at && (
                  <Trash2 size={16} className="ml-2 text-gray-400" />
                )}
              </>
            ),
          },
          { label: "City", name: "city" },
          { label: "Phone", name: "phone", colSpan: 2 },
        ]}
        rows={data}
        getRowDetailsUrl={(row) => route("organizations.edit", row.id)}
      />

      <Pagination links={links} />
    </div>
  );
}

Index.layout = (page) => <MainLayout title="Organizations">{page}</MainLayout>;

export default Index;
