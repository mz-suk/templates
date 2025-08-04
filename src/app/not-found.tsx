import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h2 className="mb-4 text-2xl font-bold">404 - Page Not Found</h2>
      <p className="mb-4 text-gray-600">The page you are looking for does not exist.</p>
      <Link href="/" className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
        Return Home
      </Link>
    </div>
  );
}
