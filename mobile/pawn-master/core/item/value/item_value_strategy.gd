extends Resource
class_name ItemValueStrategy
## Abstract strategy for computing an item's monetary value.
##
## This is the Open/Closed extension point for pricing: new pricing rules
## (market fluctuation, appraisal-skill bonuses, haggling modifiers) are
## added as new subclasses assigned to ItemFactory.value_strategy, without
## modifying ItemFactory or any existing strategy.

func calculate_value(_definition: ItemDefinition, _instance: ItemInstance) -> float:
	push_error("ItemValueStrategy.calculate_value is abstract and must be overridden.")
	return 0.0
