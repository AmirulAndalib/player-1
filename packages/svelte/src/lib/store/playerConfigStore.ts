import { writable } from 'svelte/store';

const playerConfigStore = writable({
	icons: [
		{
			name: 'play',
			html: ''
		},
		{
			name: 'pause',
			html: ''
		},
		{
			name: 'volumeMute',
			html: ''
		},
		{
			name: 'volumeMin',
			html: ''
		},
		{
			name: 'volumeMax',
			html: ''
		},
		{
			name: 'fullscreenEnter',
			html: ''
		},
		{
			name: 'fullscreenExit',
			html: ''
		},
		{
			name: 'subtitlesOn',
			html: ''
		},
		{
			name: 'subtitlesOff',
			html: ''
		},
		{
			name: 'info',
			html: ''
		},
		{
			name: 'close',
			html: ''
		}
	]
});

export default playerConfigStore;
