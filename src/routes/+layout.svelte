<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { page } from '$app/state';

	let { children } = $props();

	const TABS = [
		{ href: '/', ic: '🏠', label: 'Home', exact: true },
		{ href: '/bowloff', ic: '🎳', label: 'Bowl-off' },
		{ href: '/journal', ic: '📖', label: 'Journal' },
		{ href: '/trace', ic: '🎥', label: 'Trace' },
		{ href: '/form', ic: '🏃', label: 'Form' },
		{ href: '/history', ic: '📊', label: 'History' },
		{ href: '/settings', ic: '⚙️', label: 'Settings' }
	];
	// Hide the tab bar on the launch mode-picker.
	let showTabs = $derived(page.url.pathname !== '/');
	const isActive = (t: { href: string; exact?: boolean }) =>
		t.exact ? page.url.pathname === t.href : page.url.pathname.startsWith(t.href);
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="app">
	{@render children()}

	{#if showTabs}
		<nav class="tabbar">
			{#each TABS as t (t.href)}
				<a href={t.href} class:active={isActive(t)}>
					<span class="ic">{t.ic}</span>
					<span>{t.label}</span>
				</a>
			{/each}
		</nav>
	{/if}
</div>
