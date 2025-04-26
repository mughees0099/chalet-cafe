"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"

const instagramPosts = [
  {
    id: 1,
    image: "/placeholder.svg?height=300&width=300",
    likes: 124,
    comments: 12,
  },
  {
    id: 2,
    image: "/placeholder.svg?height=300&width=300",
    likes: 98,
    comments: 8,
  },
  {
    id: 3,
    image: "/placeholder.svg?height=300&width=300",
    likes: 156,
    comments: 24,
  },
  {
    id: 4,
    image: "/placeholder.svg?height=300&width=300",
    likes: 87,
    comments: 5,
  },
  {
    id: 5,
    image: "/placeholder.svg?height=300&width=300",
    likes: 112,
    comments: 18,
  },
  {
    id: 6,
    image: "/placeholder.svg?height=300&width=300",
    likes: 143,
    comments: 15,
  },
]

export default function InstagramFeed() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section className="py-20 bg-secondary" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 section-heading">Follow Us on Instagram</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Stay updated with our latest creations, events, and behind-the-scenes moments
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {instagramPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="relative group overflow-hidden rounded-lg"
            >
              <img
                src={post.image || "/placeholder.svg"}
                alt={`Instagram post ${post.id}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-primary/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="text-white text-center">
                  <div className="flex justify-center space-x-4">
                    <span className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                      {post.likes}
                    </span>
                    <span className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                      </svg>
                      {post.comments}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href="https://instagram.com/chaletcafe"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center"
          >
            <Button className="bg-primary hover:bg-primary/90">
              <Instagram className="mr-2 h-4 w-4" /> Follow @chaletcafe
            </Button>
          </a>
        </div>
      </div>
    </section>
  )
}
