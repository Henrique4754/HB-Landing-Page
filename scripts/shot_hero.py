"""Captura hero novo em vários estados da animação + mobile."""
import os
from playwright.sync_api import sync_playwright

OUT = os.path.join(os.environ.get("TEMP", "/tmp"), "hb-shots")
os.makedirs(OUT, exist_ok=True)
URL = "http://localhost:5173"

with sync_playwright() as p:
    b = p.chromium.launch(headless=True)

    # Desktop — captura 3 frames da animação yoyo (início, meio, fim)
    ctx = b.new_context(viewport={"width": 1440, "height": 900})
    page = ctx.new_page()
    page.goto(URL, wait_until="networkidle")
    page.wait_for_timeout(800)
    page.screenshot(path=f"{OUT}/hero-frame-1.png", clip={"x": 0, "y": 0, "width": 1440, "height": 720})
    page.wait_for_timeout(3500)
    page.screenshot(path=f"{OUT}/hero-frame-2.png", clip={"x": 0, "y": 0, "width": 1440, "height": 720})
    page.wait_for_timeout(3500)
    page.screenshot(path=f"{OUT}/hero-frame-3.png", clip={"x": 0, "y": 0, "width": 1440, "height": 720})
    ctx.close()

    # Mobile
    ctx2 = b.new_context(viewport={"width": 375, "height": 812}, device_scale_factor=2, is_mobile=True)
    page2 = ctx2.new_page()
    page2.goto(URL, wait_until="networkidle")
    page2.wait_for_timeout(900)
    page2.screenshot(path=f"{OUT}/hero-mobile.png")
    ctx2.close()

    b.close()
print("done")
