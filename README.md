# Pawn Shop

A Godot 4.x / GDScript commercial game: run your own pawn shop, appraising and
haggling over items customers bring in.

## Architecture

- `core/item/` — domain layer. Pure `Resource` data classes with no
  dependency on autoloads or scenes: `ItemCategory`, `ConditionTier`,
  `ItemDefinition` (the blueprint for a kind of item), `ItemInstance` (a
  specific item that exists in the world).
- `core/item/value/` — the pricing strategy interface (`ItemValueStrategy`)
  and its default implementation. New pricing rules are added as new
  subclasses, not by editing existing code (Open/Closed).
- `core/util/` — small shared utilities (e.g. `ResourceFolderLoader`).
- `autoload/` — singletons that own runtime state: `CategoryDatabase`,
  `ConditionDatabase`, `ItemDatabase` each load `.tres` resources from a
  `data/` folder and index them by id; `ItemFactory` creates `ItemInstance`s
  and computes their value via the injected `ItemValueStrategy`.
- `data/` — actual game content as `.tres` resources (categories, condition
  tiers, item definitions). Adding new content is a data change, never a
  code change.
- `scenes/debug/` — verification scenes that exercise the systems above
  end-to-end.

## Conventions

- No hardcoded gameplay values — anything a designer would want to tune
  lives in a `.tres` resource under `data/`.
- Every system is split by responsibility (one database per concern,
  factories separate from strategies) so new systems can be added without
  modifying existing ones.
