<script lang="ts">
	// Stub: full Bowl-off (layout B + positional pin deck) is the next build step.
	// For now, a live engine check — simulate the roster on a medium house shot.
	import { ROSTER, TIERS, styleShort } from '$lib/engine/personas';
	import { initialFriction, breakdownRate, recommendBall, simBowlerGame, lastTotal, clamp } from '$lib/engine/bowling';
	import type { LaneCondition } from '$lib/engine/types';

	const cond: LaneCondition = { alley: 'Sunset Lanes', length: 'medium', volume: 'medium', surface: 'synthetic', patternType: 'house' };
	const initF = initialFriction(cond);
	const onLane = ROSTER.map((b) => ({ attr: b.attr, ball: recommendBall(clamp((b.attr.rev - 150) / 400, 0, 1), initF) }));
	const rate = breakdownRate(onLane, { breakdown: true, laneMode: 'bySelection', manualCount: ROSTER.length });
	const lane = { initialFriction: initF, rate, sport: false, allowBallChange: true };

	const results = ROSTER.map((b) => {
		const sim = simBowlerGame(b, lane, recommendBall(clamp((b.attr.rev - 150) / 400, 0, 1), initF + 0.07));
		return { name: b.name, style: styleShort(b.styleKey), tier: TIERS[b.tier].label, score: lastTotal(sim.frames), sw: sim.switchFrame };
	}).sort((a, b) => b.score - a.score);
</script>

<div class="page">
	<h1>🎳 Bowl-off</h1>
	<p class="lede">Coming next: the full frame-by-frame duel (layout B + positional pin deck). Below is a live engine check — one simulated game each, medium house shot.</p>

	{#each results as r (r.name)}
		<div class="soon" style="margin-bottom:8px; display:flex; justify-content:space-between; align-items:center;">
			<span><strong>{r.name}</strong><br /><span style="font-size:12px;color:var(--dim)">{r.style} · {r.tier}{r.sw != null ? ` · 🔄 ball down F${r.sw + 1}` : ''}</span></span>
			<span style="font-weight:800; font-size:20px; color:var(--accent)">{r.score}</span>
		</div>
	{/each}
</div>
