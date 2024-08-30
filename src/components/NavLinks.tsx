'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { HeaderProps } from '../app/blocks/Header'
import List from 'visio-cms-lib/List'
import Text from 'visio-cms-lib/Text'
import { getLink } from 'visio-cms-lib'

export function NavLinks({
  navLinks,
  pageBlockId,
}: {
  navLinks: HeaderProps['navLinks']
  pageBlockId: string
}) {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  let timeoutRef = useRef<number | null>(null)

  return (
    <List
      pageBlockId={pageBlockId}
      defaultPropValues={navLinks}
      className="hidden lg:flex lg:gap-10"
      propName="navLinks"
      renderComponent={({ label, href }, index) => {
        return (
          <Link
            key={label}
            href={getLink(href || '#')}
            className="relative -mx-3 -my-2 inline-block rounded-lg px-3 py-2 text-sm text-gray-700 transition-colors delay-150 hover:text-gray-900 hover:delay-0"
            onMouseEnter={() => {
              if (timeoutRef.current) {
                window.clearTimeout(timeoutRef.current)
              }
              setHoveredIndex(index)
            }}
            onMouseLeave={() => {
              timeoutRef.current = window.setTimeout(() => {
                setHoveredIndex(null)
              }, 200)
            }}
          >
            <AnimatePresence>
              {hoveredIndex === index && (
                <motion.span
                  className="absolute inset-0 z-0 rounded-lg bg-gray-100"
                  layoutId="hoverBackground"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { duration: 0.15 } }}
                  exit={{
                    opacity: 0,
                    transition: { duration: 0.15 },
                  }}
                />
              )}
            </AnimatePresence>
            <span className="relative z-20">
              <Text
                defaultValue={label}
                propName={`navLinks.${index}.label`}
                pageBlockId={pageBlockId}
              />
            </span>
          </Link>
        )
      }}
    />
  )
}
