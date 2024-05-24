//  src/routes/+page.server.js
import { redirect } from "@sveltejs/kit"

export const load = async ({ locals }) => {
    // protected route with redirect if there is no user's session
    // @ts-ignore
    if (!locals.session) {
        redirect(303, '/');
    }

    // using Supabase server client which is stored in locals
    // locals.supabaseServerClient. ...

    return {
        // @ts-ignore
        session: locals.session,
        user: locals.user
    }
}

// // or if you prefere to return session and user from  layout
// // don't forget to call await parent() to have fresh data
// export const load = async ({ parent } ) =>  {
// 	const data = await parent()
// 	const session = data.session
// 	const user = data.user
//     // if there is no user's sessiion redirect back to the home page
// 	if (!session) {
// 		redirect(303, '/');
// 	}
//   }

export const actions = {
	default: async (event) => {
    const { request, url, locals: { supabaseServerClient } } = event
		const formData = await request.formData()
		const email = formData.get('email') as string
		const password = formData.get('password') as string
    ...
	}
}
// import { supabase } from "$lib/supabaseClient";

// export async function load() {
//   const { data } = await supabase.from("users").select();
//   return {
//     users: data ?? [],
//   };
// }