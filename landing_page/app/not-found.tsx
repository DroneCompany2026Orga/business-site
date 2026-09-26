import Link from "next/link";
export default function NotFound() {
  return (
    <main id="main" className="container not-found">
      <div className="eyebrow">404 / NODE NOT FOUND</div>
      <h1>This route is offline.</h1>
      <p>The page you’re looking for doesn’t exist.</p>
      <Link href="/" className="button button-primary">
        Return to the platform ↗
      </Link>
    </main>
  );
}
