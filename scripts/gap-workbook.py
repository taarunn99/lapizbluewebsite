"""
Build the gap report workbook, in the three categories Tarun asked for.

One sheet per category, each covering every brand:

  No TDS          products with no technical data sheet held
  No image        products with no official pack shot
  Could not find  products we stock that the manufacturer does not list at
                  all, and entries that turned out not to be that brand's

The summary counts off the category sheets with formulas rather than numbers
written in, so the totals cannot drift from the rows beneath them.

Usage: python3 scripts/gap-workbook.py
"""

import json
import os
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
BORDER = Border(bottom=Side(style="thin", color="FFD9DEE5"))


def load(path):
    with open(os.path.join(REPO, path), encoding="utf-8") as fh:
        return json.load(fh)


manifest = load("data/manifest.json")
curated = load("data/discovery/mapei-zoho-curated.json")
vetonit_stock = load("data/discovery/vetonit-stocklist.json")

BRANDS = ["mapei", "kerakoll", "vetonit", "pidilite-puma"]
BRAND_LABEL = {"pidilite-puma": "Pidilite Puma"}
LINE_LABEL = {
    "tile-adhesives-and-grouts": "Tiling",
    "waterproofing": "Waterproofing",
    "flooring-systems": "Flooring",
    "sealants-and-joints": "Sealants",
    "sealants-and-anchoring": "Sealants and anchoring",
    "self-leveling-and-microcement": "Levelling and microcement",
    "self-leveling": "Levelling",
    "concrete-additives-and-repair-systems": "Concrete additives and repair",
    "grouts-and-concrete-repair": "Grouts and concrete repair",
    "microcement-systems": "Microcement",
    "surface-treatments": "Surface treatments",
    "plasters-and-masonry": "Plasters and masonry",
    "bonding-agents": "Bonding agents",
}


def clean(text):
    """Zoho exports carry a few replacement characters where a diameter sign
    or a degree sign was. Blank beats a black diamond in a report."""
    if not isinstance(text, str):
        return text
    return text.replace("�", "").replace("  ", " ").strip()


def brand_name(slug):
    return BRAND_LABEL.get(slug, slug.capitalize())


def line_name(slug):
    return LINE_LABEL.get(slug, slug.replace("-", " ").capitalize())


def sheet(book, title, headers, widths, rows):
    ws = book.create_sheet(title)
    ws.freeze_panes = "A2"
    for i, (head, width) in enumerate(zip(headers, widths), start=1):
        cell = ws.cell(row=1, column=i, value=head)
        cell.font = Font(name=FONT, size=11, bold=True, color="FFFFFFFF")
        cell.fill = HEAD_FILL
        cell.alignment = Alignment(vertical="center", wrap_text=True)
        ws.column_dimensions[get_column_letter(i)].width = width
    ws.row_dimensions[1].height = 28
    for r, row in enumerate(rows, start=2):
        for c, value in enumerate(row, start=1):
            cell = ws.cell(row=r, column=c, value=clean(value))
            cell.font = Font(name=FONT, size=10, color=NAVY)
            cell.alignment = Alignment(vertical="top", wrap_text=(widths[c - 1] > 38))
            cell.border = BORDER
            if r % 2 == 0:
                cell.fill = ALT_FILL
    ws.auto_filter.ref = f"A1:{get_column_letter(len(headers))}{max(len(rows) + 1, 2)}"
    return ws


wb = Workbook()
summary = wb.active
summary.title = "Summary"

# ------------------------------------------------------------------- No TDS
rows = []
for brand in BRANDS:
    for rec in sorted(
        [r for r in manifest if r["brand"] == brand and r["tds"]["status"] != "verified"],
        key=lambda r: (r["product_line"], r["name"]),
    ):
        if brand == "vetonit":
            why = "Saveto issue data sheets to dealers only. The dealer login unlocks all of these at once."
        elif not rec["tds"].get("source_url"):
            why = "Not listed on the manufacturer's UAE site, so there is no page to take a sheet from."
        else:
            why = "Listed, but the product page links no data sheet. Ask the rep for it by name."
        rows.append([
            brand_name(brand), rec["name"], line_name(rec["product_line"]),
            rec["specs"].get("pack_size", ""),
            "yes" if rec["image"]["status"] == "found" else "no",
            "yes" if rec["page_status"] in ("generated", "live") else "no",
            why,
        ])
no_tds_rows = len(rows)
sheet(wb, "No TDS",
      ["Brand", "Product", "Product line", "Pack size", "Image held", "Page built", "Why, and what unlocks it"],
      [14, 34, 26, 22, 11, 11, 62], rows)

