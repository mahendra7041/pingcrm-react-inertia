import { Head } from "@inertiajs/react";

export default function ErrorPage({ status }) {
  const messages = {
    403: {
      title: "403: Forbidden",
      description: "Sorry, you are forbidden from accessing this page.",
    },
    404: {
      title: "404: Page Not Found",
      description: "Sorry, the page you are looking for could not be found.",
    },
    500: {
      title: "500: Server Error",
      description: "Whoops, something went wrong on our servers.",
    },
    503: {
      title: "503: Service Unavailable",
      description:
        "Sorry, we are doing some maintenance. Please check back soon.",
    },
  };

  const { title, description } = messages[status] || {
    title: `${status}: Error`,
    description: "An unexpected error occurred.",
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-5 text-indigo-100 bg-indigo-800">
      <Head title={title} />
      <div className="w-full max-w-md">
        <h1 className="text-3xl">{title}</h1>
        <p className="mt-3 text-lg leading-tight">{description}</p>
      </div>
    </div>
  );
}
