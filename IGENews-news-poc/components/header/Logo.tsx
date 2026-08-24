import Link from "next/link";
import Image from "next/image";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center shrink-0">
      <Image
        src="/IGEN NEWS - White Background - Rectangle.svg"
        alt="India Global News"
        width={160}
        height={40}
        className="h-9 w-auto object-contain"
        priority
      />
    </Link>
  );
}

