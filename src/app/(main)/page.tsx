import Page from './[locale]/[...slug]/page'

export default function IndexPage() {
  return <Page params={{ slug: ['index'], locale: 'en-us' }} />
}
