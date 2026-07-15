from flask import Blueprint, jsonify, request

from app.core.errors import ApiError
from app.core.validation import json_body, uploaded_image_file
from app.services.games import (
    create_game_entity,
    create_entity_tracking_response,
    create_jockey_chat_response,
    create_selected_clip_analysis,
    generate_game_highlight_reels,
    list_game_entities,
    search_game_videos,
    search_game_videos_by_entity,
    search_game_videos_by_image,
)


game_analysis_bp = Blueprint("game_analysis", __name__)


@game_analysis_bp.post("/games/<tag>/highlight-reels")
def create_game_highlight_reels(tag):
    return jsonify(generate_game_highlight_reels(tag, json_body()))


@game_analysis_bp.post("/games/<tag>/search")
def search_game(tag):
    return jsonify(search_game_videos(tag, json_body()))


@game_analysis_bp.post("/games/<tag>/search/image")
def search_game_by_image(tag):
    payload = request.form.to_dict(flat=False)
    normalized_payload = {}
    for key, value in payload.items():
        normalized_payload[key] = value if len(value) > 1 else value[0]
    return jsonify(search_game_videos_by_image(tag, uploaded_image_file(), normalized_payload))


@game_analysis_bp.get("/games/<tag>/entities")
def game_entities(tag):
    return jsonify(list_game_entities(tag))


@game_analysis_bp.post("/games/<tag>/entities")
def create_entity(tag):
    name = request.form.get("name")
    if not isinstance(name, str) or not name.strip():
        raise ApiError("name is required", 400)
    return jsonify(create_game_entity(tag, name.strip(), uploaded_image_file(), request.form.get("description"))), 201


@game_analysis_bp.post("/games/<tag>/search/entity")
def search_game_by_entity(tag):
    return jsonify(search_game_videos_by_entity(tag, json_body()))


@game_analysis_bp.post("/games/<tag>/jockey-chat")
def jockey_chat(tag):
    return jsonify(create_jockey_chat_response(tag, json_body()))


@game_analysis_bp.post("/games/<tag>/clip-analysis")
def selected_clip_analysis(tag):
    return jsonify(create_selected_clip_analysis(tag, json_body()))


@game_analysis_bp.post("/games/<tag>/entity-tracking")
def entity_tracking(tag):
    return jsonify(create_entity_tracking_response(tag, json_body()))
