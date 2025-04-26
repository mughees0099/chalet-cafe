"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useCart } from "@/components/cart/cart-provider"
import { useToast } from "@/components/ui/use-toast"

// Sample menu data - in a real app, this would come from an API or database
const menuItems = {
  coffee: [
    {
      id: "c1",
      name: "Signature Latte",
      description: "Our house specialty with a blend of premium espresso and velvety steamed milk",
      price: 450,
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: "c2",
      name: "Cappuccino",
      description: "Classic Italian coffee with equal parts espresso, steamed milk, and milk foam",
      price: 400,
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: "c3",
      name: "Iced Americano",
      description: "Chilled espresso with cold water and ice for a refreshing caffeine boost",
      price: 350,
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: "c4",
      name: "Chai Tea Latte",
      description: "Spiced black tea with steamed milk and a hint of honey",
      price: 380,
      image: "/placeholder.svg?height=200&width=200",
    },
  ],
  breakfast: [
    {
      id: "b1",
      name: "Avocado Toast",
      description: "Freshly mashed avocado on artisanal sourdough with cherry tomatoes and feta",
      price: 650,
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: "b2",
      name: "Eggs Benedict",
      description: "Poached eggs and hollandaise sauce on English muffins with smoked salmon",
      price: 750,
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: "b3",
      name: "Breakfast Burrito",
      description: "Scrambled eggs, cheese, beans, and avocado wrapped in a warm tortilla",
      price: 600,
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: "b4",
      name: "Pancake Stack",
      description: "Fluffy pancakes served with maple syrup, fresh berries, and whipped cream",
      price: 550,
      image: "/placeholder.svg?height=200&width=200",
    },
  ],
  lunch: [
    {
      id: "l1",
      name: "Club Sandwich",
      description: "Triple-decker sandwich with grilled chicken, bacon, lettuce, tomato and mayo",
      price: 750,
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: "l2",
      name: "Chicken Caesar Salad",
      description: "Crisp romaine lettuce, grilled chicken, parmesan, croutons, and Caesar dressing",
      price: 700,
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: "l3",
      name: "Beef Burger",
      description: "Juicy beef patty with cheese, lettuce, tomato, and special sauce on a brioche bun",
      price: 850,
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: "l4",
      name: "Pasta Primavera",
      description: "Al dente pasta with seasonal vegetables in a light cream sauce",
      price: 680,
      image: "/placeholder.svg?height=200&width=200",
    },
  ],
  desserts: [
    {
      id: "d1",
      name: "Chocolate Fondant",
      description: "Decadent chocolate cake with a molten center, served with vanilla ice cream",
      price: 550,
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: "d2",
      name: "Tiramisu",
      description: "Classic Italian dessert with layers of coffee-soaked ladyfingers and mascarpone",
      price: 500,
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: "d3",
      name: "Cheesecake",
      description: "Creamy New York style cheesecake with a graham cracker crust and berry compote",
      price: 480,
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: "d4",
      name: "Apple Crumble",
      description: "Warm spiced apples topped with a buttery crumble, served with custard",
      price: 450,
      image: "/placeholder.svg?height=200&width=200",
    },
  ],
}

interface MenuSectionProps {
  title: string
  id: "coffee" | "breakfast" | "lunch" | "desserts"
  description: string
}

export default function MenuSection({ title, id, description }: MenuSectionProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const { addToCart } = useCart()
  const { toast } = useToast()

  const handleAddToCart = (item: (typeof menuItems.coffee)[0]) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      image: item.image,
    })

    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart.`,
    })
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section id={id} className="mb-16" ref={ref}>
      <h2 className="text-2xl md:text-3xl font-bold mb-2 section-heading">{title}</h2>
      <p className="text-gray-600 mb-8">{description}</p>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {menuItems[id].map((item) => (
          <motion.div key={item.id} variants={itemVariants}>
            <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300 menu-item-hover">
              <CardContent className="p-0">
                <div className="flex flex-col sm:flex-row">
                  <div className="sm:w-1/3 h-40 sm:h-auto">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="sm:w-2/3 p-4">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-lg">{item.name}</h3>
                      <span className="text-primary font-semibold">Rs. {item.price}</span>
                    </div>
                    <p className="text-gray-600 text-sm my-2">{item.description}</p>
                    <Button
                      onClick={() => handleAddToCart(item)}
                      variant="outline"
                      size="sm"
                      className="mt-2 text-primary border-primary hover:bg-secondary"
                    >
                      <PlusCircle className="mr-1 h-4 w-4" /> Add to Cart
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
