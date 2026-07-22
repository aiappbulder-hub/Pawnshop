extends Node
## Autoload. Loads every ConditionTier resource from res://data/conditions/,
## indexes it by id, and keeps a list sorted by min_score (descending) so
## the correct tier for a given condition score can be resolved without
## hardcoding thresholds anywhere in code.

const DATA_PATH := "res://data/conditions"

signal loaded

var _tiers_by_id: Dictionary = {}
var _tiers_by_score_desc: Array[ConditionTier] = []


func _ready() -> void:
	reload()


func reload() -> void:
	_tiers_by_id.clear()
	_tiers_by_score_desc.clear()

	for resource in ResourceFolderLoader.load_all(DATA_PATH):
		var tier := resource as ConditionTier
		if tier == null:
			push_warning("ConditionDatabase: skipping non-ConditionTier resource in %s" % DATA_PATH)
			continue
		if _tiers_by_id.has(tier.id):
			push_warning("ConditionDatabase: duplicate condition tier id '%s'" % tier.id)
		_tiers_by_id[tier.id] = tier
		_tiers_by_score_desc.append(tier)

	_tiers_by_score_desc.sort_custom(
		func(a: ConditionTier, b: ConditionTier) -> bool: return a.min_score > b.min_score
	)
	loaded.emit()


func get_tier(id: StringName) -> ConditionTier:
	return _tiers_by_id.get(id)


func get_tier_for_score(score: float) -> ConditionTier:
	for tier in _tiers_by_score_desc:
		if score >= tier.min_score:
			return tier
	return null


func get_all_tiers() -> Array[ConditionTier]:
	return _tiers_by_score_desc.duplicate()
