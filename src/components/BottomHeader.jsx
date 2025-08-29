import { useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import { ChevronDown } from "lucide-react";

export default function BottomHeader() {
  const auth = usePage().props.auth;
  const [menuOpened, setMenuOpened] = useState(false);

  return (
    <div className="md:text-md flex items-center justify-between p-4 w-full text-sm bg-white border-b md:px-12 md:py-0">
      <div className="mt-1 mr-4">{auth.user.account.name}</div>
      <div className="relative">
        <div
          className="flex items-center cursor-pointer select-none group"
          onClick={() => setMenuOpened(true)}
        >
          <div className="mr-1 text-gray-800 whitespace-nowrap group-hover:text-indigo-600 focus:text-indigo-600">
            <span>{auth.user.firstName}</span>
            <span className="hidden ml-1 md:inline">{auth.user.lastName}</span>
          </div>
          <ChevronDown
            size={20}
            className="text-gray-800 group-hover:text-indigo-600"
          />
        </div>

        <div className={menuOpened ? "" : "hidden"}>
          <div className="absolute top-0 right-0 left-auto z-20 py-2 mt-8 text-sm whitespace-nowrap bg-white rounded shadow-xl">
            <Link
              href={`/users/${auth.user.id}/edit`}
              className="block px-6 py-2 hover:bg-indigo-600 hover:text-white"
              onClick={() => setMenuOpened(false)}
            >
              My Profile
            </Link>
            <Link
              href={"/users"}
              className="block px-6 py-2 hover:bg-indigo-600 hover:text-white"
              onClick={() => setMenuOpened(false)}
            >
              Manage Users
            </Link>
            <Link
              as="button"
              href={"/logout"}
              method="delete"
              className="block w-full px-6 py-2 text-left focus:outline-none hover:bg-indigo-600 hover:text-white"
            >
              Logout
            </Link>
          </div>

          <div
            onClick={() => setMenuOpened(false)}
            className="fixed inset-0 z-10 bg-black opacity-25"
          />
        </div>
      </div>
    </div>
  );
}
