// Shared game history — one timeline for both modes, persisted to localStorage.
import type { GameRecord } from '$lib/engine/types';

const KEY = 'vl.games.v1';

export class History {
	games = $state<GameRecord[]>([]);
	#loaded = false;

	/** Lazy-load from localStorage (client only). Safe to call repeatedly. */
	load() {
		if (this.#loaded || typeof localStorage === 'undefined') return;
		this.#loaded = true;
		try {
			this.games = JSON.parse(localStorage.getItem(KEY) ?? '[]');
		} catch {
			this.games = [];
		}
	}
	#persist() {
		if (typeof localStorage !== 'undefined') localStorage.setItem(KEY, JSON.stringify(this.games));
	}
	add(g: GameRecord) {
		this.load();
		this.games.unshift(g); // newest first
		this.#persist();
	}
	remove(id: string) {
		this.games = this.games.filter((x) => x.id !== id);
		this.#persist();
	}
	clear() {
		this.games = [];
		this.#persist();
	}

	/** Generate an id without relying on crypto (works everywhere). */
	static newId() {
		return `${Date.now().toString(36)}-${Math.floor(Math.random() * 1e6).toString(36)}`;
	}
}

export const history = new History();
