"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
export default function Home() {
  const [isAdding, setIsAdding] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");

  const addTask = async (e: React.FormEvent) => {
    e.preventDefault(); 
    if (!taskTitle) return;

    // This sends the data to your Supabase table
    setIsAdding(true);
    const { error } = await supabase.from("tasks").insert([{ title: taskTitle, project_name: "General" }]);
    setIsAdding(false);

    if (error) {
      console.error("Error adding task:", error.message);
    } else {
      setTaskTitle(""); // Clears the box
      alert("Task added successfully!");
    }
  };
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
  <button disabled={isAdding} className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition">
  {isAdding ? "Saving..." : "Add Task"}
  </button>
</form>
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
