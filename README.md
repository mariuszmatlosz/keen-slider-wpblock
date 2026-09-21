# Keen Slider Block

Standalone WordPress plugin with a Gutenberg block that bootstraps [Keen Slider](https://keen-slider.io) on frontend.

This is meant to be installable on any WP site as a normal plugin. Build is done with Vite, output goes to `build/` and WP reads blocks from there.

## Requirements

- WordPress 6.3+
- PHP 8.0+
- Node.js 20+ (for development/build)

## Development

```bash
cd keen-slider-wpblock
pnpm install
pnpm dev
```

`pnpm dev` runs Vite in watch mode. After changes, refresh block editor.

Production build:

```bash
pnpm build
```

`pnpm build` also syncs the plugin to `wp-content/plugins/keen-slider-wpblock`. Activate it in WP admin.

## Block usage

1. Add **Keen Slider** block in editor.
2. Add **Slide** blocks inside (default one slide is created).
3. Put any core blocks inside slide (paragraph, image, etc.).
4. Configure options in sidebar:
   - **Loop** – infinite loop on/off
   - **Center position** – center active slide
   - **Padding** – spacing between slides (maps to Keen Slider `spacing`)

More options will come later.

## Project structure

```
keen-slider-wpblock/
├── keen-slider-wpblock.php   # plugin bootstrap
├── includes/                 # PHP classes
├── src/blocks/               # block source (slider + slide)
├── build/blocks/             # generated assets for WP (after build)
├── vite.config.js
└── package.json
```

## Build output

After `pnpm build`, WordPress loads:

- `build/blocks/slider/` – parent block (editor + view script)
- `build/blocks/slide/` – child slide block

View script bundles `keen-slider` library and initializes sliders on page.

## License

This plugin is released under the **MIT License** (see [LICENSE](./LICENSE)).

### Keen Slider credits

Slider functionality is powered by **Keen Slider**, created by **Eric Beyer**.

- Website: https://keen-slider.io
- Repository: https://github.com/rcbyr/keen-slider
- License: MIT

Big thanks to Eric for making Keen Slider open source. If you use this plugin commercially or in production, consider supporting the original library / checking upstream docs for updates.

## Contributing

Issues and PRs are welcome. If you improve slider options or styling, keep the plugin generic enough so it can be reused on different WP projects.
