export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'
import { getPageBlocks, getPageMetaData } from 'visio-cms-lib/utils'
import PageContent from '../../page-content'
import NotFound from '@/src/app/not-found'
import type { Metadata } from 'next'

type PageProps = {
  params: { slug: string[]; locale: string }
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug, locale } = params

  const pageMetaData = await getPageMetaData(
    `/${slug.join('/')}`,
    process.env.NEXT_PUBLIC_SUPABASE_ANONKEY || '',
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    locale,
  )

  return {
    title: pageMetaData.title,
    description: pageMetaData.description,
    keywords: pageMetaData.keywords,
    openGraph: {
      title: pageMetaData.title,
      description: pageMetaData.description,
      images: [pageMetaData?.featuredImage || ''],
    },
  }
}

export default async function Page({ params }: PageProps) {
  const { slug, locale } = params
  const data = await getPageBlocks(
    `/${slug.join('/')}`,
    process.env.NEXT_PUBLIC_SUPABASE_ANONKEY || '',
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    locale,
  )

  if (data.error) {
    return <NotFound />
  }

  if (!data) return null

  return (
    <PageContent
      projectConfiguration={data.projectConfiguration}
      pageBlocks={data.pageBlocks}
      params={data.params}
      pages={data.pages}
    />
  )
}
