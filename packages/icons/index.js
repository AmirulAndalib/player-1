import svgtofont from "svgtofont";
import { resolve } from "path";

svgtofont({
  src: resolve(process.cwd(), "src"), // svg path
  dist: resolve(process.cwd(), "dist"), // output path
  fontName: "awe", // font name
  css: {
    fontSize: "20px",
  }, // Create CSS files.
  startUnicode: 0xea01, // unicode start number
  svgicons2svgfont: {
    fontHeight: 1000,
    normalize: true,
  },
  // website = null, no demo html files
  website: {
    title: "AweIcons",
    // Must be a .svg format image.
    logo: resolve(process.cwd(), "svg", "git.svg"),
    version: "0.0.1",
    meta: {
      description:
        "A set of modified https://fonts.google.com and https://simpleicons.org icons",
      keywords: "svgtofont,TTF,EOT,WOFF,WOFF2,SVG",
    },
    description: `A set of modified https://fonts.google.com and https://simpleicons.org icons`,
    // Add a Github corner to your website
    // Like: https://github.com/uiwjs/react-github-corners
    corners: {
      url: "https://github.com/AwePlayer/AwePlayer",
      width: 62, // default: 60
      height: 62, // default: 60
      bgColor: "#151513", // default: '#151513'
    },
  },
}).then(() => {
  console.log("done!");
});
