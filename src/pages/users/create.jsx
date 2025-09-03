import { Link, useForm } from "@inertiajs/react";
import MainLayout from "@/layouts/MainLayout";
import LoadingButton from "@/components/LoadingButton";
import TextInput from "@/components/TextInput";
import SelectInput from "@/components/SelectInput";
import FileInput from "@/components/FileInput";
import FieldGroup from "@/components/FieldGroup";
import Alert from "@/components/Alert";

function Create() {
  const { data, setData, errors, post, processing } = useForm({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    owner: 0,
    photo: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    post("/users");
  }

  return (
    <div>
      <div>
        <h1 className="mb-8 text-3xl font-bold">
          <Link
            href={"/users"}
            className="text-indigo-600 hover:text-indigo-700"
          >
            Users
          </Link>
          <span className="font-medium text-indigo-600"> /</span> Create
        </h1>
      </div>
      <Alert
        variant="info"
        message="Photo upload is currently disabled due to serverless deployment limits
      (they don’t allow file uploads). But don’t worry, the feature itself
      works perfectly. Trust me, it’s not broken 😅"
      />
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

            <FieldGroup label="Email" name="email" error={errors.email}>
              <TextInput
                name="email"
                type="email"
                error={errors.email}
                value={data.email}
                onChange={(e) => setData("email", e.target.value)}
              />
            </FieldGroup>

            <FieldGroup
              label="Password"
              name="password"
              error={errors.password}
            >
              <TextInput
                name="password"
                type="password"
                error={errors.password}
                value={data.password}
                onChange={(e) => setData("password", e.target.value)}
              />
            </FieldGroup>

            <FieldGroup label="Owner" name="owner" error={errors.owner}>
              <SelectInput
                name="owner"
                error={errors.owner}
                value={data.owner}
                onChange={(e) => setData("owner", e.target.value)}
                options={[
                  { value: 1, label: "Yes" },
                  { value: 0, label: "No" },
                ]}
              />
            </FieldGroup>

            <div className="pointer-events-none">
              <FieldGroup label="Photo" name="photo" error={errors.photo}>
                <FileInput
                  name="photo"
                  accept="image/*"
                  error={errors.photo}
                  value={data.photo}
                  onChange={(photo) => setData("photo", photo)}
                />
              </FieldGroup>
            </div>
          </div>

          <div className="flex items-center justify-end px-8 py-4 bg-gray-100 border-t border-gray-200">
            <LoadingButton
              loading={processing}
              type="submit"
              className="btn-indigo"
            >
              Create User
            </LoadingButton>
          </div>
        </form>
      </div>
    </div>
  );
}

Create.layout = (page) => <MainLayout title="Create User">{page}</MainLayout>;

export default Create;
