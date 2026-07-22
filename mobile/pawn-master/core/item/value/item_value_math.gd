extends RefCounted
class_name ItemValueMath
## Single source of truth for the apparent-value calculation, shared by the
## value strategy and the negotiation system so the two can never drift out
## of sync.
##
## APPARENT value = base_value * condition multiplier * quantity. It is what
## an item looks like it's worth and what a customer's asking price is
## anchored to. TRUE value additionally applies ItemDefinition.value_multiplier
## (see DefaultItemValueStrategy) to model authenticity/hidden-quality risk.

static func apparent_value(definition: ItemDefinition, instance: ItemInstance) -> float:
	if definition == null or instance == null:
		return 0.0

	var tier: ConditionTier = ConditionDatabase.get_tier_for_score(instance.condition_score)
	var condition_multiplier: float = tier.value_multiplier if tier != null else 1.0

	return definition.base_value * condition_multiplier * instance.quantity
