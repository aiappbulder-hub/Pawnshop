extends Node
## Autoload. Creates ItemInstances from ItemDefinitions and computes their
## value. Depends only on the ItemValueStrategy abstraction (Dependency
## Inversion) - swap `value_strategy` at runtime to change pricing rules
## without touching this class.

var value_strategy: ItemValueStrategy = DefaultItemValueStrategy.new()


func create_instance(
	definition_id: StringName,
	condition_score: float = 1.0,
	quantity: int = 1
) -> ItemInstance:
	var definition := ItemDatabase.get_definition(definition_id)
	if definition == null:
		push_error("ItemFactory: unknown item definition id '%s'" % definition_id)
		return null

	return ItemInstance.new(definition_id, condition_score, quantity)


func calculate_value(instance: ItemInstance) -> float:
	if instance == null:
		return 0.0

	var definition := ItemDatabase.get_definition(instance.definition_id)
	if definition == null:
		push_error("ItemFactory: instance references unknown definition '%s'" % instance.definition_id)
		return 0.0

	return value_strategy.calculate_value(definition, instance)


## Apparent (looks-like) value, before authenticity/hidden-quality risk is
## applied. Used to anchor what a customer believes their item is worth.
func calculate_apparent_value(instance: ItemInstance) -> float:
	if instance == null:
		return 0.0

	var definition := ItemDatabase.get_definition(instance.definition_id)
	if definition == null:
		push_error("ItemFactory: instance references unknown definition '%s'" % instance.definition_id)
		return 0.0

	return ItemValueMath.apparent_value(definition, instance)
