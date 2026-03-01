"use client"

import Image from "next/image"
import { Tags } from "lucide-react"

interface ProductImageHoverProps {
  imageUrls: string[]
  alt: string
}

export function ProductImageHover({ imageUrls, alt }: ProductImageHoverProps) {
  if (!imageUrls?.length) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-slate-100">
        <Tags className="w-12 h-12 text-slate-400" />
      </div>
    )
  }

  return (
    <div className="group absolute inset-0">
      {imageUrls.map((url, i) => (
        <Image
          key={url}
          src={url}
          alt={`${alt} ${i + 1}`}
          fill
          className={`object-cover rounded-2xl transition-opacity duration-500 ${
            i === 0 ? "opacity-100 group-hover:opacity-0" : "opacity-0 group-hover:opacity-100"
          }`}
        />
      ))}
    </div>
  )
}
