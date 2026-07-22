extends Resource
class_name ConditionTier
## Data-driven definition of a condition tier (e.g. Mint, Worn, Poor).
## `min_score` is the lower bound (inclusive) of the normalized condition
## range [0.0, 1.0] that maps to this tier. `value_multiplier` scales an
## item's base value when it falls in this tier.
##
## New tiers are added by creating a new .tres resource in
## res://data/conditions/ - no code changes required.

@export var id: StringName
@export var display_name: String
@export_range(0.0, 1.0, 0.01) var min_score: float = 0.0
@export_range(0.0, 2.0, 0.01) var value_multiplier: float = 1.0
@export var badge_color: Color = Color.WHITE
