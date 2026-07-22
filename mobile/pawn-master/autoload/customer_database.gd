extends Node
## Autoload. Loads every CustomerDefinition resource from
## res://data/customers/ and indexes it by id. Adding a customer is a
## data-only change: drop a new .tres file in that folder.

const DATA_PATH := "res://data/customers"

signal loaded

var _customers_by_id: Dictionary = {}


func _ready() -> void:
	reload()


func reload() -> void:
	_customers_by_id.clear()
	for resource in ResourceFolderLoader.load_all(DATA_PATH):
		var customer := resource as CustomerDefinition
		if customer == null:
			push_warning("CustomerDatabase: skipping non-CustomerDefinition resource in %s" % DATA_PATH)
			continue
		if _customers_by_id.has(customer.id):
			push_warning("CustomerDatabase: duplicate customer id '%s'" % customer.id)
		_customers_by_id[customer.id] = customer
	loaded.emit()


func get_customer(id: StringName) -> CustomerDefinition:
	return _customers_by_id.get(id)


func get_all_customers() -> Array[CustomerDefinition]:
	var customers: Array[CustomerDefinition] = []
	customers.assign(_customers_by_id.values())
	return customers


func get_random_customer(rng: RandomNumberGenerator) -> CustomerDefinition:
	var all := get_all_customers()
	if all.is_empty():
		return null
	return all[rng.randi_range(0, all.size() - 1)]
