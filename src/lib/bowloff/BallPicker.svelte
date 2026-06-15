<script lang="ts">
	import { g } from './state.svelte';
	import { arsenal } from '$lib/arsenal.svelte';
</script>

{#if g.ballPickerOpen}
	<button class="backdrop" aria-label="Close" onclick={() => (g.ballPickerOpen = false)}></button>
	<div class="sheet">
		<div class="sht">🔄 Switch ball — frame {Math.min(g.curIdx, 9) + 1}</div>
		{#each arsenal.available as b (b.id)}
			<button class="ball" class:on={b.id === g.ballId} onclick={() => g.switchBall(b.id)}>
				<div class="nm">{b.name}{b.id === g.ballId ? ' ·  in hand' : ''}</div>
				<div class="st">{b.cover} · {b.core === 'symmetric' ? 'sym' : 'asym'} · {b.weight}lb</div>
			</button>
		{/each}
		<a class="ghost" href="/arsenal" style="display:block;text-align:center;margin-top:8px">＋ Manage arsenal</a>
	</div>
{/if}

<style>
	.backdrop {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.55);
		border: 0;
		z-index: 40;
	}
	.sheet {
		position: fixed;
		left: 50%;
		bottom: 0;
		transform: translateX(-50%);
		width: 100%;
		max-width: 540px;
		background: var(--panel);
		border: 1px solid var(--line);
		border-radius: 18px 18px 0 0;
		padding: 16px 14px calc(18px + env(safe-area-inset-bottom));
		z-index: 41;
		max-height: 80vh;
		overflow-y: auto;
	}
	.sht {
		font-weight: 700;
		font-size: 16px;
		margin-bottom: 10px;
	}
	.ball {
		display: block;
		width: 100%;
		text-align: left;
		background: var(--panel2);
		border: 1px solid var(--line);
		border-radius: 12px;
		padding: 11px 12px;
		margin-bottom: 8px;
	}
	.ball.on {
		border-color: var(--accent);
	}
	.ball .nm {
		font-weight: 700;
		font-size: 14px;
	}
	.ball .st {
		font-size: 11px;
		color: var(--dim);
		text-transform: capitalize;
	}
</style>