# ----------------------------------------------------------------- No image
rows = []
for brand in BRANDS:
    for rec in sorted(
        [r for r in manifest if r["brand"] == brand and r["image"]["status"] != "found"],
        key=lambda r: (r["product_line"], r["name"]),
    ):
        note = ("A branded placeholder card is on the page in the meantime."
                if rec["image"]["status"] == "placeholder"
                else "Nothing on the page. A photograph from the manufacturer would fill it.")
        rows.append([
            brand_name(brand), rec["name"], line_name(rec["product_line"]),
            rec["specs"].get("pack_size", ""),
            "yes" if rec["tds"]["status"] == "verified" else "no",
            "yes" if rec["page_status"] in ("generated", "live") else "no",
            note,
        ])
no_image_rows = len(rows)
sheet(wb, "No image",
      ["Brand", "Product", "Product line", "Pack size", "Data sheet held", "Page built", "What is on the page now"],
      [14, 34, 26, 22, 13, 11, 58], rows)

# ---------------------------------------------------------- Data needed
# One row per product per missing field, with the section that field switches
# on. Sections stay hidden where there is no data, per the owner's decision, so
# this is the list that closes them: fill a row and that section appears.
rows = []
SHIPPING = [r for r in manifest if r["page_status"] in ("generated", "live")]

ON_SITE_FIELDS = ("pack_size", "form", "mixing_ratio", "components", "pot_life",
                  "storage_shelf_life", "cleaning_agent")

NEEDED = [
    (
        "Coverage rate",
        "Coverage calculator",
        lambda r: not r["specs"].get("coverage"),
        "A rate with a real unit, such as 1.5 kg/m2 or 2 to 5 kg/m2 per mm. A pack size is not a rate.",
    ),
    (
        "Classification",
        "Class row and the standards chips",
        lambda r: not (r.get("classification") or r["specs"].get("classification")),
        "The EN or ISO class, such as C2TE S1, CG2 WA, R4 or EN 1504-3.",
    ),
    (
        "Colours",
        "Colour row",
        lambda r: not r["specs"].get("colours"),
        "The colours we stock it in, as you would list them on a quotation.",
    ),
    (
        "Packs, mixing or storage",
        "Packs, mixing and storage",
        lambda r: not any(r["specs"].get(k) for k in ON_SITE_FIELDS),
        "Any one of: pack size, what it is supplied as, mixing ratio, pot life, shelf life, cleaning agent.",
    ),
]

# Safety data sheets are deliberately not listed per product. Every one of the
# 442 is missing, so a row each would be 442 lines of the same sentence and
# would bury the figures that really are per product. It is one ask per brand,
# and it is counted on the summary.

for brand in BRANDS:
    for rec in sorted([r for r in SHIPPING if r["brand"] == brand],
                      key=lambda r: (r["product_line"], r["name"])):
        for what, unlocks, missing, how in NEEDED:
            if missing(rec):
                rows.append([
                    brand_name(brand), rec["name"], line_name(rec["product_line"]),
                    what, unlocks, how,
                ])
data_needed_rows = len(rows)
sheet(wb, "Data needed",
      ["Brand", "Product", "Product line", "What is needed", "What it switches on", "What good looks like"],
      [14, 34, 24, 24, 30, 62], rows)

# ----------------------------------------------------------- Could not find
rows = []

# A product only counts as not found when the manufacturer has no listing for
# it AND we hold no sheet for it. Seven Vetonit products have no Saveto page,
# but they are exactly the seven whose sheets Tarun supplied by hand, so they
# are not lost: they are in the No image sheet and nowhere else.
def nothing_found(rec):
    listed = bool(rec["tds"].get("source_url") or rec["image"].get("source_url"))
    return not listed and rec["tds"]["status"] != "verified"


for item in vetonit_stock["products"]:
    rec = next((r for r in manifest if r["brand"] == "vetonit" and r["name"].lower() == item["name"].lower()), None)
    if rec and nothing_found(rec):
        rows.append(["Vetonit", item["name"], item.get("category", ""), item.get("pack", ""),
                     "No page in the Saveto catalogue and no sheet supplied. Confirm whether it is current, renamed or discontinued."])

# Mapei: stocked in Zoho, absent from the Mapei UAE catalogue entirely.
for p in curated["products"]:
    rec = next((r for r in manifest if r["brand"] == "mapei" and r["name"].lower() == p["name"].lower()), None)
    if rec and nothing_found(rec):
        rows.append(["Mapei", p["name"], p.get("family", ""), ", ".join(p.get("packs", [])[:3]),
                     "Stocked, but Mapei UAE do not list it. They sell it in another region, so ask the rep."])

