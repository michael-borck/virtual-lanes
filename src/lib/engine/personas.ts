// Style presets, skill tiers, and the bundled (fictional) roster.
// No real bowler names/likenesses or ball brands — see docs/product-direction.md.

import type { Attr, Bowler, StyleKey, TierKey } from './types';

export const STYLE_PRESETS: Record<Exclude<StyleKey, 'custom'>, { label: string } & Attr> = {
	straight: { label: 'Straight / classic', rev: 180, speed: 16, acc: 0.92, cons: 0.9 },
	stroker: { label: 'Stroker', rev: 300, speed: 16.5, acc: 0.9, cons: 0.88 },
	tweener: { label: 'Tweener', rev: 380, speed: 17, acc: 0.82, cons: 0.78 },
	cranker: { label: 'Cranker / high-rev', rev: 480, speed: 18, acc: 0.75, cons: 0.6 },
	twoHand: { label: 'Two-handed', rev: 540, speed: 18.5, acc: 0.72, cons: 0.55 }
};

export const TIERS: Record<TierKey, { label: string; mult: number; avg: number }> = {
	rookie: { label: 'Rookie', mult: 0.52, avg: 120 },
	club: { label: 'Club', mult: 0.8, avg: 165 },
	pro: { label: 'Pro', mult: 1.0, avg: 200 },
	elite: { label: 'Elite', mult: 1.12, avg: 222 }
};

export const styleShort = (k: StyleKey): string =>
	({ straight: 'Straight', stroker: 'Stroker', tweener: 'Tweener', cranker: 'Cranker', twoHand: 'Two-hand', custom: 'Custom' })[k];

type Seed = Omit<Bowler, 'attr' | 'handicap'> & { handicap?: number; attr?: Attr };

const SEED: Seed[] = [
	{ id: 'reyes', name: 'Dakota "Crank" Reyes', styleKey: 'cranker', tier: 'elite', division: 'pba', scout: 'Massive carry on oil; over/unders into splits once it dries.' },
	{ id: 'halv', name: 'Marge Halvorsen', styleKey: 'stroker', tier: 'club', division: 'pwba', scout: "Won't overpower you, won't miss a spare. Out-grinds people." },
	{ id: 'kenji', name: 'Kenji Tanaka', styleKey: 'twoHand', tier: 'pro', division: 'pba', scout: 'Modern power. Buries fresh house; cliffs on short/dry.' },
	{ id: 'sol', name: 'Bianca Sol', styleKey: 'tweener', tier: 'pro', division: 'pwba', scout: 'Versatile all-rounder. No glaring weakness on medium.' },
	{ id: 'priya', name: 'Priya Nair', styleKey: 'twoHand', tier: 'elite', division: 'pwba', scout: 'Highest ceiling here. Boom or bust as it transitions.' },
	{ id: 'buddy', name: 'Buddy Kowalski', styleKey: 'straight', tier: 'club', division: 'open', scout: 'Pure spare shooter. Low ceiling, never beats himself.' },
	// realistic league profiles (house-good, sport-exposed to varying degrees)
	{ id: 'larry', name: 'League Larry', styleKey: 'custom', tier: 'club', division: 'open', handicap: 50, attr: { rev: 280, speed: 15.5, acc: 0.58, cons: 0.52 }, scout: '~160 house bowler. Sport patterns wreck him — can’t repeat shots.' },
	{ id: 'sammy', name: 'Scratch Sam', styleKey: 'custom', tier: 'pro', division: 'open', handicap: 13, attr: { rev: 410, speed: 17.5, acc: 0.77, cons: 0.72 }, scout: '~205 house scratch. Big game, but flat patterns expose him.' },
	{ id: 'stacy', name: 'Sport Stacy', styleKey: 'custom', tier: 'elite', division: 'open', handicap: 0, attr: { rev: 440, speed: 18, acc: 0.93, cons: 0.9 }, scout: '~230 and travels — accuracy holds up when it gets flat.' }
];

export const ROSTER: Bowler[] = SEED.map((p) => ({
	...p,
	handicap: p.handicap ?? 0,
	attr: p.attr ?? { ...STYLE_PRESETS[p.styleKey as Exclude<StyleKey, 'custom'>] }
}));
