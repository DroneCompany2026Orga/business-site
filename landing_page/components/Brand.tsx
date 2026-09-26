import Link from "next/link";
import Image from "next/image";
import { brand } from "@/config/brand";

export function BrandMark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 36 36"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="m7 9 11 6 11-6M7 9v13l11 6 11-6V9M18 15v13M7 22l11-7 11 7"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      {[
        [7, 9],
        [18, 15],
        [29, 9],
        [7, 22],
        [18, 28],
        [29, 22],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3" fill="currentColor" />
      ))}
    </svg>
  );
}

export function Brand({ footer = false }: { footer?: boolean }) {
  return (
    <Link
      className={`brand ${footer ? "brand-footer" : ""}`}
      href="/"
      aria-label={`${brand.name} home`}
    >
      {brand.logo ? (
        <Image src={brand.logo} alt="" width={36} height={36} unoptimized />
      ) : (
        <BrandMark />
      )}
      <span>{brand.wordmark}</span>
    </Link>
  );
}
