export default function Home() {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-900 to-slate-800 px-4">
        <h1 className="text-3xl font-bold"> Welcome to AgriBridge</h1>
        <a href="/login" className="text-white p-3 bg-green-600 font-medium ml-5 rounded-2xl">
          Login here
        </a>
      </div>
    </>
  );
}
