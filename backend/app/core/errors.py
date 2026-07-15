from flask import jsonify
from werkzeug.exceptions import BadRequest, HTTPException, RequestEntityTooLarge

from app.core.config import max_upload_video_bytes


class ApiError(Exception):
    def __init__(self, message, status_code):
        super().__init__(message)
        self.message = message
        self.status_code = status_code


def register_error_handlers(app):
    @app.errorhandler(ApiError)
    def handle_api_error(error):
        return jsonify({"error": error.message}), error.status_code

    @app.errorhandler(HTTPException)
    def handle_http_exception(error):
        return jsonify({"error": http_error_message(error)}), error.code or 500


def http_error_message(error):
    if isinstance(error, RequestEntityTooLarge):
        return f"request body is too large; videos must be {format_upload_size(max_upload_video_bytes())} or less"
    if isinstance(error, BadRequest):
        return (
            "request body could not be parsed; for uploads, send multipart/form-data "
            "with method=direct and a file field, then retry if the upload was interrupted"
        )
    return error.description or error.name


def format_upload_size(size_bytes):
    if size_bytes >= 1000 * 1000 * 1000:
        return f"{size_bytes / (1000 * 1000 * 1000):g} GB"
    return f"{size_bytes / (1000 * 1000):g} MB"
