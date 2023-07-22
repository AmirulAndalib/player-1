<script lang="ts">
	import { fade } from 'svelte/transition';
	import screenfull from 'screenfull';
	import { writable } from 'svelte/store';
	import { shortcut } from './utils/shortcut.js';

	let fullscreenElement: HTMLDivElement;

	const playerState = writable({
		hideSlider: false,
		alwaysSlowSlider: true,
		paused: true,
		muted: false,
		isFullscreen: false
	});

	const handlePlayPauseToggle = () => {
		$playerState.paused = !$playerState.paused;
	};

	const handleMuteToggle = () => {
		$playerState.muted = !$playerState.muted;
	};

	// uses screenful lib to manage and control fullscreen sessions
	const handleFullscreenToggle = () => {
		if (screenfull.isEnabled) {
			$playerState.isFullscreen = !$playerState.isFullscreen;
			screenfull.toggle(fullscreenElement);
		}
	};
</script>

<div bind:this={fullscreenElement} class="w-full h-full bg-black relative">
	<!-- svelte-ignore a11y-media-has-caption -->
	<video
		class="w-full h-full"
		bind:paused={$playerState.paused}
		bind:muted={$playerState.muted}
		src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
	/>
	<div class="absolute top-0 h-full bottom-0 left-0 right-0 w-full">
		<div class="absolute left-0 right-0 top-0 p-4 flex w-full items-center space-x-2">
			<div><span class="text-white text-sm font-semibold px-2">00:24 / 01:02</span></div>
		</div>
		<div class="absolute top-0 bottom-0 left-0 right-0 w-fit h-fit m-auto">
			<button
				class="animate-button hover:scale-110 transition-transform ease-out aspect-square h-fit w-fit flex justify-center items-center"
				use:shortcut={{ shift: true, code: 'Digit1' }}
				on:click={handlePlayPauseToggle}
			>
				{#if $playerState.paused}
					<span
						transition:fade={{ duration: 100 }}
						class="text-6xl material-icons-round text-white"
					>
						play_arrow
					</span>
				{:else}
					<span
						transition:fade={{ duration: 100 }}
						class="text-6xl material-icons-round text-white"
					>
						pause
					</span>
				{/if}
			</button>
		</div>
		<div class="absolute right-0 bottom-0 flex p-4">
			<button
				class="animate-button hover:scale-110 transition-transform ease-out aspect-square h-14 w-14 flex justify-center items-center"
				use:shortcut={{ shift: true, code: 'Digit1' }}
				on:click={handleMuteToggle}
			>
				{#if $playerState.muted}
					<span transition:fade={{ duration: 100 }} class="material-icons-round text-white">
						volume_off
					</span>
				{:else}
					<span transition:fade={{ duration: 100 }} class="material-icons-round text-white">
						volume_up
					</span>
				{/if}
			</button>
			<button
				class="animate-button hover:scale-110 transition-transform ease-out aspect-square h-14 w-14 flex justify-center items-center"
				use:shortcut={{ shift: true, code: 'Digit1' }}
				on:click={handleFullscreenToggle}
			>
				{#if $playerState.isFullscreen}
					<span transition:fade={{ duration: 100 }} class="material-icons-round text-white">
						fullscreen_exit
					</span>
				{:else}
					<span transition:fade={{ duration: 100 }} class="material-icons-round text-white">
						fullscreen
					</span>
				{/if}
			</button>
		</div>
	</div>
</div>

<style>
	.animate-button {
		display: grid;
	}
	.animate-button > * {
		grid-area: 1/1/2/2;
		-webkit-text-stroke: 4px rgba(48, 48, 48, 0.2);
		paint-order: stroke fill;
	}
</style>
