import { Form, Link, useForm } from "@inertiajs/react";
import MainLayout from "@/layouts/MainLayout";
import LoadingButton from "@/components/LoadingButton";
import TextInput from "@/components/TextInput";
import SelectInput from "@/components/SelectInput";
import FieldGroup from "@/components/FieldGroup";

function Create() {
  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">
        <Link
          href={"/organizations"}
          className="text-indigo-600 hover:text-indigo-700"
        >
          Organizations
        </Link>
        <span className="font-medium text-indigo-600"> /</span> Create
      </h1>

      <div className="max-w-3xl overflow-hidden bg-white rounded shadow">
        <Form action="/organizations" method="post">
          {({ errors, processing }) => (
            <>
              <div className="grid gap-8 p-8 lg:grid-cols-2">
                <FieldGroup label="Name" name="name" error={errors.name}>
                  <TextInput name="name" error={errors.name} />
                </FieldGroup>
                <FieldGroup label="Email" name="email" error={errors.email}>
                  <TextInput name="email" type="email" error={errors.email} />
                </FieldGroup>
                <FieldGroup label="Phone" name="phone" error={errors.phone}>
                  <TextInput name="phone" error={errors.phone} />
                </FieldGroup>
                <FieldGroup
                  label="Address"
                  name="address"
                  error={errors.address}
                >
                  <TextInput name="address" error={errors.address} />
                </FieldGroup>
                <FieldGroup label="City" name="city" error={errors.city}>
                  <TextInput name="city" error={errors.city} />
                </FieldGroup>
                <FieldGroup
                  label="Province/State"
                  name="region"
                  error={errors.region}
                >
                  <TextInput name="region" error={errors.region} />
                </FieldGroup>
                <FieldGroup
                  label="Country"
                  name="country"
                  error={errors.country}
                >
                  <SelectInput
                    name="country"
                    error={errors.country}
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
                  <TextInput name="postalCode" error={errors.postalCode} />
                </FieldGroup>
              </div>
              <div className="flex items-center justify-end px-8 py-4 bg-gray-100 border-t border-gray-200">
                <LoadingButton
                  loading={processing}
                  type="submit"
                  className="btn-indigo"
                >
                  Create Organization
                </LoadingButton>
              </div>
            </>
          )}
        </Form>
      </div>
    </div>
  );
}

Create.layout = (page) => (
  <MainLayout title="Create Organization">{page}</MainLayout>
);

export default Create;
