//  src/routes/+server.js
import { redirect } from '@sveltejs/kit';

export const GET = async (event) => {
	const { url, locals: { supabaseServerClient } } = event
	...
}