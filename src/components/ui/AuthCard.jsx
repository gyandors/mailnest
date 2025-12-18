export default function AuthCard({ children }) {
  return (
    <div className="bg-blue-50/50 flex items-center justify-center h-screen">
      <div className="rounded-3xl bg-white w-full sm:w-[50rem] mx-2 px-5 sm:px-10 py-10 flex flex-col sm:flex-row gap-8 justify-between drop-shadow-md">
        {children}
      </div>
    </div>
  );
}
