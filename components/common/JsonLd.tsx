import Script from "next/script";

export default function JsonLd() {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.coroaflores24hrs.com.br";
  const org = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Coroas & Homenagens",
    url: base,
    logo: `${base}/favicon.ico`,
    contactPoint: [{ "@type": "ContactPoint", telephone: "+55-41-99904-3865", contactType: "customer service", areaServed: "BR" }],
  };
  const website = { "@context": "https://schema.org", "@type": "WebSite", url: base, name: "Coroas & Homenagens" };
  return (
    <>
      <Script id="ld-org" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }} />
      <Script id="ld-website" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }} />
    </>
  );
}
