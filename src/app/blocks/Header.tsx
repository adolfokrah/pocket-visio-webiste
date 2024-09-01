'use client'
import { Block, Color, MediaFile } from 'visio-cms-lib/types'
import { Logo } from '@/components/Logo'
import Link from 'next/link'
import {
  Popover,
  PopoverButton,
  PopoverBackdrop,
  PopoverPanel,
} from '@headlessui/react'
import { AnimatePresence, motion } from 'framer-motion'
import Text from 'visio-cms-lib/Text'

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { NavLinks } from '@/components/NavLinks'
import { getColor, getLink, getParams } from 'visio-cms-lib/utils'
import List from 'visio-cms-lib/List'

function MenuIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M5 6h14M5 18h14M5 12h14"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ChevronUpIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M17 14l-5-5-5 5"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function MobileNavLink(
  props: Omit<
    React.ComponentPropsWithoutRef<typeof PopoverButton<typeof Link>>,
    'as' | 'className'
  >,
) {
  return (
    <PopoverButton
      as={Link}
      className="block text-base leading-7 tracking-tight text-gray-700"
      {...props}
    />
  )
}

export interface HeaderProps {
  navLinks: {
    label: string
    href: string
  }[]
  pageBlockId?: string
  buttons: {
    label: string
    href: string
    variant: 'solid' | 'outline'
    className: string
  }[]
  logoColor: Color
}

const Header: Block<HeaderProps> = ({
  navLinks,
  buttons,
  pageBlockId = '',
  logoColor,
}) => {
  const params = getParams<{ locale: string }>()
  return (
    <header>
      <nav>
        <Container className="relative z-50 flex justify-between py-8">
          <div className="relative z-10 flex items-center gap-16">
            <Logo className="h-10 w-auto" fill={getColor(logoColor)} />
            <NavLinks navLinks={navLinks} pageBlockId={pageBlockId} />
          </div>
          <div className="flex items-center gap-6">
            <Popover className="lg:hidden">
              {({ open }) => (
                <>
                  <PopoverButton
                    className="relative z-10 -m-2 inline-flex items-center rounded-lg stroke-gray-900 p-2 hover:bg-gray-200/50 hover:stroke-gray-600 active:stroke-gray-900 ui-not-focus-visible:outline-none"
                    aria-label="Toggle site navigation"
                  >
                    {({ open }) =>
                      open ? (
                        <ChevronUpIcon className="h-6 w-6" />
                      ) : (
                        <MenuIcon className="h-6 w-6" />
                      )
                    }
                  </PopoverButton>
                  <AnimatePresence initial={false}>
                    {open && (
                      <>
                        <PopoverBackdrop
                          static
                          as={motion.div}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="fixed inset-0 z-0 bg-gray-300/60 backdrop-blur"
                        />
                        <PopoverPanel
                          static
                          as={motion.div}
                          initial={{ opacity: 0, y: -32 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{
                            opacity: 0,
                            y: -32,
                            transition: { duration: 0.2 },
                          }}
                          className="absolute inset-x-0 top-0 z-0 origin-top rounded-b-2xl bg-gray-50 px-6 pb-6 pt-32 shadow-2xl shadow-gray-900/20"
                        >
                          <List
                            propName="navLinks"
                            pageBlockId={pageBlockId}
                            defaultPropValues={navLinks}
                            className="space-y-4"
                            renderComponent={({ label, href }, index) => (
                              <MobileNavLink
                                href={getLink(href)}
                                key={`${href}.${index}`}
                              >
                                <Text
                                  defaultValue={label}
                                  propName={`navLinks.${index}.label`}
                                  pageBlockId={pageBlockId}
                                />
                              </MobileNavLink>
                            )}
                          />

                          <List
                            pageBlockId={pageBlockId}
                            propName="buttons"
                            className="mt-8 flex flex-col gap-4"
                            defaultPropValues={buttons || []}
                            renderComponent={(
                              { label, href, variant },
                              index,
                            ) => (
                              <Button
                                key={label}
                                href={getLink(href)}
                                variant={variant}
                                className={'w-full'}
                              >
                                <Text
                                  defaultValue={label}
                                  propName={`buttons.${index}.label`}
                                  pageBlockId={pageBlockId}
                                />
                              </Button>
                            )}
                          />
                        </PopoverPanel>
                      </>
                    )}
                  </AnimatePresence>
                </>
              )}
            </Popover>

            <List
              pageBlockId={pageBlockId}
              propName="buttons"
              className="flex gap-4"
              defaultPropValues={buttons || []}
              renderComponent={({ label, href, variant, className }, index) => (
                <Button
                  key={label}
                  href={getLink(href)}
                  variant={variant}
                  className={className}
                >
                  <Text
                    defaultValue={label}
                    propName={`buttons.${index}.label`}
                    pageBlockId={pageBlockId}
                  />
                </Button>
              )}
            />
          </div>
        </Container>
      </nav>
    </header>
  )
}

Header.Schema = {
  name: 'Header',
  id: 'header',
  sideEditingProps: [
    {
      propName: 'logoColor',
      type: 'color',
      label: 'Logo Color',
    },
  ],
  defaultPropValues: {
    logoColor: { colorHex: '#000000', colorName: 'black', id: 'black' },
    navLinks: [
      { label: 'Features', href: '/#features' },
      { label: 'Reviews', href: '/#reviews' },
      { label: 'Pricing', href: '/#pricing' },
      { label: 'FAQs', href: '/#faqs' },
    ],
    buttons: [],
  },
  lists: [
    {
      propName: 'navLinks',
      label: 'Nav Link',
      defaultValue: {
        label: 'New Link',
        href: '/new-page',
      },
      sideEditingProps: [
        {
          propName: 'href',
          type: 'link',
          label: 'Link',
        },
      ],
    },
    {
      propName: 'buttons',
      label: 'Button',
      defaultValue: {
        label: 'New Button',
        href: '/new-page',
        variant: 'solid',
        className: 'hidden lg:block',
      },
      sideEditingProps: [
        {
          propName: 'variant',
          type: 'select',
          label: 'Variant',
          options: [
            {
              label: 'Solid',
              value: 'solid',
            },
            {
              label: 'Outline',
              value: 'outline',
            },
          ],
        },
        {
          propName: 'className',
          type: 'text',
          label: 'Class Name',
        },
      ],
    },
  ],
  group: 'Navigation',
}

export default Header
