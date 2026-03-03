import Link from "next/link";
import Image from "next/image";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 shrink-0">
      {/* Brand icon — IGExpoNews logo */}
      <div className="flex h-9 w-9 items-center justify-center shrink-0">
        <Image
          src="/images/IGExpoNews_logo.svg"
          alt="IGENews Brand Icon"
          width={36}
          height={36}
          className="object-contain"
          priority
        />
      </div>
      {/* Full website logo — IGENews logo */}
      <div className="hidden sm:flex items-center">
        <Image
          src="/images/IGENews_logo.svg"
          alt="India Global Expo News"
          width={120}
          height={36}
          className="object-contain"
          priority
        />
      </div>
    </Link>
  );
}
