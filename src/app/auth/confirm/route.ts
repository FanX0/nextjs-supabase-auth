import { type EmailOtpType } from '@supabase/supabase-js'
import { type NextRequest } from 'next/server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const token_hash = searchParams.get('token_hash')
    const type = searchParams.get('type') as EmailOtpType | null
    const next = searchParams.get('next') ?? '/'

    if (token_hash && type) {
        const supabase = await createClient()

        const { data, error } = await supabase.auth.verifyOtp({ type, token_hash })
        if (error) console.error('verifyOtp failed:', error)
        else redirect(next)
    }

    // redirect the user to an error page with some instructions
    redirect('/error')
}