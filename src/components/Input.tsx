export default function Input({className}: {className?: string}) {
  return (
    <input
      type="text"
      placeholder="Search for jobs"
      className={`${className}`}
    />
  );
}
