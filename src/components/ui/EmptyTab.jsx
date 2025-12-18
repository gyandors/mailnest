export default function EmptyTab({ tab }) {
  return (
    <div className="h-96 flex justify-center items-center">
      <h1 className="text-2xl font-medium text-slate-600">
        Your {tab} tab is empty.
      </h1>
    </div>
  );
}
