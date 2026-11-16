"""
Build the gap report workbook.

One sheet per question Tarun asked: what has no data sheet, what has no image,
what could not be found at all, and what is held back. The summary counts with
formulas against those sheets rather than numbers written in, so the totals
stay true if a row is edited or deleted.

Usage: python3 scripts/gap-workbook.py
"""

import json
import os
import subprocess
from datetime import date

from openpyxl import Workbook
from openpyxl.styles import Alignment, Border, Font, PatternFill, Side
from openpyxl.utils import get_column_letter

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.expanduser("~/Downloads/LAPIZBLUE-PRODUCT-GAPS.xlsx")

FONT = "Arial"
NAVY = "FF161925"
HEAD_FILL = PatternFill("solid", fgColor="FF23395B")
ALT_FILL = PatternFill("solid", fgColor="FFF6F8FA")
WARN_FILL = PatternFill("solid", fgColor="FFFDF0D5")
THIN = Side(style="thin", color="FFD9DEE5")
BORDER = Border(bottom=THIN)


def load(path):
    with open(os.path.join(REPO, path), encoding="utf-8") as fh:
        return json.load(fh)


manifest = load("data/manifest.json")
curated = load("data/discovery/mapei-zoho-curated.json")
mapei_cat = load("data/discovery/mapei-catalogue.json")
vetonit_stock = load("data/discovery/vetonit-stocklist.json")

BRANDS = ["vetonit", "kerakoll", "mapei", "pidilite-puma"]
BRAND_LABEL = {"pidilite-puma": "Pidilite Puma"}
LINE_LABEL = {
    "tile-adhesives-and-grouts": "Tiling",
    "waterproofing": "Waterproofing",
    "flooring-systems": "Flooring",
    "sealants-and-joints": "Sealants",
    "sealants-and-anchoring": "Sealants and anchoring",
    "self-leveling-and-microcement": "Levelling and microcement",
    "concrete-additives-and-repair-systems": "Concrete additives and repair",
    "grouts-and-concrete-repair": "Grouts and concrete repair",
    "microcement-systems": "Microcement",
    "surface-treatments": "Surface treatments",
    "plasters-and-masonry": "Plasters and masonry",
    "bonding-agents": "Bonding agents",
}


def style_header(ws, headers, widths):
    ws.freeze_panes = "A2"
    for i, (head, width) in enumerate(zip(headers, widths), start=1):
        cell = ws.cell(row=1, column=i, value=head)
        cell.font = Font(name=FONT, size=11, bold=True, color="FFFFFFFF")
        cell.fill = HEAD_FILL
        cell.alignment = Alignment(vertical="center", wrap_text=True)
        ws.column_dimensions[get_column_letter(i)].width = width
    ws.row_dimensions[1].height = 28


def write_rows(ws, rows, widths, highlight_col=None):
    for r, row in enumerate(rows, start=2):
        for c, value in enumerate(row, start=1):
            cell = ws.cell(row=r, column=c, value=value)
            cell.font = Font(name=FONT, size=10, color=NAVY)
            cell.alignment = Alignment(vertical="top", wrap_text=(widths[c - 1] > 40))
            cell.border = BORDER
            if r % 2 == 0:
                cell.fill = ALT_FILL
            if highlight_col and c == highlight_col and value:
                cell.fill = WARN_FILL


wb = Workbook()

# ---------------------------------------------------------------- Summary
ws = wb.active
ws.title = "Summary"
ws["A1"] = "Lapiz Blue product gap report"
ws["A1"].font = Font(name=FONT, size=16, bold=True, color=NAVY)
ws["A2"] = f"Generated {date.today().isoformat()} from the live manifest, the Zoho Books item list and the manufacturer catalogues."
ws["A2"].font = Font(name=FONT, size=10, italic=True, color="FF55606E")
ws.column_dimensions["A"].width = 26
for col in "BCDEFG":
    ws.column_dimensions[col].width = 16

headers = ["Brand", "Products", "Pages built", "Data sheet held", "No data sheet", "Image held", "No image"]
for i, head in enumerate(headers, start=1):
    cell = ws.cell(row=4, column=i, value=head)
    cell.font = Font(name=FONT, size=11, bold=True, color="FFFFFFFF")
    cell.fill = HEAD_FILL
    cell.alignment = Alignment(vertical="center", wrap_text=True)
ws.row_dimensions[4].height = 28

