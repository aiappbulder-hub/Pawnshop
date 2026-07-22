extends Resource
class_name ItemInstance
## A specific physical item that exists in the game world (in a customer's
## hands, in shop inventory, etc.), as opposed to ItemDefinition which
## describes the type it was created from.

@export var instance_id: String = ""
@export var definition_id: StringName
@export_range(0.0, 1.0, 0.01) var condition_score: float = 1.0
@export var quantity: int = 1
## Free-form modifiers for future systems (engravings, provenance, quests)
## without requiring changes to this class.
@export var custom_attributes: Dictionary = {}

func _init(
	p_definition_id: StringName = &"",
	p_condition_score: float = 1.0,
	p_quantity: int = 1
) -> void:
	definition_id = p_definition_id
	condition_score = p_condition_score
	quantity = p_quantity
	if p_definition_id != &"":
		instance_id = "%s_%d" % [p_definition_id, Time.get_ticks_usec()]
