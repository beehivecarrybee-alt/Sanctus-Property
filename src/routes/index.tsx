import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { TOTAL_FRAMES, frameUrls } from "@/data/frames";
import { LoadingScreen } from "@/components/landing/LoadingScreen";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Services } from "@/components/landing/Services";
import { Projects, ProjectsMobile } from "@/components/landing/Projects";
import { WhyChooseUs } from "@/components/landing/WhyChooseUs";
import { CTASection } from "@/components/landing/CTASection";
import { CeoSection } from "@/components/landing/CeoSection";
import { Footer } from "@/components/landing/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sanctus Property OPC Pvt Ltd — Real Estate & Property Studio" },
      { name: "description", content: "Sanctus Property OPC Pvt Ltd designs, develops and delivers residential and commercial landmarks — architecture, development and construction under one roof." },
      { property: "og:title", content: "Sanctus Property OPC Pvt Ltd — Real Estate & Property Studio" },
      { property: "og:description", content: "Premium property design and development. Sanctus Property OPC Pvt Ltd, since 2026." },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400&family=Inter:wght@300;400;500;600&display=swap" },
    ],
  }),
  component: Index,
});

function Index() {
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [images, setImages] = useState<HTMLImageElement[]>([]);

  useEffect(() => {
    let done = 0;
    const imgs: HTMLImageElement[] = new Array(TOTAL_FRAMES);
    let cancelled = false;
    let finished = false;

    const finish = () => {
      if (finished || cancelled) return;
      finished = true;
      setImages(imgs);
      setLoaded(true);
    };

    const onOne = () => {
      done += 1;
      if (cancelled) return;
      setProgress((done / TOTAL_FRAMES) * 100);
      if (done >= TOTAL_FRAMES) finish();
    };

    frameUrls.forEach((src, i) => {
      const img = new Image();
      img.onload = onOne;
      img.onerror = onOne;
      img.src = src;
      imgs[i] = img;
    });

    const safety = window.setTimeout(finish, 30000);

    return () => {
      cancelled = true;
      window.clearTimeout(safety);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = loaded ? "" : "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [loaded]);

  return (
    <>
      <LoadingScreen progress={progress} visible={!loaded} />
      <Navbar />
      <main>
        <Hero images={images} />
        <Services />
        <Projects />
        <ProjectsMobile />
        <WhyChooseUs />
        <CeoSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
