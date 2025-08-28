import { Head, Link, useForm, router } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import DeleteButton from "@/Components/DeleteButton";
import LoadingButton from "@/Components/LoadingButton";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";
import TrashedMessage from "@/Components/TrashedMessage";
import Table from "@/Components/Table";
import FieldGroup from "@/Components/FieldGroup";

function Edit({ organization }) {
  const { data, setData, errors, put, processing } = useForm({
    name: organization.name || "",
    email: organization.email || "",
    phone: organization.phone || "",
    address: organization.address || "",
    city: organization.city || "",
    region: organization.region || "",
    country: organization.country || "",
    postalCode: organization.postalCode || "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    put(`/organizations/${organization.id}`);
  }

  function destroy() {
    if (confirm("Are you sure you want to delete this organization?")) {
      router.delete(`/organizations/${organization.id}`);
    }
  }

  function restore() {
    if (confirm("Are you sure you want to restore this organization?")) {
      router.put(`/organizations/${organization.id}`);
    }
  }

  return (
    <div>
      <Head title={data.name} />
      <h1 className="mb-8 text-3xl font-bold">
        <Link
          href={"/organizations"}
          className="text-indigo-600 hover:text-indigo-700"
        >
          Organizations
        </Link>
        <span className="mx-2 font-medium text-indigo-600">/</span>
        {data.name}
      </h1>

      {organization.deletedAt && (
        <TrashedMessage
          message="This organization has been deleted."
          onRestore={restore}
        />
      )}

      <div className="max-w-3xl overflow-hidden bg-white rounded shadow">
        <form onSubmit={handleSubmit}>
          <div className="grid gap-8 p-8 lg:grid-cols-2">
            <FieldGroup label="Name" name="name" error={errors.name}>
              <TextInput
                name="name"
                error={errors.name}
                value={data.name}
                onChange={(e) => setData("name", e.target.value)}
              />
            </FieldGroup>

            <FieldGroup label="Email" name="email" error={errors.email}>
              <TextInput
                name="email"
                type="email"
                error={errors.email}
                value={data.email}
                onChange={(e) => setData("email", e.target.value)}
              />
            </FieldGroup>

            <FieldGroup label="Phone" name="phone" error={errors.phone}>
              <TextInput
                name="phone"
                error={errors.phone}
                value={data.phone}
                onChange={(e) => setData("phone", e.target.value)}
              />
            </FieldGroup>

            <FieldGroup label="Address" name="address" error={errors.address}>
              <TextInput
                name="address"
                error={errors.address}
                value={data.address}
                onChange={(e) => setData("address", e.target.value)}
              />
            </FieldGroup>

            <FieldGroup label="City" name="city" error={errors.city}>
              <TextInput
                name="city"
                error={errors.city}
                value={data.city}
                onChange={(e) => setData("city", e.target.value)}
              />
            </FieldGroup>

            <FieldGroup
              label="Province/State"
              name="region"
              error={errors.region}
            >
              <TextInput
                name="region"
                error={errors.region}
                value={data.region}
                onChange={(e) => setData("region", e.target.value)}
              />
            </FieldGroup>

            <FieldGroup label="Country" name="country" error={errors.country}>
              <SelectInput
                name="country"
                error={errors.country}
                value={data.country}
                onChange={(e) => setData("country", e.target.value)}
                options={[
                  { value: "", label: "" },
                  { value: "CA", label: "Canada" },
                  { value: "US", label: "United States" },
                ]}
              />
            </FieldGroup>

            <FieldGroup
              label="Postal Code"
              name="postalCode"
              error={errors.postalCode}
            >
              <TextInput
                name="postalCode"
                error={errors.postalCode}
                value={data.postalCode}
                onChange={(e) => setData("postalCode", e.target.value)}
              />
            </FieldGroup>
          </div>

          <div className="flex items-center px-8 py-4 bg-gray-100 border-t border-gray-200">
            {!organization.deletedAt && (
              <DeleteButton onDelete={destroy}>
                Delete Organization
              </DeleteButton>
            )}
            <LoadingButton
              loading={processing}
              type="submit"
              className="ml-auto btn-indigo"
            >
              Update Organization
            </LoadingButton>
          </div>
        </form>
      </div>

      <h2 className="mt-12 mb-6 text-2xl font-bold">Contacts</h2>
      <Table
        columns={[
          { label: "Name", name: "name" },
          { label: "City", name: "city" },
          { label: "Phone", name: "phone", colSpan: 2 },
        ]}
        rows={organization.contacts}
        getRowDetailsUrl={(row) => `/contacts/${row.id}/edit`}
      />
    </div>
  );
}

Edit.layout = (page) => <MainLayout>{page}</MainLayout>;

export default Edit;
