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
  // {
  //   id: 1,
  //   title: "Minimalist Design 1",
  //   excerpt: "Exploring the beauty of simplicity in design and its impact on user experience.",
  //   content: "Minimalism in design is more than just a visual style; it's a philosophy that emphasizes simplicity and functionality. By stripping away unnecessary elements, minimalist design creates a clean, focused user experience that can significantly improve usability and aesthetic appeal. This approach not only reduces cognitive load for users but also often results in faster load times and better performance, especially on mobile devices. However, achieving effective minimalism requires careful consideration of essential elements and user needs, balancing simplicity with functionality to create designs that are both beautiful and practical.",
  //   date: "May 1, 2023"
  // },
  // {
  //   id: 2,
  //   title: "Minimalist Design 2",
  //   excerpt: "Delving into the principles of minimalism and their application in modern web design.",
  //   content: "The principles of minimalism in web design go beyond just using white space and simple color schemes. It involves a strategic approach to content hierarchy, typography, and user flow. By prioritizing essential information and features, minimalist web design can guide users more effectively through a site or application. This approach often leads to improved user engagement and conversion rates. However, it's crucial to strike a balance between minimalism and providing sufficient information and functionality. Successful minimalist design requires a deep understanding of user needs and behaviors, as well as rigorous testing and iteration to ensure that the simplified design truly enhances the user experience.",
  //   date: "May 15, 2023"
  // },
  // {
  //   id: 3,
  //   title: "Minimalist Design 3",
  //   excerpt: "Examining how minimalism influences user interaction and engagement in digital products.",
  //   content: "Minimalism in digital product design has a profound impact on user interaction and engagement. By reducing visual clutter and focusing on core functionality, minimalist designs can significantly improve user comprehension and task completion rates. This approach often leads to more intuitive interfaces that require less cognitive effort from users, resulting in a more enjoyable and efficient user experience. Moreover, the clean aesthetics of minimalist design can evoke a sense of sophistication and trustworthiness, which can be particularly beneficial for brands aiming to convey professionalism and reliability. However, it's important to note that effective minimalist design doesn't mean sacrificing personality or brand identity. The challenge lies in finding creative ways to incorporate brand elements and character within a minimalist framework.",
  //   date: "May 30, 2023"
  // }
]

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
        <div className="max-w-2xl mx-auto mb-12 text-center">
          <h2 className="text-4xl font-bold mb-4 bg-clip-text">
            Sorry,
          </h2>
          <p className="text-xl text-muted-foreground">this page is currently under development.</p>
        </div>

        <div className="grid gap-8 max-w-2xl mx-auto">
          {blogPosts.map((post) => (
            <Card key={post.id} className="bg-card border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  {expandedPosts.includes(post.id) ? post.content : post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{post.date}</span>
                  <Button 
                    variant="ghost" 
                    className="hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                    onClick={() => togglePostExpansion(post.id)}
                  >
                    {expandedPosts.includes(post.id) ? (
                      <>
                        <ChevronUp className="h-4 w-4 mr-2" />
                        Read Less
                      </>
                    ) : (
                      <>
                        <ChevronDown className="h-4 w-4 mr-2" />
                        Read More
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
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
      </main>

      <footer className="border-t border-border/40 mt-auto py-6 text-center text-muted-foreground">
        <div className="container mx-auto px-4">
          <p>&copy; 2024 Justin Z. Silbiger. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
