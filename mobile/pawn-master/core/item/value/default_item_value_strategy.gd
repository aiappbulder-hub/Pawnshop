extends ItemValueStrategy
class_name DefaultItemValueStrategy
## Baseline TRUE valuation: apparent value (base * condition * quantity)
## scaled by the item's value_multiplier, which models authenticity /
## hidden-quality risk. All inputs are data, so tuning is a data change.

func calculate_value(definition: ItemDefinition, instance: ItemInstance) -> float:
	if definition == null:
		return 0.0

	return ItemValueMath.apparent_value(definition, instance) * definition.value_multiplier
