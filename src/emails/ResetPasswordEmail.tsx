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

export async function generateResetPasswordEmail(token: string) {
  const reactEmail = (
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
            <Heading as="h1">Lumber - Reset Password</Heading>
            <Text>
              Click <Link href={`${process.env.WEB_URL}/reset-password/${token}`}>here</Link> to reset your password
            </Text>
          </Section>
        </Container>
      </Html>
    </Tailwind>
  )

  return render(reactEmail)
}
