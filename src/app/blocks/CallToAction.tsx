import { AppStoreLink } from '@/components/AppStoreLink'
import { CircleBackground } from '@/components/CircleBackground'
import { Container } from '@/components/Container'
import Text from 'visio-cms-lib/Text'
import VisioImage from 'visio-cms-lib/Image'
import { Block, MediaFile } from 'visio-cms-lib/types'
import Image from 'next/image'

interface CallToActionProps {
  title: string
  subTitle: string
  appStoreLogo: {
    icon: MediaFile
    link: string
  }
  pageBlockId?: string
}
const CallToAction: Block<CallToActionProps> = ({
  title,
  subTitle,
  appStoreLogo,
  pageBlockId = '',
}) => {
  return (
    <section
      id="get-free-shares-today"
      className="relative overflow-hidden bg-gray-900 py-20 sm:py-28"
    >
      <div className="absolute left-20 top-1/2 -translate-y-1/2 sm:left-1/2 sm:-translate-x-1/2">
        <CircleBackground color="#fff" className="animate-spin-slower" />
      </div>
      <Container className="relative">
        <div className="mx-auto max-w-md sm:text-center">
          <h2 className="text-3xl font-medium tracking-tight text-white sm:text-4xl">
            <Text
              defaultValue={title}
              propName="title"
              pageBlockId={pageBlockId}
            />
          </h2>
          <p className="mt-4 text-lg text-gray-300">
            <Text
              defaultValue={subTitle}
              propName="subTitle"
              pageBlockId={pageBlockId}
            />
          </p>
          <div className="mt-8 flex justify-center">
            <VisioImage
              defaultValue={appStoreLogo.icon}
              pageBlockId={pageBlockId}
              propName="appStoreLogo.icon"
              renderImage={({ imagePublicUrl, width, height, altText }) => {
                return (
                  <Image
                    src={imagePublicUrl}
                    width={width}
                    height={height}
                    alt={altText}
                  />
                )
              }}
            />
          </div>
        </div>
      </Container>
    </section>
  )
}

CallToAction.Schema = {
  name: 'Call to action',
  id: 'callToAction',
  sideEditingProps: [],
  defaultPropValues: {
    title: 'Get your first tips today',
    subTitle:
      'It takes 30 seconds to sign up. Download the app and create an account today and we’ll send you a tip guaranteed to double your first investment.',
    appStoreLogo: {
      icon: {
        mediaHash: undefined,
        altText: 'App Store',
        width: 200,
        height: 60,
      },
      link: '#',
    },
  },
}
export default CallToAction
