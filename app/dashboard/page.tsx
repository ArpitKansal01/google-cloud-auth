"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import {
  Bell,
  Search,
  UserCircle,
  LogOut,
  Settings,
  Plus,
  FileText,
} from "lucide-react";
interface User {
  name: string;
  email: string;
  picture: string;
}
export default function Dashboard() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  const stats = [
    {
      title: "Total Projects",
      value: "12",
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Tasks",
      value: "48",
      color: "from-violet-500 to-indigo-500",
    },
    {
      title: "Completed",
      value: "35",
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Pending",
      value: "13",
      color: "from-orange-500 to-red-500",
    },
  ];
  const logout = () => {
    localStorage.removeItem("user");

    router.push("/login");
  };
  const activities = [
    "Created a new project",
    "Logged in with Google",
    "Updated profile",
    "Completed Task #23",
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Navbar */}

      <nav className="border-b border-zinc-800 bg-zinc-900/60 backdrop-blur">
        <div className="max-w-7xl mx-auto h-16 flex items-center justify-between px-6">
          <h1 className="text-2xl font-bold">MyDashboard</h1>

          <div className="flex items-center gap-4">
            <button className="p-2 rounded-lg hover:bg-zinc-800">
              <Search size={20} />
            </button>

            <button className="p-2 rounded-lg hover:bg-zinc-800">
              <Bell size={20} />
            </button>

            <button className="p-2 rounded-lg hover:bg-zinc-800">
              <Settings size={20} />
            </button>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-3">
                <Image
                  src={user?.picture || "/avatar.png"}
                  alt="Profile"
                  width={40}
                  height={40}
                  className="rounded-full"
                />

                <div className="hidden md:block">
                  <p className="font-semibold">{user?.name}</p>

                  <p className="text-sm text-zinc-400">{user?.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main */}

      <main className="max-w-7xl mx-auto p-6">
        {/* Welcome */}

        <div className="mb-8">
          <h2 className="text-4xl font-bold">
            Welcome back, {user?.name?.split(" ")[0]} 👋
          </h2>
          <p className="text-zinc-400 mt-2">Here's what's happening today.</p>
        </div>

        {/* Stats */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {stats.map((item) => (
            <div
              key={item.title}
              className={`rounded-2xl p-6 bg-linear-to-r ${item.color}`}
            >
              <p className="text-black font-bold">{item.title}</p>

              <h2 className="text-4xl font-bold mt-3">{item.value}</h2>
            </div>
          ))}
        </div>

        {/* Content */}

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left */}

          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}

            <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-6">
              <h2 className="text-xl font-semibold mb-5">Quick Actions</h2>

              <div className="flex flex-wrap gap-4">
                <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 px-5 py-3 rounded-xl">
                  <Plus size={18} />
                  New Project
                </button>

                <button className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 px-5 py-3 rounded-xl">
                  <FileText size={18} />
                  View Reports
                </button>
              </div>
            </div>

            {/* Activity */}

            <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-6">
              <h2 className="text-xl font-semibold mb-5">Recent Activity</h2>

              <div className="space-y-4">
                {activities.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between border-b border-zinc-800 pb-3"
                  >
                    <p>{item}</p>

                    <span className="text-sm text-zinc-500">Today</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Profile */}

          <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-6 h-fit">
            <div className="flex flex-col items-center">
              <UserCircle size={90} className="mb-4" />

              <h2 className="text-2xl font-bold">John Doe</h2>

              <p className="text-zinc-400">john@example.com</p>
            </div>

            <div className="mt-8 space-y-3">
              <button className="w-full py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700">
                Edit Profile
              </button>

              <button
                onClick={logout}
                className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-500 flex justify-center items-center gap-2"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
