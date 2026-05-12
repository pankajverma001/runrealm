export default function Dashboard() {
  return (
    <main className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold text-green-400">Dashboard Test</h1>

      <p className="mt-4">
        Mapbox token:
        {process.env.NEXT_PUBLIC_MAPBOX_TOKEN ? " FOUND" : " NOT FOUND"}
      </p>
    </main>
  );
}