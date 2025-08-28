"use client"

import { useState, useEffect } from "react"
import { Users, FileText, BarChart3, Settings, Plus, Search, Edit, Trash2, Eye, Code, TestTube, LayoutDashboard, Trophy, ShieldAlert } from "lucide-react"
import { useDispatch } from "react-redux"
import { logoutUser } from "../utils/authSlice"
import Dashboard from "@/Component/Admin/Dashboard"
import UsersDetails from "@/Component/Admin/Users"
import Contests from "@/Component/Admin/contests"
import Statistics from "@/Component/Admin/Statistics"
import Reports from "@/Component/Admin/Reports"
import ProblemManagement from "@/Component/Admin/ProblemManagement"
import ProblemForm from "@/Component/Admin/ProblemForm"
export default function Check(){
  const [activeTab, setActiveTab] = useState("dashboard")
  const [users, setUsers] = useState([])
  const [problems, setProblems] = useState([])
  const [showCreateProblem, setShowCreateProblem] = useState(false)
  const [editingProblem, setEditingProblem] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [difficultyFilter, setDifficultyFilter] = useState("all")
  const [settingsOpen, setSettingsOpen] = useState(false)
  const dispatch = useDispatch()
 

  // Mock data
  useEffect(() => {

    setProblems([
      {
        id: 1,
        title: "Two Sum",
        difficulty: "Easy",
        tags: ["Array", "Hash Table"],
        submissions: 1250,
        acceptance: "85%",
        description:
          "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
        visibleTestCases: [{ input: "[2,7,11,15], target = 9", output: "[0,1]" }],
        hiddenTestCases: [{ input: "[3,2,4], target = 6", output: "[1,2]" }],
        startCode: [
          { language: "JavaScript", code: "function twoSum(nums, target) {\n    // Your code here\n}" },
          { language: "Python", code: "def two_sum(nums, target):\n    # Your code here\n    pass" },
        ],
        referenceSolution: [
          {
            language: "JavaScript",
            code: "function twoSum(nums, target) {\n    const map = new Map();\n    for (let i = 0; i < nums.length; i++) {\n        const complement = target - nums[i];\n        if (map.has(complement)) {\n            return [map.get(complement), i];\n        }\n        map.set(nums[i], i);\n    }\n}",
          },
        ],
      },
    ])
  }, [])

  const handleLogout = () => {
    dispatch(logoutUser())
  }



  const filteredProblems = problems.filter((problem) => {
    const matchesSearch =
      problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      problem.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesDifficulty = difficultyFilter === "all" || problem.difficulty === difficultyFilter
    return matchesSearch && matchesDifficulty
  })

  return (
    <div className="flex h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* Sidebar */}
      <div className="w-64 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-r border-emerald-200 dark:border-emerald-800 p-6 flex flex-col">
        <div className="flex items-center space-x-3 mb-8">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-700">
            <Code className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-800 bg-clip-text text-transparent">
            CodeCraft
          </span>
        </div>
        <p className="text-sm text-emerald-600 dark:text-emerald-400 mb-6">Admin Panel</p>

        <nav className="space-y-2 flex flex-col">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === "dashboard"
                ? "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300"
                : "text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </button>

          <button
            onClick={() => setActiveTab("problems")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === "problems"
                ? "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300"
                : "text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
            }`}
          >
            <FileText className="w-5 h-5" />
            Problems
          </button>

          <button
            onClick={() => setActiveTab("users")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === "users"
                ? "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300"
                : "text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
            }`}
          >
            <Users className="w-5 h-5" />
            Users
          </button>

          <button
            onClick={() => setActiveTab("contests")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === "contests"
                ? "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300"
                : "text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
            }`}
          >
            <Trophy className="w-5 h-5" />
            Contests
          </button>

          <button
            onClick={() => setActiveTab("statistics")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === "statistics"
                ? "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300"
                : "text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
            }`}
          >
            <BarChart3 className="w-5 h-5" />
            Statistics
          </button>

          <button
            onClick={() => setActiveTab("reports")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === "reports"
                ? "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300"
                : "text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
            }`}
          >
            <ShieldAlert className="w-5 h-5" />
            Reports
          </button>

          {/* Settings dropdown */}
          <div className="relative">
            <button
              onClick={() => setSettingsOpen(!settingsOpen)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                settingsOpen
                  ? "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300"
                  : "text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
              }`}
            >
              <Settings className="w-5 h-5" />
              Settings
              <span className={`transform transition-transform ${settingsOpen ? 'rotate-180' : ''}`}>▼</span>
            </button>

            {settingsOpen && (
              <div className="absolute left-0 mt-1 w-full rounded-md bg-white dark:bg-gray-800 border border-emerald-200 dark:border-emerald-800 shadow-lg z-20">
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </nav>

        {/* Footer */}
        <div className="mt-auto pt-6 border-t border-emerald-200 dark:border-emerald-800 text-sm text-emerald-600 dark:text-emerald-400">
          CodeCraft Admin © {new Date().getFullYear()}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        {/* Dashboard */}
        {activeTab === "dashboard" ? <Dashboard /> : null}
        {/* Users Management */}
        {activeTab === "users"? <UsersDetails />:null}
        {/* Problems Management */}
        {activeTab === "problems" ?<ProblemManagement/>:null}

        {/* Other tabs */}
        {activeTab === "contests" ?<Contests/>:null}

        {activeTab === "statistics" ?<Statistics/>:null}

        {activeTab === "reports"?<Reports/>:null}
      </div>

      {/* Problem Form Modal */}
      {(showCreateProblem || editingProblem) && (
        <ProblemForm
          problem={editingProblem}
          onSave={(problemData) => {
            if (editingProblem) {
              setProblems((prev) => prev.map((p) => (p.id === editingProblem.id ? problemData : p)))
            } else {
              setProblems((prev) => [...prev, problemData])
            }
            setShowCreateProblem(false)
            setEditingProblem(null)
          }}
          onCancel={() => {
            setShowCreateProblem(false)
            setEditingProblem(null)
          }}
        />
      )}
    </div>
  )
}

