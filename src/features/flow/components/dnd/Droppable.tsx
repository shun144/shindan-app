import { useDroppable } from "@dnd-kit/core";
import { memo, PropsWithChildren } from "react";
import { tv } from "tailwind-variants";

type Props = {
  id: string;
  className?: string;
};

const panelTv = tv({
  base: "bg-slate-950 w-full"
})

const Droppable = ({ children, id, className }: PropsWithChildren<Props>) => {
  const { setNodeRef } = useDroppable({ id });
  return (
    <div ref={setNodeRef} className={panelTv({ className })}>
      {children}
    </div>
  );
};

export default memo(Droppable);
