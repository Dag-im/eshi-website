export default function AdminHomePage() {
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Welcome back! Here’s a quick overview of your platform.
        </p>
      </header>
      <section className="bg-white rounded-xl shadow p-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Quick Actions
        </h2>
        <div className="flex flex-wrap gap-4">
          <button className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition">
            Add User
          </button>
          <button className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 transition">
            Generate Report
          </button>
          <button className="bg-yellow-500 text-white px-5 py-2 rounded hover:bg-yellow-600 transition">
            Manage Settings
          </button>
        </div>
      </section>
    </main>
  );
}
