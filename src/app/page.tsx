"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function Home() {
  const [taskTitle, setTaskTitle] = useState("");
  const [tasks, setTasks] = useState<any[]>([]);
  // FIX 1: Add the isAdding state
  const [isAdding, setIsAdding] = useState(false);

  const fetchTasks = async () => {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) console.error("Error fetching tasks:", error.message);
    else setTasks(data || []);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (e: React.FormEvent) => {
    e.preventDefault(); 
    if (!taskTitle) return;

    setIsAdding(true);
    // This sends the data to your Supabase table
    const { error } = await supabase
      .from("tasks")
      .insert([{ title: taskTitle, project_name: "General" }]);
    setIsAdding(false);

    // FIX 2 & 3: Consolidated the error handling and fetch
    if (error) {
      console.error("Error adding task:", error.message);
      alert("Error adding task. Check console.");
    } else {
      setTaskTitle(""); 
      fetchTasks(); // Refreshes the list instantly
    }
  };

  const completedCount = tasks.filter(t => t.is_completed).length;
  const totalCount = tasks.length;
  const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <main className="min-h-screen p-8 bg-slate-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-900">My Scheduler</h1>
        <p className="text-slate-600 mt-2">Track tasks, events, and project progress.</p>
        
        <form onSubmit={addTask} className="mt-6 flex gap-2">
          <input
            type="text"
            placeholder="What needs to be done?"
            className="flex-1 p-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
          />
          <button 
            disabled={isAdding} 
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition disabled:bg-slate-400"
          >
            {isAdding ? "Saving..." : "Add Task"}
          </button>
        </form>

        <div className="mt-8 space-y-4">
          <h2 className="text-xl font-semibold text-slate-800">Your Tasks</h2>
          {tasks.length === 0 ? (
            <p className="text-slate-500 italic">No tasks yet. Add one above!</p>
          ) : (
            tasks.map((task) => (
              <div 
                key={task.id} 
                className="flex items-center p-4 bg-white rounded-lg border border-slate-200 shadow-sm"
              >
                <input 
                  type="checkbox" 
                  checked={task.is_completed} 
                  className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  readOnly 
                />
                <span className={`ml-3 ${task.is_completed ? 'line-through text-slate-400' : 'text-slate-700'}`}>
                  {task.title}
                </span>
              </div>
            ))
          )}
        </div>

        <div className="mt-8 p-6 bg-white rounded-xl shadow-sm border border-slate-200">
          <p className="text-sm font-medium text-slate-500">Project Progress</p>
          <div className="w-full bg-slate-200 h-4 rounded-full mt-2">
            <div 
              className="bg-blue-600 h-4 rounded-full transition-all duration-500" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          {/* Pro tip: add a text label for the percentage */}
          <p className="text-right text-xs text-slate-500 mt-1">{Math.round(progressPercentage)}% complete</p>
        </div>
      </div>
    </main>
  );
}