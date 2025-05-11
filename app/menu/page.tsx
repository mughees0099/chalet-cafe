import MainLayout from "@/components/layout/main-layout";
import MenuSection from "@/components/menu/menu-section";
import MenuFilters from "@/components/menu/menu-filters";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Menu | Chalet Cafe Islamabad",
  description:
    "Explore our delicious menu of coffee, breakfast, lunch, and desserts",
};

export default function MenuPage() {
  return (
    <MainLayout>
      <div className="pt-24 pb-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 section-heading">
              Our Menu
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our carefully crafted menu featuring premium coffee,
              delicious breakfast options, hearty lunch selections, and
              indulgent desserts
            </p>
          </div>

          <MenuFilters />

          <div className="mt-12">
            <MenuSection
              title="Pizza"
              id="Pizza"
              description="Delicious pizzas made with fresh ingredients and unique toppings"
            />

            <MenuSection
              title="Burgers"
              id="Burgers"
              description="Juicy burgers with a variety of toppings and sides"
            />

            <MenuSection
              title="Pasta"
              id="Pasta"
              description="Tasty pasta dishes with a range of sauces and ingredients"
            />
            <MenuSection
              title="Panini"
              id="Panini"
              description="Grilled panini sandwiches with a variety of fillings"
            />
            <MenuSection
              title="Snacks"
              id="Snacks"
              description="Light bites and snacks to complement your meal"
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
  );
}
