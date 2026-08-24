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
    diagnosis: '',
  }

  if (!url || !key) {
    results.diagnosis = '❌ PROBLEM FOUND: Supabase environment variables are missing in Vercel. Go to Vercel → Project Settings → Environment Variables and add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY, then redeploy.'
    return NextResponse.json(results, { status: 200 }) // Return 200 so we can read the body
  }

  // Test 1: Can we ping Supabase?
  try {
    const pingRes = await fetch(`${url}/auth/v1/settings`, {
      headers: { apikey: key, Authorization: `Bearer ${key}` },
    })
    results.ping = { status: pingRes.status, ok: pingRes.ok }
    if (!pingRes.ok) results.ping.body = await pingRes.text()
  } catch (e: any) {
    results.ping = { error: e.message }
  }

  // Test 2: profiles table
  try {
    const tableRes = await fetch(`${url}/rest/v1/profiles?limit=0`, {
      headers: { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    })
    results.profiles_table = { status: tableRes.status, ok: tableRes.ok, exists: tableRes.status !== 404 }
    if (!tableRes.ok) results.profiles_table.body = await tableRes.text()
  } catch (e: any) {
    results.profiles_table = { error: e.message }
  }

  results.diagnosis = results.ping?.ok && results.profiles_table?.ok
    ? '✅ All OK — Supabase is connected and profiles table exists!'
    : '⚠️ Check individual results above for details'

  return NextResponse.json(results)
}
