export default function Card({ children }) {
  return (
    <div className="w-full max-w-5xl bg-white rounded-lg shadow-md">
      {children}
    </div>
  );
}
