import os

from django.core.exceptions import ValidationError
from PIL import Image


def validate_icon_image_size(image):
    if image:
        with Image.open(image) as img:
            if img.width > 70 or img.height > 70:
                raise ValidationError(f"Maximum allowed is 70x70")


def validate_image_file_extension(value):
    extension = os.path.splitext(value.name)[1]
    valid_extensions = [".jpg", ".jpeg", ".png", ".gif"]
    if not extension.lower() in valid_extensions:
        raise ValidationError(f"Unsupported image type")
