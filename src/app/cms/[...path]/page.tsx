'use client'
import Cms from 'visio-cms-lib/Cms'
import '@/node_modules/visio-cms-lib/dist/lib.css'
import blocks from '../../blocks'

export default function Page({ params }: { params: { path: string[] } }) {
  const { path } = params
  return (
    <Cms
      blocks={blocks}
      path={`/cms/${path.join('/')}`}
      allowImageTransformation={false}
      supportedLanguages={[
        {
          language: 'English',
          locale: 'en-us',
        },
        {
          language: 'German',
          locale: 'de',
        },
      ]}
      defaultLanguage={{
        language: 'English',
        locale: 'en-us',
      }}
      emailSender={process.env.NEXT_PUBLIC_EMAIL_SENDER || ''}
      projectId={process.env.NEXT_PUBLIC_PROJECT_ID || ''}
      supabaseProjectUrl={process.env.NEXT_PUBLIC_SUPABASE_URL || ''}
      supabaseAnonKey={process.env.NEXT_PUBLIC_SUPABASE_ANONKEY || ''}
      unsplashAccessKey={process.env.NEXT_PUBLIC_UNSPLASH_ACCESSKEY || ''}
    />
  )
}