# Entries that are not that manufacturer's product at all.
for e in curated.get("excluded", []):
    rows.append(["Mapei", e["name"], "Excluded from the Mapei list", "", e["reason"]])
for name in ["Keralastic T", "Aquaflex Roof HR"]:
    rows.append(["Kerakoll", name, "Filed under Kerakoll in Zoho", "",
                 "This is a Mapei product. The Zoho entry is under the wrong brand."])
for name in ["Texbond", "Klimaexpert", "Legante", "SLC"]:
    rows.append(["Kerakoll", name, "Filed under Kerakoll in Zoho", "",
                 "Not found on any Kerakoll site. A retired name, or another brand."])
rows.append(["Vetonit", "Acoustic Plaster", "Dropped at your instruction", "",
             "No catalogue page, sheet or image. Left out on purpose."])
not_found_rows = len(rows)
sheet(wb, "Could not find",
      ["Brand", "Product", "Where it came from", "Pack", "What is wrong, and what to do"],
      [14, 40, 32, 22, 66], rows)

# ------------------------------------------------------------------ Summary
summary["A1"] = "Lapiz Blue product gaps"
summary["A1"].font = Font(name=FONT, size=16, bold=True, color=NAVY)
summary["A2"] = f"Generated {date.today().isoformat()}. Three categories, one sheet each, filtered and sortable."
summary["A2"].font = Font(name=FONT, size=10, italic=True, color="FF55606E")
summary.column_dimensions["A"].width = 20
for col in "BCDEFG":
    summary.column_dimensions[col].width = 17

headers = ["Brand", "Products", "Pages built", "No TDS", "No image", "Could not find", "Data needed"]
for i, head in enumerate(headers, start=1):
    cell = summary.cell(row=4, column=i, value=head)
    cell.font = Font(name=FONT, size=11, bold=True, color="FFFFFFFF")
    cell.fill = HEAD_FILL
    cell.alignment = Alignment(vertical="center", wrap_text=True)
summary.row_dimensions[4].height = 28

for r, brand in enumerate(BRANDS, start=5):
    recs = [x for x in manifest if x["brand"] == brand]
    values = [
        brand_name(brand),
        len(recs),
        len([x for x in recs if x["page_status"] in ("generated", "live")]),
        # Counted off the category sheets, so the numbers cannot drift from them.
        f"=COUNTIF('No TDS'!$A:$A,$A{r})",
        f"=COUNTIF('No image'!$A:$A,$A{r})",
        f"=COUNTIF('Could not find'!$A:$A,$A{r})",
        f"=COUNTIF('Data needed'!$A:$A,$A{r})",
    ]
    for c, value in enumerate(values, start=1):
        cell = summary.cell(row=r, column=c, value=value)
        cell.font = Font(name=FONT, size=11, color=NAVY)
        cell.border = BORDER

total = 5 + len(BRANDS)
summary.cell(row=total, column=1, value="Total").font = Font(name=FONT, size=11, bold=True, color=NAVY)
for c in range(2, 8):
    col = get_column_letter(c)
    cell = summary.cell(row=total, column=c, value=f"=SUM({col}5:{col}{total - 1})")
    cell.font = Font(name=FONT, size=11, bold=True, color=NAVY)
    if c >= 4:
        cell.fill = WARN_FILL

note = total + 2
summary.cell(row=note, column=1, value="What each sheet is").font = Font(name=FONT, size=12, bold=True, color=NAVY)
for i, (name, desc) in enumerate([
    ("No TDS", "Every product with no technical data sheet held, and what would unlock it. Vetonit dominates because Saveto gate theirs behind a dealer login, so one login clears 81 rows at once."),
    ("No image", "Every product with no official pack shot, and what is on the page in the meantime."),
    ("Could not find", "Products we stock that the manufacturer does not list at all, plus Zoho entries that turned out to be another brand's product or not a product at all."),
    ("Data needed", "The working list. One row per product per missing figure, saying which section of the page that figure switches on and what a good value looks like. Fill a row and the section appears."),
]):
    r = note + 1 + i
    summary.cell(row=r, column=1, value=name).font = Font(name=FONT, size=10, bold=True, color=NAVY)
    cell = summary.cell(row=r, column=2, value=desc)
    cell.font = Font(name=FONT, size=10, color=NAVY)
    cell.alignment = Alignment(wrap_text=True, vertical="top")
    summary.merge_cells(start_row=r, start_column=2, end_row=r, end_column=7)
    summary.row_dimensions[r].height = 42

wb.save(OUT)
print(f"written to {OUT}")
print(f"  No TDS          {no_tds_rows} rows")
print(f"  No image        {no_image_rows} rows")
print(f"  Could not find  {not_found_rows} rows")
print(f"  Data needed     {data_needed_rows} rows")
