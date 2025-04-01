import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import { fetchGlossaries } from "@/hooks/use-glossaries";
import { fetchGlossary } from "@/hooks/use-glossary";
import { IGlossaries, IGlossary } from "@/types/entities/glossary.interface";
import Link from "next/link";
import React from "react";

export default async function GlossaryPage() {
  // const queryClient = new QueryClient();
  // await queryClient.prefetchQuery({
  //   queryKey: ["glossaries"],
  //   queryFn: () => fetchGlossaries(), // just get them all for now
  // });

  // use fetchGlossaries hook, just get them all for now
  const glossaries: IGlossaries[] = await fetchGlossaries();
  // take the last glossary,
  // but we should get the one matching the selected DOT and language at some point
  const glossary: IGlossary = await fetchGlossary(
    glossaries[glossaries.length - 1].uuid,
  );

  return (
    <>
      <Header />
      <main className="mx-auto max-w-7xl px-2 lg:px-8">
        {/* <h1>Glossary</h1> */}
        {glossary && (
          <h1
            className="text-3xl font-bold text-gray-700"
            style={{ textTransform: "uppercase" }}
          >
            {glossary.title}
          </h1>
        )}
        {glossary && (
          // display the terms
          <div className="py-6">
            <ul style={{ listStyleType: "none", padding: 0 }}>
              {glossary.items.map((item) => (
                // add a id to each term; use item.uuid, but could use item.id.replace(/[^a-zA-Z0-9-_:.]/g, '_')
                // items could have 'seeAlso' property, which could be used to link to other terms
                <li
                  key={item.uuid}
                  style={{ marginBottom: "20px" }}
                  id={item.uuid}
                >
                  <strong>{item.term}</strong>
                  {item.acronym && (
                    <span style={{ marginLeft: "10px" }}>
                      <em>({item.acronym})</em>
                    </span>
                  )}
                  <p>{item.definition}</p>
                  <div>
                    {item.sourceUrl && (
                      <Link
                        href={item.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.sourceUrl}
                      </Link>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
