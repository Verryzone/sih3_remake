import React from "react";
import Image from "next/image";
import { Container } from "@/components/layout/Container";

/**
 * Hero for the dataset and flood-routing pages. Same treatment as the homepage
 * hero (photo + dark tint) so the pages read as one product. From `sm` up the
 * height is fixed (330px) and the description is clamped to 3 lines, so every
 * menu shows an identical hero regardless of copy length.
 */
export function DatasetHero({
  kicker,
  title,
  description,
}: {
  kicker: string;
  title: string;
  description: string;
}) {
  return (
    <section className="relative flex min-h-[320px] items-center overflow-hidden bg-[#3A6EA5] py-12 sm:h-[330px] sm:min-h-0 sm:py-0">
      <Image
        src="/images/hero-bendungan.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="pointer-events-none select-none object-cover"
      />
      <div className="absolute inset-0 bg-[#0A2140]/78" />

      <Container className="relative">
        <div className="mx-auto max-w-[760px] text-center">
          <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#F2A900]">
            {kicker}
          </p>
          <h1 className="mt-2 text-[28px] font-semibold leading-[1.2] tracking-[-0.015em] text-white sm:text-[36px] lg:text-[40px]">
            {title}
          </h1>
          <div
            aria-hidden="true"
            className="mx-auto mt-4 mb-4 h-[3px] w-12 rounded-full bg-[#F2A900]"
          />
          <p className="mx-auto line-clamp-4 max-w-[620px] text-[14px] leading-relaxed text-[#C9D6E8] sm:line-clamp-3 sm:text-[15px]">
            {description}
          </p>
        </div>
      </Container>
    </section>
  );
}

export default DatasetHero;
