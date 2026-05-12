export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-8">
      <nav className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-green-400">RunRealm</h2>
        <button className="rounded-full border border-green-500 px-4 py-2 text-sm">
          Login
        </button>
      </nav>

      <section className="mt-24 text-center">
        <p className="mb-4 text-sm uppercase tracking-widest text-green-400">
          Real World Running Game
        </p>

        <h1 className="text-5xl font-extrabold">
          Run. Claim. Conquer.
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-gray-400">
          Turn your daily run into a territory battle. Track your route, claim areas,
          compete with players, and discover local businesses.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <button className="rounded-xl bg-green-500 px-6 py-3 font-bold text-black">
            Start Running
          </button>

          <button className="rounded-xl border border-gray-700 px-6 py-3 font-bold">
            View Map
          </button>
        </div>
      </section>
    </main>
  );
}