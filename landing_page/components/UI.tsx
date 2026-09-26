import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

export function Eyebrow({
  children,
  number,
}: {
  children: ReactNode;
  number?: string;
}) {
  return (
    <div className="eyebrow">
      {number ? (
        <span className="section-number">{number}</span>
      ) : (
        <span className="status-dot" />
      )}{" "}
      {children}
    </div>
  );
}
export function SectionHeading({
  eyebrow,
  number,
  title,
  description,
}: {
  eyebrow: string;
  number: string;
  title: ReactNode;
  description?: string;
}) {
  return (
    <div className="section-heading">
      <Eyebrow number={number}>{eyebrow}</Eyebrow>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}
export function TextLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a className="text-link" href={href}>
      {children}
      <ArrowUpRight size={16} aria-hidden="true" />
    </a>
  );
}
