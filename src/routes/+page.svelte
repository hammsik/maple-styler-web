<script>
	import Header from '$lib/components/Header.svelte';
	import LeftSide from '$lib/components/LeftSide.svelte';
	import CenterBoard from '$lib/components/CenterBoard.svelte';
	import RightSide from '$lib/components/RightSide.svelte';
</script>

<div class="w-full h-full max-w-[1480px] max-h-[860px] flex flex-col text-white p-4">
	<Header />
	<main class="w-full h-full flex gap-5 py-3">
		<LeftSide />
		<CenterBoard />
		<RightSide />
	</main>
</div>
