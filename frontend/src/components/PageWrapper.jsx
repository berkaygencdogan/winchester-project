export default function PageWrapper({ children }) {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-300">
      {children}
    </div>
  );
}
