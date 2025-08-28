import { useState, useEffect } from "react"
import { Search, CheckCircle, Circle, Star, Clock, Users, MessageSquare, Brain, Code } from "lucide-react"
import Footer from "@/Component/Common/Footer"

import Discussion from "../Component/Tags/Description"
import Interview from "../Component/Tags/Interview"
import AIFeature from "../Component/Tags/Ai"
import Header from "../Component/Common/UniversalHeader"
import axiosClient from "@/utils/axiosClient"
import { useSelect } from "@react-three/drei"

// Mock problems data ...
const mockProblems = [ /* same as before */ ]

export default function HomePage() {
  const {user}=useSelect((state)=>state.auth);
  const [problems, setProblems] = useState([])
  const [filteredProblems, setFilteredProblems] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [difficultyFilter, setDifficultyFilter] = useState("All")
  const [statusFilter, setStatusFilter] = useState("All")
  const [activeTab, setActiveTab] = useState("problems");
   const [solvedProblem, setSolvedProblem] = useState([]);


   useEffect(() => {
    const fetchProblem = async () => {
      try {
        const { data } = await axiosClient.get("problems/getAllProblem");
        console.log(data);
        setProblems(data.reply || []);
        setFilteredProblems(data.reply||[]) // ✅ correct
      } catch (err) {
        console.log("Error fetching problems:", err.message);
      }
    };

    const fetchSolvedProblems = async () => {
      try {
        const { data } = await axiosClient.get("/problems/problemSolvedByUser");
        setSolvedProblem(data.solvedProblems || []); // ✅ correct
      } catch (err) {
        console.log("Error fetching solved problems:", err.message);
      }
    };

    fetchProblem();
    if (user) fetchSolvedProblems();
  }, [user]);
  

  useEffect(() => {
    let filtered = problems

    if (searchTerm) {
      filtered = filtered.filter(
        (problem) =>
          problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          problem.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    if (difficultyFilter !== "All") {
      filtered = filtered.filter((problem) => problem.difficulty === difficultyFilter)
    }

    if (statusFilter === "Solved") {
      filtered = filtered.filter((problem) => problem.solved)
    } else if (statusFilter === "Unsolved") {
      filtered = filtered.filter((problem) => !problem.solved)
    }

    setFilteredProblems(filtered)
  }, [problems, searchTerm, difficultyFilter, statusFilter])

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Easy": return "text-green-500"
      case "Medium": return "text-yellow-500"
      case "Hard": return "text-red-500"
      default: return "text-gray-500"
    }
  }

  const tabs = [
    { id: "problems", label: "Problems", icon: Code },
    { id: "discussion", label: "Discussion", icon: MessageSquare },
    { id: "interview", label: "Interview", icon: Users },
    { id: "ai-feature", label: "AI Feature", icon: Brain },
  ]

    return (
    <div className="min-h-screen bg-background">
      {/* ✅ Header */}
      <Header
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        problems={problems}
      />

      <main className="container mx-auto px-4 py-8">
        {activeTab === "problems" && (
          <>
            {/* Filters */}
            <div className="mb-8 space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Search Box */}
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search problems..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                {/* Difficulty Filter */}
                <select
                  value={difficultyFilter}
                  onChange={(e) => setDifficultyFilter(e.target.value)}
                  className="px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="All">All Difficulties</option>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>

                {/* Status Filter */}
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="All">All Status</option>
                  <option value="Solved">Solved</option>
                  <option value="Unsolved">Unsolved</option>
                </select>
              </div>

              <div className="text-sm text-muted-foreground">
                Showing {filteredProblems.length} of {problems.length} problems
              </div>
            </div>

            {/* Problems List */}
            <div className="space-y-4">
              {filteredProblems.map((problem) => (
                <div
                  key={problem.id}
                  className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className="flex items-center mt-1">
                        {problem.solved ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <Circle className="w-5 h-5 text-muted-foreground" />
                        )}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-foreground hover:text-primary">
                            {problem.title}
                          </h3>
                          <span
                            className={`text-sm font-medium ${getDifficultyColor(
                              problem.difficulty
                            )}`}
                          >
                            {problem.difficulty}
                          </span>
                        </div>

                        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                          {problem.description}
                        </p>

                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>Acceptance: {problem.acceptance}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4" />
                            <span>{problem.likes}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-3">
                          {problem.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredProblems.length === 0 && (
              <div className="text-center py-12">
                <div className="text-muted-foreground text-lg mb-2">
                  No problems found
                </div>
                <div className="text-sm text-muted-foreground">
                  Try adjusting your search or filter criteria
                </div>
              </div>
            )}
          </>
        )}

        {activeTab === "discussion" && <Discussion />}
        {activeTab === "interview" && <Interview />}
        {activeTab === "ai-feature" && <AIFeature />}
      </main>

      <Footer />
    </div>
  )
}

