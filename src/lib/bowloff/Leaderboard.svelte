<script lang="ts">
	import { g } from './state.svelte';
	import { styleShort } from '$lib/engine/personas';

	let rows = $derived(g.standings());
	let fric = $derived(g.laneFriction);
	let laneWord = $derived(fric < 0.4 ? 'oily' : fric < 0.6 ? 'transitioning' : 'burnt');
</script>

<div class="lb">
	{#each rows as r, i (r.name)}
		<div class="lbrow" class:me={r.me}>
			<span class="rank">{i + 1}</span>
			<span class="who">
				<div class="n" class:me={r.me}>{r.name}</div>
				<div class="meta">
					{styleShort(r.styleKey)}{r.sw != null && g.revealed > r.sw ? ` · 🔄 ball down F${r.sw + 1}` : ''}
				</div>
			</span>
			{#if g.useHcp && r.hcp}<span class="hcp">+{r.hcp}</span>{/if}
			<span class="tot" style="color:{r.me ? 'var(--me)' : 'var(--opp)'}">{r.total}</span>
		</div>
	{/each}
	<div class="lanestate">
		<span>lane</span>
		<span class="meter"><span class="f" style="width:{Math.round(fric * 100)}%"></span></span>
		<span>{laneWord}</span>
	</div>
</div>
