extends RefCounted
class_name InspectionSession
## Resolves what the player currently knows about an item: condition is
## always visible (it's derived straight from the instance), while the
## definition's `hidden_attributes` are only revealed if the player owns a
## tool whose `reveals` list includes that attribute key.

var item_instance: ItemInstance
var item_definition: ItemDefinition


func _init(p_item_instance: ItemInstance, p_item_definition: ItemDefinition) -> void:
	item_instance = p_item_instance
	item_definition = p_item_definition


func get_condition_label() -> String:
	var tier := ConditionDatabase.get_tier_for_score(item_instance.condition_score)
	return tier.display_name if tier != null else "Unknown"


## Returns a Dictionary of attribute_key -> display value, using "Unknown"
## for any attribute not yet revealed by an owned tool.
func get_revealed_attributes(owned_tool_ids: Array[StringName]) -> Dictionary:
	var revealed_keys: Dictionary = {}
	for tool_id in owned_tool_ids:
		var tool_def := ToolDatabase.get_tool(tool_id)
		if tool_def == null:
			continue
		for key in tool_def.reveals:
			revealed_keys[key] = true

	var result: Dictionary = {}
	for key in item_definition.hidden_attributes.keys():
		result[key] = item_definition.hidden_attributes[key] if revealed_keys.has(key) else "Unknown"
	return result
