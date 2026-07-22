extends Resource
class_name ItemDefinition
## Data-driven blueprint for a kind of item (e.g. "14k Gold Ring").
## This describes the *type*, not a specific physical item in the world -
## see ItemInstance for that. New items are added by creating a new .tres
## resource in res://data/items/ - no code changes required.

@export var id: StringName
@export var display_name: String
@export_multiline var description: String
@export var icon: Texture2D
@export var category_id: StringName
@export var base_value: float = 0.0
## Ratio of an item's true resale value to its apparent value. 1.0 means
## "worth what it looks like"; a convincing fake looks valuable (high
## apparent value) but has a low multiplier, so overpaying without
## inspecting first is a real loss. Kept in data so authenticity risk is
## tunable per item, never hardcoded.
@export_range(0.0, 2.0, 0.01) var value_multiplier: float = 1.0
@export var weight: float = 0.0
@export var stackable: bool = false
@export var max_stack: int = 1
@export var tags: PackedStringArray = PackedStringArray()
## Drives spawn/appearance frequency for future customer & loot systems.
@export_range(0.0, 1.0, 0.01) var rarity: float = 0.5
## Facts about this item that are hidden until an inspection tool reveals
## them, e.g. {"material": "Gold (Plated)", "authenticity": "Unknown",
## "age": "1910 - 1930 (Estimated)"}. Keys are arbitrary attribute ids -
## new attribute types need no code changes, only a ToolDefinition that
## lists the key in its `reveals` array.
@export var hidden_attributes: Dictionary = {}
