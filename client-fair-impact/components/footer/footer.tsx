"use client";

import Link from "next/link";
import FooterLink from "./footer-link";
import ImageLink from "./image-link";
import { NavigationItem } from "@/types/navigation-item";
import { fetchSetting } from "@/hooks/use-setting";
import { useEffect, useState } from "react";

const getPrivacyPolicyLink = async () => {
  try {
    const setting = await fetchSetting("PrivacyPolicyLink");

    console.log("Privacy Policy Link:", JSON.stringify(setting, null, 2));

    const value = setting.value.trim();
    // check if value is a proper URL
    // would prefer it this comes from a library...
    const urlPattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])?)\\.)+[a-z]{2,}|" + // domain name
        "localhost|" + // localhost
        "\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}|" + // IP address
        "\\[?[a-fA-F0-9]*:[a-fA-F0-9:]+\\])" + // IPv6
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$", // fragment locator
      "i",
    );
    if (value && !urlPattern.test(value)) {
      console.error("Invalid URL format for Privacy Policy Link:", value);
      //return "https://default-privacy-policy-link.com"; // the default link
      return ""; // sort of option None
    }
    // Note that we don't check if the URL resolves!

    return value;
    // default was "https://dans.knaw.nl/en/about/organisation-and-policy/legal-information/privacy-statement"
  } catch (error) {
    console.error("Failed to fetch Privacy Policy Link:", error);
    //return "https://default-privacy-policy-link.com"; // the default link
    return ""; // sort of option None
  }
};

/**
 * Default footer component.
 */
export default function Footer() {
  const [privacyPolicyLink, setPrivacyPolicyLink] = useState<string | null>(
    null,
  );

  useEffect(() => {
    const fetchPrivacyPolicyLink = async () => {
      const link = await getPrivacyPolicyLink();
      setPrivacyPolicyLink(link);
    };

    fetchPrivacyPolicyLink();
  }, []);
  const navigation: Record<string, NavigationItem[]> = {
    site: [
      { label: "About", href: "about" },
      ...(privacyPolicyLink
        ? [
            {
              label: "Privacy",
              href: privacyPolicyLink,
            },
          ]
        : []),
    ],
    resources: [
      { label: "Documentation", href: "#" },
      { label: "Source Code", href: "https://github.com/DANS-KNAW/fair-aware" },
    ],
  };
  return (
    <footer aria-labelledby="footer-heading" className="bg-white">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-6 pt-20 pb-8 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="grid gap-x-8 sm:grid-cols-3">
          <div className="order-1 grid grid-cols-2 text-gray-600 sm:order-3">
            <ul className="space-y-4">
              <li className="font-medium text-gray-900">Site</li>
              {navigation.site.map((item) => (
                <FooterLink
                  key={`footer-site-${item.href}-${item.label}`}
                  href={item.href}
                  label={item.label}
                />
              ))}
            </ul>
            <ul className="space-y-4">
              <li className="font-medium text-gray-900">Resources</li>
              {navigation.resources.map((item) => (
                <FooterLink
                  key={`footer-resources-${item.href}-${item.label}`}
                  href={item.href}
                  label={item.label}
                />
              ))}
            </ul>
          </div>
          <div className="order-2 mt-10 sm:order-1 sm:col-span-2 sm:mt-0">
            <div className="flex gap-8">
              <ImageLink
                href="https://cordis.europa.eu/project/id/101057344"
                src="/eu-flag.png"
                alt="Cordis Europa Project 101057344"
              />
              <ImageLink
                href="https://dans.knaw.nl"
                src="/dans-knaw.svg"
                alt="KNAW DANS"
              />
            </div>
            <p className="mt-8 text-sm text-gray-600">
              <Link
                href={"https://cordis.europa.eu/project/id/101057344"}
                target="_blank"
                className="text-fair_dark_blue-600 hover:text-fair_dark_blue-900 underline"
              >
                “Fostering FAIR Data Practices In Europe”
              </Link>{" "}
              has received funding from the European Union’s Horizon 2020
              project call H2020-INFRAEOSC-2018-2020 Grant agreement 831558. The
              content of this document does not represent the opinion of the
              European Union, and the European Union is not responsible for any
              use that might be made of such content.
            </p>
          </div>
        </div>
        <div className="mt-16 border-t border-gray-900/10 pt-8 sm:mt-20 md:flex md:items-center md:justify-between lg:mt-24">
          {/* Used to have the social media links here: 
          <div className="flex space-x-6 md:order-2"><LinkedinIcon /><TwitterIcon /><WatchappIcon />
          </div> */}
          <p className="mt-8 text-xs leading-5 text-gray-500 md:order-1 md:mt-0">
            &copy; Copyright 2024 - FAIRsFAIR
          </p>
        </div>
      </div>
    </footer>
  );
}
