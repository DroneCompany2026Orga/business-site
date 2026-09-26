import {
  ArrowDown,
  ArrowUpRight,
  Play,
  Radio,
  Cpu,
  Workflow,
} from "lucide-react";
import { SwarmNetwork } from "./SwarmNetwork";

export function Hero() {
  return (
    <>
      <section className="hero container" aria-labelledby="hero-title">
        <div className="hero-copy">
          <div className="hero-eyebrow mono">
            <span className="status-dot" />
            THE COORDINATION LAYER FOR AUTONOMY
          </div>
          <h1 id="hero-title">
            One operating
            <br className="desktop-break" /> system.
            <br />
            <span>
              Every autonomous
              <br className="desktop-break" /> machine.
            </span>
          </h1>
          <p>
            Different machines. A common language. Connect aerial drones, ground
            robots, and autonomous platforms into one distributed, intelligent
            swarm.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#platform">
              Explore the platform <ArrowUpRight size={17} />
            </a>
            <a className="button button-quiet" href="#simulation">
              <Play size={14} />
              View simulation
            </a>
          </div>
          <div className="hero-footnote mono">
            <span>HARDWARE AGNOSTIC</span>
            <i /> <span>AI-NATIVE</span>
            <i /> <span>DISTRIBUTED BY DESIGN</span>
          </div>
        </div>
        <SwarmNetwork />
        <a className="hero-scroll mono" href="#platform">
          <ArrowDown size={14} /> EXPLORE THE SYSTEM
        </a>
      </section>
      <div className="platform-strip">
        <div className="container">
          <p>
            Built to connect.
            <br />
            <span>Designed to coordinate.</span>
          </p>
          <div>
            <Workflow />
            <span>Any manufacturer</span>
          </div>
          <div>
            <Radio />
            <span>Any autonomous platform</span>
          </div>
          <div>
            <Cpu />
            <span>One shared intelligence</span>
          </div>
          <span className="strip-label mono">
            SOFTWARE FIRST. <span>SWARM ALWAYS.</span>
          </span>
        </div>
      </div>
    </>
  );
}
