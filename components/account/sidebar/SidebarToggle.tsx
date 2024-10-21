import { ChevronLeft } from "lucide-react";

type SidebarToggleProps = {
  isOpen: boolean | undefined;
  setIsOpen: (isOpen: boolean) => void;
};

export function SidebarToggle({ isOpen, setIsOpen }: SidebarToggleProps) {
  return (
    <div className="block 1024:hidden absolute top-[22px] 750:top-[56px] right-[-8px] z-20">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-md w-[18px] h-[18px] inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium border border-slate-200 bg-white hover:bg-slate-100 hover:bg-opacity-50"
      >
        <ChevronLeft
          className={`
            h-[14px] w-[14px] transition-transform ease-in-out duration-700
            ${isOpen === false ? "rotate-180" : "rotate-0"}`}
        />
      </button>
    </div>
  );
}
