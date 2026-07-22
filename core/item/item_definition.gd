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
@export var weight: float = 0.0
@export var stackable: bool = false
@export var max_stack: int = 1
@export var tags: PackedStringArray = PackedStringArray()
## Drives spawn/appearance frequency for future customer & loot systems.
@export_range(0.0, 1.0, 0.01) var rarity: float = 0.5
