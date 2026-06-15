# VirtualLanes

A phone-first bowling companion (PWA). Two modes over one shared history:

- **Bowl-off** — bowl your real frames and compete against a chosen, simulated rival, frame by frame.
- **Lane Read** — journal your real shots (what you saw → decided → happened) to sharpen lane reading.

See **[docs/product-direction.md](docs/product-direction.md)** for the full vision, architecture, and the
simulation model (rev rate + ball speed are the causal levers; conditions, oil breakdown, ball changes).

## Stack

SvelteKit + TypeScript, `adapter-static` (offline-first SPA), deployable to any static host
(Cloudflare Pages / Netlify / a VPS). No backend in v1 — everything is local (localStorage).

## Develop

```bash
pnpm install
pnpm dev            # http://localhost:5173  (add --host to test on your phone)
pnpm build          # static build → ./build
pnpm preview        # serve the production build
pnpm check          # type-check
```

## Layout

- `src/lib/engine/` — the simulation + scoring engine (typed; ported from the original Python lib)
- `src/routes/` — `+page` launch mode-picker, and `bowloff` / `lane-read` / `history` / `settings` tabs
- `prototype/` — throwaway HTML prototypes that validated the bowl-off UX and engine
- `reference/` — the original Python `virtual_lanes` library + tests, kept as the canonical scoring reference

## License

MIT — see [LICENSE](LICENSE).
