import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/Theme/theme-toggle"
import { Code, Users, Trophy, Target, ArrowRight, CheckCircle, Star, Github, Linkedin, Menu, X } from "lucide-react"
import { useState, useEffect } from "react"
import { Link } from "react-router"
import Header from "@/Component/Common/Header"
import Footer from "@/Component/Common/Footer"


export default function LandingPage() {

 const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header/>


      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-primary/10 via-background to-accent/5 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div
            className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            <Badge variant="secondary" className="mb-6 animate-bounce">
              Join 50,000+ developers
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Master Your{" "}
              <span className="text-primary bg-gradient-to-r from-primary to-primary/70 bg-clip-text  animate-pulse">
                Coding Skills
              </span>{" "}
              with Expert-Crafted Challenges
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Practice algorithms and data structures with tailored challenges. Build confidence, ace interviews, and
              become the developer you've always wanted to be.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button
                  size="lg"
                  className="text-lg px-8 py-6 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  Start Coding Now
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
             <Link to="/login"> 
             <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 py-6 bg-transparent hover:scale-105 transition-all duration-300 border-2 hover:bg-secondary/10 "
              >
                View Problems
              </Button></Link>
            </div>
            <div className="mt-12 flex items-center justify-center space-x-8 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2 hover:scale-105 transition-transform duration-200">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>Free to start</span>
              </div>
              <div className="flex items-center space-x-2 hover:scale-105 transition-transform duration-200">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>1000+ problems</span>
              </div>
              <div className="flex items-center space-x-2 hover:scale-105 transition-transform duration-200">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>Expert solutions</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Everything You Need to Excel</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our platform provides comprehensive tools and resources to accelerate your coding journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-border hover:shadow-lg transition-all duration-300 hover:scale-105 hover:-translate-y-2 group">
              <CardHeader>
                <Target className="h-12 w-12 text-primary mb-4 group-hover:scale-110 transition-transform duration-300" />
                <CardTitle>Curated Problems</CardTitle>
                <CardDescription>
                  Hand-picked coding challenges from easy to expert level, covering all major algorithms and data
                  structures
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border hover:shadow-lg transition-all duration-300 hover:scale-105 hover:-translate-y-2 group">
              <CardHeader>
                <Users className="h-12 w-12 text-primary mb-4 group-hover:scale-110 transition-transform duration-300" />
                <CardTitle>Community Solutions</CardTitle>
                <CardDescription>
                  Learn from multiple approaches with detailed explanations from our community of expert developers
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border hover:shadow-lg transition-all duration-300 hover:scale-105 hover:-translate-y-2 group">
              <CardHeader>
                <Trophy className="h-12 w-12 text-primary mb-4 group-hover:scale-110 transition-transform duration-300" />
                <CardTitle>Progress Tracking</CardTitle>
                <CardDescription>
                  Monitor your improvement with detailed analytics, streaks, and personalized learning paths
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Loved by Developers Worldwide</h2>
            <p className="text-xl text-muted-foreground">
              See what our community has to say about their coding journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-border hover:shadow-lg transition-all duration-300 hover:scale-105 group">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-yellow-500 text-yellow-500 group-hover:scale-110 transition-transform duration-200"
                      style={{ transitionDelay: `${i * 50}ms` }}
                    />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "MyCodeCraft helped me land my dream job at Google. The problems are challenging and the explanations
                  are crystal clear."
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-semibold">SJ</span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Sarah Johnson</p>
                    <p className="text-sm text-muted-foreground">Software Engineer at Google</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border hover:shadow-lg transition-all duration-300 hover:scale-105 group">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-yellow-500 text-yellow-500 group-hover:scale-110 transition-transform duration-200"
                      style={{ transitionDelay: `${i * 50}ms` }}
                    />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "The best coding practice platform I've used. The community is amazing and always ready to help."
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-semibold">MC</span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Mike Chen</p>
                    <p className="text-sm text-muted-foreground">Full Stack Developer</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border hover:shadow-lg transition-all duration-300 hover:scale-105 group">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-yellow-500 text-yellow-500 group-hover:scale-110 transition-transform duration-200"
                      style={{ transitionDelay: `${i * 50}ms` }}
                    />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "From beginner to confident developer in 6 months. MyCodeCraft's structured approach made all the
                  difference."
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-semibold">AP</span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Alex Patel</p>
                    <p className="text-sm text-muted-foreground">Junior Developer</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary animate-gradient-x"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Level Up Your Coding Skills?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of developers who are already mastering algorithms and acing their interviews
          </p>
          <Link href="/auth/signup">
            <Button
              size="lg"
              variant="secondary"
              className="text-lg px-8 py-6 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl bg-emerald-600 text-white hover:bg-emerald-700"
            >
              Start Your Journey Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <Footer/>
    </div>
  )
}
