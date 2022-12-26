import { Form } from '@remix-run/react'
import type { SocialsProvider } from 'remix-auth-socials'

interface SocialLoginFormProps {
  provider: SocialsProvider | string
  children: React.ReactNode
}
export const SocialLoginForm = ({
  provider,
  children
}: SocialLoginFormProps) => {
  return (
    <Form method='post' action={`/auth/${provider}`}>
      {children}
    </Form>
  )
}
