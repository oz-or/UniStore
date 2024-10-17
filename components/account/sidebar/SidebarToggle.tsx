import { ChevronLeft } from "lucide-react";

type SidebarToggleProps = {
  isOpen: boolean | undefined;
  setIsOpen: (isOpen: boolean) => void;
};

export function SidebarToggle({ isOpen, setIsOpen }: SidebarToggleProps) {
  return (
    <div className="block 1024:hidden absolute top-[12px] -right-[16px] z-20">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-md w-8 h-8 inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium  border border-slate-200 bg-white hover:bg-slate-100 hover:bg-opacity-50"
      >
        <ChevronLeft
          className={`
            h-4 w-4 transition-transform ease-in-out duration-700
            ${isOpen === false ? "rotate-180" : "rotate-0"}`}
        />
      </button>
    </div>
  );
}
