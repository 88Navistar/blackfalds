import { ContainerMD } from "./ContainerMD";

interface Translation {
  english: string;
  indigenous: string;
}

interface LanguageGroup {
  languageGroup: {
    name: string;
    nativeName: string;
    meaning: string;
    translator: string;
  };
  translations: Translation[];
}

interface BlockProps {
  block: {
    _key: string;
    heading: string;
    description: string;
    translations: LanguageGroup[];
  };
  index: number;
}

export default function IndigenousTranslationBlock({
  block,
  index,
}: BlockProps) {
  const { heading, description, translations } = block;

  return (
    <section className="space-y-8">
      <div className="max-w-3xl space-y-4">
        <p className="pt-8 text-muted-foreground">{description}</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {translations.map(group => (
          <div key={group.languageGroup.name} className="space-y-4">
            <div className="border-pacific-7/20 border-b pb-2">
              <h3 className="text-2xl font-bold">
                {group.languageGroup.name} -{" "}
                <span className="font-medium">
                  {group.languageGroup.nativeName}
                </span>
              </h3>
              <p className="line-clamp-2 h-14 text-muted-foreground">
                {group.languageGroup.meaning}. Provided by{" "}
                {group.languageGroup.translator}
              </p>
            </div>

            <div className="rounded-md border">
              {group.translations.map((translation, index) => (
                <div
                  key={translation.english}
                  className={`flex items-start gap-4 p-3 ${index % 2 === 0 ? "bg-muted/50" : "bg-background"} ${index === 0 ? "rounded-t-md" : ""} ${index === group.translations.length - 1 ? "rounded-b-md" : ""} `}
                >
                  <span className="w-1/3 shrink-0 font-medium">
                    {translation.english}
                  </span>
                  <span className="text-muted-foreground italic">
                    {translation.indigenous}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