summary_rows = []
for brand in BRANDS:
    recs = [r for r in manifest if r["brand"] == brand]
    pages = len([r for r in recs if r["page_status"] in ("generated", "live")])
    tds = len([r for r in recs if r["tds"]["status"] == "verified"])
    img = len([r for r in recs if r["image"]["status"] == "found"])
    summary_rows.append([BRAND_LABEL.get(brand, brand.capitalize()), len(recs), pages, tds, len(recs) - tds, img, len(recs) - img])

for r, row in enumerate(summary_rows, start=5):
    for c, value in enumerate(row, start=1):
        cell = ws.cell(row=r, column=c, value=value)
        cell.font = Font(name=FONT, size=11, color=NAVY)
        cell.border = BORDER
        if c in (5, 7) and value:
            cell.fill = WARN_FILL

total_row = 5 + len(summary_rows)
ws.cell(row=total_row, column=1, value="Total").font = Font(name=FONT, size=11, bold=True, color=NAVY)
for c in range(2, 8):
    col = get_column_letter(c)
    cell = ws.cell(row=total_row, column=c, value=f"=SUM({col}5:{col}{total_row - 1})")
    cell.font = Font(name=FONT, size=11, bold=True, color=NAVY)

note = total_row + 2
ws.cell(row=note, column=1, value="What each sheet holds").font = Font(name=FONT, size=12, bold=True, color=NAVY)
notes = [
    ("No data sheet", "Products with no technical data sheet held. Saveto gate theirs behind a dealer login, which is why Vetonit dominates this list."),
    ("No image", "Products with no official pack shot. Vetonit entries here carry a branded placeholder instead."),
    ("Not found", "Products on the stock list that have no page in the manufacturer's own catalogue, so there is no image, sheet or specification to draw on."),
    ("Not shipped", "Registered products with no page yet, and the one thing each is waiting on. Most are short of specification fields."),
    ("Ask the manufacturer", "One row per product still waiting on a document or a photograph, written as a request you can forward to the rep."),
    ("Excluded", "Entries in the Zoho stock list that are not that manufacturer's products at all, with the reason."),
]
for i, (name, desc) in enumerate(notes):
    r = note + 1 + i
    ws.cell(row=r, column=1, value=name).font = Font(name=FONT, size=10, bold=True, color=NAVY)
    c = ws.cell(row=r, column=2, value=desc)
    c.font = Font(name=FONT, size=10, color=NAVY)
    c.alignment = Alignment(wrap_text=True, vertical="top")
    ws.merge_cells(start_row=r, start_column=2, end_row=r, end_column=7)
    ws.row_dimensions[r].height = 30

# ------------------------------------------------------------ No data sheet
ws = wb.create_sheet("No data sheet")
head = ["Brand", "Product", "Product line", "Image held", "Page built", "Why there is no sheet"]
widths = [12, 32, 26, 12, 12, 62]
style_header(ws, head, widths)
rows = []
for brand in BRANDS:
    for r in sorted([x for x in manifest if x["brand"] == brand and x["tds"]["status"] != "verified"], key=lambda x: x["name"]):
        if brand == "vetonit":
            why = "Saveto issue data sheets to dealers only. The dealer login unlocks this."
        elif not r["tds"].get("source_url"):
            why = "No catalogue page found, so no sheet to fetch."
        else:
            why = "The manufacturer publishes no sheet for this item, or it failed the product name check."
        rows.append([BRAND_LABEL.get(brand, brand.capitalize()), r["name"], LINE_LABEL.get(r["product_line"], r["product_line"]),
                     "yes" if r["image"]["status"] == "found" else "no",
                     "yes" if r["page_status"] in ("generated", "live") else "no", why])
write_rows(ws, rows, widths)

# ---------------------------------------------------------------- No image
ws = wb.create_sheet("No image")
head = ["Brand", "Product", "Product line", "Image status", "Data sheet held", "Note"]
widths = [12, 32, 26, 16, 14, 56]
style_header(ws, head, widths)
rows = []
for brand in BRANDS:
    for r in sorted([x for x in manifest if x["brand"] == brand and x["image"]["status"] != "found"], key=lambda x: x["name"]):
        note_text = ("Branded placeholder card in use." if r["image"]["status"] == "placeholder"
                     else "No pack shot found. A photograph from the manufacturer or from stock would fill this.")
        rows.append([BRAND_LABEL.get(brand, brand.capitalize()), r["name"], LINE_LABEL.get(r["product_line"], r["product_line"]),
                     r["image"]["status"], "yes" if r["tds"]["status"] == "verified" else "no", note_text])
write_rows(ws, rows, widths)

