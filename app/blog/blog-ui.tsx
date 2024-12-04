"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Moon, Sun, Home, ChevronDown, ChevronUp } from "lucide-react"
import { useTheme } from "next-themes"

interface BlogPost {
  id: number
  title: string
  excerpt: string
  content: string
  date: string
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Day 1: Swift Basics - Variables, Strings, Numbers #100DaysOfSwiftUI",
    excerpt: "Starting my #100DaysOfSwiftUI journey.",
    content: `Variables & Constants
• var = values that can change
• let = values that stay fixed
• Swift prefers the let constant by default

\`\`\`swift
var score = 0       // Can change
score = 100         // ✅ Works fine

let name = "Justin" // Can't change
name = "Bob"        // ❌ Won't compile - constants can't be changed
\`\`\`

Strings (Text)
• Always use double quotes ("")
• String interpolation with \\(variableName)
• It's always a good idea to use camelCase for variable names
• Multi-line strings use triple quotes
• Useful methods: .count, .uppercased(), .hasPrefix(), .hasSuffix()

\`\`\`swift
let text = "Hello!"
let name = "Justin"
let greeting = "Hello, \\(name)!"  // String interpolation

let multi = """
Line 1
Line 2
"""
print(text.count)  // Number of characters
\`\`\`

Numbers
• Int: whole numbers 
• Double: decimals
• Type safety prevents mixing without explicit conversion

\`\`\`swift
let integer = 25    // Whole number
let double = 6.13   // Decimal number

// Need to explicitly convert between types with a cast
let sum = Double(integer) + double  
\`\`\`

Tips:
• Use underscores for readability: 1_000_000
• Swift is type-safe, so be explicit with number types

Pretty straightforward start - excited to keep building on this! 💪`,
    date: "December 2, 2024"
  }
]

const formatContentWithCodeBlocks = (content: string) => {
  const parts = content.split('```swift')
  
  return parts.map((part, index) => {
    if (index === 0) {
      return <p key={index} className="min-w-0">{part}</p>
    }
    
    const [code, ...rest] = part.split('```')
    
    return (
      <div key={index} className="min-w-0">
        <div className="relative group">
          <pre className="relative rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 overflow-x-auto">
            <div className="absolute top-3 right-3">
              <Button
                variant="secondary"
                size="sm"
                className="h-8 px-2 text-xs bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300"
                onClick={() => navigator.clipboard.writeText(code.trim())}
              >
                Copy
              </Button>
            </div>
            <code className="text-sm font-mono text-zinc-800 dark:text-zinc-200 break-words whitespace-pre-wrap">
              {code.trim()}
            </code>
          </pre>
        </div>
        {rest.length > 0 && <p className="min-w-0">{rest.join('')}</p>}
      </div>
    )
  })
}

export function BlogUi() {
  const [expandedPosts, setExpandedPosts] = useState<number[]>([])
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const togglePostExpansion = (postId: number) => {
    setExpandedPosts(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    )
  }

  if (!mounted) {
    return null
  }

  return (
    <div className={`min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300 ${theme === "dark" ? 'dark' : ''}`}>
      <header className="border-b border-border/40">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">👨🏻‍💻</h1>
          <div className="flex items-center space-x-4">
          
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")} 
              className="rounded-full"
            >
              {theme === "dark" ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
            </Button>
          
            <Link href="/" passHref>
              <Button
                variant="outline"
                size="lg"
                className="group relative overflow-hidden rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                <span className="absolute inset-0 w-0 bg-primary transition-all duration-300 ease-out group-hover:w-full"></span>
                <Home className="h-5 w-5 mr-2 relative z-10 transition-transform group-hover:rotate-12" />
                <span className="relative z-10">Back to Home</span>
              </Button>
            </Link>
            
            
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-12">
        

        <div className="grid gap-8 max-w-3xl mx-auto">
          {blogPosts.map((post) => (
            <Card 
              key={post.id} 
              className="bg-card border border-zinc-200/50 dark:border-zinc-800/50 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <CardHeader className="space-y-4 border-b border-zinc-200/50 dark:border-zinc-800/50">
                <div className="space-y-2">
                  <CardTitle className="text-2xl font-bold tracking-tight">{post.title}</CardTitle>
                  <time className="text-sm text-muted-foreground">
                    {post.date}
                  </time>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className={`prose prose-gray dark:prose-invert max-w-none ${
                    expandedPosts.includes(post.id) 
                      ? 'whitespace-pre-line px-2 sm:px-4' 
                      : 'line-clamp-3 text-center'
                  } prose-pre:bg-muted prose-pre:border prose-pre:border-border/40 prose-pre:rounded-lg prose-pre:max-w-[calc(100vw-2rem)] sm:prose-pre:max-w-none`}>
                    {expandedPosts.includes(post.id) 
                      ? (
                        <div className="overflow-x-auto -mx-2 sm:-mx-4">
                          <div className="min-w-0">
                            {formatContentWithCodeBlocks(post.content)}
                          </div>
                        </div>
                      ) 
                      : post.excerpt}
                  </div>
                  <div className="flex justify-center pt-4">
                    <Button 
                      variant="ghost" 
                      className="hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                      onClick={() => togglePostExpansion(post.id)}
                    >
                      {expandedPosts.includes(post.id) ? (
                        <>
                          <ChevronUp className="h-4 w-4 mr-2" />
                          <span className="text-sm font-medium">Read Less</span>
                        </>
                      ) : (
                        <>
                          <ChevronDown className="h-4 w-4 mr-2" />
                          <span className="text-sm font-medium">Read More</span>
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

      
      </main>

      <footer className="border-t border-border/40 mt-auto py-6 text-center text-muted-foreground">
        <div className="container mx-auto px-4">
          <p>&copy; 2024 Justin Z. Silbiger. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
