import { Link, useForm } from "@inertiajs/react";
import MainLayout from "@/layouts/MainLayout";
import LoadingButton from "@/components/LoadingButton";
import TextInput from "@/components/TextInput";
import SelectInput from "@/components/SelectInput";
import FieldGroup from "@/components/FieldGroup";

function Create({ organizations }) {
  const { data, setData, errors, post, processing } = useForm({
    firstName: "",
    lastName: "",
    organizationId: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    region: "",
    country: "",
    postalCode: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    post(`/contacts`);
  }

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">
        <Link
          href={"/contacts"}
          className="text-indigo-600 hover:text-indigo-700"
        >
          Contacts
        </Link>
        <span className="font-medium text-indigo-600"> /</span> Create
      </h1>
      <div className="max-w-3xl overflow-hidden bg-white rounded shadow">
        <form onSubmit={handleSubmit}>
          <div className="grid gap-8 p-8 lg:grid-cols-2">
            <FieldGroup
              label="First Name"
              name="firstName"
              error={errors.firstName}
            >
              <TextInput
                name="firstName"
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
              name="organizationJd"
              error={errors.organizationId}
            >
              <SelectInput
                name="organizationId"
                error={errors.organizationId}
                value={data.organizationId}
                onChange={(e) => setData("organizationId", e.target.value)}
                options={[
                  { value: "", label: "" },
                  ...organizations?.map(({ id, name }) => ({
                    value: id,
                    label: name,
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

            <FieldGroup label="Region" name="region" error={errors.region}>
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
          <div className="flex items-center justify-end px-8 py-4 bg-gray-100 border-t border-gray-200">
            <LoadingButton
              loading={processing}
              type="submit"
              className="btn-indigo"
            >
              Create Contact
            </LoadingButton>
          </div>
        </form>
      </div>
    </div>
  );
}

Create.layout = (page) => (
  <MainLayout title="Create Contact">{page}</MainLayout>
);

export default Create;
