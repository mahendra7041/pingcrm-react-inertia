import { Head, Link, router, Form } from "@inertiajs/react";
import MainLayout from "@/layouts/MainLayout";
import DeleteButton from "@/components/DeleteButton";
import LoadingButton from "@/components/LoadingButton";
import TextInput from "@/components/TextInput";
import SelectInput from "@/components/SelectInput";
import TrashedMessage from "@/components/TrashedMessage";
import Table from "@/components/Table";
import FieldGroup from "@/components/FieldGroup";

function Edit({ organization }) {
  function destroy() {
    if (confirm("Are you sure you want to delete this organization?")) {
      router.delete(`/organizations/${organization.id}`);
    }
  }

  function restore() {
    if (confirm("Are you sure you want to restore this organization?")) {
      router.put(`/organizations/${organization.id}/restore`);
    }
  }

  return (
    <div>
      <Head title={organization.name} />
      <h1 className="mb-8 text-3xl font-bold">
        <Link
          href={"/organizations"}
          className="text-indigo-600 hover:text-indigo-700"
        >
          Organizations
        </Link>
        <span className="mx-2 font-medium text-indigo-600">/</span>
        {organization.name}
      </h1>
      {organization.deletedAt && (
        <TrashedMessage
          message="This organization has been deleted."
          onRestore={restore}
        />
      )}
      <div className="max-w-3xl overflow-hidden bg-white rounded shadow">
        <Form action={`/organizations/${organization.id}`} method="put">
          {({ errors, processing }) => (
            <>
              <div className="grid gap-8 p-8 lg:grid-cols-2">
                <FieldGroup label="Name" name="name" error={errors.name}>
                  <TextInput
                    name="name"
                    error={errors.name}
                    defaultValue={organization.name}
                  />
                </FieldGroup>
                <FieldGroup label="Email" name="email" error={errors.email}>
                  <TextInput
                    name="email"
                    type="email"
                    error={errors.email}
                    defaultValue={organization.email}
                  />
                </FieldGroup>
                <FieldGroup label="Phone" name="phone" error={errors.phone}>
                  <TextInput
                    name="phone"
                    error={errors.phone}
                    defaultValue={organization.phone}
                  />
                </FieldGroup>
                <FieldGroup
                  label="Address"
                  name="address"
                  error={errors.address}
                >
                  <TextInput
                    name="address"
                    error={errors.address}
                    defaultValue={organization.address}
                  />
                </FieldGroup>
                <FieldGroup label="City" name="city" error={errors.city}>
                  <TextInput
                    name="city"
                    error={errors.city}
                    defaultValue={organization.city}
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
                    defaultValue={organization.region}
                  />
                </FieldGroup>
                <FieldGroup
                  label="Country"
                  name="country"
                  error={errors.country}
                >
                  <SelectInput
                    name="country"
                    error={errors.country}
                    defaultValue={organization.country}
                    options={[
                      { value: "", label: "" },
                      { value: "IN", label: "India" },
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
                    defaultValue={organization.postalCode}
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
            </>
          )}
        </Form>
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
