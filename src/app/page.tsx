import { SiteRuntime } from "@/components/sites/cobfoods-com-3b75ee17/shared/SiteRuntime";
import { SvgMasks } from "@/components/sites/cobfoods-com-3b75ee17/shared/SvgMasks";
import { SiteAlert } from "@/components/sites/cobfoods-com-3b75ee17/root-8a5edab2/SiteAlert";
import { SiteHeader } from "@/components/sites/cobfoods-com-3b75ee17/root-8a5edab2/SiteHeader";
import { SiteCart } from "@/components/sites/cobfoods-com-3b75ee17/root-8a5edab2/SiteCart";
import { SiteTransition } from "@/components/sites/cobfoods-com-3b75ee17/root-8a5edab2/SiteTransition";
import { SiteNav } from "@/components/sites/cobfoods-com-3b75ee17/root-8a5edab2/SiteNav";
import { SiteNewsletterPopup } from "@/components/sites/cobfoods-com-3b75ee17/root-8a5edab2/SiteNewsletterPopup";
import { HeroChipsSection, HeroTinsSection } from "@/components/sites/cobfoods-com-3b75ee17/root-8a5edab2/HeroSections";
import { FeaturedProductsSection } from "@/components/sites/cobfoods-com-3b75ee17/root-8a5edab2/FeaturedProducts";
import { UgcContentSection } from "@/components/sites/cobfoods-com-3b75ee17/root-8a5edab2/UgcContent";
import {
  MediasSection,
  ScallopRowBurgundy,
  ScallopRowGreen,
  ScallopRowInset,
  SorghumSection,
  TextSimpleSection,
} from "@/components/sites/cobfoods-com-3b75ee17/root-8a5edab2/StoryRows";
import { NutritionChartSection, PartnersSection } from "@/components/sites/cobfoods-com-3b75ee17/root-8a5edab2/PartnersNutrition";
import { FeaturedPostsSection } from "@/components/sites/cobfoods-com-3b75ee17/root-8a5edab2/FeaturedPosts";
import { TestimonialsSection } from "@/components/sites/cobfoods-com-3b75ee17/root-8a5edab2/Testimonials";
import { NewsletterSection } from "@/components/sites/cobfoods-com-3b75ee17/root-8a5edab2/NewsletterRow";
import { SiteFooter } from "@/components/sites/cobfoods-com-3b75ee17/root-8a5edab2/SiteFooter";
import { SiteVideo } from "@/components/sites/cobfoods-com-3b75ee17/root-8a5edab2/SiteVideo";

/** https://cobfoods.com/ — same body structure as the Shopify theme (see docs/research/…/PAGE_TOPOLOGY.md). */
export default function Home() {
  return (
    <>
      <SiteRuntime />
      <SiteTransition />
      <div>
        <div data-scroll-container="">
          <SiteAlert />
          <SiteHeader />
          <SiteCart />
          <SiteNav />
          <SiteNewsletterPopup />
          <main>
            <HeroChipsSection />
            <HeroTinsSection />
            <FeaturedProductsSection />
            <UgcContentSection />
            <ScallopRowBurgundy />
            <SorghumSection />
            <ScallopRowGreen />
            <TextSimpleSection />
            <ScallopRowInset />
            <MediasSection />
            <PartnersSection />
            <FeaturedPostsSection />
            <NutritionChartSection />
            <TestimonialsSection />
            <NewsletterSection />
          </main>
          <SiteFooter />
        </div>
      </div>
      <SiteVideo />
      <SvgMasks />
    </>
  );
}
