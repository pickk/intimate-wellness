import type { Metadata } from "next";
import NewsletterSignup from "@/components/NewsletterSignup";

export const metadata: Metadata = {
  title: "About",
  description:
    "IntimateWellness is a health-focused publication sharing evidence-based knowledge on sexual wellness, intimacy, and relationships.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
      <header className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-pink-700 dark:text-pink-300">
          About
        </p>
        <h1 className="mt-3 font-serif text-4xl font-bold tracking-tight text-neutral-900 md:text-5xl dark:text-neutral-100">
          Writing that respects your wellness
        </h1>
      </header>

      <div className="prose-wellness mt-10">
        <p>
          IntimateWellness is an independent publication dedicated to making
          sexual health, intimacy, and relationship knowledge approachable,
          accurate, and free of shame. We believe wellness is holistic — it
          includes the body, the mind, and the connections we share with
          others.
        </p>

        <h2 id="our-mission">Our mission</h2>
        <p>
          Too much of the conversation around sexual wellness is either
          sensationalized or silenced. We sit in the honest middle: clear
          explainers, practical guides, and thoughtful product reviews written
          by clinicians and journalists who care about getting it right.
        </p>

        <h2 id="what-we-cover">What we cover</h2>
        <p>
          Our articles fall into a few broad areas: foundational sexual health
          knowledge, product buying guides and reviews, intimacy and
          relationship communication, and hygiene and maintenance best
          practices. Everything we publish is reviewed for accuracy and kept
          tasteful and educational.
        </p>

        <h2 id="editorial-principles">Editorial principles</h2>
        <ul>
          <li>
            <strong>Evidence first.</strong> We cite reputable sources and
            distinguish established science from emerging research.
          </li>
          <li>
            <strong>No shame, no pressure.</strong> We write for adults making
            their own informed choices.
          </li>
          <li>
            <strong>Independence.</strong> Product reviews reflect honest
            assessments, not paid placement.
          </li>
        </ul>

        <h2 id="a-note-on-content">A note on content</h2>
        <p>
          This site is intended for adults and is educational in nature. It is
          not a substitute for personalized medical advice. If you have
          specific health concerns, please consult a qualified healthcare
          professional.
        </p>
      </div>

      <div className="mt-16">
        <NewsletterSignup />
      </div>
    </div>
  );
}
