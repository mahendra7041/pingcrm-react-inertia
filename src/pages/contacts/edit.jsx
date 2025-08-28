import { Head } from "@inertiajs/react";
import { Link, useForm, router } from "@inertiajs/react";
import MainLayout from "@/layouts/MainLayout";
import DeleteButton from "@/components/DeleteButton";
import LoadingButton from "@/components/LoadingButton";
import TextInput from "@/components/TextInput";
import SelectInput from "@/components/SelectInput";
import TrashedMessage from "@/components/TrashedMessage";
import FieldGroup from "@/components/FieldGroup";

function Edit({ contact, organizations }) {
  const { data, setData, errors, put, processing } = useForm({
    firstName: contact.firstName || "",
    lastName: contact.lastName || "",
    organizationId: contact.organizationId || "",
    email: contact.email || "",
    phone: contact.phone || "",
    address: contact.address || "",
    city: contact.city || "",
    region: contact.region || "",
    country: contact.country || "",
    postalCode: contact.postalCode || "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    put(`/contacts/${contact.id}`);
  }

  function destroy() {
    if (confirm("Are you sure you want to delete this contact?")) {
      router.delete(`/contacts/${contact.id}`);
    }
  }

  function restore() {
    if (confirm("Are you sure you want to restore this contact?")) {
      router.put(`/contacts/${contact.id}/restore`);
    }
  }

  return (
    <div>
      <Head title={`${contact.name}`} />
      <h1 className="mb-8 text-3xl font-bold">
        <Link
          href={"/contacts"}
          className="text-indigo-600 hover:text-indigo-700"
        >
          Contacts
        </Link>
        <span className="mx-2 font-medium text-indigo-600">/</span>
        {contact.name}
      </h1>
      {contact.deletedAt && (
        <TrashedMessage
          message="This contact has been deleted."
          onRestore={restore}
        />
      )}
      <div className="max-w-3xl overflow-hidden bg-white rounded shadow">
        <form onSubmit={handleSubmit}>
          <div className="grid gap-8 p-8 lg:grid-cols-2">
            <FieldGroup
              label="First Name"
              name="firstName"
              error={errors.firstName}
            >
              <TextInput
                name="first_name"
                error={errors.firstName}
                value={data.firstName}
                onChange={(e) => setData("firstName", e.target.value)}
              />
            </FieldGroup>

            <FieldGroup
              label="Last Name"
              name="lastName"
              error={errors.lastName}
            >
              <TextInput
                name="lastName"
                error={errors.lastName}
                value={data.lastName}
                onChange={(e) => setData("lastName", e.target.value)}
              />
            </FieldGroup>

            <FieldGroup
              label="Organization"
              name="organizationId"
              error={errors.organizationId}
            >
              <SelectInput
                name="organizationId"
                error={errors.organizationId}
                value={data.organizationId}
                onChange={(e) => setData("organizationId", e.target.value)}
                options={[
                  { value: "", label: "" },
                  ...organizations.map((org) => ({
                    value: String(org.id),
                    label: org.name,
                  })),
                ]}
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
            {!contact.deletedAt && (
              <DeleteButton onDelete={destroy}>Delete Contact</DeleteButton>
            )}
            <LoadingButton
              loading={processing}
              type="submit"
              className="ml-auto btn-indigo"
            >
              Update Contact
            </LoadingButton>
          </div>
        </form>
      </div>
    </div>
  );
}

Edit.layout = (page) => <MainLayout children={page} />;

export default Edit;
