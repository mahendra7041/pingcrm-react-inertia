import { Link, useForm, router, Form } from "@inertiajs/react";
import MainLayout from "@/layouts/MainLayout";
import DeleteButton from "@/components/DeleteButton";
import LoadingButton from "@/components/LoadingButton";
import TextInput from "@/components/TextInput";
import SelectInput from "@/components/SelectInput";
import FileInput from "@/components/FileInput";
import TrashedMessage from "@/components/TrashedMessage";
import FieldGroup from "@/components/FieldGroup";
import Alert from "@/components/Alert";

function Edit({ user }) {
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
          {user.firstName} {user.lastName}
        </h1>
        {user.photo && (
          <img className="block w-8 h-8 ml-4 rounded-full" src={user.photo} />
        )}
      </div>
      <Alert
        variant="info"
        message="Photo upload is currently disabled due to serverless deployment limits
      (they don’t allow file uploads). But don’t worry, the feature itself
      works perfectly. Trust me, it’s not broken 😅"
      />
      {user.deletedAt && (
        <TrashedMessage
          message="This user has been deleted."
          onRestore={restore}
        />
      )}

      <div className="max-w-3xl overflow-hidden bg-white rounded shadow">
        <Form action={`/users/${user.id}`} method="put">
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
                    defaultValue={user.firstName}
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
                    defaultValue={user.lastName}
                  />
                </FieldGroup>
                <FieldGroup label="Email" name="email" error={errors.email}>
                  <TextInput
                    name="email"
                    type="email"
                    error={errors.email}
                    defaultValue={user.email}
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
                    defaultValue={user.password}
                  />
                </FieldGroup>
                <FieldGroup label="Owner" name="owner" error={errors.owner}>
                  <SelectInput
                    name="owner"
                    error={errors.owner}
                    defaultValue={user.owner}
                    options={[
                      { value: "1", label: "Yes" },
                      { value: "0", label: "No" },
                    ]}
                  />
                </FieldGroup>
                <div className="pointer-events-none">
                  <FieldGroup label="Photo" name="photo" error={errors.photo}>
                    <FileInput
                      name="photo"
                      accept="image/*"
                      error={errors.photo}
                    />
                  </FieldGroup>
                </div>
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
            </>
          )}
        </Form>
      </div>
    </div>
  );
}

Edit.layout = (page) => <MainLayout>{page}</MainLayout>;

export default Edit;
