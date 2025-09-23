export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">403 - Unauthorized</h1>
        <p className="text-lg">
          You do not have permission to access this page.
        </p>
        <a href="/login" className="text-blue-600 hover:underline">
          Go to Login
        </a>
      </div>
    </div>
  );
}
