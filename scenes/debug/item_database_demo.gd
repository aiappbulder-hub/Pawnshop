extends Control
## Debug/demo scene: proves the Item Data System works end-to-end by
## building every row below purely from data loaded out of res://data/.
## Nothing on screen is hardcoded - add a new .tres item/category/condition
## and it appears here automatically.

const PREVIEW_CONDITION_SCORES: Array[float] = [0.95, 0.55, 0.15]

const BACKGROUND_COLOR := Color(0.086, 0.078, 0.071, 1.0)
const TITLE_COLOR := Color(0.847, 0.68, 0.294, 1.0)
const SUBTITLE_COLOR := Color(0.7, 0.7, 0.7, 1.0)
const CARD_COLOR := Color(0.145, 0.129, 0.118, 1.0)
const CATEGORY_COLOR := Color(0.6, 0.6, 0.6, 1.0)


func _ready() -> void:
	_build_background()
	var layout := _build_layout_root()
	_build_title(layout)
	_build_subtitle(layout)
	_build_item_rows(_build_scroll_area(layout))


func _build_background() -> void:
	var background := ColorRect.new()
	background.color = BACKGROUND_COLOR
	background.set_anchors_preset(Control.PRESET_FULL_RECT)
	add_child(background)


func _build_layout_root() -> VBoxContainer:
	var margin := MarginContainer.new()
	margin.set_anchors_preset(Control.PRESET_FULL_RECT)
	for side in ["left", "top", "right", "bottom"]:
		margin.add_theme_constant_override("margin_%s" % side, 24)
	add_child(margin)

	var layout := VBoxContainer.new()
	layout.add_theme_constant_override("separation", 12)
	margin.add_child(layout)
	return layout


func _build_title(layout: VBoxContainer) -> void:
	var title := Label.new()
	title.text = "Pawn Shop — Item Database Demo"
	title.add_theme_font_size_override("font_size", 28)
	title.add_theme_color_override("font_color", TITLE_COLOR)
	layout.add_child(title)


func _build_subtitle(layout: VBoxContainer) -> void:
	var subtitle := Label.new()
	subtitle.text = "Every card below is generated from data/ .tres resources — no hardcoded item data."
	subtitle.add_theme_color_override("font_color", SUBTITLE_COLOR)
	layout.add_child(subtitle)


func _build_scroll_area(layout: VBoxContainer) -> VBoxContainer:
	var scroll := ScrollContainer.new()
	scroll.size_flags_vertical = Control.SIZE_EXPAND_FILL
	layout.add_child(scroll)

	var rows := VBoxContainer.new()
	rows.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	rows.add_theme_constant_override("separation", 8)
	scroll.add_child(rows)
	return rows


func _build_item_rows(rows: VBoxContainer) -> void:
	var definitions := ItemDatabase.get_all_definitions()
	definitions.sort_custom(
		func(a: ItemDefinition, b: ItemDefinition) -> bool: return a.display_name < b.display_name
	)

	for definition in definitions:
		rows.add_child(_build_item_card(definition))


func _build_item_card(definition: ItemDefinition) -> PanelContainer:
	var card := PanelContainer.new()
	var style := StyleBoxFlat.new()
	style.bg_color = CARD_COLOR
	style.set_corner_radius_all(6)
	style.set_content_margin_all(12)
	card.add_theme_stylebox_override("panel", style)

	var card_layout := VBoxContainer.new()
	card_layout.add_theme_constant_override("separation", 6)
	card.add_child(card_layout)

	card_layout.add_child(_build_header_row(definition))
	card_layout.add_child(_build_condition_row(definition))

	return card


func _build_header_row(definition: ItemDefinition) -> HBoxContainer:
	var header := HBoxContainer.new()
	header.add_theme_constant_override("separation", 12)

	var name_label := Label.new()
	name_label.text = definition.display_name
	name_label.add_theme_font_size_override("font_size", 18)
	name_label.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	header.add_child(name_label)

	var category := CategoryDatabase.get_category(definition.category_id)
	var category_label := Label.new()
	category_label.text = category.display_name if category != null else "(unknown category)"
	category_label.add_theme_color_override("font_color", CATEGORY_COLOR)
	header.add_child(category_label)

	return header


func _build_condition_row(definition: ItemDefinition) -> HBoxContainer:
	var row := HBoxContainer.new()
	row.add_theme_constant_override("separation", 16)

	for condition_score in PREVIEW_CONDITION_SCORES:
		row.add_child(_build_condition_preview(definition, condition_score))

	return row


func _build_condition_preview(definition: ItemDefinition, condition_score: float) -> Label:
	var instance := ItemFactory.create_instance(definition.id, condition_score)
	var value := ItemFactory.calculate_value(instance)
	var tier := ConditionDatabase.get_tier_for_score(condition_score)

	var label := Label.new()
	label.text = "%s: $%.2f" % [tier.display_name if tier != null else "?", value]
	label.add_theme_color_override("font_color", tier.badge_color if tier != null else Color.WHITE)
	return label
