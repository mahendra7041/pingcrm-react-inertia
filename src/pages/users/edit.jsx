import { Link, useForm, router } from "@inertiajs/react";
import MainLayout from "@/layouts/MainLayout";
import DeleteButton from "@/components/DeleteButton";
import LoadingButton from "@/components/LoadingButton";
import TextInput from "@/components/TextInput";
import SelectInput from "@/components/SelectInput";
import FileInput from "@/components/FileInput";
import TrashedMessage from "@/components/TrashedMessage";
import FieldGroup from "@/components/FieldGroup";

function Edit({ user }) {
  const { data, setData, errors, put, processing } = useForm({
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    email: user.email || "",
    password: "",
    owner: user.owner ? "1" : "0",
    photo: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    put(`/users/${user.id}`);
  }

  function destroy() {
    if (confirm("Are you sure you want to delete this user?")) {
      router.delete(`/users/${user.id}`);
    }
  }

  function restore() {
    if (confirm("Are you sure you want to restore this user?")) {
      router.put(`/users/${user.id}/restore`);
    }
  }

  return (
    <div>
      <div className="flex justify-start max-w-lg mb-8">
        <h1 className="text-3xl font-bold">
          <Link
            href={`/users`}
            className="text-indigo-600 hover:text-indigo-700"
          >
            Users
          </Link>
          <span className="mx-2 font-medium text-indigo-600">/</span>
          {data.firstName} {data.lastName}
        </h1>
        {user.photo && (
          <img className="block w-8 h-8 ml-4 rounded-full" src={user.photo} />
        )}
      </div>

      {user.deletedAt && (
        <TrashedMessage
          message="This user has been deleted."
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
                  { value: "1", label: "Yes" },
                  { value: "0", label: "No" },
                ]}
              />
            </FieldGroup>

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

          <div className="flex items-center px-8 py-4 bg-gray-100 border-t border-gray-200">
            {!user.deletedAt && (
              <DeleteButton onDelete={destroy}>Delete User</DeleteButton>
            )}
            <LoadingButton
              loading={processing}
              type="submit"
              className="ml-auto btn-indigo"
            >
              Update User
            </LoadingButton>
          </div>
        </form>
      </div>
    </div>
  );
}

Edit.layout = (page) => <MainLayout>{page}</MainLayout>;

export default Edit;
