extends Node
## Autoload. Loads every ItemDefinition resource from res://data/items/ and
## indexes it by id and by category. Adding a new item type is a data-only
## change: drop a new .tres file in that folder.

const DATA_PATH := "res://data/items"

signal loaded

var _definitions_by_id: Dictionary = {}
var _definition_ids_by_category: Dictionary = {}


func _ready() -> void:
	reload()


func reload() -> void:
	_definitions_by_id.clear()
	_definition_ids_by_category.clear()

	for resource in ResourceFolderLoader.load_all(DATA_PATH):
		var definition := resource as ItemDefinition
		if definition == null:
			push_warning("ItemDatabase: skipping non-ItemDefinition resource in %s" % DATA_PATH)
			continue
		if _definitions_by_id.has(definition.id):
			push_warning("ItemDatabase: duplicate item id '%s'" % definition.id)
		_definitions_by_id[definition.id] = definition

		if not _definition_ids_by_category.has(definition.category_id):
			_definition_ids_by_category[definition.category_id] = []
		_definition_ids_by_category[definition.category_id].append(definition.id)

	loaded.emit()


func get_definition(id: StringName) -> ItemDefinition:
	return _definitions_by_id.get(id)


func get_all_definitions() -> Array[ItemDefinition]:
	var definitions: Array[ItemDefinition] = []
	definitions.assign(_definitions_by_id.values())
	return definitions


func get_definitions_by_category(category_id: StringName) -> Array[ItemDefinition]:
	var ids: Array = _definition_ids_by_category.get(category_id, [])
	var definitions: Array[ItemDefinition] = []
	for id in ids:
		definitions.append(_definitions_by_id[id])
	return definitions
