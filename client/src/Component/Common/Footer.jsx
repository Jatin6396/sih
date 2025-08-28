import React from "react"
import { Github, Linkedin, Code } from "lucide-react"
import { Link } from "react-router-dom"

export default function Footer() {
  return (
    <footer className="bg-muted/50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Code className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold text-foreground">CodeCraft</span>
            </div>
            <p className="text-muted-foreground mb-4">
              Empowering developers to master coding skills through expert-crafted challenges and community support.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/mycodecraft"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-110"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
              <a
                href="https://linkedin.com/company/mycodecraft"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-110"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Platform</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link to="/problems" className="hover:text-foreground transition-all duration-300 hover:translate-x-1">
                  Problems
                </Link>
              </li>
              <li>
                <Link to="/contests" className="hover:text-foreground transition-all duration-300 hover:translate-x-1">
                  Contests
                </Link>
              </li>
              <li>
                <Link to="/discuss" className="hover:text-foreground transition-all duration-300 hover:translate-x-1">
                  Discuss
                </Link>
              </li>
              <li>
                <Link to="/interview" className="hover:text-foreground transition-all duration-300 hover:translate-x-1">
                  Interview
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link to="/about" className="hover:text-foreground transition-all duration-300 hover:translate-x-1">
                  About
                </Link>
              </li>
              <li>
                <Link to="/careers" className="hover:text-foreground transition-all duration-300 hover:translate-x-1">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/press" className="hover:text-foreground transition-all duration-300 hover:translate-x-1">
                  Press
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-foreground transition-all duration-300 hover:translate-x-1">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Resources</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link to="/documentation" className="hover:text-foreground transition-all duration-300 hover:translate-x-1">
                  Documentation
                </Link>
              </li>
              <li>
                <Link to="/help-center" className="hover:text-foreground transition-all duration-300 hover:translate-x-1">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-foreground transition-all duration-300 hover:translate-x-1">
                  Privacy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-foreground transition-all duration-300 hover:translate-x-1">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy;CodeCraft. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
