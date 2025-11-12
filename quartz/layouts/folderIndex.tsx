import { QuartzComponentConstructor, QuartzComponentProps } from "../types"

export default (() => {
  function FolderIndex({ fileData, children }: QuartzComponentProps) {
    const renderChildren = (pages: QuartzComponentProps["children"]) => {
      if (!pages?.length) return null
      return (
        <ul>
          {pages.map((child) => (
            <li>
              <a href={child.slug}>
                {child.children?.length ? "📁 " : "📄 "}
                {child.frontmatter?.title ?? child.slug}
              </a>
              {child.children && child.children.length > 0 && renderChildren(child.children)}
            </li>
          ))}
        </ul>
      )
    }

    return (
      <article class="folder-index">
        <h1>{fileData.frontmatter?.title ?? fileData.slug}</h1>
        <section dangerouslySetInnerHTML={{ __html: fileData.content ?? "" }} />
        <hr />
        <h2>Contents</h2>
        {renderChildren(children)}
      </article>
    )
  }

  FolderIndex.css = `
    .folder-index h1 { font-size: 2rem; margin-bottom: 1rem; }
    .folder-index ul { list-style: none; padding-left: 0; }
    .folder-index li { margin: 0.25rem 0; }
    .folder-index a { text-decoration: none; color: var(--text-color); }
  `
  return FolderIndex
}) satisfies QuartzComponentConstructor
