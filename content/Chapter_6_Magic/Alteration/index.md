---
title: Alteration
layout: folderIndex
description: Learn the rules and schools of magic in UESRPG 3e.
---

> [!tip]
> Magic is as dangerous as it is powerful. Explore the following sections for detailed spell rules.

<ul>
  {children.map((child) => (
    <li>
      <a href={child.slug}>
        {child.children?.length ? "📁 " : "📄 "}
        {child.frontmatter?.title ?? child.slug}
      </a>
    </li>
  ))}
</ul>

