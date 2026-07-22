extends Node
## Autoload. Loads every ItemCategory resource from res://data/categories/
## and indexes it by id. Adding a category is a data-only change: drop a
## new .tres file in that folder.

const DATA_PATH := "res://data/categories"

signal loaded

var _categories_by_id: Dictionary = {}


func _ready() -> void:
	reload()


func reload() -> void:
	_categories_by_id.clear()
	for resource in ResourceFolderLoader.load_all(DATA_PATH):
		var category := resource as ItemCategory
		if category == null:
			push_warning("CategoryDatabase: skipping non-ItemCategory resource in %s" % DATA_PATH)
			continue
		if _categories_by_id.has(category.id):
			push_warning("CategoryDatabase: duplicate category id '%s'" % category.id)
		_categories_by_id[category.id] = category
	loaded.emit()


func get_category(id: StringName) -> ItemCategory:
	return _categories_by_id.get(id)


func get_all_categories() -> Array[ItemCategory]:
	var categories: Array[ItemCategory] = []
	categories.assign(_categories_by_id.values())
	return categories
