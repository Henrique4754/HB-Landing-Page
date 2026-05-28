"""Scroll-through (dispara os reveals inView) + checagem de visibilidade + reduced-motion."""
import os, time
from playwright.sync_api import sync_playwright

OUT = os.path.join(os.environ.get("TEMP", "/tmp"), "hb-shots")
os.makedirs(OUT, exist_ok=True)
URL = "http://localhost:5173"


def connect(p):
    b = p.chromium.launch(headless=True)
    return b


with sync_playwright() as p:
    browser = None
    for attempt in range(20):
        try:
            browser = connect(p)
            ctx = browser.new_context(viewport={"width": 1440, "height": 900})
            page = ctx.new_page()
            page.goto(URL, wait_until="domcontentloaded", timeout=5000)
            break
        except Exception:
            if browser:
                browser.close()
            time.sleep(1)
    else:
        raise SystemExit("server não respondeu")

    page.wait_for_load_state("networkidle")
    # Rola em passos para disparar todos os whileInView
    height = page.evaluate("document.body.scrollHeight")
    step = 700
    y = 0
    while y < height:
        page.evaluate(f"window.scrollTo(0,{y})")
        page.wait_for_timeout(250)
        y += step
    page.wait_for_timeout(600)

    # Conta elementos que deveriam estar visíveis (opacity ~1) por seção-chave
    checks = {
        "service cards": "article",
        "spec cards": "[class*='spec-label']",
    }
    # Verifica opacidade computada dos cards de serviço
    op = page.evaluate("""() => {
      const arts = Array.from(document.querySelectorAll('article'));
      return arts.map(a => parseFloat(getComputedStyle(a).opacity));
    }""")
    print("[scroll-through] service card opacities:", op)
    if op and all(o > 0.9 for o in op):
        print("[scroll-through] all service cards visible OK")
    else:
        print("[scroll-through] WARNING: some cards not fully visible:", op)

    # Screenshot full depois de revelar tudo
    page.evaluate("window.scrollTo(0,0)")
    page.wait_for_timeout(300)
    page.screenshot(path=f"{OUT}/desktop-full-revealed.png", full_page=True)
    print("captured desktop-full-revealed.png")

    # Section crops
    for sec_id, name in [("servicos", "services"), ("por-que", "why"), ("como-funciona", "how"), ("contato", "form")]:
        el = page.locator(f"#{sec_id}")
        if el.count():
            el.first.scroll_into_view_if_needed()
            page.wait_for_timeout(500)
            el.first.screenshot(path=f"{OUT}/sec-{name}.png")
            print(f"captured sec-{name}.png")
    ctx.close()

    # Reduced motion — phone deve estar montado já no topo
    ctx3 = browser.new_context(viewport={"width": 1440, "height": 900}, reduced_motion="reduce")
    page3 = ctx3.new_page()
    page3.goto(URL, wait_until="networkidle")
    page3.wait_for_timeout(700)
    page3.locator("#topo").screenshot(path=f"{OUT}/reduced-motion-hero.png")
    print("captured reduced-motion-hero.png")
    ctx3.close()

    browser.close()
    print("done")
