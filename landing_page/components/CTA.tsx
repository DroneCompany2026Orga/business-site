import { ContactButton } from "./ContactProvider";
import { Eyebrow } from "./UI";
export function CTA() {
  return (
    <section id="contact" className="cta-section">
      <div className="container">
        <div>
          <Eyebrow>LET’S BUILD WHAT CONNECTS US</Eyebrow>
          <h2>Build with the swarm.</h2>
          <p>
            For robotics teams, autonomous-system manufacturers,
            <br className="desktop-break" /> and organizations exploring what
            machines can do together.
          </p>
        </div>
        <div className="cta-actions">
          <ContactButton />
          <ContactButton secondary intent="partnership">
            Talk to the team
          </ContactButton>
          <span className="mono">
            INTEGRATIONS · SIMULATION · EARLY PARTNERSHIPS
          </span>
        </div>
      </div>
    </section>
  );
}
