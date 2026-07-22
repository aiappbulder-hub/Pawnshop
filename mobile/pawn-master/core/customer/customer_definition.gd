extends Resource
class_name CustomerDefinition
## Data-driven customer archetype. New customers are added by dropping a
## new .tres resource in res://data/customers/ - no code changes required.

@export var id: StringName
@export var display_name: String
@export var portrait: Texture2D
## One or more flavor lines shown when the customer presents an item; a
## random one is picked so repeat encounters don't feel identical.
@export_multiline var intro_lines: PackedStringArray = PackedStringArray()
## The customer's asking price, expressed as a multiplier range of the
## item's true value (e.g. 1.1 - 1.4 means they expect 10%-40% over true value).
@export var expectation_multiplier_min: float = 1.0
@export var expectation_multiplier_max: float = 1.3
## How many counter-offer rounds this customer tolerates before walking away.
@export_range(0, 10, 1) var patience: int = 3
