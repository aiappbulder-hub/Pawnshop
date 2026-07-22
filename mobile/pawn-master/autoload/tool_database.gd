extends Node
## Autoload. Loads every ToolDefinition resource from res://data/tools/
## and indexes it by id. Adding a tool is a data-only change: drop a new
## .tres file in that folder.

const DATA_PATH := "res://data/tools"

signal loaded

var _tools_by_id: Dictionary = {}


func _ready() -> void:
	reload()


func reload() -> void:
	_tools_by_id.clear()
	for resource in ResourceFolderLoader.load_all(DATA_PATH):
		var tool := resource as ToolDefinition
		if tool == null:
			push_warning("ToolDatabase: skipping non-ToolDefinition resource in %s" % DATA_PATH)
			continue
		if _tools_by_id.has(tool.id):
			push_warning("ToolDatabase: duplicate tool id '%s'" % tool.id)
		_tools_by_id[tool.id] = tool
	loaded.emit()


func get_tool(id: StringName) -> ToolDefinition:
	return _tools_by_id.get(id)


func get_all_tools() -> Array[ToolDefinition]:
	var tools: Array[ToolDefinition] = []
	tools.assign(_tools_by_id.values())
	return tools
