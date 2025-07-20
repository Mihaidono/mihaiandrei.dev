import Link from "next/link";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About Me", href: "/about" },
  { name: "Projects", href: "/projects" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Navbar */}
      <header className="w-full px-6 py-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            YourName
          </Link>
          <nav className="space-x-4 hidden sm:block">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium hover:underline"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* Page content */}
      <main className="px-4 py-10">{children}</main>
    </div>
  );
}
