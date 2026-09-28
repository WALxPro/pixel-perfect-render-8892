// Single place for every external link on the site. Replace placeholders with real URLs.
export const siteConfig = {
  author: "John T. Rhoads",
  bookTitle: "Hope for the Wolf",
  tagline: "Author of dark paranormal romance where love, loyalty and the wolf collide.",
  email: "hello@johntrhoads.com",
  credit: { name: "Chicagowrite", url: "https://chicagowrite.com" },
};

export const retailers = [
  { name: "Amazon", url: "https://www.amazon.com" },
  { name: "Amazon Kindle", url: "https://www.amazon.com/kindle" },
  { name: "Apple Books", url: "https://books.apple.com" },
  { name: "Kobo", url: "https://www.kobo.com" },
  { name: "Barnes & Noble", url: "https://www.barnesandnoble.com" },
];

export const amazonUrl = retailers[0].url;

export const socials = [
  { name: "Facebook", url: "https://facebook.com" },
  { name: "Instagram", url: "https://instagram.com" },
  { name: "X", url: "https://x.com" },
  { name: "TikTok", url: "https://tiktok.com" },
  { name: "Goodreads", url: "https://goodreads.com" },
  { name: "YouTube", url: "https://youtube.com" },
];

export const navLinks = [
  { label: "Home", to: "/" },
  { label: "About the Book", to: "/about-the-book" },
  { label: "About the Author", to: "/about-the-author" },
  { label: "Contact Us", to: "/contact" },
  { label: "FAQs", to: "/faqs" },
] as const;
