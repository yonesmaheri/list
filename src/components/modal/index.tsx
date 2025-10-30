import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Item } from "../../types/item";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { title: string; subtitle: string }) => void;
  item: Item | null;
}

const itemSchema = z.object({
  title: z.string().min(1, "Title is required"),
  subtitle: z.string().min(1, "Subtitle is required")
});

type ItemFormValues = z.infer<typeof itemSchema>;

export function ItemModal({ isOpen, onClose, onSubmit, item }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ItemFormValues>({
    resolver: zodResolver(itemSchema),
    defaultValues: { title: "", subtitle: "" },
  });

  useEffect(() => {
    if (item) {
      reset({ title: item.title, subtitle: item.subtitle });
    } else {
      reset({ title: "", subtitle: "" });
    }
  }, [item, reset]);

  const onFormSubmit = (data: ItemFormValues) => {
    onSubmit(data);
    reset({ title: "", subtitle: "" });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{item ? "Edit Item" : "Create Item"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6 py-2">
          <div className="space-y-1">
            <Label htmlFor="title">Title</Label>
            <Input id="title" {...register("title")} />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="subtitle">Subtitle</Label>
            <Input id="subtitle" {...register("subtitle")} />
            {errors.subtitle && (
              <p className="text-red-500 text-sm">{errors.subtitle.message}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full h-11 text-[15px] font-medium tracking-tight"
          >
            {item ? "Save Changes" : "Create"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
