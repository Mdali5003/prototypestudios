import { useEffect } from "react";

const SITE = "https://www.prototypemedia.co";
const DEFAULT_IMAGE = `${SITE}/og-default.jpg`;

interface SEOOptions {
  title: string;
  description: string;
  image?: string;
  path?: string;
  noindex?: boolean;
}

const setMeta = (attr: "name" | "property", key: string, content: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

const setCanonical = (href: string) => {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
};

/** Sets document title + meta/OG/Twitter tags for the current route. Pure DOM,
 * no dependency — a client-rendered SPA, so this is seen by crawlers that execute
 * JS (Google) but not by non-JS social share bots, which only read index.html. */
export const useSEO = ({ title, description, image, path = "", noindex = false }: SEOOptions) => {
  useEffect(() => {
    const fullTitle = title.includes("Prototype Media") ? title : `${title} — Prototype Media`;
    document.title = fullTitle;

    setMeta("name", "description", description);
    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", description);
    setMeta("property", "og:image", image || DEFAULT_IMAGE);
    setMeta("property", "og:url", `${SITE}${path}`);
    setMeta("property", "og:type", "website");
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", image || DEFAULT_IMAGE);
    setMeta("name", "robots", noindex ? "noindex, nofollow" : "index, follow");
    setCanonical(`${SITE}${path}`);
  }, [title, description, image, path, noindex]);
};
