// Bowling centres — stock (generic, no real names) + custom + hidden. Physics-neutral.
import type { Centre } from '$lib/engine/types';

const KEY = 'vl.centres.v1';

export const STOCK_CENTRES: Centre[] = [
	{ id: 'ctr-sunset', name: 'Sunset Lanes', lanes: 24, pinsetter: 'freefall', approach: 'standard', approachFeel: 'normal', ballReturn: 'standard', note: 'house default' },
	{ id: 'ctr-downtown', name: 'Downtown Strikes', lanes: 16, pinsetter: 'string', approach: 'short', approachFeel: 'slippery', ballReturn: 'close', note: 'string pins, tight building' },
	{ id: 'ctr-galaxy', name: 'Galaxy Bowl', lanes: 40, pinsetter: 'freefall', approach: 'long', approachFeel: 'sticky', ballReturn: 'far', note: 'big centre, long approach' }
];

export class Centres {
	custom = $state<Centre[]>([]);
	hidden = $state<string[]>([]);

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

	/** Selectable centres: visible stock + custom. */
	get available(): Centre[] {
		return [...STOCK_CENTRES.filter((c) => !this.hidden.includes(c.id)), ...this.custom];
	}
	get stockList() {
		return STOCK_CENTRES.map((c) => ({ centre: c, hidden: this.hidden.includes(c.id) }));
	}
	byId(id: string | undefined): Centre | undefined {
		if (!id) return undefined;
		return STOCK_CENTRES.find((c) => c.id === id) ?? this.custom.find((c) => c.id === id);
	}

	add(c: Centre) {
		this.custom.push(c);
		this.#persist();
	}
	update(id: string, c: Centre) {
		const i = this.custom.findIndex((x) => x.id === id);
		if (i >= 0) this.custom[i] = c;
		this.#persist();
	}
	remove(id: string) {
		this.custom = this.custom.filter((x) => x.id !== id);
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
		return 'ctr' + Date.now().toString(36) + Math.floor(Math.random() * 1e4).toString(36);
	}
}

export const centres = new Centres();
