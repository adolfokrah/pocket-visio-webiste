export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'
import { getPageBlocks } from 'visio-cms-lib/utils'
import PageContent from '../../page-content'
import NotFound from '@/src/app/not-found'

export default async function Page({
  params,
}: {
  params: { slug: string[]; locale: string }
}) {
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
    />
  )
}
