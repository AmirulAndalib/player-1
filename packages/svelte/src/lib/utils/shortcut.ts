interface ShortcutParams {
	alt?: boolean;
	shift?: boolean;
	control?: boolean;
	code: string;
	callback?: () => void;
}

interface Shortcut {
	update: () => void;
	destroy: () => void;
}

export const shortcut = (node: HTMLElement, params?: ShortcutParams): Shortcut => {
	let handler: (e: KeyboardEvent) => void;

	const removeHandler = (): void => window.removeEventListener('keydown', handler);

	const setHandler = (): void => {
		removeHandler();

		if (!params) return;

		handler = (e: KeyboardEvent): void => {
			console.log(e.code);
			if (
				!!params.alt !== e.altKey ||
				!!params.shift !== e.shiftKey ||
				!!params.control !== (e.ctrlKey || e.metaKey) ||
				params.code !== e.code
			)
				return;

			e.preventDefault();
			params.callback ? params.callback() : node.click();
		};

		window.addEventListener('keydown', handler);
	};

	setHandler();

	return {
		update: setHandler,
		destroy: removeHandler
	};
};
