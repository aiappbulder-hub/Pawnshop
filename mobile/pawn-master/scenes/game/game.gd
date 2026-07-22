extends Control
## Wires the Customer -> Inspect -> Make Offer -> Result loop together.
## This is presentation only: all rules live in InspectionSession and
## NegotiationSession; this script just renders their state and forwards
## button presses.

enum Screen { CUSTOMER, INSPECT, OFFER, RESULT }

const OFFER_STEP := 10.0
const GOLD_COLOR := Color(0.847, 0.68, 0.294, 1.0)
const DIM_COLOR := Color(0.5, 0.5, 0.5, 1.0)
const REVEALED_COLOR := Color(0.6, 0.85, 0.6, 1.0)
const GOOD_COLOR := Color(0.4, 0.85, 0.4, 1.0)
const BAD_COLOR := Color(0.85, 0.4, 0.4, 1.0)

var _rng := RandomNumberGenerator.new()
var _chance_strategy: NegotiationChanceStrategy = DefaultNegotiationChanceStrategy.new()

var _current_item_definition: ItemDefinition
var _current_item_instance: ItemInstance
var _current_customer: CustomerDefinition
var _current_inspection: InspectionSession
var _current_negotiation: NegotiationSession
var _current_offer: float = 0.0

var _screens: Dictionary = {}
var _coins_label: Label
var _offer_label: Label
var _chance_label: Label
var _offer_status_label: Label


func _ready() -> void:
	_rng.randomize()
	_build_ui()
	PlayerProgress.currency_changed.connect(_update_coins_label)
	_start_new_encounter()


func _build_ui() -> void:
	var background := ColorRect.new()
	background.color = Color(0.086, 0.078, 0.071, 1.0)
	background.set_anchors_preset(Control.PRESET_FULL_RECT)
	add_child(background)

	var root_margin := MarginContainer.new()
	root_margin.set_anchors_preset(Control.PRESET_FULL_RECT)
	for side in ["left", "top", "right", "bottom"]:
		root_margin.add_theme_constant_override("margin_%s" % side, 24)
	add_child(root_margin)

	var root_layout := VBoxContainer.new()
	root_layout.add_theme_constant_override("separation", 16)
	root_margin.add_child(root_layout)

	root_layout.add_child(_build_top_bar())

	var screen_stack := Control.new()
	screen_stack.size_flags_vertical = Control.SIZE_EXPAND_FILL
	root_layout.add_child(screen_stack)

	for screen in Screen.values():
		var panel := VBoxContainer.new()
		panel.set_anchors_preset(Control.PRESET_FULL_RECT)
		panel.add_theme_constant_override("separation", 16)
		screen_stack.add_child(panel)
		_screens[screen] = panel

	_show_screen(Screen.CUSTOMER)


func _build_top_bar() -> HBoxContainer:
	var bar := HBoxContainer.new()

	var title := Label.new()
	title.text = "PAWN MASTER"
	title.add_theme_font_size_override("font_size", 20)
	title.add_theme_color_override("font_color", GOLD_COLOR)
	title.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	bar.add_child(title)

	_coins_label = Label.new()
	_coins_label.add_theme_color_override("font_color", GOLD_COLOR)
	bar.add_child(_coins_label)
	_update_coins_label()

	return bar


func _update_coins_label() -> void:
	_coins_label.text = "%d coins" % int(PlayerProgress.coins)


func _show_screen(screen: int) -> void:
	for key in _screens.keys():
		_screens[key].visible = key == screen


func _clear(container: Control) -> void:
	for child in container.get_children():
		child.queue_free()


# --- Encounter lifecycle -----------------------------------------------

func _start_new_encounter() -> void:
	var customer := CustomerDatabase.get_random_customer(_rng)
	var definitions := ItemDatabase.get_all_definitions()
	if customer == null or definitions.is_empty():
		push_error("Game: no customers or items loaded from data/.")
		return

	var definition: ItemDefinition = definitions[_rng.randi_range(0, definitions.size() - 1)]
	var condition_score := _rng.randf_range(0.2, 1.0)

	_current_customer = customer
	_current_item_definition = definition
	_current_item_instance = ItemFactory.create_instance(definition.id, condition_score)
	_current_inspection = InspectionSession.new(_current_item_instance, definition)
	_current_negotiation = NegotiationSession.new(customer, definition, _current_item_instance, _chance_strategy)
	_current_offer = _current_negotiation.expectation_min * 0.6

	_populate_customer_screen()
	_show_screen(Screen.CUSTOMER)


func _populate_customer_screen() -> void:
	var body: VBoxContainer = _screens[Screen.CUSTOMER]
	_clear(body)

	if not _current_customer.intro_lines.is_empty():
		var line_index := _rng.randi_range(0, _current_customer.intro_lines.size() - 1)
		var intro := Label.new()
		intro.text = _current_customer.intro_lines[line_index]
		intro.autowrap_mode = TextServer.AUTOWRAP_WORD
		body.add_child(intro)

	var item_label := Label.new()
	item_label.text = "★ %s ★" % _current_item_definition.display_name
	item_label.add_theme_font_size_override("font_size", 22)
	item_label.add_theme_color_override("font_color", GOLD_COLOR)
	body.add_child(item_label)

	var inspect_button := Button.new()
	inspect_button.text = "INSPECT"
	inspect_button.pressed.connect(_on_inspect_pressed)
	body.add_child(inspect_button)


func _on_inspect_pressed() -> void:
	_populate_inspect_screen()
	_show_screen(Screen.INSPECT)


