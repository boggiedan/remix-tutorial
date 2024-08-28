import { Link } from "@remix-run/react";

const Sidebar = () => {
  return (
    <section className="flex flex-row w-full bg-white border-b">
      <div className="flex items-center justify-center h-16 border-r px-4">
        <h1 className="text-lg font-semibold">Contacts app</h1>
      </div>

      <nav className="flex-1 overflow-x-auto">
        <ul className="flex p-4 space-x-4">
          <li>
            <Link
              to="/"
              className="flex items-center p-2 text-gray-600 rounded hover:bg-gray-100 hover:text-gray-900"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v16a1 1 0 01-1 1H4a1 1 0 01-1-1V4z"
                ></path>
              </svg>
              <span className="ml-3">Home</span>
            </Link>
          </li>
          {/* Add more navigation items here if needed */}
        </ul>
      </nav>
    </section>
  );
};

export default Sidebar;
