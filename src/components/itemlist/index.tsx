import { motion, AnimatePresence } from "framer-motion";
import { ItemCard } from "../itemcard";
import { Item } from "../../types/item";
import { toast } from "sonner";

interface Props {
  items: Item[];
  onEdit: (item: Item) => void;
  onDelete: (id: string) => void;
}

const listVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};

export function ItemList({ items, onEdit, onDelete }: Props) {
  if (items.length === 0) return <div />;

  return (
    <motion.div
      className="flex flex-col gap-3"
      variants={listVariants}
      initial="hidden"
      animate="visible"
    >
      <AnimatePresence>
        {items.map((item) => (
          <motion.div key={item.id} variants={itemVariants} exit="exit">
            <ItemCard
              item={item}
              onEdit={() => onEdit(item)}
              onDelete={() => {
                onDelete(item.id);
                toast.warning("Item deleted");
              }}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
