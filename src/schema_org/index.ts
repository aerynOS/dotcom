import { SITE } from "@/data/constants"

export function schema_web_page({
  path,
  name,
  description,
}: {
  path: string,
  name: string,
  description: string
}): any {
  let url = `https://aerynos.com${path}`
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": url,
    "url": url,
    "name": `${name} | ${SITE.title}`,
    "description": description,
    "isPartOf": {
      "@type": "WebSite",
      "url": "https://aerynos.com",
      "name": "aerynOS",
      "description": "Redefining Linux for the modern era.",
    },
    "inLanguage": "en-US"
  }
}
