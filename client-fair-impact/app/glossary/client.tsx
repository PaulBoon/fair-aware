"use client";

import useGlossaryByLanguageAndDOT from "@/hooks/use-glossary-by-language-and-dot copy";
import Link from "next/link";

export default function ClientPage() {
  const {
    data: glossary,
    isLoading,
    isError,
  } = useGlossaryByLanguageAndDOT("en", "DATA"); // just get fixed one for now

  if (isLoading) {
    return <h1 className="text-2xl font-bold text-gray-800">Loading...</h1>;
  }

  if (isError || !glossary) {
    return <h1 className="text-2xl font-bold text-gray-800">Error</h1>;
  }

  return (
    <>
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
          <div className="py-6">
            <ul style={{ listStyleType: "none", padding: 0 }}>
              {glossary.items
                .sort((a, b) => a.term.localeCompare(b.term))
                .map((item) => (
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
    </>
  );
}
