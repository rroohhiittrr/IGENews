export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4 text-center">
      <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
        India Global News
      </h1>
      <p className="max-w-xl text-lg text-gray-600">
        Your new destination for global news. Stay tuned for updates!
      </p>
      <div className="mt-10 flex items-center justify-center gap-x-6">
        <span className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          Coming Soon
        </span>
      </div>
    </div>
  );
}
