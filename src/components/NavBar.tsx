import Link from "next/link";
import { Search, Bookmark, Settings } from "lucide-react";
import Input from "./Input";

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo and Navigation */}
        <div className="flex items-center space-x-8">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-gray-800 rounded-sm flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-sm"></div>
            </div>
            <span className="text-xl font-semibold text-gray-900">
              RemoteCraft
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className="text-gray-900 font-medium hover:text-gray-700"
            >
              Home
            </Link>
            <Link href="/jobs" className="text-gray-600 hover:text-gray-900">
              Jobs
            </Link>
            <Link href="/" className="text-gray-600 hover:text-gray-900">
              Post a Job
            </Link>
            <Link href="/" className="text-gray-600 hover:text-gray-900">
              Companies
            </Link>
          </div>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray w-4 h-4" />
            <Input
              className={
                "w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent"
              }
            />
          </div>
        </div>

        {/* Right Icons */}
        <div className="flex items-center space-x-3">
          <button className="p-2 text-gray-600 hover:text-gray-900">
            <Bookmark className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-600 hover:text-gray-900">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>
    </nav>
  );
}
