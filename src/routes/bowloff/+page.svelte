<script lang="ts">
	import { g } from '$lib/bowloff/state.svelte';
	import Setup from '$lib/bowloff/Setup.svelte';
	import Play from '$lib/bowloff/Play.svelte';
	import Done from '$lib/bowloff/Done.svelte';

	let frame = $derived(Math.min(10, g.curIdx + 1));
</script>

{#if g.screen !== 'setup'}
	<div class="topbar">
		<span class="tag">🎳 BOWL-OFF</span>
		<span class="sub">· {g.cond.length}/{g.cond.volume} oil · Fr {frame}/10</span>
		<span style="flex:1"></span>
		<button class="ghost" onclick={() => g.reset()}>↺ New</button>
	</div>
{/if}

{#if g.screen === 'setup'}
	<Setup />
{:else if g.screen === 'play'}
	<Play />
{:else}
	<Done />
{/if}

<style>
	.topbar {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 10px 14px;
		border-bottom: 1px solid var(--line);
		position: sticky;
		top: 0;
		background: var(--bg);
		z-index: 5;
	}
	.tag {
		font-weight: 700;
		letter-spacing: 0.5px;
	}
	.sub {
		color: var(--dim);
		font-size: 12px;
	}
</style>
