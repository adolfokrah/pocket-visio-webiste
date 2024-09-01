'use client'
import { Container } from '@/components/Container'
import { Block, MediaFile } from 'visio-cms-lib/types'
import Text from 'visio-cms-lib/Text'
import List from 'visio-cms-lib/List'
import VisioImage from 'visio-cms-lib/Image'
import Image from 'next/image'

interface SecondaryFeaturesProps {
  title: string
  subTitle: string
  secondaryFeatures: {
    name: string
    description: string
    icon: MediaFile
  }[]
  pageBlockId?: string
}

const SecondaryFeatures: Block<SecondaryFeaturesProps> = ({
  title,
  subTitle,
  secondaryFeatures,
  pageBlockId = '',
}) => {
  return (
    <section
      id="secondary-features"
      aria-label="Features for building a portfolio"
      className="py-20 sm:py-32"
    >
      <Container>
        <div className="mx-auto max-w-2xl sm:text-center">
          <h2 className="text-3xl font-medium tracking-tight text-gray-900">
            <Text
              defaultValue={title}
              propName="title"
              pageBlockId={pageBlockId}
            />
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            <Text
              defaultValue={subTitle}
              propName="subTitle"
              pageBlockId={pageBlockId}
            />
          </p>
        </div>

        <List
          propName="secondaryFeatures"
          pageBlockId={pageBlockId}
          defaultPropValues={secondaryFeatures}
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 text-sm sm:mt-20 sm:grid-cols-2 md:gap-y-10 lg:max-w-none lg:grid-cols-3"
          listItemClassName="rounded-2xl border border-gray-200 p-8"
          renderComponent={({ name, description, icon }, index) => {
            return (
              <>
                <VisioImage
                  pageBlockId={pageBlockId}
                  propName={`secondaryFeatures.${index}.icon`}
                  defaultValue={icon}
                  wrapperClassName="h-10 w-10 bg-gray-100 relative"
                  fallbackImage="https://i0.wp.com/ourscene.org/wp-content/uploads/2022/01/placeholder-2.png?fit=1200%2C800&ssl=1&w=640"
                  renderImage={(props) => (
                    <Image
                      src={props.imagePublicUrl}
                      fill
                      alt={props.altText}
                      className="object-cover"
                    />
                  )}
                />
                <h3 className="mt-6 font-semibold text-gray-900">
                  <Text
                    pageBlockId={pageBlockId}
                    propName={`secondaryFeatures.${index}.name`}
                    defaultValue={name}
                  />
                </h3>
                <p className="mt-2 text-gray-700">
                  <Text
                    pageBlockId={pageBlockId}
                    propName={`secondaryFeatures.${index}.description`}
                    defaultValue={description}
                  />
                </p>
              </>
            )
          }}
        />
      </Container>
    </section>
  )
}

SecondaryFeatures.Schema = {
  name: 'SecondaryFeatures',
  id: 'secondaryFeatures',
  sideEditingProps: [],
  defaultPropValues: {
    title: 'Now is the time to build your portfolio.',
    subTitle:
      'With typical market returns, you have to start young to secure your future. With Pocket, it’s never too late to build your nest egg.',
    secondaryFeatures: [],
  },
  lists: [
    {
      propName: 'secondaryFeatures',
      label: 'Secondary Feature',
      defaultValue: {
        name: 'New Feature',
        description: 'New Feature description here',
        icon: { mediaHash: null, width: 0, height: 0, altText: '' },
      },
    },
  ],
}

export default SecondaryFeatures
