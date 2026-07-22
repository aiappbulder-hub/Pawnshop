extends Resource
class_name ToolDefinition
## Data-driven inspection tool. New tools are added by dropping a new
## .tres resource in res://data/tools/ - no code changes required.

@export var id: StringName
@export var display_name: String
@export var icon: Texture2D
## Hidden attribute keys (matching ItemDefinition.hidden_attributes keys)
## that owning this tool reveals during inspection.
@export var reveals: PackedStringArray = PackedStringArray()
@export var unlock_cost: float = 0.0
@export_range(1, 10, 1) var level: int = 1
