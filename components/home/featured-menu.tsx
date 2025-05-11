"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { PlusCircle } from "lucide-react";
import { useCart } from "@/components/cart/cart-provider";
import { useToast } from "@/components/ui/use-toast";
import { ca } from "date-fns/locale";

const featuredItems = [
  {
    id: "1",
    name: "Chilly Bbq Chicken",
    description:
      "BBQ chicken, jalapenos, and mozzarella cheese on a spicy crust",
    price: 849,
    image: "/menu/Chilly bbq chicken.jpg?height=200&width=200",
    category: "Pizza",
  },
  {
    id: "b2",
    name: "Cheezy Weezy",
    description:
      "Double layers of melty cheese over a juicy beef patty, with lettuce, tomato, and our special sauce.",
    price: 959,
    image: "/menu/Cheezy weezy.jpg?height=200&width=200",
    category: "Burgers",
  },
  {
    id: "3",
    name: "Alfredo Pasta",
    description:
      "Rich and creamy Alfredo sauce over tender pasta, topped with parmesan and herbs.",
    price: 799,
    image: "/menu/Alfredo pasta.jpg?height=200&width=200",
    category: "Pasta",
  },
  {
    id: "4",
    name: "Bbq Chips",
    description:
      "Crunchy chips coated with smoky BBQ seasoning — bold and flavorful in every bite.",
    price: 499,
    image: "/menu/Bbq chips.jpg?height=200&width=200",
    category: "Snacks",
  },
];

export default function FeaturedMenu() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (item: (typeof featuredItems)[0]) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      image: item.image,
    });

    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart.`,
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="py-20 bg-white" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 section-heading">
            Our Featured Menu
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our most popular items, crafted with care using the finest
            ingredients
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {featuredItems.map((item) => (
            <motion.div key={item.id} variants={itemVariants}>
              <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg menu-item-hover">
                <div className="h-48 overflow-hidden">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <CardContent className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg">{item.name}</h3>
                    <span className="text-primary font-semibold">
                      Rs. {item.price}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">
                    {item.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs px-2 py-1 bg-secondary text-primary rounded-full">
                      {item.category}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-primary hover:text-primary/90 hover:bg-secondary"
                      onClick={() => handleAddToCart(item)}
                    >
                      <PlusCircle className="mr-1 h-4 w-4" /> Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-12">
          <Link href="/menu">
            <Button className="bg-primary hover:bg-primary/90">
              View Full Menu
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
