<script>
    import { onMount } from 'svelte';
    import { dodo } from '$lib/store';

    let dodoUrl = '';

    onMount(() => {
        console.log('CharacterBoard mounted');
        dodoUrl = dodo.getCharacter($dodo);
        console.log(dodoUrl);
    });

    async function handleSave() {
        const res = await fetch('http://localhost:3000/api/save', {
        });
    }
</script>

<figure class="relative w-full h-full flex justify-center items-center bg-custom-secondary rounded-2xl mb-2">
    <img src={dodoUrl} alt="캐릭터" class="scale-150"/>
</figure>