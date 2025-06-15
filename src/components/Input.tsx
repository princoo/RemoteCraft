export default function Input({className}: {className?: string | null}) {
  return (
    <input
      type="text"
      placeholder="Search for jobs"
      className={`${className}`}
    />
  );
}
