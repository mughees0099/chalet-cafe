import MainLayout from "@/components/layout/main-layout"
import MenuSection from "@/components/menu/menu-section"
import MenuFilters from "@/components/menu/menu-filters"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Menu | Chalet Cafe Islamabad",
  description: "Explore our delicious menu of coffee, breakfast, lunch, and desserts",
}

export default function MenuPage() {
  return (
    <MainLayout>
      <div className="pt-24 pb-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 section-heading">Our Menu</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our carefully crafted menu featuring premium coffee, delicious breakfast options, hearty lunch
              selections, and indulgent desserts
            </p>
          </div>

          <MenuFilters />

          <div className="mt-12">
            <MenuSection
              title="Coffee & Beverages"
              id="coffee"
              description="Premium coffee and specialty drinks crafted by our expert baristas"
            />

            <MenuSection
              title="Breakfast"
              id="breakfast"
              description="Start your day right with our delicious breakfast options"
            />

            <MenuSection
              title="Lunch & Mains"
              id="lunch"
              description="Hearty and satisfying lunch options for a perfect midday meal"
            />

            <MenuSection
              title="Desserts & Pastries"
              id="desserts"
              description="Sweet treats and indulgent desserts to satisfy your cravings"
            />
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
