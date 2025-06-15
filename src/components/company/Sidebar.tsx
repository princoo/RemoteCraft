export default function Sidebar() {
  const jobCategories = [
    { name: "All jobs", active: true },
    { name: "Design", active: false },
    { name: "Engineering", active: false },
    { name: "Product", active: false },
    { name: "Marketing", active: false },
  ];
  return (
    <aside className="w-64 flex-shrink-0">
      <div className="p-4 mb-6">
        <nav className="space-y-2">
          {jobCategories.map((category, index) => (
            <button
              key={index}
              className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                category.active
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              {category.name}
            </button>
          ))}
        </nav>
      </div>

      <button className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-lg font-semibold transition-colors">
        Post a job
      </button>
    </aside>
  );
}
