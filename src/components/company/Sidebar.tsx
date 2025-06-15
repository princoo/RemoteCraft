import Button from "../Button";

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
              className={`w-full cursor-pointer text-left px-3 py-2 rounded-md text-sm font-medium ${
                category.active
                  ? "bg-gray/30"
                  : "text-black/50 hover:text-black/80 hover:bg-gray/10"
              }`}
            >
              {category.name}
            </button>
          ))}
        </nav>
      </div>

      <Button variant="primary" size="large" className="w-full">
        Post a job
      </Button>
    </aside>
  );
}
