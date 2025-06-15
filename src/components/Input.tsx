export default function Input({className}: {className?: string | null}) {
  return (
    <input
      type="text"
      placeholder="Search for jobs"
      className={`w-full pl-12 pr-4 py-4 bg-gray text-lg border border-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent${className}`}
    />
  );
}
