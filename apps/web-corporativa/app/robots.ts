import { MetadataRoute } from "next";

export default function Robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      }
    ],
    sitemap: 'https://industriarlc.com/sitemap.xml',
    host: 'https://industriarlc.com/',
  }
}