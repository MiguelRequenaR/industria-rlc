"use client"

import { X } from "lucide-react"
import { ReactNode, useEffect } from "react"
import { Button } from "./button"

interface DialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: ReactNode
}

export function Dialog({ open, onOpenChange, children }: DialogProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [open])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={() => onOpenChange(false)}
    >
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
      <div
        className="relative z-50 w-full max-w-2xl mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}

interface DialogContentProps {
  children: ReactNode
  className?: string
}

export function DialogContent({ children, className = "" }: DialogContentProps) {
  return (
    <div className={`bg-white rounded-lg shadow-xl max-h-[90vh] overflow-y-auto ${className}`}>
      {children}
    </div>
  )
}

interface DialogHeaderProps {
  children: ReactNode
  onClose?: () => void
}

export function DialogHeader({ children, onClose }: DialogHeaderProps) {
  return (
    <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
      {children}
      {onClose && (
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="h-8 w-8 rounded-full"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
}

interface DialogTitleProps {
  children: ReactNode
}

export function DialogTitle({ children }: DialogTitleProps) {
  return <h2 className="text-xl font-bold uppercase text-secondary">{children}</h2>
}

interface DialogBodyProps {
  children: ReactNode
}

export function DialogBody({ children }: DialogBodyProps) {
  return <div className="px-6 py-4">{children}</div>
}

interface DialogFooterProps {
  children: ReactNode
}

export function DialogFooter({ children }: DialogFooterProps) {
  return (
    <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex items-center justify-end gap-2">
      {children}
    </div>
  )
}
