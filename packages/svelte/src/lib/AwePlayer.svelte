<script lang="ts">
	import '@awe-player/icons/dist/awe.css';
	import PlayerLite from './PlayerLite.svelte';
	import PlayerPro from './PlayerPro.svelte';

	export let type: 'lite' | 'pro' = 'pro';
</script>

{#if type === 'lite'}
	<PlayerLite />
{:else if type === 'pro'}
	<PlayerPro />
{/if}
