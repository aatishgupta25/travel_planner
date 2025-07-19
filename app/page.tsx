import Image from "next/image";

export const metadata = {
  title: "Travel Planner",
};

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
      <div className="bg-white shadow-xl rounded-xl p-8 text-center">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">
          Sign in to continue!
        </h1>
        <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          Sign in with GitHub
        </button>
      </div>
    </div>
  );
}
