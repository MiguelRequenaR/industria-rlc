import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Clock, User, Calendar, Share2 } from "lucide-react"
import type { BlogPost } from "@/lib/types"

interface BlogDetailPageProps {
  post: BlogPost
  relatedPosts: BlogPost[]
}

export default function BlogDetailPage({ post, relatedPosts }: BlogDetailPageProps) {

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <section className="bg-primary py-16">
        <div className="max-w-7xl mx-auto px-4">
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 text-white mb-8 hover:text-secondary transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver al Blog
          </Link>
          <div className="max-w-4xl">
            <span className="inline-block bg-secondary text-primary px-4 py-2 rounded-full font-semibold text-sm mb-6" data-aos="zoom-in">
              {post.category}
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-6" data-aos="fade-up">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-white/90" data-aos="fade-up" data-aos-delay="100">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                <span className="font-semibold">IndustriaRLC</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 mt-10" data-aos="zoom-in">
        <div className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>
      </section>

      {/* Content */}
      <article className="max-w-7xl mx-auto px-4 pb-20" data-aos="fade-up">
        <div className="pt-5 md:p-12">
          {/* Excerpt/Introduction */}
          <p className="text-xl text-tertiary leading-relaxed mb-12 pb-8 border-b border-gray-200">
            {post.excerpt}
          </p>

          {/* Blog Content */}
          <div className="prose prose-lg max-w-none">
            {post.content.map((block, index) => {
              switch (block.type) {
                case 'heading':
                  return (
                    <h2 
                      key={index} 
                      className="text-2xl md:text-3xl font-bold text-primary mt-12 mb-6 first:mt-0"
                    >
                      {block.value}
                    </h2>
                  )
                case 'text':
                  return (
                    <p 
                      key={index} 
                      className="text-tertiary text-lg leading-relaxed mb-6"
                    >
                      {block.value}
                    </p>
                  )
                case 'image':
                  return (
                    <div 
                      key={index} 
                      className="relative h-[400px] rounded-2xl overflow-hidden my-12 shadow-lg"
                    >
                      <Image
                        src={block.value}
                        alt="Imagen del artículo"
                        fill
                        className="object-cover"
                      />
                    </div>
                  )
                default:
                  return null
              }
            })}
          </div>

          {/* Share Section */}
          <div className="mt-16 pt-8 border-t border-gray-200">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <p className="text-sm text-tertiary mb-2">Escrito por:</p>
                <div className="flex items-center gap-2">
                  <p className="text-lg text-primary">IndustriaRLC;</p>
                  <p className="text-lg text-primary">{post.date}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="bg-white py-20">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-12">
              Artículos Relacionados
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  href={`/blog/${relatedPost.slug}`}
                  className="group"
                >
                  <div className="bg-gray-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                    <div className="relative h-48">
                      <Image
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6 space-y-3">
                      <span className="text-xs bg-secondary/10 text-primary px-3 py-1 rounded-full font-semibold">
                        {relatedPost.category}
                      </span>
                      <h3 className="text-lg font-bold text-primary group-hover:text-secondary transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      <p className="text-sm text-tertiary line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-tertiary pt-2">
                        <Clock className="w-3 h-3" />
                        <span>{relatedPost.readTime}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="bg-primary py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            ¿Quieres Aprender Más?
          </h2>
          <p className="text-white/90 text-lg mb-8">
            Únete a nuestros cursos especializados y conviértete en un experto del sector eléctrico
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/cursos"
              className="bg-secondary hover:bg-secondary/90 transition-colors text-primary rounded-xl px-8 py-4 font-bold text-lg"
            >
              Ver Cursos Disponibles
            </Link>
            <Link
              href="/contacto"
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors text-white rounded-xl px-8 py-4 font-bold text-lg border-2 border-white/30"
            >
              Contactar con Nosotros
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
