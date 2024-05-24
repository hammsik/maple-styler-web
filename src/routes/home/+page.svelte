<script>
	import Header from '$lib/components/Header.svelte';
	import LeftSide from '$lib/components/LeftSide.svelte';
	import CenterBoard from '$lib/components/CenterBoard.svelte';
	import RightSide from '$lib/components/RightSide.svelte';
	import { sessionTmp, supabaseTmp } from '$lib/store';

	export let data;
	let { supabase, session } = data;
	$: ({ supabase, session } = data);
	console.log(supabase);
	console.log(session);

	$: if (session) {
		console.log(session.user.email);
		sessionTmp.setSession(session);
		supabaseTmp.setSupabase(supabase);
	} else {
		window.location.href = '/login';
	}

	async function logout() {
		const { error } = await supabase.auth.signOut();
		if (error) {
			console.log('로그아웃 실패');
		} else {
			console.log('로그아웃 성공');
			window.location.href = '/login';
		}
	}
</script>

<div
	class="w-full h-full max-w-[1480px] max-h-[868px] flex flex-col justify-center items-center text-white p-4"
>
	<Header onSignOut={logout} />
	<main class="w-full h-full flex gap-5 py-3">
		<LeftSide />
		<CenterBoard />
		<RightSide />
	</main>
</div>
