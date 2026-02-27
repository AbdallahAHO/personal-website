import satori from 'satori'
import { Resvg } from '@resvg/resvg-js'

interface FontData {
  name: string
  data: ArrayBuffer
  weight: 400 | 600 | 700
  style: 'normal'
}

let fontsPromise: Promise<FontData[]> | null = null

async function fetchFont(weight: 400 | 600 | 700): Promise<ArrayBuffer> {
  // Google Fonts v1 API returns TTF (v2 returns woff2 which satori doesn't support)
  const css = await fetch(`https://fonts.googleapis.com/css?family=Inter:${weight}`).then((r) =>
    r.text()
  )

  const url = css.match(/src:\s*url\(([^)]+)\)\s*format\('truetype'\)/)?.[1]
  if (!url) throw new Error(`Could not find Inter TTF URL for weight ${weight}`)

  return fetch(url).then((r) => r.arrayBuffer())
}

function loadFonts(): Promise<FontData[]> {
  if (!fontsPromise) {
    fontsPromise = Promise.all(
      ([400, 600, 700] as const).map(async (weight) => ({
        name: 'Inter',
        data: await fetchFont(weight),
        weight,
        style: 'normal' as const,
      }))
    )
  }
  return fontsPromise
}

interface OGImageOptions {
  title: string
  description?: string
  date?: string
  badge?: string
}

export async function generateOGImage({ title, description, date, badge }: OGImageOptions) {
  const fonts = await loadFonts()

  const truncatedDescription =
    description && description.length > 120 ? `${description.slice(0, 117)}…` : description

  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '60px 80px',
          backgroundColor: '#ffffff',
          fontFamily: 'Inter',
        },
        children: [
          // Top section: header + content
          {
            type: 'div',
            props: {
              style: { display: 'flex', flexDirection: 'column' },
              children: [
                // Header row
                {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    },
                    children: [
                      {
                        type: 'span',
                        props: {
                          style: {
                            fontSize: 18,
                            fontWeight: 600,
                            color: '#71717a',
                            letterSpacing: '0.1em',
                          },
                          children: 'ABDALLAH OTHMAN',
                        },
                      },
                      ...(badge
                        ? [
                            {
                              type: 'span',
                              props: {
                                style: {
                                  fontSize: 14,
                                  fontWeight: 600,
                                  color: '#71717a',
                                  backgroundColor: '#f4f4f5',
                                  padding: '6px 16px',
                                  borderRadius: 100,
                                  letterSpacing: '0.05em',
                                },
                                children: badge,
                              },
                            },
                          ]
                        : []),
                    ],
                  },
                },
                // Divider
                {
                  type: 'div',
                  props: {
                    style: {
                      width: '100%',
                      height: 1,
                      backgroundColor: '#e4e4e7',
                      marginTop: 24,
                      marginBottom: 40,
                    },
                  },
                },
                // Title
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: 52,
                      fontWeight: 700,
                      color: '#18181b',
                      lineHeight: 1.2,
                    },
                    children: title,
                  },
                },
                // Description (optional)
                ...(truncatedDescription
                  ? [
                      {
                        type: 'div',
                        props: {
                          style: {
                            fontSize: 24,
                            fontWeight: 400,
                            color: '#71717a',
                            lineHeight: 1.5,
                            marginTop: 20,
                          },
                          children: truncatedDescription,
                        },
                      },
                    ]
                  : []),
              ],
            },
          },
          // Footer
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              },
              children: [
                {
                  type: 'span',
                  props: {
                    style: { fontSize: 18, fontWeight: 400, color: '#a1a1aa' },
                    children: 'abdallahaho.com',
                  },
                },
                ...(date
                  ? [
                      {
                        type: 'span',
                        props: {
                          style: { fontSize: 18, fontWeight: 400, color: '#a1a1aa' },
                          children: date,
                        },
                      },
                    ]
                  : []),
              ],
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts,
    }
  )

  const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } })
  const pngBuffer = resvg.render().asPng()
  return new Uint8Array(pngBuffer)
}
