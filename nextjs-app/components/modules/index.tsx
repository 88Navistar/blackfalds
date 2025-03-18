import CarouselOne from "@/components/modules/carousel-one";
import FullWidthImage from "@/components/modules/FullWidthImage";
import TextWrapImage from "@/components/modules/TextWrapImage";
import CustomPortableText from "@/components/PortableText";

import Acknowledgement from "./Acknowledgement";
type Module<T = any> = {
  _type: string;
  _key: string;
} & T;

export function ModuleContent({ module }: { module: Module }) {
  if (!module || !module._type) {
    return null;
  }
  switch (module._type) {
    case "acknowledgement":
      return <Acknowledgement content={module.content} key={module._key} />;
    case "fullWidthImage":
      return <FullWidthImage {...module} key={module._key} />;
    case "moduleBlock":
      return (
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-center px-4 lg:px-0">
          <CustomPortableText value={module.content} key={module._key} />
        </div>
      );
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
    <div className="relative w-full overflow-hidden">
      {modules.map(module => (
        <ModuleContent key={module._key} module={module} />
      ))}
    </div>
  );
}
