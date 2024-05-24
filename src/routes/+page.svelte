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
	console.log(supabase);
	console.log(session);

	$: if (session) {
		window.location.href = '/home';
	} else {
		window.location.href = '/login';
	
	}
	
</script>
