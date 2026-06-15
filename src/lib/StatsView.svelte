<script lang="ts">
	import type { GameRecord } from '$lib/engine/types';
	import { computeStats, type Group } from '$lib/stats';

	let { games }: { games: GameRecord[] } = $props();
	let s = $derived(computeStats(games));

	function spark(vals: number[], w = 280, h = 44): string {
		if (vals.length < 2) return '';
		const min = Math.min(...vals);
		const max = Math.max(...vals);
		const range = max - min || 1;
		return vals.map((v, i) => `${(i / (vals.length - 1)) * w},${h - ((v - min) / range) * (h - 4) - 2}`).join(' ');
	}
	const groupLabel: Record<string, string> = { house: 'House', sport: 'Sport', light: 'Light', medium: 'Medium', heavy: 'Heavy', short: 'Short', long: 'Long' };
</script>

{#if !s.games}
	<div class="soon">No bowling games yet — finish a Bowl-off (or a solo game) and your stats appear here.</div>
{:else}
	<div class="grid">
		<div class="stat"><div class="v">{s.avg}</div><div class="k">average</div></div>
		<div class="stat"><div class="v">{s.high}</div><div class="k">high</div></div>
		<div class="stat"><div class="v">{s.games}</div><div class="k">games</div></div>
		<div class="stat"><div class="v">{s.strikePct}%</div><div class="k">strikes</div></div>
		<div class="stat"><div class="v">{s.firstBallAvg}</div><div class="k">1st ball</div></div>
		<div class="stat"><div class="v">{s.cleanGames}</div><div class="k">clean</div></div>
	</div>

	{#if s.trend.length > 1}
		<div class="card">
			<div class="ct">Score trend</div>
			<svg viewBox="0 0 280 44" preserveAspectRatio="none" class="spark">
				<polyline points={spark(s.trend)} fill="none" stroke="var(--accent)" stroke-width="2" />
			</svg>
			<div class="sub">{s.low}–{s.high} · last {s.lastScore}</div>
		</div>
	{/if}

	<div class="card">
		<div class="ct">Spares &amp; leaves</div>
		<div class="bar"><span>Spare conversion</span><b>{s.sparePct}%</b></div>
		<div class="track"><span style="width:{s.sparePct}%"></span></div>
		<div class="bar"><span>Makables (non-split)</span><b>{s.makablePct}%</b></div>
		<div class="track"><span style="width:{s.makablePct}%;background:var(--me)"></span></div>
		<div class="sub">{s.spareConv}/{s.spareAtt} spares · {s.splitCount} splits ({s.splitRate}% of leaves) · open rate {s.openRate}%</div>
	</div>

	{#if s.leftPins.length}
		<div class="card">
			<div class="ct">Most-left pins</div>
			{#each s.leftPins.slice(0, 5) as p (p.pin)}
				<div class="bar"><span>Pin {p.pin}</span><b>{p.count}× · made {p.count ? Math.round((p.made / p.count) * 100) : 0}%</b></div>
			{/each}
		</div>
	{/if}

	{#snippet groupCard(title: string, rows: Group[])}
		{#if rows.length > 1}
			<div class="card">
				<div class="ct">{title}</div>
				{#each rows as r (r.key)}
					<div class="bar"><span>{groupLabel[r.key] ?? r.key} <span class="muted">×{r.count}</span></span><b>avg {r.avg} · spare {r.sparePct}%</b></div>
				{/each}
			</div>
		{/if}
	{/snippet}
	{@render groupCard('By pattern type', s.byPattern)}
	{@render groupCard('By oil volume', s.byVolume)}
	{@render groupCard('By pattern length', s.byLength)}

	{#if s.readJudged}
		<div class="card">
			<div class="ct">Journal — lane read</div>
			<div class="bar"><span>Reads matched (V/X)</span><b>{s.readMatched}/{s.readJudged} · {Math.round((s.readMatched / s.readJudged) * 100)}%</b></div>
		</div>
	{/if}
{/if}

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 8px;
		margin-bottom: 12px;
	}
	.stat {
		background: var(--panel);
		border: 1px solid var(--line);
		border-radius: 12px;
		padding: 10px;
		text-align: center;
	}
	.stat .v {
		font-size: 20px;
		font-weight: 800;
		color: var(--accent);
	}
	.stat .k {
		font-size: 10px;
		color: var(--dim);
		text-transform: uppercase;
		letter-spacing: 0.4px;
	}
	.card {
		background: var(--panel);
		border: 1px solid var(--line);
		border-radius: 14px;
		padding: 12px;
		margin-bottom: 10px;
	}
	.ct {
		font-weight: 700;
		margin-bottom: 8px;
	}
	.bar {
		display: flex;
		justify-content: space-between;
		font-size: 13px;
		margin: 6px 0 3px;
	}
	.bar b {
		font-variant-numeric: tabular-nums;
	}
	.muted {
		color: var(--dim);
	}
	.track {
		height: 6px;
		background: var(--panel2);
		border-radius: 3px;
		overflow: hidden;
		margin-bottom: 4px;
	}
	.track span {
		display: block;
		height: 100%;
		background: var(--accent);
	}
	.spark {
		width: 100%;
		height: 44px;
		display: block;
	}
	.sub {
		font-size: 11px;
		color: var(--dim);
		margin-top: 6px;
	}
</style>