func _populate_inspect_screen() -> void:
	var body: VBoxContainer = _screens[Screen.INSPECT]
	_clear(body)

	var title := Label.new()
	title.text = _current_item_definition.display_name
	title.add_theme_font_size_override("font_size", 20)
	body.add_child(title)

	var condition_label := Label.new()
	condition_label.text = "Condition: %s" % _current_inspection.get_condition_label()
	body.add_child(condition_label)

	var revealed := _current_inspection.get_revealed_attributes(PlayerProgress.owned_tool_ids)
	for key in revealed.keys():
		var value: String = revealed[key]
		var attr_label := Label.new()
		attr_label.text = "%s: %s" % [String(key).capitalize(), value]
		attr_label.add_theme_color_override("font_color", DIM_COLOR if value == "Unknown" else REVEALED_COLOR)
		body.add_child(attr_label)

	var offer_button := Button.new()
	offer_button.text = "MAKE OFFER"
	offer_button.pressed.connect(_on_make_offer_pressed)
	body.add_child(offer_button)


func _on_make_offer_pressed() -> void:
	_populate_offer_screen()
	_show_screen(Screen.OFFER)


func _populate_offer_screen() -> void:
	var body: VBoxContainer = _screens[Screen.OFFER]
	_clear(body)

	var expectation_hint := Label.new()
	expectation_hint.text = "CUSTOMER EXPECTS  $%.0f - $%.0f" % [
		_current_negotiation.expectation_min, _current_negotiation.expectation_max
	]
	expectation_hint.add_theme_color_override("font_color", DIM_COLOR)
	body.add_child(expectation_hint)

	_offer_label = Label.new()
	_offer_label.add_theme_font_size_override("font_size", 26)
	_offer_label.add_theme_color_override("font_color", GOOD_COLOR)
	body.add_child(_offer_label)

	var stepper := HBoxContainer.new()
	stepper.add_theme_constant_override("separation", 12)

	var minus := Button.new()
	minus.text = "-"
	minus.pressed.connect(_on_decrease_offer_pressed)
	stepper.add_child(minus)

	var plus := Button.new()
	plus.text = "+"
	plus.pressed.connect(_on_increase_offer_pressed)
	stepper.add_child(plus)

	body.add_child(stepper)

	_chance_label = Label.new()
	body.add_child(_chance_label)

	_offer_status_label = Label.new()
	_offer_status_label.add_theme_color_override("font_color", DIM_COLOR)
	_offer_status_label.autowrap_mode = TextServer.AUTOWRAP_WORD
	body.add_child(_offer_status_label)

	_refresh_offer_labels()

	var submit := Button.new()
	submit.text = "SUBMIT OFFER"
	submit.pressed.connect(_on_submit_offer_pressed)
	body.add_child(submit)

	var walk_away := Button.new()
	walk_away.text = "WALK AWAY"
	walk_away.pressed.connect(_on_walk_away_pressed)
	body.add_child(walk_away)


func _on_increase_offer_pressed() -> void:
	_current_offer += OFFER_STEP
	_refresh_offer_labels()


func _on_decrease_offer_pressed() -> void:
	_current_offer = maxf(0.0, _current_offer - OFFER_STEP)
	_refresh_offer_labels()


func _refresh_offer_labels() -> void:
	_offer_label.text = "YOUR OFFER: $%.0f" % _current_offer
	var chance := _current_negotiation.get_accept_chance(_current_offer)
	_chance_label.text = "YOUR CHANCE: %d%%" % int(round(chance * 100.0))


func _on_submit_offer_pressed() -> void:
	var outcome := _current_negotiation.submit_offer(_current_offer, _rng)

	if outcome["accepted"]:
		PlayerProgress.record_deal(outcome["offer"], outcome["true_value"])
		_populate_result_screen(outcome)
		_show_screen(Screen.RESULT)
	elif _current_negotiation.has_rounds_remaining():
		var rounds_remaining: int = outcome["rounds_remaining"]
		_offer_status_label.text = "They're not convinced. %d attempt(s) left." % rounds_remaining
		_offer_status_label.add_theme_color_override("font_color", BAD_COLOR)
	else:
		_start_new_encounter()


func _on_walk_away_pressed() -> void:
	_start_new_encounter()


func _populate_result_screen(outcome: Dictionary) -> void:
	var body: VBoxContainer = _screens[Screen.RESULT]
	_clear(body)

	var profit: float = outcome["profit"]
	var is_good_deal := profit > 0.0

	var headline := Label.new()
	headline.text = "GREAT DEAL!" if is_good_deal else "TOUGH BREAK"
	headline.add_theme_font_size_override("font_size", 24)
	headline.add_theme_color_override("font_color", GOOD_COLOR if is_good_deal else BAD_COLOR)
	body.add_child(headline)

	var bought := Label.new()
	bought.text = "Bought For: $%.0f" % float(outcome["offer"])
	body.add_child(bought)

	var sold := Label.new()
	sold.text = "Sold For: $%.0f" % float(outcome["true_value"])
	body.add_child(sold)

	var profit_label := Label.new()
	profit_label.text = "Profit: $%.0f" % profit
	profit_label.add_theme_font_size_override("font_size", 18)
	profit_label.add_theme_color_override("font_color", GOOD_COLOR if is_good_deal else BAD_COLOR)
	body.add_child(profit_label)

	var continue_button := Button.new()
	continue_button.text = "CONTINUE"
	continue_button.pressed.connect(_on_continue_pressed)
	body.add_child(continue_button)


func _on_continue_pressed() -> void:
	_start_new_encounter()
