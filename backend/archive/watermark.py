import io
import os
from django.core.files.base import ContentFile
from PIL import Image, ImageOps

WATERMARK_PATH = os.path.join(
    os.path.dirname(os.path.abspath(__file__)), "assets", "oporadhnama_watermark.png"
)


def apply_watermark_to_image_field(image_field):
    """
    Permanently composites the Oporadhnama logo + text watermark into the bottom-right
    corner of a Django ImageField file if not already watermarked ('-wm' or '_wm' in filename).
    """
    if not image_field:
        return

    name = getattr(image_field, "name", "") or ""
    base_name = os.path.basename(name)
    stem, _ext = os.path.splitext(base_name)

    # Skip if already watermarked on the client or previous save
    if stem.endswith("-wm") or stem.endswith("_wm") or "-wm." in base_name or "_wm." in base_name:
        return

    if not os.path.exists(WATERMARK_PATH):
        return

    try:
        image_field.open()
        img_bytes = image_field.read()
        if not img_bytes:
            return

        base_img = Image.open(io.BytesIO(img_bytes))
        base_img = ImageOps.exif_transpose(base_img)
        base_img = base_img.convert("RGBA")
        base_w, base_h = base_img.size

        if base_w < 100 or base_h < 80:
            return

        wm_img = Image.open(WATERMARK_PATH).convert("RGBA")
        wm_orig_w, wm_orig_h = wm_img.size

        # Scale watermark to ~24% of base image width (clamped between 110px and 480px)
        target_wm_w = max(110, min(480, int(base_w * 0.24)))
        target_wm_h = max(24, int(wm_orig_h * (target_wm_w / float(wm_orig_w))))
        wm_resized = wm_img.resize((target_wm_w, target_wm_h), Image.Resampling.LANCZOS)

        # Position in bottom-right corner with 2% horizontal & 2.5% vertical padding
        pad_x = max(10, int(base_w * 0.02))
        pad_y = max(10, int(base_h * 0.025))
        pos_x = max(0, base_w - target_wm_w - pad_x)
        pos_y = max(0, base_h - target_wm_h - pad_y)

        # Composite onto a transparent layer and merge
        overlay = Image.new("RGBA", (base_w, base_h), (0, 0, 0, 0))
        overlay.paste(wm_resized, (pos_x, pos_y), wm_resized)
        composited = Image.alpha_composite(base_img, overlay).convert("RGB")

        out_buffer = io.BytesIO()
        composited.save(out_buffer, format="JPEG", quality=92, optimize=True)
        out_buffer.seek(0)

        clean_stem = stem or "oporadhnama-news"
        new_filename = f"{clean_stem}-wm.jpg"
        image_field.save(new_filename, ContentFile(out_buffer.read()), save=False)
    except Exception as exc:
        print(f"[Watermark] Warning: Failed to apply watermark to {name}: {exc}")

