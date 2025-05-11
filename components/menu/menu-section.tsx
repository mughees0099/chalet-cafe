"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useCart } from "@/components/cart/cart-provider";
import { useToast } from "@/components/ui/use-toast";

// Sample menu data - in a real app, this would come from an API or database
const menuItems = {
  Pizza: [
    {
      id: "p1",
      name: "Jalapeno Pizza",
      description:
        "Spicy jalapenos, mozzarella cheese, and tomato sauce on a thin crust",
      price: 799,
      image: "/menu/Jalapeno pizza.jpg?height=200&width=200",
    },
    {
      id: "p2",
      name: "Cheese Lover Pizza",
      description:
        "A cheesy delight with mozzarella, cheddar, and parmesan on a crispy crust",
      price: 749,
      image: "/menu/Cheese lover pizza.jpg?height=200&width=200",
    },
    {
      id: "p3",
      name: "Pepperoni",
      description:
        "Classic pepperoni, mozzarella cheese, and tomato sauce on a hand-tossed crust",
      price: 799,
      image: "/menu/Pepperoni.jpg?height=200&width=200",
    },
    {
      id: "p4",
      name: "Margarita Pizza",
      description:
        "Fresh basil, mozzarella cheese, and tomato sauce on a thin crust",
      price: 649,
      image: "/menu/Margherita.jpg?height=200&width=200",
    },
    {
      id: "p5",
      name: "Veggie Lover",
      description: "Loaded with fresh vegetables and mozzarella cheese",
      price: 699,
      image: "/menu/Veggie lover.jpg?height=200&width=200",
    },
    {
      id: "p6",
      name: "Smoked Chicken",
      description: "Smoked chicken, BBQ sauce, and mozzarella cheese",
      price: 799,
      image: "/menu/Smoked chicken.jpg?height=200&width=200",
    },
    {
      id: "p7",
      name: "Chilly Bbq Chicken",
      description:
        "BBQ chicken, jalapenos, and mozzarella cheese on a spicy crust",
      price: 849,
      image: "/menu/Chilly bbq chicken.jpg?height=200&width=200",
    },
    {
      id: "p8",
      name: "Extravaganza",
      description: "A mix of all toppings for the ultimate pizza experience",
      price: 789,
      image: "/menu/Extravaganza.jpg?height=200&width=200",
    },
  ],
  Burgers: [
    {
      id: "b1",
      name: "Hotdog",
      description:
        "Juicy grilled sausage tucked in a soft bun, topped with mustard, ketchup, and caramelized onions.",
      price: 399,
      image: "/menu/Hotdog.jpg?height=200&width=200",
    },
    {
      id: "b2",
      name: "Magic Mashroom",
      description:
        "A magical blend of grilled portobello mushrooms, melted cheese, crisp lettuce, and creamy garlic mayo.",
      price: 599,
      image: "/menu/Magic mashroom.jpg?height=200&width=200",
    },
    {
      id: "b3",
      name: "Angry Chicken",
      description:
        "Fiery grilled chicken loaded with jalapeños, fresh lettuce, and spicy chipotle mayo for a real kick.",
      price: 629,
      image: "/menu/Angry chicken.jpg?height=200&width=200",
    },
    {
      id: "b4",
      name: "Cheezy Weezy",
      description:
        "Double layers of melty cheese over a juicy beef patty, with lettuce, tomato, and our special sauce.",
      price: 959,
      image: "/menu/Cheezy weezy.jpg?height=200&width=200",
    },
    {
      id: "b5",
      name: "Spicy Crunch",
      description:
        "Crispy chicken fillet with spicy seasoning, fresh lettuce, and cool ranch dressing for the perfect crunch.",
      price: 649,
      image: "/menu/Spicy crunch.jpg?height=200&width=200",
    },
    {
      id: "b6",
      name: "Crunchy Cheese",
      description:
        "Crunchy fried chicken layered with cheese, lettuce, and smooth mayo in a toasted bun.",
      price: 999,
      image: "/menu/Crunchy cheese.jpg?height=200&width=200",
    },
    {
      id: "b7",
      name: "Texas Chicken",
      description:
        "Smoky grilled chicken drenched in BBQ sauce, topped with cheddar cheese and crispy onions — true Texas style.",
      price: 629,
      image: "/menu/Texas chicken.jpg?height=200&width=200",
    },
    {
      id: "b8",
      name: "Ancient Love",
      description:
        "A timeless grilled chicken recipe with heritage spices, smoky BBQ sauce, and cheesy perfection.",
      price: 599,
      image: "/menu/Ancient love.jpg?height=200&width=200",
    },
    {
      id: "b9",
      name: "Royal Crunch",
      description:
        "Regal layers of crispy chicken, royal cheese, BBQ glaze, and onion crisps for a king-size experience.",
      price: 629,
      image: "/menu/Royal crunch.jpg?height=200&width=200",
    },
    {
      id: "b10",
      name: "Mexican Senorita",
      description:
        "Zesty Mexican-spiced chicken with tangy salsa, cheese, and crispy onions wrapped in a toasted bun.",
      price: 539,
      image: "/menu/Mexican senorita.jpg?height=200&width=200",
    },
    {
      id: "b11",
      name: "Jalapeno Affair",
      description:
        "A fiery love story of grilled chicken, spicy jalapeños, creamy cheese, and BBQ drizzle.",
      price: 949,
      image: "/menu/Jalapeno affair.jpg?height=200&width=200",
    },
  ],
  Pasta: [
    {
      id: "ps1",
      name: "Mac & Cheese Pasta",
      description:
        "Creamy and cheesy elbow pasta baked to perfection — the ultimate comfort food classic.",
      price: 699,
      image: "/menu/Mac and cheese pasta.jpg?height=200&width=200",
    },
    {
      id: "ps2",
      name: "Sassy Spaghetti",
      description:
        "Bold and tangy spaghetti tossed in a zesty tomato-based sauce with a hint of spice.",
      price: 649,
      image: "/menu/Sassy spaghetti.jpg?height=200&width=200",
    },
    {
      id: "ps3",
      name: "Alfredo Pasta",
      description:
        "Rich and creamy Alfredo sauce over tender pasta, topped with parmesan and herbs.",
      price: 799,
      image: "/menu/Alfredo pasta.jpg?height=200&width=200",
    },
    {
      id: "ps4",
      name: "Mushroom Cheese Pasta",
      description:
        "Savory mushrooms and melted cheese tossed with pasta in a luscious cream sauce.",
      price: 799,
      image: "/menu/Mushroom cheese pasta.jpg?height=200&width=200",
    },
    {
      id: "ps5",
      name: "Cream Of Tomato",
      description:
        "Smooth and velvety tomato cream sauce over pasta — a perfect blend of tangy and creamy.",
      price: 749,
      image: "/menu/Cream of tomato.jpg?height=200&width=200",
    },
    {
      id: "ps6",
      name: "Maroccan Chicken Pasta",
      description:
        "Pasta infused with Moroccan spices and tender grilled chicken, offering a unique exotic flavor.",
      price: 749,
      image: "/menu/Maroccan chicken pasa.jpg?height=200&width=200",
    },
  ],
  Panini: [
    {
      id: "pa1",
      name: "Spicy Grilled Chicken",
      description:
        "Tender grilled chicken with a spicy kick, layered in a toasted panini with melted cheese and fresh veggies.",
      price: 599,
      image: "/menu/Spicy grilled chicken.jpg?height=200&width=200",
    },
    {
      id: "pa2",
      name: "Grill Cheese",
      description:
        "A golden, crispy panini packed with gooey melted cheese — simple, classic, and comfort in every bite.",
      price: 569,
      image: "/menu/Grill cheese.jpg?height=200&width=200",
    },
    {
      id: "pa3",
      name: "Spinach Omelette",
      description:
        "A protein-packed panini filled with fluffy spinach omelette, melted cheese, and herbs for a wholesome treat.",
      price: 549,
      image: "/menu/Spinach omelette.jpg?height=200&width=200",
    },
    {
      id: "pa4",
      name: "Bbq Chicken",
      description:
        "Smoky BBQ chicken grilled to perfection, layered with cheese, caramelized onions, and BBQ sauce in a toasted panini.",
      price: 599,
      image: "/menu/BBQ CHICKEN.jpg?height=200&width=200",
    },
  ],
  Snacks: [
    {
      id: "s1",
      name: "Plain Chips",
      description:
        "Crispy and lightly salted potato chips, perfect for a classic, satisfying snack.",
      price: 399,
      image: "/menu/Plain chips.jpg?height=200&width=200",
    },
    {
      id: "s2",
      name: "Snack Combo",
      description:
        "A delicious combo of chips, fries, nuggets, and sauces — ideal for quick cravings.",
      price: 699,
      image: "/menu/Snack combo.jpg?height=200&width=200",
    },
    {
      id: "s3",
      name: "Cheese Up Potato Chips",
      description:
        "Golden potato chips smothered in melted cheese for the ultimate cheesy indulgence.",
      price: 549,
      image: "/menu/Cheese up potato chips.jpg?height=200&width=200",
    },
    {
      id: "s4",
      name: "Alu Cheese Paratha",
      description:
        "Crispy paratha stuffed with spicy mashed potatoes and gooey cheese — a flavorful snack.",
      price: 379,
      image: "/menu/Alu cheese paratha.jpg?height=200&width=200",
    },
    {
      id: "s5",
      name: "Cheese Paratha",
      description:
        "Flaky paratha loaded with rich melted cheese, served hot for a cheesy delight.",
      price: 379,
      image: "/menu/Cheese paratha.jpg?height=200&width=200",
    },
    {
      id: "s6",
      name: "Palak Cheese Paratha",
      description:
        "Healthy and tasty paratha stuffed with spinach and cheese — a nutritious snack option.",
      price: 399,
      image: "/menu/Palak cheese paratha.jpg?height=200&width=200",
    },
    {
      id: "s7",
      name: "Pizza Chips",
      description:
        "Crispy chips topped with pizza sauce, cheese, and seasoning — the best of both worlds.",
      price: 549,
      image: "/menu/Pizza chips.jpg?height=200&width=200",
    },
    {
      id: "s8",
      name: "Extreme Loaded Chips",
      description:
        "Fully loaded chips with cheese, sauces, jalapeños, and spicy toppings for maximum flavor.",
      price: 549,
      image: "/menu/Extreme loaded chips.jpg?height=200&width=200",
    },
    {
      id: "s9",
      name: "Bbq Chips",
      description:
        "Crunchy chips coated with smoky BBQ seasoning — bold and flavorful in every bite.",
      price: 499,
      image: "/menu/Bbq chips.jpg?height=200&width=200",
    },
    {
      id: "s10",
      name: "Jalapeno Cheese Chips",
      description:
        "Spicy jalapeños and hot cheese melted over crispy chips — fiery and addictive.",
      price: 579,
      image: "/menu/Jalapeno cheese chips.jpg?height=200&width=200",
    },
    {
      id: "s11",
      name: "Malai Paratha",
      description:
        "Soft paratha layered with rich, creamy malai — a deliciously indulgent treat.",
      price: 299,
      image: "/menu/Malai paratha.jpg?height=200&width=200",
    },
    {
      id: "s12",
      name: "Bergg Salad",
      description:
        "A refreshing mix of fresh vegetables, olives, and cheese — light yet satisfying.",
      price: 449,
      image: "/menu/Bergg salad.jpg?height=200&width=200",
    },
  ],
  desserts: [
    {
      id: "d1",
      name: "Ferrero Classic",
      description:
        "Chocolate hazelnut cake with a rich chocolate ganache and hazelnut topping",
      price: 419,
      image: "/menu/Ferrero classic.jpg?height=200&width=200",
    },
    {
      id: "d2",
      name: "Lotus Biscoff",
      description: "Creamy cheesecake with a biscoff crust and caramel drizzle",
      price: 499,
      image: "/menu/Lotus biscoff.jpg?height=200&width=200",
    },
    {
      id: "d3",
      name: "Frank Toast",
      description:
        "French toast with a crispy coating, served with maple syrup and berries",
      price: 299,
      image: "/menu/Frank toast.jpg?height=200&width=200",
    },
    {
      id: "d4",
      name: "Lotus Cream",
      description: "Creamy cheesecake with a biscoff crust and caramel drizzle",
      price: 329,
      image: "/menu/Lotus cream.jpg?height=200&width=200",
    },
    {
      id: "d5",
      name: "Double Chocolate",
      description:
        "Rich chocolate cake with layers of chocolate ganache and frosting",
      price: 329,
      image: "/menu/Double chocalte.jpg?height=200&width=200",
    },
    {
      id: "d6",
      name: "Salted Caramel",
      description:
        "Decadent salted caramel cake with layers of caramel frosting",
      price: 329,
      image: "/menu/Salted caramel.jpg?height=200&width=200",
    },
    {
      id: "d7",
      name: "Lotus Vanilla Cream",
      description: "Creamy cheesecake with a biscoff crust and caramel drizzle",
      price: 449,
      image: "/menu/Lotus Cake.jpg?height=200&width=200",
    },
  ],
};

interface MenuSectionProps {
  title: string;
  id: "Pizza" | "Burgers" | "Pasta" | "Panini" | "Snacks" | "desserts";
  description: string;
}

export default function MenuSection({
  title,
  id,
  description,
}: MenuSectionProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (item: (typeof menuItems.Pizza)[0]) => {
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
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id={id} className="mb-16" ref={ref}>
      <h2 className="text-2xl md:text-3xl font-bold mb-2 section-heading">
        {title}
      </h2>
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
                  <div className="sm:w-1/3 h-40 ">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="sm:w-2/3 p-4">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-lg">{item.name}</h3>
                      <span className="text-primary font-semibold">
                        Rs. {item.price}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm my-2">
                      {item.description}
                    </p>
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
  );
}
