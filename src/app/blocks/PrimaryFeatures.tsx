'use client'

import { Fragment, useEffect, useId, useRef, useState } from 'react'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import clsx from 'clsx'
import {
  type MotionProps,
  type Variant,
  type Variants,
  AnimatePresence,
  motion,
} from 'framer-motion'
import { useDebouncedCallback } from 'use-debounce'
import Text from 'visio-cms-lib/Text'
import { AppScreen } from '@/components/AppScreen'
import { CircleBackground } from '@/components/CircleBackground'
import { Container } from '@/components/Container'
import { PhoneFrame } from '@/components/PhoneFrame'
import List from 'visio-cms-lib/List'
import VisioImage from 'visio-cms-lib/Image'
import { Block, Color, MediaFile } from 'visio-cms-lib/types'
import Image from 'next/image'

const MotionAppScreenHeader = motion(AppScreen.Header)
const MotionAppScreenBody = motion(AppScreen.Body)

interface CustomAnimationProps {
  isForwards: boolean
  changeCount: number
}

const headerAnimation: Variants = {
  initial: { opacity: 0, transition: { duration: 0.3 } },
  animate: { opacity: 1, transition: { duration: 0.3, delay: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
}

const maxZIndex = 2147483647

const bodyVariantBackwards: Variant = {
  opacity: 0.4,
  scale: 0.8,
  zIndex: 0,
  filter: 'blur(4px)',
  transition: { duration: 0.4 },
}

const bodyVariantForwards: Variant = (custom: CustomAnimationProps) => ({
  y: '100%',
  zIndex: maxZIndex - custom.changeCount,
  transition: { duration: 0.4 },
})

const bodyAnimation: MotionProps = {
  initial: 'initial',
  animate: 'animate',
  exit: 'exit',
  variants: {
    initial: (custom: CustomAnimationProps, ...props) =>
      custom.isForwards
        ? bodyVariantForwards(custom, ...props)
        : bodyVariantBackwards,
    animate: (custom: CustomAnimationProps) => ({
      y: '0%',
      opacity: 1,
      scale: 1,
      zIndex: maxZIndex / 2 - custom.changeCount,
      filter: 'blur(0px)',
      transition: { duration: 0.4 },
    }),
    exit: (custom: CustomAnimationProps, ...props) =>
      custom.isForwards
        ? bodyVariantBackwards
        : bodyVariantForwards(custom, ...props),
  },
}

type ScreenProps =
  | {
      animated: true
      custom: CustomAnimationProps
      children: React.ReactNode
    }
  | { animated?: false;}

function Screen(props: ScreenProps & {color: string}) {
  return (
    <AppScreen className="w-full" color={props.color}>
      <MotionAppScreenBody
        {...(props.animated ? { ...bodyAnimation, custom: props.custom } : {})}
      >
        {props.animated ? <>{props.children}</> : null}
      </MotionAppScreenBody>
    </AppScreen>
  )
}

function usePrevious<T>(value: T) {
  let ref = useRef<T>()

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}

function FeaturesDesktop({
  features,
  pageBlockId = '',
  color,
}: {
  features: PrimaryFeatures['features']
  pageBlockId: string
  color: string
}) {
  let [changeCount, setChangeCount] = useState(0)
  let [selectedIndex, setSelectedIndex] = useState(0)
  let prevIndex = usePrevious(selectedIndex)
  let isForwards = prevIndex === undefined ? true : selectedIndex > prevIndex

  let onChange = useDebouncedCallback(
    (selectedIndex) => {
      setSelectedIndex(selectedIndex)
      setChangeCount((changeCount) => changeCount + 1)
    },
    100,
    { leading: true },
  )

  return (
    <TabGroup
      className="grid grid-cols-12 items-center gap-8 lg:gap-16 xl:gap-24"
      selectedIndex={selectedIndex}
      onChange={onChange}
      vertical
    >
      <TabList className="relative z-10 order-last col-span-6 space-y-6">
        <List
          pageBlockId={pageBlockId}
          propName="features"
          component=""
          defaultPropValues={features}
          renderComponent={(feature, featureIndex) => (
            <div
              key={feature.name}
              className="relative rounded-2xl transition-colors hover:bg-gray-800/30"
            >
              {featureIndex === selectedIndex && (
                <motion.div
                  layoutId="activeBackground"
                  className="absolute inset-0 z-0 bg-gray-800"
                  initial={{ borderRadius: 16 }}
                />
              )}

              <div className="relative z-10 p-8">
                <VisioImage
                  defaultValue={feature.icon}
                  wrapperClassName="relative z-20 h-8 w-8 bg-red-500"
                  propName={`features.${featureIndex}.icon`}
                  pageBlockId={pageBlockId}
                  renderImage={(icon) => (
                    <Image
                      src={icon.imagePublicUrl}
                      alt={icon.altText}
                      width={icon.width}
                      height={icon.height}
                    />
                  )}
                />

                <Tab className="text-left ui-not-focus-visible:outline-none">
                  <span className="absolute inset-0 rounded-2xl" />
                </Tab>
                <h3 className="mt-6 text-lg font-semibold text-white">
                  <Text
                    propName={`features.${featureIndex}.name`}
                    defaultValue={feature.name}
                    pageBlockId={pageBlockId}
                  />
                </h3>
                <p className="mt-2 text-sm text-gray-400">
                  <Text
                    propName={`features.${featureIndex}.description`}
                    defaultValue={feature.description}
                    pageBlockId={pageBlockId}
                  />
                </p>
              </div>
            </div>
          )}
        />
      </TabList>
      <div className="relative col-span-6">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <CircleBackground color={color} className="animate-spin-slower" />
        </div>
        <PhoneFrame className="z-10 mx-auto w-full max-w-[366px]">
          <TabPanels as={Fragment}>
            <AnimatePresence
              initial={false}
              custom={{ isForwards, changeCount }}
            >
              {features.map((feature, featureIndex) =>
                selectedIndex === featureIndex ? (
                  <TabPanel
                    static
                    key={feature.name + changeCount}
                    className="col-start-1 row-start-1 flex focus:outline-offset-[32px] ui-not-focus-visible:outline-none"
                  >
                    <Screen
                      animated
                      custom={{ isForwards, changeCount }}
                      color={color}
                    >
                      <VisioImage
                        defaultValue={feature.screen}
                        wrapperClassName="relative z-20 h-full w-full "
                        propName={`features.${featureIndex}.screen`}
                        pageBlockId={pageBlockId}
                        renderImage={(icon) => (
                          <Image
                            src={icon.imagePublicUrl}
                            alt={icon.altText}
                            width={icon.width}
                            height={icon.height}
                          />
                        )}
                      />
                    </Screen>
                  </TabPanel>
                ) : null,
              )}
            </AnimatePresence>
          </TabPanels>
        </PhoneFrame>
      </div>
    </TabGroup>
  )
}

function FeaturesMobile({
  features,
  pageBlockId = '',
  color,
}: {
  features: PrimaryFeatures['features']
  pageBlockId: string
  color: string
}) {
  let [activeIndex, setActiveIndex] = useState(0)
  let slideContainerRef = useRef<React.ElementRef<'div'>>(null)
  let slideRefs = useRef<Array<React.ElementRef<'div'>>>([])

  useEffect(() => {
    let observer = new window.IntersectionObserver(
      (entries) => {
        for (let entry of entries) {
          if (entry.isIntersecting && entry.target instanceof HTMLDivElement) {
            setActiveIndex(slideRefs.current.indexOf(entry.target))
            break
          }
        }
      },
      {
        root: slideContainerRef.current,
        threshold: 0.6,
      },
    )

    for (let slide of slideRefs.current) {
      if (slide) {
        observer.observe(slide)
      }
    }

    return () => {
      observer.disconnect()
    }
  }, [slideContainerRef, slideRefs])

  return (
    <>
      <div
        ref={slideContainerRef}
        className="-mb-4 flex snap-x snap-mandatory -space-x-4 overflow-x-auto overscroll-x-contain scroll-smooth pb-4 [scrollbar-width:none] sm:-space-x-6 [&::-webkit-scrollbar]:hidden"
      >
        {features.map((feature, featureIndex) => (
          <div
            key={featureIndex}
            ref={(ref) => ref && (slideRefs.current[featureIndex] = ref)}
            className="w-full flex-none snap-center px-4 sm:px-6"
          >
            <div className="relative transform overflow-hidden rounded-2xl bg-gray-800 px-5 py-6">
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <CircleBackground
                  color={color}
                  className={featureIndex % 2 === 1 ? 'rotate-180' : undefined}
                />
              </div>
              <PhoneFrame className="relative mx-auto w-full max-w-[366px]">
                <VisioImage
                  defaultValue={feature.screen}
                  wrapperClassName="relative z-20 h-full w-full "
                  propName={`features.${featureIndex}.screen`}
                  pageBlockId={pageBlockId}
                  renderImage={(icon) => (
                    <Image
                      src={icon.imagePublicUrl}
                      alt={icon.altText}
                      width={icon.width}
                      height={icon.height}
                    />
                  )}
                />
              </PhoneFrame>
              <div className="absolute inset-x-0 bottom-0 bg-gray-800/95 p-6 backdrop-blur sm:p-10">
                <VisioImage
                  defaultValue={feature.icon}
                  wrapperClassName="relative z-20 h-8 w-8 bg-red-500"
                  propName={`features.${featureIndex}.icon`}
                  pageBlockId={pageBlockId}
                  renderImage={(icon) => (
                    <Image
                      src={icon.imagePublicUrl}
                      alt={icon.altText}
                      width={icon.width}
                      height={icon.height}
                    />
                  )}
                />
                <h3 className="mt-6 text-sm font-semibold text-white sm:text-lg">
                  <Text
                    propName={`features.${featureIndex}.name`}
                    defaultValue={feature.name}
                    pageBlockId={pageBlockId}
                  />
                </h3>
                <p className="mt-2 text-sm text-gray-400">
                  <Text
                    propName={`features.${featureIndex}.description`}
                    defaultValue={feature.description}
                    pageBlockId={pageBlockId}
                  />
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-center gap-3">
        {features.map((_, featureIndex) => (
          <button
            type="button"
            key={featureIndex}
            className={clsx(
              'relative h-0.5 w-4 rounded-full',
              featureIndex === activeIndex ? 'bg-gray-300' : 'bg-gray-500',
            )}
            aria-label={`Go to slide ${featureIndex + 1}`}
            onClick={() => {
              slideRefs.current[featureIndex].scrollIntoView({
                block: 'nearest',
                inline: 'nearest',
              })
            }}
          >
            <span className="absolute -inset-x-1.5 -inset-y-3" />
          </button>
        ))}
      </div>
    </>
  )
}

interface PrimaryFeatures {
  title: string
  subTitle: string
  pageBlockId?: string
  features: {
    name: string
    description: string
    icon: MediaFile
    screen: MediaFile
  }[]
  color: Color
}
const PrimaryFeatures: Block<PrimaryFeatures> = ({
  title,
  subTitle,
  pageBlockId = '',
  features,
  color,
}) => {
  return (
    <section
      id="features"
      aria-label="Features for investing all your money"
      className="bg-gray-900 py-20 sm:py-32"
    >
      <Container>
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-3xl">
          <h2 className="text-3xl font-medium tracking-tight text-white">
            <Text
              propName={'title'}
              pageBlockId={pageBlockId}
              defaultValue={title}
              allowedControls={['bold', 'italic', 'underline', 'text-color']}
            />
          </h2>
          <p className="mt-2 text-lg text-gray-400">
            <Text
              propName={'subTitle'}
              pageBlockId={pageBlockId}
              defaultValue={subTitle}
              allowedControls={['bold', 'italic', 'underline', 'text-color']}
            />
          </p>
        </div>
      </Container>
      <div className="mt-16 md:hidden">
        <FeaturesMobile
          features={features}
          pageBlockId={pageBlockId}
          color={color.colorHex}
        />
      </div>
      <Container className="hidden md:mt-20 md:block">
        <FeaturesDesktop
          features={features}
          pageBlockId={pageBlockId}
          color={color.colorHex}
        />
      </Container>
    </section>
  )
}

PrimaryFeatures.Schema = {
  name: 'PrimaryFeatures',
  id: 'primaryFeatures',
  group: 'Content',
  defaultPropValues: {
    color: { colorHex: '#2563EB', colorName: 'Cyan', id: 'cyan' },
    title: ' Every feature you need to win. Try it for yourself.',
    subTitle:
      'Pocket was built for investors like you who play by their own rules and aren’t going to let SEC regulations get in the way of their dreams. If other investing tools are afraid to build it, Pocket has it.',
    features: [
      {
        name: 'Invite friends for better returns',
        description:
          'For every friend you invite to Pocket, you get insider notifications 5 seconds sooner. And it’s 10 seconds if you invite an insider.',
        icon: { mediaHash: undefined, altText: '', width: 0, height: 0 },
        screen: { mediaHash: undefined, altText: '', width: 0, height: 0 },
      },
      {
        name: 'Notifications on stock dips',
        description:
          'Get a push notification every time we find out something that’s going to lower the share price on your holdings so you can sell before the information hits the public markets.',
        icon: { mediaHash: undefined, altText: '', width: 0, height: 0 },
        screen: { mediaHash: undefined, altText: '', width: 0, height: 0 },
      },
      {
        name: 'Invest what you want',
        description:
          'We hide your stock purchases behind thousands of anonymous trading accounts, so suspicious activity can never be traced back to you.',
        icon: { mediaHash: undefined, altText: '', width: 0, height: 0 },
        screen: { mediaHash: undefined, altText: '', width: 0, height: 0 },
      },
    ],
  },
  sideEditingProps: [
    {
      propName: 'color',
      type: 'color',
      label: 'Color',
    },
  ],
  lists: [
    {
      propName: 'features',
      label: 'Feature',
      defaultValue: {
        name: 'New Feature',
        description: 'Description of the new feature',
        icon: { mediaHash: undefined, altText: '', width: 0, height: 0 },
        screen: { mediaHash: undefined, altText: '', width: 0, height: 0 },
      },
    },
  ],
}

export default PrimaryFeatures
