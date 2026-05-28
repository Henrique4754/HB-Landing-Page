"""Rasteriza scripts/og-template.html em public/og-image.png (1200x630)."""
import os
from playwright.sync_api import sync_playwright

HERE = os.path.dirname(os.path.abspath(__file__))
TEMPLATE = "file:///" + os.path.join(HERE, "og-template.html").replace("\\", "/")
OUT = os.path.join(HERE, "..", "public", "og-image.png")

with sync_playwright() as p:
    b = p.chromium.launch(headless=True)
    page = b.new_page(viewport={"width": 1200, "height": 630}, device_scale_factor=1)
    page.goto(TEMPLATE, wait_until="networkidle")
    page.evaluate("document.fonts.ready")
    page.wait_for_timeout(800)
    page.screenshot(path=OUT, clip={"x": 0, "y": 0, "width": 1200, "height": 630})
    b.close()
    print("wrote", os.path.normpath(OUT))
