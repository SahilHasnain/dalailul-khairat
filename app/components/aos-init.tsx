"use client";

import AOS from "aos";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function AosInit() {
  const pathname = usePathname();

  useEffect(() => {
    AOS.init({
      duration: 750,
      easing: "ease-out-cubic",
      offset: 80,
      once: true,
      mirror: false,
      anchorPlacement: "top-bottom",
    });
  }, []);

  useEffect(() => {
    AOS.refreshHard();
  }, [pathname]);

  return null;
}
