"""Verificação end-to-end da LP HB (PRD §"Verificação end-to-end")."""
import os
from playwright.sync_api import sync_playwright

OUT = os.path.join(os.environ.get("TEMP", "/tmp"), "hb-shots")
os.makedirs(OUT, exist_ok=True)
URL = "http://localhost:5173"
errors = []


def log(msg):
    print(msg, flush=True)


with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)

    # ---------- DESKTOP 1440 ----------
    ctx = browser.new_context(viewport={"width": 1440, "height": 900}, device_scale_factor=1)
    page = ctx.new_page()
    console_errors = []
    page.on("console", lambda m: console_errors.append(m.text) if m.type == "error" else None)
    page.on("pageerror", lambda e: console_errors.append(f"PAGEERROR: {e}"))

    page.goto(URL, wait_until="networkidle")
    page.wait_for_timeout(800)

    # Horizontal scroll check
    sw = page.evaluate("document.documentElement.scrollWidth")
    cw = page.evaluate("document.documentElement.clientWidth")
    log(f"[desktop] scrollWidth={sw} clientWidth={cw} -> {'OK' if sw <= cw + 1 else 'HORIZONTAL SCROLL!'}")
    if sw > cw + 1:
        errors.append("horizontal scroll on desktop")

    # Headline present
    h1 = page.locator("h1").first.inner_text()
    log(f"[desktop] H1: {h1!r}")

    # CTA counts
    wa = page.locator("a[href*='wa.me']").count()
    tel = page.locator("a[href^='tel:']").count()
    log(f"[desktop] wa.me links={wa} | tel links={tel}")
    if wa < 5:
        errors.append(f"expected >=5 wa.me links, got {wa}")

    # Heading hierarchy
    tags = page.evaluate("Array.from(document.querySelectorAll('h1,h2,h3')).map(e=>e.tagName)")
    log(f"[desktop] heading count h1={tags.count('H1')} h2={tags.count('H2')} h3={tags.count('H3')}")
    if tags.count("H1") != 1:
        errors.append(f"expected exactly 1 H1, got {tags.count('H1')}")

    page.screenshot(path=f"{OUT}/desktop-top.png")

    # Scrub hero: scroll a bit and capture (phone should assemble)
    page.evaluate("window.scrollTo(0, 320)")
    page.wait_for_timeout(400)
    page.screenshot(path=f"{OUT}/desktop-scrub-mid.png")
    page.evaluate("window.scrollTo(0, 640)")
    page.wait_for_timeout(400)
    page.screenshot(path=f"{OUT}/desktop-scrub-end.png")

    # Full page
    page.evaluate("window.scrollTo(0,0)")
    page.wait_for_timeout(300)
    page.screenshot(path=f"{OUT}/desktop-full.png", full_page=True)

    # FAQ accordion: first open by default, click 2nd
    faq_buttons = page.locator("dt button")
    n_faq = faq_buttons.count()
    log(f"[desktop] FAQ items={n_faq}")
    if n_faq >= 2:
        faq_buttons.nth(1).scroll_into_view_if_needed()
        exp_before = faq_buttons.nth(1).get_attribute("aria-expanded")
        faq_buttons.nth(1).click()
        page.wait_for_timeout(400)
        exp_after = faq_buttons.nth(1).get_attribute("aria-expanded")
        log(f"[desktop] FAQ#2 aria-expanded {exp_before} -> {exp_after}")
        if exp_after != "true":
            errors.append("FAQ accordion did not expand")

    # Form validation: submit empty
    page.locator("#form-name").scroll_into_view_if_needed()
    page.locator("form button[type='submit']").click()
    page.wait_for_timeout(300)
    alerts = page.locator("[role='alert']").count()
    log(f"[desktop] form empty-submit alerts={alerts}")
    if alerts < 2:
        errors.append(f"expected 2 validation errors, got {alerts}")

    # Fill valid + submit (intercept popup)
    page.locator("#form-name").fill("João Teste")
    page.locator("#form-phone").fill("22999998888")
    with ctx.expect_page() as popup_info:
        page.locator("form button[type='submit']").click()
        page.wait_for_timeout(900)
    try:
        popup = popup_info.value
        log(f"[desktop] form opened WhatsApp: {popup.url[:60]}...")
        if "wa.me" not in popup.url:
            errors.append("form did not open wa.me")
        popup.close()
    except Exception as e:
        errors.append(f"form popup failed: {e}")
    page.wait_for_timeout(300)
    success = page.locator("text=Abrimos o WhatsApp").count()
    log(f"[desktop] form success state shown={success>0}")
    ctx.close()

    # ---------- MOBILE 375 ----------
    ctx2 = browser.new_context(viewport={"width": 375, "height": 812}, device_scale_factor=2, is_mobile=True)
    page2 = ctx2.new_page()
    page2.goto(URL, wait_until="networkidle")
    page2.wait_for_timeout(600)

    sw2 = page2.evaluate("document.documentElement.scrollWidth")
    cw2 = page2.evaluate("document.documentElement.clientWidth")
    log(f"[mobile] scrollWidth={sw2} clientWidth={cw2} -> {'OK' if sw2 <= cw2 + 1 else 'HORIZONTAL SCROLL!'}")
    if sw2 > cw2 + 1:
        errors.append("horizontal scroll on mobile")

    page2.screenshot(path=f"{OUT}/mobile-top.png")

    # Mobile action bar hidden at top, visible after scroll
    page2.evaluate("window.scrollTo(0, 1200)")
    page2.wait_for_timeout(500)
    bar = page2.locator("div.fixed.bottom-0").first
    bar_box = bar.bounding_box()
    vh = 812
    visible = bar_box is not None and bar_box["y"] < vh
    log(f"[mobile] action bar visible after scroll={visible}")
    if not visible:
        errors.append("mobile action bar not visible after scroll")
    page2.screenshot(path=f"{OUT}/mobile-scrolled.png")

    # Mobile menu toggle
    page2.evaluate("window.scrollTo(0,0)")
    page2.wait_for_timeout(300)
    menu_btn = page2.locator("button[aria-label*='menu' i]")
    if menu_btn.count() > 0:
        menu_btn.first.click()
        page2.wait_for_timeout(300)
        exp = menu_btn.first.get_attribute("aria-expanded")
        log(f"[mobile] menu aria-expanded after click={exp}")
        page2.screenshot(path=f"{OUT}/mobile-menu.png")
    page2.close()
    ctx2.close()

    # ---------- REDUCED MOTION ----------
    ctx3 = browser.new_context(viewport={"width": 1440, "height": 900}, reduced_motion="reduce")
    page3 = ctx3.new_page()
    page3.goto(URL, wait_until="networkidle")
    page3.wait_for_timeout(600)
    page3.screenshot(path=f"{OUT}/reduced-motion-top.png")
    log("[reduced-motion] screenshot captured (phone should be assembled at top)")
    ctx3.close()

    browser.close()

log("\n=== CONSOLE ERRORS ===")
log("\n".join(console_errors) if console_errors else "none")
log("\n=== ISSUES ===")
log("\n".join(errors) if errors else "NONE — all checks passed")
log(f"\nScreenshots in: {OUT}")
