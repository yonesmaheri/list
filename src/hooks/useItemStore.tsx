import { useEffect, useState } from "react";
import { Item } from "../types/item";


export function useItemStore() {
  const [items, setItems] = useState<Item[]>(() => {
    const saved = localStorage.getItem('items');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  function addItem(title: string, subtitle: string) {
    const newItem: Item = {
      id: crypto.randomUUID(),
      title,
      subtitle,
      createdAt: new Date().toLocaleString()
    };
    setItems(prev => [...prev, newItem]);
  }

  function updateItem(updated: Item) {
    setItems(prev => prev.map(item => item.id === updated.id ? updated : item));
  }

  function deleteItem(id: string) {
    setItems(prev => prev.filter(item => item.id !== id));
  }

  return {
    items,
    addItem,
    updateItem,
    deleteItem
  };
}
