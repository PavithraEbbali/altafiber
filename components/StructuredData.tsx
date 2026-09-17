import {
  site,
  plans,
  faqs,
  startingPrice,
  speedLabel,
  telHref,
  siteUrl,
} from "@/lib/content";

/**
 * schema.org JSON-LD for the landing page.
 *
 * Generated entirely from lib/content.ts, which matters for more than tidiness:
 * search engines penalise structured data that disagrees with what a visitor
 * can actually see, and deriving both from one source makes a mismatch
 * impossible. Plans without a published rate emit no `price`, so we never
 * assert a number we are not showing.
 */
export default function StructuredData() {
  const priced = plans.filter((p) => typeof p.price === "number");

  const organization = {
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: site.legalEntity,
    alternateName: site.retailer,
    url: siteUrl,
    logo: `${siteUrl}/icon.svg`,
    description: site.disclosure,
    telephone: telHref.replace("tel:", ""),
    address: {
      "@type": "PostalAddress",
      streetAddress: site.mailingAddress,
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: telHref.replace("tel:", ""),
      contactType: "sales",
      availableLanguage: "English",
    },
  };

  const website = {
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: site.retailer,
    publisher: { "@id": `${siteUrl}/#organization` },
    inLanguage: "en-US",
  };

  const offerCatalog = {
    "@type": "OfferCatalog",
    "@id": `${siteUrl}/#plans`,
    name: `${site.brandName} plans available through ${site.retailer}`,
    itemListElement: priced.map((plan, i) => ({
      "@type": "Offer",
      position: i + 1,
      name: plan.name,
      description: plan.speedDown
        ? `${speedLabel(plan.speedDown)} symmetrical fiber internet.`
        : plan.features[0],
      price: plan.price,
      priceCurrency: "USD",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: plan.price,
        priceCurrency: "USD",
        unitCode: "MON",
        billingIncrement: 1,
      },
      availability: "https://schema.org/InStock",
      seller: { "@id": `${siteUrl}/#organization` },
      category: plan.serviceLine,
    })),
  };

  const service = {
    "@type": "Service",
    "@id": `${siteUrl}/#service`,
    serviceType: "Fiber internet ordering",
    provider: { "@id": `${siteUrl}/#organization` },
    brand: { "@type": "Brand", name: site.brandName },
    areaServed: { "@type": "Country", name: "United States" },
    description: `Order ${site.brandName} Fioptics fiber internet, Fioptics+ TV and Home Phone service by phone. Symmetrical speeds from $${startingPrice}/mo with unlimited data.`,
    hasOfferCatalog: { "@id": `${siteUrl}/#plans` },
  };

  const faqPage = {
    "@type": "FAQPage",
    "@id": `${siteUrl}/#faq`,
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const graph = {
    "@context": "https://schema.org",
    "@graph": [organization, website, service, offerCatalog, faqPage],
  };

  return (
    <script
      type="application/ld+json"
      // Escaping `<` keeps the payload from terminating the script element.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(graph).replace(/</g, "\\u003c"),
      }}
    />
  );
}
