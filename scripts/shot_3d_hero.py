"""Captura o hero 3D em 4 estados de scroll: topo (desmontado) → fim (montado)."""
import os
from playwright.sync_api import sync_playwright

OUT = os.path.join(os.environ.get("TEMP", "/tmp"), "hb-shots")
os.makedirs(OUT, exist_ok=True)
URL = "http://localhost:5173"

with sync_playwright() as p:
    b = p.chromium.launch(headless=True, args=["--enable-webgl", "--use-gl=swiftshader"])

    ctx = b.new_context(viewport={"width": 1440, "height": 900})
    page = ctx.new_page()
    cerr = []
    page.on("console", lambda m: cerr.append(m.text) if m.type == "error" else None)
    page.on("pageerror", lambda e: cerr.append(f"PAGEERROR: {e}"))

    page.goto(URL, wait_until="networkidle")
    # Dá tempo do GLB de 4MB carregar e do Three.js chunk inicializar
    page.wait_for_timeout(3500)

    # 4 posições de scroll dentro da faixa pinada (hero=220vh, viewport=900 → 1980px total)
    positions = [
        ("0pct-start", 0),
        ("33pct", 700),
        ("66pct", 1300),
        ("100pct-end", 1900),
    ]
    for label, y in positions:
        page.evaluate(f"window.scrollTo(0,{y})")
        page.wait_for_timeout(900)
        page.screenshot(path=f"{OUT}/3d-{label}.png", clip={"x": 0, "y": 0, "width": 1440, "height": 900})
        print(f"captured {label} (scrollY={y})")

    # Confirma que o sticky liberou depois — rola mais e checa que próxima seção apareceu
    page.evaluate("window.scrollTo(0, 2400)")
    page.wait_for_timeout(800)
    page.screenshot(path=f"{OUT}/3d-after-pin.png", clip={"x": 0, "y": 0, "width": 1440, "height": 900})
    print("captured after-pin")

    print("\nconsole errors:", cerr if cerr else "none")
    b.close()
