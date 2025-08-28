import { Link, useForm } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import LoadingButton from "@/Components/LoadingButton";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";
import FieldGroup from "@/Components/FieldGroup";

function Create() {
  const { data, setData, errors, post, processing } = useForm({
    name: "",
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
    post("/organizations");
  }

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

          <div className="flex items-center justify-end px-8 py-4 bg-gray-100 border-t border-gray-200">
            <LoadingButton
              loading={processing}
              type="submit"
              className="btn-indigo"
            >
              Create Organization
            </LoadingButton>
          </div>
        </form>
      </div>
    </div>
  );
}

Create.layout = (page) => (
  <MainLayout title="Create Organization">{page}</MainLayout>
);

export default Create;
