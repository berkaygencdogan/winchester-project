export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center py-10">
      <div
        className="
          w-10 h-10 rounded-full animate-spin
          border-4 border-orange-500 border-t-transparent
        "
      ></div>
    </div>
  );
}
