import { FAQ } from "@/components/sections/Faq"
import { Hero } from "@/components/sections/Hero"
import { ContactSection, HomeSections } from "@/components/sections/HomeSections"

export default function Home() {
  return (
    <div className="min-h-screen transition-colors duration-300">
      <Hero id="top" />
      <HomeSections />
      <FAQ id="faq" />
      <ContactSection />
    </div>
  )
}
