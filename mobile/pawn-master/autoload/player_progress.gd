extends Node
## Autoload. Tracks the player's currency and unlocked tools for the
## current session. In-memory only for now - save/load persistence is a
## separate future feature.

signal currency_changed

var coins: float = 1000.0
var gems: int = 20
var owned_tool_ids: Array[StringName] = [&"magnifier", &"uv_light", &"scale"]


func can_afford(cost: float) -> bool:
	return coins >= cost


func spend_coins(amount: float) -> bool:
	if not can_afford(amount):
		return false
	coins -= amount
	currency_changed.emit()
	return true


func add_coins(amount: float) -> void:
	coins += amount
	currency_changed.emit()


## Atomically applies a buy-then-flip deal: pay `bought_for`, receive
## `sold_for`. A single mutation avoids desyncing coins from the deal's
## reported outcome if the two legs were applied separately.
func record_deal(bought_for: float, sold_for: float) -> void:
	coins += sold_for - bought_for
	currency_changed.emit()


func owns_tool(tool_id: StringName) -> bool:
	return owned_tool_ids.has(tool_id)


func unlock_tool(tool_id: StringName) -> void:
	if not owns_tool(tool_id):
		owned_tool_ids.append(tool_id)
