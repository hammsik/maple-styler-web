<script>
	import { onMount } from 'svelte';
	// import { createClient } from '@supabase/supabase-js';

	// onMount(() => {
	// 	auth.onAuthStateChanged((user) => {
	// 		if (!user) {
	// 			window.location.href = '/login';
	// 		} else {
	//             window.location.href = '/home';
	//         }
	// 	});
	// });
	export let data;
	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	async function signUpNewUser() {
		const { data, error } = await supabase.auth.signUp({
			email: 'example@email.com',
			password: 'example-password',
			options: {
				emailRedirectTo: 'https://example.com/welcome'
			}
		});
	}
</script>

<div class="container w-96 h-96 border-blue-50 border-2 flex justify-center items-center">
	<button class="btn btn-lg" on:click={() => signUpNewUser()}>회원가입</button>
</div>
