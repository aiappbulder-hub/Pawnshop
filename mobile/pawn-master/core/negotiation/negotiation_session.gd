extends RefCounted
class_name NegotiationSession
## Orchestrates one haggling encounter for a single item: computes the
## customer's expected price range from the item's true value, and
## resolves offers against a pluggable NegotiationChanceStrategy.

var customer: CustomerDefinition
var item_definition: ItemDefinition
var item_instance: ItemInstance
var chance_strategy: NegotiationChanceStrategy

var true_value: float
var expectation_min: float
var expectation_max: float
var rounds_used: int = 0


func _init(
	p_customer: CustomerDefinition,
	p_item_definition: ItemDefinition,
	p_item_instance: ItemInstance,
	p_chance_strategy: NegotiationChanceStrategy
) -> void:
	customer = p_customer
	item_definition = p_item_definition
	item_instance = p_item_instance
	chance_strategy = p_chance_strategy

	true_value = ItemFactory.calculate_value(item_instance)
	expectation_min = true_value * customer.expectation_multiplier_min
	expectation_max = true_value * customer.expectation_multiplier_max


func has_rounds_remaining() -> bool:
	return rounds_used < customer.patience


func get_accept_chance(offer: float) -> float:
	return chance_strategy.calculate_accept_chance(offer, true_value, expectation_min, expectation_max)


## Resolves a single offer. Returns a Dictionary describing the outcome;
## the caller decides how to present it (this class has no UI knowledge).
func submit_offer(offer: float, rng: RandomNumberGenerator) -> Dictionary:
	rounds_used += 1
	var chance := get_accept_chance(offer)
	var accepted := rng.randf() <= chance

	return {
		"accepted": accepted,
		"chance": chance,
		"offer": offer,
		"true_value": true_value,
		"profit": true_value - offer,
		"rounds_remaining": customer.patience - rounds_used,
	}
