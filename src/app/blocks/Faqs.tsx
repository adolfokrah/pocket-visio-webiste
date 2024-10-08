'use client'
import { Container } from '@/components/Container'
import { Block } from 'visio-cms-lib/types'
import Text from 'visio-cms-lib/Text'
import List from 'visio-cms-lib/List'

interface Faq {
  title: string
  description: string
  faqs: {
    question: string
    answer: string
  }[]
  pageBlockId?: string
}

const Faqs: Block<Faq> = ({ title, description, faqs, pageBlockId = '' }) => {
  return (
    <section
      id="faqs"
      aria-labelledby="faqs-title"
      className="border-t border-gray-200 py-20 sm:py-32"
    >
      <Container>
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2
            id="faqs-title"
            className="text-3xl font-medium tracking-tight text-gray-900"
          >
            <Text
              defaultValue={title}
              propName="title"
              pageBlockId={pageBlockId}
            />
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            <Text
              defaultValue={description}
              propName="description"
              pageBlockId={pageBlockId}
            />
          </p>
        </div>

        <List
          pageBlockId={pageBlockId}
          propName="faqs"
          defaultPropValues={faqs}
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:max-w-none lg:grid-cols-3"
          renderComponent={({ question, answer }, index) => {
            return (
              <>
                <h3 className="text-lg font-semibold leading-6 text-gray-900">
                  <Text
                    defaultValue={question}
                    propName={`faqs.${index}.question`}
                    pageBlockId={pageBlockId}
                  />
                </h3>
                <p className="mt-4 text-sm text-gray-700">
                  <Text
                    defaultValue={answer}
                    propName={`faqs.${index}.answer`}
                    pageBlockId={pageBlockId}
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

Faqs.Schema = {
  name: 'FAQs',
  id: 'faqs',
  defaultPropValues: {
    title: 'Frequently asked questions',
    description: 'If you have anything else you want to ask, reach out to us',
    faqs: [
      {
        question: 'How do I know the tips are good?',
        answer:
          'Our whole business depends on our tips being good, so it’s in our best interest that they are. The results of our customers speak for themselves, just trust us.',
      },
      {
        question: 'Isn’t this insider trading?',
        answer:
          'Yes exactly. But at scale! Historically you could only make insider trades with knowledge from your direct network. Pocket brings you insider trading tips from people you don’t even know.',
      },
      {
        question: 'But isn’t insider trading illegal?',
        answer:
          'Here’s the thing: you’re the one doing the insider trading, not us. We’re just giving you the tips and some tools to make trades. We’re not doing anything wrong here.',
      },
      {
        question: 'Do the people giving you tips realize what they are doing?',
        answer:
          'Again I would argue this isn’t really our responsibility. People make their own choices. If they don’t research the consequences that’s on them, not on us.',
      },
      {
        question: 'Where is Pocket based?',
        answer:
          'Let’s just say it’s not somewhere where the SEC is going to find us.',
      },
      {
        question: 'Is there any age limit to trading on Pocket?',
        answer:
          'For our free plan, the age limit is based on the minimum age to trade in your country of residence. Our VIP plan uses advanced transaction anonymization though, so you can use that plan even if you’re 9 years old. Or a dog.',
      },
      {
        question: 'How did you get this on the App Store?',
        answer:
          'Honestly we were surprised too, but eventually we found out that the app reviewer found the app so compelling they approved it just so they could use it themselves.',
      },
      {
        question:
          'How do I explain the money I withdraw from Pocket to the IRS?',
        answer:
          'This feels like one-hundred percent a you problem. Pocket is not responsible in any way for your tax returns.',
      },
      {
        question: 'How do I become an insider?',
        answer:
          'Contact us with some details about your industry and the type of access you have to apply for an insider account. Once approved, we’ll send you a guide on collecting insider information without being detected at work.',
      },
    ],
  },
  sideEditingProps: [],
  lists: [
    {
      propName: 'faqs',
      label: 'FAQ',
      defaultValue: {
        question: 'How do I become an insider?',
        answer:
          'Contact us with some details about your industry and the type of access you have to apply for an insider account. Once approved, we’ll send you a guide on collecting insider information without being detected at work.',
      },
    },
  ],
}

export default Faqs
