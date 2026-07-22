extends Resource
class_name NegotiationChanceStrategy
## Abstract strategy for computing the chance a customer accepts a given
## offer. Open/Closed extension point: new haggling rules (difficulty
## tiers, reputation bonuses, customer moods) are added as new subclasses,
## not by editing NegotiationSession.

func calculate_accept_chance(
	_offer: float,
	_true_value: float,
	_expectation_min: float,
	_expectation_max: float
) -> float:
	push_error("NegotiationChanceStrategy.calculate_accept_chance is abstract and must be overridden.")
	return 0.0
