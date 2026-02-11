export default function Home() {
  return (
    <main className="min-h-screen p-8 bg-slate-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-900">My Scheduler</h1>
        <p className="text-slate-600 mt-2">Track tasks, events, and project progress.</p>
        
        {/* We will build the Progress Bar here next! */}
        <div className="mt-8 p-6 bg-white rounded-xl shadow-sm border border-slate-200">
          <p className="text-sm font-medium text-slate-500">Project Progress</p>
          <div className="w-full bg-slate-200 h-4 rounded-full mt-2">
            <div className="bg-blue-600 h-4 rounded-full w-[45%]"></div>
          </div>
        </div>
      </div>
    </main>
  );
}
