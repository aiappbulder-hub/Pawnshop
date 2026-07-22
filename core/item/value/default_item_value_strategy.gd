extends ItemValueStrategy
class_name DefaultItemValueStrategy
## Baseline valuation: base_value * condition tier multiplier * quantity.
## Condition tiers are looked up from ConditionDatabase, so tuning the
## multiplier curve is a data change, not a code change.

func calculate_value(definition: ItemDefinition, instance: ItemInstance) -> float:
	if definition == null:
		return 0.0

	var tier: ConditionTier = ConditionDatabase.get_tier_for_score(instance.condition_score)
	var multiplier: float = tier.value_multiplier if tier != null else 1.0

	return definition.base_value * multiplier * instance.quantity
