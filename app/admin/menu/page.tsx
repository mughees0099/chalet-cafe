import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MenuItemsTable } from "@/components/admin/menu/menu-items-table"
import { CategoriesManager } from "@/components/admin/menu/categories-manager"
import { AddMenuItemForm } from "@/components/admin/menu/add-menu-item-form"
import { PageHeader } from "@/components/ui/page-header"

export default function MenuManagementPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Menu Management" description="Add, edit, and manage your cafe's menu items and categories." />

      <Tabs defaultValue="items" className="w-full">
        <TabsList className="grid w-full md:w-auto grid-cols-3">
          <TabsTrigger value="items">Menu Items</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="add">Add New Item</TabsTrigger>
        </TabsList>

        <TabsContent value="items" className="mt-6">
          <MenuItemsTable />
        </TabsContent>

        <TabsContent value="categories" className="mt-6">
          <CategoriesManager />
        </TabsContent>

        <TabsContent value="add" className="mt-6">
          <AddMenuItemForm />
        </TabsContent>
      </Tabs>
    </div>
  )
}
