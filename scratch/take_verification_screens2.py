from playwright.sync_api import sync_playwright
import time

with sync_playwright() as p:
    browser = p.chromium.launch(channel="msedge", headless=True)
    page = browser.new_page(viewport={"width": 1400, "height": 900})
    page.goto("http://localhost:3000", wait_until="networkidle")
    time.sleep(3)
    
    # Take full hero screenshot
    page.screenshot(path=r"C:\Users\Shifan Gouri\.gemini\antigravity\brain\8a9d4567-b072-43a0-9cae-dea5e590514b\verified_hero_and_owner.png")
    
    # Click next a couple times to verify another model faces forward
    next_btn = page.query_selector("button[title='Next Pokemon']")
    if next_btn:
        next_btn.click()
        time.sleep(2)
        page.screenshot(path=r"C:\Users\Shifan Gouri\.gemini\antigravity\brain\8a9d4567-b072-43a0-9cae-dea5e590514b\verified_pokemon_next.png")
        
    browser.close()
print("Screenshots captured successfully!")
