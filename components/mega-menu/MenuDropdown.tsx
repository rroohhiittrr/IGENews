import Link from "next/link";

interface MenuDropdownItem {
  label: string;
  href: string;
  external?: boolean;
}

interface MenuDropdownProps {
  items: MenuDropdownItem[];
  onClose: () => void;
}

export default function MenuDropdown({ items, onClose }: MenuDropdownProps) {
  return (
    <div className="mega-menu-dropdown absolute left-0 top-full min-w-[200px] rounded-b-lg border border-t-0 border-[var(--color-neutral-light)] bg-white py-1 shadow-lg">
      {items.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          target={item.external ? "_blank" : undefined}
          rel={item.external ? "noopener noreferrer" : undefined}
          className="flex items-center gap-2 px-4 py-2.5 text-sm text-[var(--color-neutral-dark)] transition-colors hover:bg-[var(--color-neutral-light)] hover:text-[var(--color-primary)]"
          onClick={onClose}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}
