import { SiteFooter } from "@/components/layout/footer/site-footer"
import { SiteHeader } from "@/components/layout/header/site-header"
import { About } from "@/components/sections/about/about"
import { Contact } from "@/components/sections/contact/contact"
import { Hero } from "@/components/sections/hero/hero"
import { Projects } from "@/components/sections/projects/projects"
import { Skills } from "@/components/sections/skills/skills"
import { siteConfig, socials } from "@/config/site"

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  jobTitle: siteConfig.role,
  url: siteConfig.url,
  email: `mailto:${siteConfig.email}`,
  worksFor: { "@type": "Organization", name: "Hyperface" },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bengaluru",
    addressCountry: "IN",
  },
  sameAs: socials.map((s) => s.href),
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <SiteHeader />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <SiteFooter />
    </>
  )
}
