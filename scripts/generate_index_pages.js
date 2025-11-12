import fs from "fs"
import path from "path"

const contentRoot = path.resolve("./content")

function ensureIndexForFolders(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  let hasIndex = false

  for (const entry of entries) {
    if (entry.isDirectory()) {
      ensureIndexForFolders(path.join(dir, entry.name))
    }
    if (entry.isFile() && (entry.name === "index.md" || entry.name === "_index.md")) {
      hasIndex = true
    }
  }

  if (!hasIndex) {
    const folderName = path.basename(dir)
    const indexPath = path.join(dir, "_index.md")
    const title = folderName.replace(/[-_]/g, " ")
    const content = `---
title: ${title}
layout: folderIndex
---

# ${title}

This section contains content related to **${title}**.

{% for page in children %}
- [{{ page.title }}]({{ page.permalink }})
{% endfor %}
`
    fs.writeFileSync(indexPath, content)
    console.log(`📝 Created: ${indexPath}`)
  }
}

ensureIndexForFolders(contentRoot)
console.log("✅ Folder indexes generated.")
