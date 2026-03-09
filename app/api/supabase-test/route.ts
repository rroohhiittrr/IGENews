import { NextResponse } from 'next/server'

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  const results: Record<string, any> = {
    env: {
      url_set: !!url,
      key_set: !!key,
      url_value: url ?? 'NOT SET',
      key_preview: key ? key.substring(0, 20) + '...' : 'NOT SET',
    },
  }

  if (!url || !key) {
    return NextResponse.json({ error: 'Missing env vars', results }, { status: 500 })
  }

  // Test 1: Can we reach Supabase at all?
  try {
    const pingRes = await fetch(`${url}/auth/v1/settings`, {
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
      },
    })
    results.ping = {
      status: pingRes.status,
      ok: pingRes.ok,
      statusText: pingRes.statusText,
    }
    if (!pingRes.ok) {
      const body = await pingRes.text()
      results.ping.body = body
    }
  } catch (e: any) {
    results.ping = { error: e.message }
  }

  // Test 2: Check if profiles table exists (anonymous query)
  try {
    const tableRes = await fetch(`${url}/rest/v1/profiles?limit=0`, {
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
      },
    })
    results.profiles_table = {
      status: tableRes.status,
      ok: tableRes.ok,
      exists: tableRes.status !== 404,
    }
    if (!tableRes.ok) {
      const body = await tableRes.text()
      results.profiles_table.body = body
    }
  } catch (e: any) {
    results.profiles_table = { error: e.message }
  }

  return NextResponse.json(results)
}
