import { Link, router, Form, Head } from "@inertiajs/react";
import MainLayout from "@/layouts/MainLayout";
import DeleteButton from "@/components/DeleteButton";
import LoadingButton from "@/components/LoadingButton";
import TextInput from "@/components/TextInput";
import SelectInput from "@/components/SelectInput";
import TrashedMessage from "@/components/TrashedMessage";
import FieldGroup from "@/components/FieldGroup";

function Edit({ contact, organizations }) {
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
        <Form action={`/contacts/${contact.id}`} method="put">
          {({ errors, processing }) => (
            <>
              <div className="grid gap-8 p-8 lg:grid-cols-2">
                <FieldGroup
                  label="First Name"
                  name="firstName"
                  error={errors.firstName}
                >
                  <TextInput
                    name="firstName"
                    error={errors.firstName}
                    defaultValue={contact.firstName}
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
                    defaultValue={contact.lastName}
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
                    defaultValue={contact.organizationId}
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
                    defaultValue={contact.email}
                  />
                </FieldGroup>
                <FieldGroup label="Phone" name="phone" error={errors.phone}>
                  <TextInput
                    name="phone"
                    error={errors.phone}
                    defaultValue={contact.phone}
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
                    defaultValue={contact.address}
                  />
                </FieldGroup>
                <FieldGroup label="City" name="city" error={errors.city}>
                  <TextInput
                    name="city"
                    error={errors.city}
                    defaultValue={contact.city}
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
                    defaultValue={contact.region}
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
                    defaultValue={contact.country}
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
                    defaultValue={contact.postalCode}
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
            </>
          )}
        </Form>
      </div>
    </div>
  );
}

Edit.layout = (page) => <MainLayout children={page} />;

export default Edit;
