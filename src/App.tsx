import { useState } from "react";
import { useItemStore } from "./hooks/useItemStore";
import { Header } from "./components/header";
import { EmptyState } from "./components/empty";
import { ItemList } from "./components/itemlist";
import { ItemModal } from "./components/modal";
import { Item } from "./types/item";
import { toast } from "sonner";

function App() {
  const { items, addItem, updateItem, deleteItem } = useItemStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | null>(null);

  const handleCreateClick = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (item: Item) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleSubmit = (data: { title: string; subtitle: string }) => {
    if (editingItem) {
      updateItem({ ...editingItem, ...data });
      toast.success("Item updated");
    } else {
      addItem(data.title, data.subtitle);
      toast.success("Item created");
    }
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-400/70 flex justify-center p-6">
      <div className="w-full max-w-xl space-y-6">
        <Header onCreate={handleCreateClick} />

        {items.length === 0 ? (
          <EmptyState />
        ) : (
          <ItemList
            items={items}
            onEdit={handleEditClick}
            onDelete={deleteItem}
          />
        )}
      </div>

      <ItemModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        item={editingItem}
      />
    </div>
  );
}

export default App;