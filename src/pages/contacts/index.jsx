import { Link } from "@inertiajs/react";
import MainLayout from "@/layouts/MainLayout";
import Pagination from "@/components/Pagination";
import FilterBar from "@/components/FilterBar";
import Table from "@/components/Table";
import { Trash2 } from "lucide-react";
import { metaToLinks } from "@/utils";

function Index({ contacts }) {
  const { data, meta } = contacts;

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">Contacts</h1>

      <div className="flex items-center justify-between mb-6">
        <FilterBar />
        <Link
          className="btn-indigo focus:outline-none"
          href={`/contacts/create`}
        >
          <span>Create</span>
          <span className="hidden md:inline"> Contact</span>
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
                {row.deletedAt && (
                  <Trash2 size={16} className="ml-2 text-gray-400" />
                )}
              </>
            ),
          },
          { label: "Organization", name: "organization.name" },
          { label: "City", name: "city" },
          { label: "Phone", name: "phone", colSpan: 2 },
        ]}
        rows={data}
        getRowDetailsUrl={(row) => `/contacts/${row.id}/edit`}
      />

      <Pagination links={metaToLinks(meta, "/contacts")} />
    </div>
  );
}

Index.layout = (page) => <MainLayout title="Contacts">{page}</MainLayout>;

export default Index;
