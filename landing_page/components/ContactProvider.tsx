"use client";
import {
  createContext,
  useContext,
  useRef,
  useState,
  type ReactNode,
  type FormEvent,
} from "react";
import { ArrowUpRight, Check, Download, X } from "lucide-react";
import { brand } from "@/config/brand";

type Intent = "demo" | "partnership";
const ContactContext = createContext<{
  openContact: (intent?: Intent) => void;
}>({ openContact: () => {} });
export const useContact = () => useContext(ContactContext);

export function ContactProvider({
  children,
  enabled,
}: {
  children: ReactNode;
  enabled: boolean;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [intent, setIntent] = useState<Intent>("demo");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [error, setError] = useState("");
  const openContact = (value: Intent = "demo") => {
    setIntent(value);
    setStatus("idle");
    dialog.current?.showModal();
    document.body.style.overflow = "hidden";
  };
  const close = () => {
    dialog.current?.close();
    document.body.style.overflow = "";
  };
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    if (!enabled) {
      const draft = `${brand.name} — ${intent === "demo" ? "Demo request" : "Partnership inquiry"}\n\nName: ${data.name}\nEmail: ${data.email}\nOrganization: ${data.organization}\n\n${data.message}\n\nThis is a locally prepared inquiry. It has not been sent.`;
      const url = URL.createObjectURL(
        new Blob([draft], { type: "text/plain;charset=utf-8" }),
      );
      const a = document.createElement("a");
      a.href = url;
      a.download = `${brand.name.toLowerCase()}-inquiry.txt`;
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      setStatus("success");
      return;
    }
    setStatus("loading");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, intent }),
      });
      if (!response.ok)
        throw new Error(
          (await response.json()).error ||
            "Your request could not be sent. Please try again.",
        );
      setStatus("success");
      form.reset();
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "Unable to connect. Please try again.",
      );
      setStatus("error");
    }
  }
  return (
    <ContactContext.Provider value={{ openContact }}>
      {children}
      <dialog
        ref={dialog}
        className="contact-dialog"
        aria-labelledby="contact-title"
        onCancel={close}
        onClose={() => {
          document.body.style.overflow = "";
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        <div className="dialog-body">
          <button
            className="icon-button dialog-close"
            aria-label="Close contact form"
            onClick={close}
          >
            <X size={20} />
          </button>
          <div className="eyebrow">
            <span className="status-dot" />
            LET’S CONNECT
          </div>
          <h2 id="contact-title">
            {intent === "demo"
              ? "See what’s possible."
              : "Build with the swarm."}
          </h2>
          {status === "success" ? (
            <div className="contact-success" role="status">
              <Check size={32} />
              <h3>
                {enabled ? "Request received." : "Your inquiry is ready."}
              </h3>
              <p>
                {enabled
                  ? "Thank you. Our team will follow up using the email you provided."
                  : "Your inquiry has been downloaded. This preview does not transmit or store your information."}
              </p>
              <button className="button" onClick={close}>
                Back to exploring <ArrowUpRight size={16} />
              </button>
            </div>
          ) : (
            <>
              <p>
                Tell us a little about your systems and what you want to
                connect.
              </p>
              {!enabled && (
                <p className="preview-notice">
                  Preview mode — prepare and download an inquiry. No information
                  is sent.
                </p>
              )}
              <form onSubmit={submit}>
                <div className="form-row">
                  <label>
                    Your name
                    <input
                      name="name"
                      autoComplete="name"
                      required
                      maxLength={100}
                      placeholder="Alex Morgan"
                    />
                  </label>
                  <label>
                    Work email
                    <input
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      maxLength={254}
                      placeholder="alex@company.com"
                    />
                  </label>
                </div>
                <label>
                  Organization
                  <input
                    name="organization"
                    autoComplete="organization"
                    required
                    maxLength={200}
                    placeholder="Company or research team"
                  />
                </label>
                <label>
                  What are you working on?
                  <textarea
                    name="message"
                    required
                    minLength={10}
                    maxLength={3000}
                    rows={4}
                    placeholder="Your platforms, use case, or integration goals…"
                  />
                </label>
                <label className="honeypot" aria-hidden="true">
                  Website
                  <input name="website" tabIndex={-1} autoComplete="off" />
                </label>
                {status === "error" && (
                  <p className="form-error" role="alert">
                    {error}
                  </p>
                )}
                <button
                  className="button button-primary"
                  disabled={status === "loading"}
                  type="submit"
                >
                  {status === "loading"
                    ? "Sending…"
                    : enabled
                      ? "Send request"
                      : "Download inquiry"}
                  {enabled ? (
                    <ArrowUpRight size={17} />
                  ) : (
                    <Download size={17} />
                  )}
                </button>
                <p className="form-note">
                  {enabled
                    ? "Your details are used only to respond to this inquiry."
                    : "The downloaded file stays on your device."}
                </p>
              </form>
            </>
          )}
        </div>
      </dialog>
    </ContactContext.Provider>
  );
}

export function ContactButton({
  children = "Request a demo",
  secondary = false,
  intent = "demo",
}: {
  children?: ReactNode;
  secondary?: boolean;
  intent?: Intent;
}) {
  const { openContact } = useContact();
  return (
    <button
      className={`button ${secondary ? "button-outline" : "button-primary"}`}
      onClick={() => openContact(intent)}
    >
      {children}
      <ArrowUpRight size={17} aria-hidden="true" />
    </button>
  );
}
