'use client'
import { useState, useRef, useEffect } from 'react'
import type React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Copy } from 'lucide-react'

interface Position {
  top?: number | string
  bottom?: number | string
  left?: number | string
  right?: number | string
  transform?: number | string
}

interface HoverMailCardProps {
    trigger: React.ReactNode
    content: string
    position?: Position
}

export default function HoverMailCard({ trigger, content, position = {} }: HoverMailCardProps) {
    const [isVisible, setIsVisible] = useState(false)
    const [isCopied, setIsCopied] = useState(false)
    const triggerRef = useRef<HTMLDivElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (contentRef.current && !contentRef.current.contains(event.target as Node)) {
          handleClose()
        }
      }
  
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
      }
    }, [])
  
    const getPositionStyle = (): React.CSSProperties => {
      const style: React.CSSProperties = { position: 'absolute', zIndex: 10 }
      if (position.top !== undefined) style.top = position.top
      if (position.bottom !== undefined) style.bottom = position.bottom
      if (position.left !== undefined) style.left = position.left
      if (position.right !== undefined) style.right = position.right
      return style
    }
  
    const handleCopy = async () => {
      try {
        await navigator.clipboard.writeText(content)
        setIsCopied(true)
        setTimeout(() => setIsCopied(false), 2000)
      } catch (err) {
        console.error('Failed to copy text: ', err)
      }
    }
  
    const handleMouseEnter = () => {
      setIsVisible(true)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  
    const handleMouseLeave = () => {
      timeoutRef.current = setTimeout(() => {
        setIsVisible(false)
      }, 5000)
    }
  
    const handleClose = () => {
      setIsVisible(false)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }

  return (
    <div className="relative inline-block">
      <div
        ref={triggerRef}
        className="cursor-pointer text-cyan-600 dark:text-cyan-400 hover:underline"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {trigger}
      </div>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            ref={contentRef}
            style={getPositionStyle()}
            initial={{ opacity: 0, scale: 0.3, height: 0 }}
            animate={{ opacity: 1, scale: 1, height: 'auto' }}
            exit={{ opacity: 0, scale: 0.3, height: 0 }}
            transition={{ type: 'spring', duration: 0.3, bounce: 0.1 }}
          >
            <div className="text-sm rounded-2xl shadow-xl p-2 text-cyan-600  dark:text-cyan-400 text-center font-medium border border-cyan-600 dark:border-cyan-400 bg-white dark:bg-gray-800">
            <button
                type="button"
                onClick={handleCopy}
                className="flex items-center justify-center space-x-2 w-full rounded-md p-1"
                aria-label={isCopied ? "Copied to clipboard" : "Copy to clipboard"}
              >
                <span className='px-4'>{content}</span>
                {isCopied ? (
                  <Check className="h-4 w-4 text-cyan-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}