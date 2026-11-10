import { Coffee, ArrowRight, MapPin, Clock, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

function InstagramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function TwitterIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}

const links = ["Menu", "Story", "Visit"];

const menu = [
  {
    name: "Signature Espresso",
    note: "Double shot, caramelised sugar, dark cocoa finish",
    price: "3.50",
    image: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Pour Over",
    note: "Single-origin beans, brewed slowly by hand",
    price: "5.00",
    image: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Matcha Latte",
    note: "Ceremonial matcha whisked with steamed oat milk",
    price: "5.50",
    image: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Almond Croissant",
    note: "Baked each morning, filled with almond cream",
    price: "4.25",
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80",
  },
];

const socials = [
  { icon: InstagramIcon, label: "Instagram" },
  { icon: FacebookIcon, label: "Facebook" },
  { icon: TwitterIcon, label: "Twitter" },
];

function Navbar() {
  const { token } = useAuth();

  return (
    <header className="absolute inset-x-0 top-0 z-10">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 md:px-10">
        <a href="#top" className="flex items-center gap-2 text-[#3b2a20]">
          <Coffee className="h-5 w-5" strokeWidth={1.5} />
          <span className="font-['Fraunces',serif] text-xl tracking-tight">Maison Mocha</span>
        </a>
        <div className="flex items-center gap-6 text-sm text-[#6b5444] sm:gap-10">
          <ul className="flex items-center gap-6 sm:gap-10">
            {links.map((link) => (
              <li key={link}>
                <a
                  href={`#${link.toLowerCase()}`}
                  className="relative pb-1 transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-[#3b2a20] after:transition-all after:duration-300 hover:text-[#3b2a20] hover:after:w-full"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
          {token ? (
            <Link
              to="/dashboard"
              className="flex items-center gap-2 rounded-full bg-[#3b2a20] px-5 py-2.5 text-sm text-[#f7f1e8] transition-all duration-300 hover:bg-[#2a1b13] hover:shadow-md hover:shadow-[#3b2a20]/20"
            >
              <User className="h-4 w-4" strokeWidth={1.5} />
              Dashboard
            </Link>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-2 rounded-full bg-[#3b2a20] px-5 py-2.5 text-sm text-[#f7f1e8] transition-all duration-300 hover:bg-[#2a1b13] hover:shadow-md hover:shadow-[#3b2a20]/20"
            >
              Sign in
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="mx-auto grid max-w-6xl items-center gap-12 px-6 pb-20 pt-32 md:grid-cols-2 md:gap-8 md:px-10 md:pb-28 md:pt-40">
      <div className="order-2 md:order-1">
        <h1 className="font-['Fraunces',serif] text-5xl font-light leading-[1.05] tracking-tight text-[#2a1b13] sm:text-6xl lg:text-7xl">
          Crafted with passion, poured with care.
        </h1>
        <p className="mt-6 max-w-md text-base leading-relaxed text-[#6b5444] sm:text-lg">
          Small-batch coffee and fresh pastries in a quiet corner of the city. Come in, slow down, and stay a while.
        </p>
        <a
          href="#menu"
          className="group mt-10 inline-flex items-center gap-3 rounded-full bg-[#3b2a20] px-8 py-4 text-sm text-[#f7f1e8] transition-all duration-300 hover:bg-[#2a1b13] hover:shadow-lg hover:shadow-[#3b2a20]/20"
        >
          View Menu
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </a>
      </div>
      <div className="order-1 mx-auto w-full max-w-sm md:order-2 md:max-w-md">
        <div className="aspect-[4/5] overflow-hidden rounded-t-full rounded-b-3xl bg-[#e6d8c6]">
          <img
            src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1000&q=80"
            alt="A cup of coffee on a wooden table"
            className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
          />
        </div>
      </div>
    </section>
  );
}

function FeaturedMenu() {
  return (
    <section id="menu" className="bg-[#efe4d3] px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 flex flex-col gap-3 md:mb-16 md:flex-row md:items-end md:justify-between">
          <h2 className="font-['Fraunces',serif] text-4xl font-light tracking-tight text-[#2a1b13] md:text-5xl">
            Our favourites
          </h2>
          <p className="max-w-xs text-[#6b5444]">The four things our regulars order most.</p>
        </div>
        <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {menu.map((item) => (
            <article key={item.name} className="group">
              <div className="aspect-square overflow-hidden rounded-2xl bg-[#e0cfb8]">
                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="mt-5 flex items-baseline justify-between gap-4">
                <h3 className="font-['Fraunces',serif] text-xl text-[#2a1b13] transition-colors duration-300 group-hover:text-[#8a5a3c]">
                  {item.name}
                </h3>
                <span className="text-[#8a5a3c]">${item.price}</span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-[#6b5444]">{item.note}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="visit" className="bg-[#2a1b13] px-6 py-16 text-[#e9dccb] md:px-10 md:py-20">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <Coffee className="h-5 w-5" strokeWidth={1.5} />
            <span className="font-['Fraunces',serif] text-xl">Maison Mocha</span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-[#b9a690]">
            Coffee roasted slowly, served warmly.
          </p>
        </div>
        <div className="space-y-6 text-sm">
          <div className="flex items-start gap-3">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#c9a27e]" strokeWidth={1.5} />
            <p className="leading-relaxed">
              24 Linden Street
              <br />
              Old Town
            </p>
          </div>
          <div className="flex items-start gap-3">
            <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[#c9a27e]" strokeWidth={1.5} />
            <p className="leading-relaxed">
              Mon–Fri, 7am–6pm
              <br />
              Sat–Sun, 8am–5pm
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3 md:justify-end">
          {socials.map(({ icon: Icon, label }) => (
            <a
              key={label}
              href="#top"
              aria-label={label}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#5a4334] transition-all duration-300 hover:-translate-y-1 hover:border-[#c9a27e] hover:bg-[#c9a27e] hover:text-[#2a1b13]"
            >
              <Icon className="h-4 w-4" strokeWidth={1.5} />
            </a>
          ))}
        </div>
      </div>
      <p className="mx-auto mt-14 max-w-6xl border-t border-[#43301f] pt-6 text-xs text-[#8f7a66]">
        © 2026 Maison Mocha
      </p>
    </footer>
  );
}

export default function App() {
  return (
    <div className="relative min-h-screen scroll-smooth bg-[#faf6ef] font-['DM_Sans',sans-serif] antialiased selection:bg-[#c9a27e]/40">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500&family=Fraunces:opsz,wght@9..144,300;9..144,400&display=swap'); html{scroll-behavior:smooth}`}</style>
      <Navbar />
      <main>
        <Hero />
        <FeaturedMenu />
      </main>
      <Footer />
    </div>
  );
}