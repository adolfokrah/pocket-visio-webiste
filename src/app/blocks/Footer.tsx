"use client"
import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { TextField } from '@/components/Fields'
import { Logomark } from '@/components/Logo'
import { NavLinks } from '@/components/NavLinks'
import { Block, Color, MediaFile } from 'visio-cms-lib/types'
import Text from 'visio-cms-lib/Text'
import VisioImage from 'visio-cms-lib/Image'
import { HeaderProps } from './Header'
import { getColor, getProjectMode } from 'visio-cms-lib/utils'

function QrCodeBorder(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 96 96" fill="none" aria-hidden="true" {...props}>
      <path
        d="M1 17V9a8 8 0 0 1 8-8h8M95 17V9a8 8 0 0 0-8-8h-8M1 79v8a8 8 0 0 0 8 8h8M95 79v8a8 8 0 0 1-8 8h-8"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

interface FooterProps {
  logo: {
    name: string
    caption: string
  }
  qrCode: {
    title: string
    caption: string
    image: MediaFile
  }
  navLinks: HeaderProps['navLinks']
  pageBlockId?: string
  copyRight: string
  newsletter: {
    placeholder: string
    buttonText: string
  }
  color: Color
}

const Footer: Block<FooterProps> = ({
  logo,
  qrCode,
  navLinks,
  pageBlockId = '',
  copyRight,
  newsletter,
  color,
}) => {
  const isBuilderMode = getProjectMode() === 'BUILDER'
  const colorHex = getColor(color)
  return (
    <footer className="border-t border-gray-200">
      <Container>
        <div className="flex flex-col items-start justify-between gap-y-12 pb-6 pt-16 lg:flex-row lg:items-center lg:py-16">
          <div>
            <div className="flex items-center text-gray-900">
              <Logomark
                className="h-10 w-10 flex-none fill-cyan-500"
                style={{ fill: colorHex }}
              />
              <div className="ml-4">
                <p className="text-base font-semibold">
                  <Text
                    defaultValue={logo.name}
                    propName="logo.name"
                    pageBlockId={pageBlockId}
                  />
                </p>
                <p className="mt-1 text-sm">
                  <Text
                    defaultValue={logo.caption}
                    propName="logo.caption"
                    pageBlockId={pageBlockId}
                  />
                </p>
              </div>
            </div>
            <nav className="mt-11 flex gap-8">
              <NavLinks navLinks={navLinks} pageBlockId={pageBlockId} />
            </nav>
          </div>
          <div className="group relative -mx-4 flex items-center self-stretch p-4 transition-colors hover:bg-gray-100 sm:self-auto sm:rounded-2xl lg:mx-0 lg:self-auto lg:p-6">
            <div className="relative flex h-24 w-24 flex-none items-center justify-center">
              <QrCodeBorder
                className={
                  'absolute inset-0 h-full w-full stroke-gray-300 transition-colors group-hover:hidden'
                }
              />

              <QrCodeBorder
                className={
                  'absolute inset-0 hidden h-full w-full transition-colors group-hover:block'
                }
                style={{ stroke: colorHex }}
              />

              <VisioImage
                defaultValue={qrCode.image}
                propName="qrCode.image"
                pageBlockId={pageBlockId}
                wrapperClassName="relative z-20"
                renderImage={({ imagePublicUrl, width, height, altText }) => (
                  <Image
                    src={imagePublicUrl}
                    width={width}
                    height={height}
                    alt={altText}
                    unoptimized
                  />
                )}
              />
            </div>
            <div className="ml-8 lg:w-64">
              <p className="text-base font-semibold text-gray-900">
                <Link href="#">
                  <span className="absolute inset-0 sm:rounded-2xl" />
                  <Text
                    defaultValue={qrCode.title}
                    propName="qrCode.title"
                    pageBlockId={pageBlockId}
                  />
                </Link>
              </p>
              <p className="mt-1 text-sm text-gray-700">
                <Text
                  defaultValue={qrCode.caption}
                  propName="qrCode.caption"
                  pageBlockId={pageBlockId}
                />
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center border-t border-gray-200 pb-12 pt-8 md:flex-row-reverse md:justify-between md:pt-6">
          <form className="flex w-full justify-center md:w-auto">
            <TextField
              type="email"
              aria-label="Email address"
              placeholder="Email address"
              autoComplete="email"
              required
              className="w-60 min-w-0 shrink"
            />
            <Button
              type={isBuilderMode ? 'button' : 'submit'}
              color="cyan"
              className="ml-4 flex-none"
              style={{ backgroundColor: colorHex }}
            >
              <span className="hidden lg:inline">
                <Text
                  defaultValue={newsletter.buttonText}
                  propName="newsletter.buttonText"
                  pageBlockId={pageBlockId}
                />
              </span>
              <span className="lg:hidden">
                <Text
                  defaultValue={newsletter.buttonText}
                  propName="newsletter.buttonText"
                  pageBlockId={pageBlockId}
                />
              </span>
            </Button>
          </form>
          <p className="mt-6 flex gap-2 text-sm text-gray-500 md:mt-0">
            &copy; Copyright {new Date().getFullYear()}
            <Text
              defaultValue={copyRight}
              propName="copyRight"
              pageBlockId={pageBlockId}
            />
          </p>
        </div>
      </Container>
    </footer>
  )
}

Footer.Schema = {
  name: 'Footer',
  id: 'footer',
  group: 'Navigation',
  sideEditingProps: [
    {
      propName: 'color',
      label: 'Color',
      type: 'color',
    },
  ],
  defaultPropValues: {
    color: { colorHex: '#2563EB', colorName: 'blue', id: 'blue' },
    logo: {
      name: 'Pocket',
      caption: 'Invest at the perfect time.',
    },
    qrCode: {
      title: 'Download the app',
      caption: 'Scan the QR code to download the app from the App Store.',
      image: {
        mediaHash: undefined,
        altText: 'QR code',
        width: 96,
        height: 96,
      },
    },
    navLinks: [
      { label: 'Home', href: '/' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
    copyRight: 'All rights reserved.',
    newsletter: {
      placeholder: 'Email address',
      buttonText: 'Join our newsletter',
    },
  },
  lists: [
    {
      propName: 'navLinks',
      label: 'Navigation Link',
      defaultValue: {
        label: 'Link',
        href: '/',
      },
    },
  ],
}

export default Footer
