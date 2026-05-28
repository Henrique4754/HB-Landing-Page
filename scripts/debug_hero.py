"""Diagnóstico: dimensões reais do hero + se o canvas tem conteúdo."""
from playwright.sync_api import sync_playwright
URL = "http://localhost:5173"

with sync_playwright() as p:
    b = p.chromium.launch(headless=True)
    ctx = b.new_context(viewport={"width": 1440, "height": 900}, reduced_motion="no-preference")
    page = ctx.new_page()
    page.on("console", lambda m: print(f"[console.{m.type}]", m.text))
    page.on("pageerror", lambda e: print(f"[pageerror]", e))
    page.goto(URL, wait_until="networkidle")
    page.wait_for_timeout(5000)
    info = page.evaluate("""() => {
      const sec = document.querySelector('#topo');
      const sticky = sec ? sec.firstElementChild : null;
      const canvas = document.querySelector('#topo canvas');
      return {
        section: sec ? {h: sec.offsetHeight, classes: sec.className} : null,
        sticky: sticky ? {h: sticky.offsetHeight, classes: sticky.className, pos: getComputedStyle(sticky).position} : null,
        canvas: canvas ? {w: canvas.width, h: canvas.height, ctx: canvas.getContext ? 'has-getContext' : 'none'} : 'NO CANVAS',
        bodyH: document.body.scrollHeight,
      };
    }""")
    import json
    print(json.dumps(info, indent=2))
    b.close()
