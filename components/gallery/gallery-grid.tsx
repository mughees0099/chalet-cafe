"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GalleryModal from "@/components/gallery/gallery-modal";

const galleryItems = {
  cafe: [
    {
      id: "cafe1",
      src: "/placeholder.svg?height=400&width=600",
      alt: "Cafe Interior",
      caption: "Our cozy interior",
    },
    {
      id: "cafe2",
      src: "/placeholder.svg?height=400&width=600",
      alt: "Outdoor Seating",
      caption: "Outdoor seating area",
    },
    {
      id: "cafe3",
      src: "/placeholder.svg?height=400&width=600",
      alt: "Coffee Bar",
      caption: "Our coffee bar",
    },
    {
      id: "cafe4",
      src: "/placeholder.svg?height=400&width=600",
      alt: "Cafe Entrance",
      caption: "Entrance to Chalet Cafe",
    },
    {
      id: "cafe5",
      src: "/placeholder.svg?height=400&width=600",
      alt: "Lounge Area",
      caption: "Comfortable lounge area",
    },
    {
      id: "cafe6",
      src: "/placeholder.svg?height=400&width=600",
      alt: "Private Room",
      caption: "Private meeting room",
    },
  ],
  food: [
    {
      id: "food1",
      src: "/placeholder.svg?height=400&width=600",
      alt: "Signature Latte",
      caption: "Our famous Signature Latte",
    },
    {
      id: "food2",
      src: "/placeholder.svg?height=400&width=600",
      alt: "Avocado Toast",
      caption: "Freshly made Avocado Toast",
    },
    {
      id: "food3",
      src: "/placeholder.svg?height=400&width=600",
      alt: "Chocolate Fondant",
      caption: "Decadent Chocolate Fondant",
    },
    {
      id: "food4",
      src: "/placeholder.svg?height=400&width=600",
      alt: "Club Sandwich",
      caption: "Classic Club Sandwich",
    },
    {
      id: "food5",
      src: "/placeholder.svg?height=400&width=600",
      alt: "Breakfast Platter",
      caption: "Breakfast Platter",
    },
    {
      id: "food6",
      src: "/placeholder.svg?height=400&width=600",
      alt: "Pasta Dish",
      caption: "Homemade Pasta",
    },
  ],
  events: [
    {
      id: "event1",
      src: "/placeholder.svg?height=400&width=600",
      alt: "Coffee Workshop",
      caption: "Coffee brewing workshop",
    },
    {
      id: "event2",
      src: "/placeholder.svg?height=400&width=600",
      alt: "Live Music",
      caption: "Weekend live music",
    },
    {
      id: "event3",
      src: "/placeholder.svg?height=400&width=600",
      alt: "Book Club",
      caption: "Monthly book club meeting",
    },
    {
      id: "event4",
      src: "/placeholder.svg?height=400&width=600",
      alt: "Art Exhibition",
      caption: "Local artists exhibition",
    },
    {
      id: "event5",
      src: "/placeholder.svg?height=400&width=600",
      alt: "Cooking Class",
      caption: "Cooking masterclass",
    },
    {
      id: "event6",
      src: "/placeholder.svg?height=400&width=600",
      alt: "Birthday Party",
      caption: "Private birthday celebration",
    },
  ],
};

export default function GalleryGrid() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [selectedImage, setSelectedImage] = useState<
    (typeof galleryItems.cafe)[0] | null
  >(null);

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
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div ref={ref}>
      <Tabs defaultValue="cafe" className="w-full">
        <div className="flex justify-center mb-8">
          <TabsList>
            <TabsTrigger value="cafe">Cafe</TabsTrigger>
            <TabsTrigger value="food">Food & Drinks</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="cafe">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {galleryItems.cafe.map((item) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                className="overflow-hidden rounded-lg shadow-md cursor-pointer"
                onClick={() => setSelectedImage(item)}
              >
                <div className="relative group h-64">
                  <img
                    src={item.src || "/placeholder.svg"}
                    alt={item.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <p className="text-white p-4">{item.caption}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </TabsContent>

        <TabsContent value="food">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {galleryItems.food.map((item) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                className="overflow-hidden rounded-lg shadow-md cursor-pointer"
                onClick={() => setSelectedImage(item)}
              >
                <div className="relative group h-64">
                  <img
                    src={item.src || "/placeholder.svg"}
                    alt={item.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <p className="text-white p-4">{item.caption}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </TabsContent>

        <TabsContent value="events">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {galleryItems.events.map((item) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                className="overflow-hidden rounded-lg shadow-md cursor-pointer"
                onClick={() => setSelectedImage(item)}
              >
                <div className="relative group h-64">
                  <img
                    src={item.src || "/placeholder.svg"}
                    alt={item.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <p className="text-white p-4">{item.caption}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </TabsContent>
      </Tabs>

      {/* Image Modal */}
      <GalleryModal
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
        image={selectedImage}
      />
    </div>
  );
}
