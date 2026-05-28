"""Reduced-motion + console-error check (server gerido pelo with_server.py)."""
import os
from playwright.sync_api import sync_playwright

OUT = os.path.join(os.environ.get("TEMP", "/tmp"), "hb-shots")
os.makedirs(OUT, exist_ok=True)
URL = "http://localhost:5173"

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    ctx = browser.new_context(viewport={"width": 1440, "height": 900}, reduced_motion="reduce")
    page = ctx.new_page()
    cerr = []
    page.on("console", lambda m: cerr.append(m.text) if m.type == "error" else None)
    page.on("pageerror", lambda e: cerr.append(f"PAGEERROR: {e}"))
    page.goto(URL, wait_until="networkidle")
    page.wait_for_timeout(800)

    # Sob reduced-motion o telefone deve já estar montado no topo (sem scroll).
    page.locator("#topo").screenshot(path=f"{OUT}/reduced-motion-hero.png")

    # Sanidade: conteúdo deve estar visível mesmo sem rolar (opacity dos h2 já revelados ao rolar)
    page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
    page.wait_for_timeout(600)
    page.evaluate("window.scrollTo(0,0)")
    page.wait_for_timeout(300)

    print("[reduced-motion] console errors:", cerr if cerr else "none")
    print("captured reduced-motion-hero.png")
    browser.close()
