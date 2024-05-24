<script>
	import { onMount } from 'svelte';
	import { createClient } from '@supabase/supabase-js';

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


</script>

<ul>
	{#each data.users as user}
		<li on:click={() => console.log(user)}>{user}</li>
	{/each}
</ul>
