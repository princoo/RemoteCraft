import Link from "next/link";
import Button from "./Button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-black mb-3">
          Page not found
        </h1>
        <p className="text-gray">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have
          been moved or doesn&apos;t exist.
        </p>

        {/* actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="text-blue hover:underline">
            <Button>Back to Home</Button>
          </Link>
          <Link href="/jobs" className="text-blue hover:underline">
            <Button>Browse Jobs</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
