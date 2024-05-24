// src/routes/hooks.server.js
// SvelteKit v2
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
import { createServerClient } from '@supabase/ssr';

// @ts-ignore
export const handle = async ({ event, resolve }) => {
	event.locals.supabaseServerClient = createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
		cookies: {
			get: (key) => event.cookies.get(key),
			set: (key, value, options) => {
				event.cookies.set(key, value, { ...options, path: '/' });
			},
			remove: (key, options) => {
				event.cookies.delete(key, { ...options, path: '/' });
			}
		}
	});

	const getSessionAndUser = async () => {
		const { data: user, error: err }  = await event.locals.supabaseServerClient.auth.getUser()
	
	  let session
	   if (err) {
		   return { session, user: null }
	   }
	   else {
		 session = (await event.locals.supabaseServerClient.auth.getSession()).data?.session
	  }

		return {session, user}
	  }

	  const {session, user} = await getSessionAndUser()

	  event.locals.session = session
	  event.locals.user = user

	return resolve(event, {
		/**
         * @param {string} name
         */
		filterSerializedResponseHeaders(name) {
			return name === 'content-range';
		}
	});
};