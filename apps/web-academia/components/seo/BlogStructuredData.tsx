import type { BlogPost } from "@/lib/types"

interface BlogStructuredDataProps {
  post: BlogPost
}

export default function BlogStructuredData({ post }: BlogStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.image,
    "datePublished": post.date,
    "author": {
      "@type": "Person",
      "name": post.author.name
    },
    "publisher": {
      "@type": "Organization",
      "name": "RLC Academy",
      "logo": {
        "@type": "ImageObject",
        "url": "https://academia.industriarlc.com/logoPNG.png"
      }
    },
    "articleSection": post.category,
    "wordCount": post.readTime,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://academia.industriarlc.com/blog/${post.slug}`
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