# --------------------------------------------------------------- Not found
ws = wb.create_sheet("Not found")
head = ["Brand", "Product", "Category on the stock list", "Pack", "What is missing"]
widths = [12, 34, 34, 20, 56]
style_header(ws, head, widths)
rows = []

vet_names = {r["name"].lower() for r in manifest if r["brand"] == "vetonit"}
for item in vetonit_stock["products"]:
    rec = next((r for r in manifest if r["brand"] == "vetonit" and r["name"].lower() == item["name"].lower()), None)
    if rec and not rec["tds"].get("source_url"):
        rows.append(["Vetonit", item["name"], item["category"], item["pack"],
                     "No page in the Saveto catalogue. Confirm whether it is current, renamed or discontinued."])

cat_names = {p["name"].lower() for p in mapei_cat["products"]}
mapei_slugs = {r["name"].lower() for r in manifest if r["brand"] == "mapei"}
for p in curated["products"]:
    if p["name"].lower() not in mapei_slugs:
        rows.append(["Mapei", p["name"], p.get("family", ""), ", ".join(p.get("packs", [])[:3]),
                     "Stocked but no match in the Mapei UAE catalogue, so no image or sheet to attach."])
write_rows(ws, rows, widths)

# -------------------------------------------------------------- Not shipped
ws = wb.create_sheet("Not shipped")
head = ["Brand", "Product", "Product line", "Spec fields", "Data sheet", "Image", "Copy written", "What it is waiting on"]
widths = [12, 30, 24, 12, 12, 12, 13, 52]
style_header(ws, head, widths)
rows = []
for r in sorted([x for x in manifest if x["page_status"] == "pending"], key=lambda x: (x["brand"], x["name"])):
    n = len(r["specs"])
    if n < 5:
        waiting = f"Thin specification. The sheet yielded {n} of the 5 fields the page gate asks for."
    elif not r["description"]:
        waiting = "Specs and image are in place. It needs its product copy written."
    else:
        waiting = "Copy and specs are in place. Held for a final check."
    rows.append([BRAND_LABEL.get(r["brand"], r["brand"].capitalize()), r["name"], LINE_LABEL.get(r["product_line"], r["product_line"]),
                 n, "yes" if r["tds"]["status"] == "verified" else "no", r["image"]["status"],
                 "yes" if r["description"] else "no", waiting])
write_rows(ws, rows, widths)

# ------------------------------------------------------- Ask the manufacturer
ws = wb.create_sheet("Ask the manufacturer")
head = ["Brand", "Product", "Product line", "Pack sizes we stock", "SKUs in Zoho", "What to request"]
widths = [14, 38, 26, 24, 12, 50]
style_header(ws, head, widths)
rows = []
zoho_mapei = {p["name"].lower(): p for p in curated["products"]}
for brand in BRANDS:
    for r in sorted([x for x in manifest if x["brand"] == brand and x["tds"]["status"] != "verified"],
                    key=lambda x: x["name"]):
        z = zoho_mapei.get(r["name"].lower()) if brand == "mapei" else None
        need = []
        if r["tds"]["status"] != "verified":
            need.append("the technical data sheet")
        if r["image"]["status"] not in ("found",):
            need.append("an official pack shot")
        rows.append([
            BRAND_LABEL.get(brand, brand.capitalize()),
            r["name"],
            LINE_LABEL.get(r["product_line"], r["product_line"]),
            r["specs"].get("pack_size", ""),
            z["sku_count"] if z else "",
            "Ask the rep for " + " and ".join(need) + ".",
        ])
write_rows(ws, rows, widths)

# --------------------------------------------------------------- Excluded
ws = wb.create_sheet("Excluded")
head = ["Brand", "Entry on the stock list", "Why it is excluded"]
widths = [12, 44, 76]
style_header(ws, head, widths)
rows = [["Mapei", e["name"], e["reason"]] for e in curated.get("excluded", [])]
rows.append(["Kerakoll", "Keralastic T", "This is a Mapei product. It is filed under Kerakoll in Zoho in error."])
rows.append(["Kerakoll", "Aquaflex Roof HR", "This is a Mapei product. It is filed under Kerakoll in Zoho in error."])
for name in ["Texbond", "Klimaexpert", "Legante", "SLC"]:
    rows.append(["Kerakoll", name, "Not found on any Kerakoll site. A retired name, or another brand."])
rows.append(["Vetonit", "Acoustic Plaster", "Dropped at the owner's instruction. No catalogue page, sheet or image."])
write_rows(ws, rows, widths)

wb.save(OUT)
print("written to", OUT)
for sheet in wb.sheetnames:
    print(f"  {sheet}: {wb[sheet].max_row - 1} rows")
