<script lang="ts">
	import { fade } from 'svelte/transition';
	import screenfull from 'screenfull';
	import { shortcut } from './utils/shortcut.js';
	import playerStateStore from './store/playerStateStore.js';

	let fullscreenElement: HTMLDivElement;

	const handlePlayPauseToggle = () => {
		$playerStateStore.paused = !$playerStateStore.paused;
	};

	const handleMuteToggle = () => {
		$playerStateStore.muted = !$playerStateStore.muted;
	};

	// uses screenful lib to manage and control fullscreen sessions
	const handleFullscreenToggle = () => {
		if (screenfull.isEnabled) {
			$playerStateStore.isFullscreen = !$playerStateStore.isFullscreen;
			screenfull.toggle(fullscreenElement);
		}
	};
</script>

<div bind:this={fullscreenElement} class="w-full h-full bg-black relative">
	<!-- svelte-ignore a11y-media-has-caption -->
	<video
		class="w-full h-full"
		bind:paused={$playerStateStore.paused}
		bind:muted={$playerStateStore.muted}
		src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
	/>
	<div class="absolute top-0 h-full bottom-0 left-0 right-0 w-full">
		<div class="absolute left-0 right-0 top-0 p-4 flex w-full items-center space-x-2">
			<div><span class="text-white text-sm font-semibold px-2">00:24 / 01:02</span></div>
		</div>
		<div class="absolute top-0 bottom-0 left-0 right-0 w-fit h-fit m-auto">
			<button
				class="animate-button hover:scale-110 transition-transform ease-out aspect-square h-fit w-fit flex justify-center items-center"
				use:shortcut={{ code: 'Space' }}
				on:click={handlePlayPauseToggle}
			>
				{#if $playerStateStore.paused}
					<span transition:fade={{ duration: 100 }}>
						<i class="awe-play text-6xl" />
					</span>
				{:else}
					<span transition:fade={{ duration: 100 }}>
						<i class="awe-pause text-6xl" />
					</span>
				{/if}
			</button>
		</div>
		<div class="absolute right-0 bottom-0 flex p-2">
			<button
				class="animate-button hover:scale-110 transition-transform ease-out aspect-square h-14 w-14 flex justify-center items-center"
				use:shortcut={{ code: 'KeyM' }}
				on:click={handleMuteToggle}
			>
				{#if $playerStateStore.muted}
					<span transition:fade={{ duration: 100 }}>
						<i class="awe-volume-mute text-xl lg:text-2xl" />
					</span>
				{:else}
					<span transition:fade={{ duration: 100 }}>
						<i class="awe-volume-max text-xl lg:text-2xl" />
					</span>
				{/if}
			</button>
			<button
				class="animate-button hover:scale-110 transition-transform ease-out aspect-square h-14 w-14 flex justify-center items-center"
				use:shortcut={{ code: 'KeyF' }}
				on:click={handleFullscreenToggle}
			>
				{#if $playerStateStore.isFullscreen}
					<span transition:fade={{ duration: 100 }}>
						<i class="awe-fullscreen-exit text-2xl" />
					</span>
				{:else}
					<span transition:fade={{ duration: 100 }}>
						<i class="awe-fullscreen-enter text-2xl" />
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
