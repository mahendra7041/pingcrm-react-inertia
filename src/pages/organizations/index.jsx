import { Link } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import FilterBar from "@/Components/FilterBar";
import Pagination from "@/Components/Pagination";
import Table from "@/Components/Table";
import { Trash2 } from "lucide-react";
import { metaToLinks } from "@/utils";

function Index({ organizations }) {
  const { data, meta } = organizations;

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">Organizations</h1>

      <div className="flex items-center justify-between mb-6">
        <FilterBar />
        <Link
          className="btn-indigo focus:outline-none"
          href={"/organizations/create"}
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
        getRowDetailsUrl={(row) => `/organizations/${row.id}/edit`}
      />

      <Pagination links={metaToLinks(meta, "/organizations")} />
    </div>
  );
}

Index.layout = (page) => <MainLayout title="Organizations">{page}</MainLayout>;

export default Index;
