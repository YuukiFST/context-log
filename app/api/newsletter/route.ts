import { NextResponse } from 'next/server'
import { newsletterSchema } from '@/lib/schemas'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const result = newsletterSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.errors[0].message },
        { status: 400 }
      )
    }

    // Placeholder: integrate with Buttondown or equivalent provider
    // const response = await fetch('https://api.buttondown.email/v1/subscribers', {
    //   method: 'POST',
    //   headers: {
    //     Authorization: `Token ${process.env.BUTTONDOWN_API_KEY}`,
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ email: result.data.email }),
    // })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    )
  }
}
