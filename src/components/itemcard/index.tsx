import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Item } from "../../types/item";

interface Props {
  item: Item;
  onEdit: () => void;
  onDelete: () => void;
}

export function ItemCard({ item, onEdit, onDelete }: Props) {
  return (
    <Card className="p-4 flex flex-row items-center justify-between hover:shadow-md transition-shadow border border-gray-200">
      <div className="flex flex-col">
        <p className="text-sm text-gray-400">{item.createdAt}</p>
        <h3 className="font-medium">{item.title}</h3>
        <p className="text-gray-600 text-sm">{item.subtitle}</p>
      </div>

      <div className="flex gap-2">
        <Button variant="outline" onClick={onEdit}>
          Edit
        </Button>
        <Button variant="destructive" onClick={onDelete}>
          Delete
        </Button>
      </div>
    </Card>
  );
}
