export const Button = ({ children }: { children: React.ReactNode }) => {
  return (
    <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
      {children}
    </button>
  );
};