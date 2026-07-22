extends Resource
class_name ItemCategory
## Data-driven definition of an item category (e.g. Jewelry, Electronics).
## New categories are added by creating a new .tres resource in
## res://data/categories/ - no code changes required.

@export var id: StringName
@export var display_name: String
@export var description: String
@export var icon: Texture2D
