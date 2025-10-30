import { Button } from "../ui/button";

interface Props {
  onCreate: () => void;
}

export function Header({ onCreate }: Props) {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-semibold">List Management</h1>
      <Button className="px-5 h-10" onClick={onCreate}>
        Create
      </Button>
    </div>
  );
}
