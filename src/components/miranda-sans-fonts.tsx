import regular from "@/assets/MirandaSans-Regular.ttf.asset.json";
import italic from "@/assets/MirandaSans-Italic.ttf.asset.json";
import medium from "@/assets/MirandaSans-Medium.ttf.asset.json";
import mediumItalic from "@/assets/MirandaSans-MediumItalic.ttf.asset.json";
import semibold from "@/assets/MirandaSans-SemiBold.ttf.asset.json";
import semiboldItalic from "@/assets/MirandaSans-SemiBoldItalic.ttf.asset.json";
import bold from "@/assets/MirandaSans-Bold.ttf.asset.json";
import boldItalic from "@/assets/MirandaSans-BoldItalic.ttf.asset.json";

const faces: Array<{ url: string; weight: number; style: string }> = [
  { url: regular.url, weight: 400, style: "normal" },
  { url: italic.url, weight: 400, style: "italic" },
  { url: medium.url, weight: 500, style: "normal" },
  { url: mediumItalic.url, weight: 500, style: "italic" },
  { url: semibold.url, weight: 600, style: "normal" },
  { url: semiboldItalic.url, weight: 600, style: "italic" },
  { url: bold.url, weight: 700, style: "normal" },
  { url: boldItalic.url, weight: 700, style: "italic" },
];

const css = faces
  .map(
    (f) => `@font-face{font-family:"Miranda Sans";src:url("${f.url}") format("truetype");font-weight:${f.weight};font-style:${f.style};font-display:swap;}`,
  )
  .join("");

export function MirandaSansFonts() {
  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}
