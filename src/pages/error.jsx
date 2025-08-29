export default function ErrorPage({ statusCode, message }) {
  return (
    <div className="antialiased relative flex items-top justify-center min-h-screen bg-gray-800 text-gray-200 sm:items-center sm:pt-0">
      <div className="max-w-xl mx-auto sm:px-6 lg:px-8">
        <div className="flex items-center pt-8 sm:justify-start sm:pt-0">
          <div className="px-4 text-lg  border-r border-gray-400 tracking-wider">
            {statusCode}
          </div>

          <div className="ml-4 text-lg  uppercase tracking-wider">
            {message}
          </div>
        </div>
      </div>
    </div>
  );
}
