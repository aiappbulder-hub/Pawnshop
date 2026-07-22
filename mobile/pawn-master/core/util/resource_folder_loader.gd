extends RefCounted
class_name ResourceFolderLoader
## Shared utility for scanning a res:// folder and loading every .tres
## resource in it. Used by every *Database autoload so the "scan a data
## folder" logic isn't duplicated three times (DRY / SRP).

static func load_all(folder_path: String) -> Array[Resource]:
	var results: Array[Resource] = []
	var dir := DirAccess.open(folder_path)
	if dir == null:
		push_warning("ResourceFolderLoader: could not open folder '%s'" % folder_path)
		return results

	dir.list_dir_begin()
	var file_name := dir.get_next()
	while file_name != "":
		if not dir.current_is_dir() and file_name.ends_with(".tres"):
			var resource := load(folder_path.path_join(file_name))
			if resource != null:
				results.append(resource)
		file_name = dir.get_next()
	dir.list_dir_end()

	return results
