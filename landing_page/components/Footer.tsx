import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Brand } from "./Brand";
import { brand } from "@/config/brand";
export function Footer() {
  return (
    <footer className="site-footer container">
      <div className="footer-top">
        <div>
          <Brand footer />
          <p>{brand.tagline}</p>
        </div>
        <div className="footer-links">
          <div>
            <h3>Platform</h3>
            <Link href="/#architecture">Architecture</Link>
            <Link href="/#simulation">Simulation</Link>
            <Link href="/#integrations">Integrations</Link>
          </div>
          <div>
            <h3>Company</h3>
            <Link href="/#vision">Our vision</Link>
            <Link href="/#contact">Contact</Link>
          </div>
          <div>
            <h3>Developers</h3>
            <Link href="/developers">
              Integration guide <ArrowUpRight size={12} />
            </Link>
            <Link href="/developers#interface">
              API concept <ArrowUpRight size={12} />
            </Link>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} {brand.name}. All rights reserved.
        </span>
        <span className="mono">
          <span className="status-dot" /> INDEPENDENT MACHINES. COLLECTIVE
          POSSIBILITY.
        </span>
        <Link href="#top">Back to top ↑</Link>
      </div>
    </footer>
  );
}
