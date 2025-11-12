import path from "path"
import * as Plugin from "./quartz/plugins"

export default {
  configuration: {
    siteName: "Starfissure – UESRPG 3E",
    siteDescription: "Digital compendium for The Elder Scrolls RPG 3rd Edition.",
    author: "ezioauditore1017",
    enableSPA: true,
    analytics: null,
    ignorePatterns: ["**/node_modules/**", "**/.git/**", "**/.obsidian/**", "README.md"]
  },

  build: {
    contentDir: path.resolve("C:/Users/aceti/Obsidian Vaults/TTRPGs/Rules Systems/UESRPG"),
    outputDir: path.resolve("./public"),
    recursive: true,
    emitAll: true,
    indexFile: "index.md"
  },

  theme: {
    cdnCaching: false,           // prevents "Cannot read cdnCaching" crash
    fontOrigin: "local",         // or "googleFonts" if you load them externally

    typography: {
      headerFont: "Inter",
      bodyFont: "Inter"
    },

    colors: {
      lightMode: {
        primary: "#2C6E49",
        secondary: "#4C956C",
        background: "#F7F9F8",
        text: "#1A1A1A"
      },
      darkMode: {
        primary: "#74C69D",
        secondary: "#A4D4AE",
        background: "#101010",
        text: "#EDEDED"
      }
    }
  },

  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.TableOfContents(),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.SyntaxHighlighting()
    ],

    filters: [],

    emitters: [
      Plugin.Assets(),
      Plugin.ContentPage(),
      Plugin.Static()
    ]
  }
}
