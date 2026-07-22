extends NegotiationChanceStrategy
class_name DefaultNegotiationChanceStrategy
## Baseline haggling curve: offers inside the customer's expected range
## scale from `within_expectation_chance_floor` to `_ceiling`; offers below
## the range scale down from that floor towards zero. All curve points are
## exported so difficulty can be tuned per-instance as a resource, not by
## editing code.

@export_range(0.0, 1.0, 0.01) var within_expectation_chance_floor: float = 0.6
@export_range(0.0, 1.0, 0.01) var within_expectation_chance_ceiling: float = 0.98

func calculate_accept_chance(
	offer: float,
	_true_value: float,
	expectation_min: float,
	expectation_max: float
) -> float:
	if expectation_max <= expectation_min:
		return within_expectation_chance_ceiling if offer >= expectation_min else 0.0

	if offer >= expectation_min:
		var t := clampf((offer - expectation_min) / (expectation_max - expectation_min), 0.0, 1.0)
		return lerpf(within_expectation_chance_floor, within_expectation_chance_ceiling, t)

	var below_t := clampf(offer / expectation_min, 0.0, 1.0)
	return below_t * within_expectation_chance_floor
