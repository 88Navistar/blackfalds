import CarouselOne from "@/components/modules/carousel-one";
import FullWidthImage from "@/components/modules/FullWidthImage";
import TextWrapImage from "@/components/modules/TextWrapImage";
import CustomPortableText from "@/components/PortableText";
type Module<T = any> = {
  _type: string;
  _key: string;
} & T;

export function ModuleContent({ module }: { module: Module }) {
  if (!module || !module._type) {
    return null;
  }
  switch (module._type) {
    case "fullWidthImage":
      return <FullWidthImage {...module} key={module._key} />;
    case "moduleBlock":
      return <CustomPortableText value={module.content} key={module._key} />;
    case "textWrapImage":
      return <TextWrapImage {...module} key={module._key} />;
    case "carouselOne":
      return <CarouselOne block={module} key={module._key} />;
    default:
      return null;
  }
}

export default function Modules({ modules = [] }: { modules?: Module[] }) {
  if (!modules || !Array.isArray(modules)) {
    return null;
  }

  return (
    <>
      {modules.map(module => (
        <ModuleContent key={module._key} module={module} />
      ))}
    </>
  );
}
