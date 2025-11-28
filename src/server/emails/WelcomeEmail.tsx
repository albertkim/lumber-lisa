import { User } from "@/models"
import {
  Container,
  Head,
  Heading,
  Html,
  Link,
  pixelBasedPreset,
  render,
  Section,
  Tailwind,
  Text
} from "@react-email/components"

export async function generateWelcomeEmail(user: User, token: string) {
  return render(
    <Tailwind
      config={{
        presets: [pixelBasedPreset],
        theme: {
          extend: {
            colors: {
              brand: "#007291"
            }
          }
        }
      }}
    >
      <Html>
        <Head />
        <Container>
          <Section>
            <Heading as="h1">👋 Welcome to Lumber (LISA adapter)</Heading>
            <Text>Your account has been created successfully! We're excited to have you on board.</Text>
            <Text>
              You can set your password <Link href={`${process.env.WEB_URL}/reset-password/${token}`}>here</Link> to
              start using Lumber.
            </Text>
            <Text>
              If you forget your password, you can reset it from the login page by clicking{" "}
              <Link href={`${process.env.WEB_URL}/forgot-password`}>forgot password</Link>.
            </Text>
            <Text>
              We also recommend adding the <Link href={`${process.env.WEB_URL}`}>dashboard link</Link> to your browser
              bookmarks for easy access.
            </Text>
            <br />
          </Section>
        </Container>
      </Html>
    </Tailwind>
  )
}
