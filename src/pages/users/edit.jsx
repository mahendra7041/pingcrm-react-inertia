import { Link, useForm, router } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import DeleteButton from "@/Components/DeleteButton";
import LoadingButton from "@/Components/LoadingButton";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";
import FileInput from "@/Components/FileInput";
import TrashedMessage from "@/Components/TrashedMessage";
import FieldGroup from "@/Components/FieldGroup";

function Edit({ user }) {
  const { data, setData, errors, post, processing } = useForm({
    first_name: user.first_name || "",
    last_name: user.last_name || "",
    email: user.email || "",
    password: user.password || "",
    owner: user.owner ? "1" : "0",
    photo: "",
    _method: "put", // Simulate PUT request with POST
  });

  function handleSubmit(e) {
    e.preventDefault();
    post(route("users.update", user.id));
  }

  function destroy() {
    if (confirm("Are you sure you want to delete this user?")) {
      router.delete(route("users.destroy", user.id));
    }
  }

  function restore() {
    if (confirm("Are you sure you want to restore this user?")) {
      router.put(route("users.restore", user.id));
    }
  }

  return (
    <div>
      <div className="flex justify-start max-w-lg mb-8">
        <h1 className="text-3xl font-bold">
          <Link
            href={route("users")}
            className="text-indigo-600 hover:text-indigo-700"
          >
            Users
          </Link>
          <span className="mx-2 font-medium text-indigo-600">/</span>
          {data.first_name} {data.last_name}
        </h1>
        {user.photo && (
          <img className="block w-8 h-8 ml-4 rounded-full" src={user.photo} />
        )}
      </div>

      {user.deleted_at && (
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
              name="first_name"
              error={errors.first_name}
            >
              <TextInput
                name="first_name"
                error={errors.first_name}
                value={data.first_name}
                onChange={(e) => setData("first_name", e.target.value)}
              />
            </FieldGroup>

            <FieldGroup
              label="Last Name"
              name="last_name"
              error={errors.last_name}
            >
              <TextInput
                name="last_name"
                error={errors.last_name}
                value={data.last_name}
                onChange={(e) => setData("last_name", e.target.value)}
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
            {!user.deleted_at && (
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
