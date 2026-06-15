// Roster store: built-in rivals + user-created custom rivals + hidden built-ins.
import { ROSTER } from '$lib/engine/personas';
import type { Bowler } from '$lib/engine/types';

const KEY = 'vl.roster.v1';

export class RosterStore {
	custom = $state<Bowler[]>([]);
	hidden = $state<string[]>([]); // ids of built-in rivals the user hid

	constructor() {
		this.#load();
	}
	#load() {
		if (typeof localStorage === 'undefined') return;
		try {
			const s = JSON.parse(localStorage.getItem(KEY) ?? 'null');
			if (s) {
				if (Array.isArray(s.custom)) this.custom = s.custom;
				if (Array.isArray(s.hidden)) this.hidden = s.hidden;
			}
		} catch {
			/* ignore */
		}
	}
	#persist() {
		if (typeof localStorage !== 'undefined') localStorage.setItem(KEY, JSON.stringify({ custom: this.custom, hidden: this.hidden }));
	}

	/** Rivals selectable in Bowl-off: visible built-ins + all custom. */
	get available(): Bowler[] {
		return [...ROSTER.filter((r) => !this.hidden.includes(r.id)), ...this.custom];
	}
	/** Everything, for the manager UI. */
	get builtins() {
		return ROSTER.map((r) => ({ bowler: r, hidden: this.hidden.includes(r.id) }));
	}

	addCustom(b: Bowler) {
		this.custom.push(b);
		this.#persist();
	}
	updateCustom(id: string, b: Bowler) {
		const i = this.custom.findIndex((c) => c.id === id);
		if (i >= 0) this.custom[i] = b;
		this.#persist();
	}
	removeCustom(id: string) {
		this.custom = this.custom.filter((c) => c.id !== id);
		this.#persist();
	}
	hide(id: string) {
		if (!this.hidden.includes(id)) {
			this.hidden.push(id);
			this.#persist();
		}
	}
	unhide(id: string) {
		this.hidden = this.hidden.filter((h) => h !== id);
		this.#persist();
	}
	static newId() {
		return 'c' + Date.now().toString(36) + Math.floor(Math.random() * 1e4).toString(36);
	}
}

export const roster = new RosterStore();
