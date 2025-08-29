import { useState, useEffect } from "react";
import { router, usePage } from "@inertiajs/react";
import usePrevious from "@/hooks/usePrevious";

export default function FilterBar({ filters = {} }) {
  const [opened, setOpened] = useState(false);
  const page = usePage();
  const url = page.url.split("?")[0];

  const [values, setValues] = useState({
    role: filters.role || "",
    search: filters.search || "",
    trashed: filters.trashed || "",
  });

  const prevValues = usePrevious(values);

  function reset() {
    setValues({
      role: "",
      search: "",
      trashed: "",
    });
    router.get(
      url,
      {},
      {
        replace: true,
        preserveState: true,
      }
    );
  }

  useEffect(() => {
    if (prevValues) {
      const cleaned = Object.fromEntries(
        Object.entries(values).filter(([_, value]) => Boolean(value))
      );
      router.get(url, cleaned, {
        replace: true,
        preserveState: true,
      });
    }
  }, [values]);

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;

    setValues((values) => ({
      ...values,
      [name]: value,
    }));

    if (opened) setOpened(false);
  }

  return (
    <div className="flex items-center mr-4 w-full max-w-md">
      <div className="relative flex w-full bg-white rounded shadow">
        <button
          type="button"
          onClick={() => setOpened(!opened)}
          className="focus:z-10 px-4 hover:bg-gray-100 border-r focus:border-white rounded-l focus:ring md:px-6"
        >
          <div className="flex items-baseline">
            <span className="hidden text-gray-700 md:inline">Filter</span>
            <svg
              className="w-2 h-2 fill-gray-700 md:ml-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 961.243 599.998"
            >
              <path d="M239.998 239.999L0 0h961.243L721.246 240c-131.999 132-240.28 240-240.624 239.999-.345-.001-108.625-108.001-240.624-240z" />
            </svg>
          </div>
        </button>
        {opened && (
          <div className="absolute top-full left-0 w-64 mt-2 z-30">
            <div
              className="fixed inset-0 bg-black opacity-25 z-20"
              onClick={() => setOpened(false)}
            />
            <div className="relative z-30 bg-white rounded shadow-lg px-4 py-6 space-y-4">
              {filters.hasOwnProperty("role") && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Role
                  </label>
                  <select
                    name="role"
                    value={values.role}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                  >
                    <option value="">Select Role</option>
                    <option value="user">User</option>
                    <option value="owner">Owner</option>
                  </select>
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Trashed
                </label>
                <select
                  name="trashed"
                  value={values.trashed}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="">Select Option</option>
                  <option value="with">With Trashed</option>
                  <option value="only">Only Trashed</option>
                </select>
              </div>
            </div>
          </div>
        )}
        <input
          className="relative px-6 py-3 w-full rounded-r focus:shadow-outline"
          autoComplete="off"
          type="text"
          name="search"
          placeholder="Search…"
          value={values.search}
          onChange={handleChange}
        />
      </div>

      <button
        className="ml-3 text-gray-500 hover:text-gray-700 focus:text-indigo-500 text-sm"
        type="button"
        onClick={reset}
      >
        Reset
      </button>
    </div>
  );
}
