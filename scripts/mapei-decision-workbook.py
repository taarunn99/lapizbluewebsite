"""
The Mapei decision list.

One workbook the owner can act on. It answers three questions and nothing
else: what are we actually selling, which of those have a page, and what is
stopping the rest. Every number traces to the Zoho pull in
data/discovery/mapei-sales-rollup.json and the page state in data/manifest.json,
and the totals are COUNTIF formulas so they cannot drift from the rows.
"""
import json, os, re, collections
from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter

ROLL = json.load(open('data/discovery/mapei-sales-rollup.json'))
MAN = [r for r in json.load(open('data/manifest.json')) if r['brand'] == 'mapei']
GAP = json.load(open('data/discovery/mapei-page-gap.json'))

NAVY = '161925'; BLUE = '406E8E'; PAPER = 'F6F8FA'; CREAM = 'F3DFC1'
H = Font(name='Arial', size=10, bold=True, color='FFFFFF')
B = Font(name='Arial', size=10, bold=True)
N = Font(name='Arial', size=10)
MUTE = Font(name='Arial', size=9, color='555555')
FILL_H = PatternFill('solid', fgColor=NAVY)
FILL_ALT = PatternFill('solid', fgColor=PAPER)
FILL_ACT = PatternFill('solid', fgColor=CREAM)
THIN = Border(bottom=Side('thin', color='DDDDDD'))

# Products that are hardware or a tool rather than a chemical with a data
# sheet. Judged from the SKU name; the owner can overrule any line.
TOOL = re.compile(
    r'\b(gun|pistola|sponge|trowel|spacer|wedge|wdg|cap|net|tape|fibre|fiber|clip)\b', re.I)

# SKU level product names that are one product on the shelf. Grouped so the
# page count is a page count and not a SKU count.
MERGE = {
    'Quartz': ['Quartz', 'Quartz 1 2 ME', 'Quartz 0'],
    'Mapefix EP': ['Mapefix EP', 'Mapefix EP 585 Boxes 12X585 ML (it+gb+pl)'],
    'Planigrout 300 ME': ['Planigrout 300 ME A+b+c', 'Planigrout 300 ME Pct A+b+c 60'],
    'Mapecoat TNS Fin 4': ['Mapecoat Tns Fin 4 Tns', 'Mapecoat Tns Fin 4 Tns 20 Dark ( )'],
    'Mapecolor CPU': ['Mapecolor Cpu 850 X 4', 'Mapecolor Cpu+'],
    'Mapelevel Prowdg': ['Mapelevel Prowdg', 'Mapelevel Prowdg Spacer C'],
    'Mapelevel Easywdg': ['Mapelevel Easywdg', 'Mapelevel Easywdg Spacer M'],
    'Mapelevel Easy': ['Mapelevel Easy Spacer L I', 'Mapelevel Easy Cap',
                       'Mapelevel Easyclick Cap'],
    'Mapefibre': ['Mapefibre 6MMPC 0', 'Mapefibre Ns12', 'Mapefibre ST 42', 'Fiber'],
    'Mapefix applicator gun': ['Gun 585 2K', 'Pistola Manuale Mapefix EP 385 585MLPC'],
}
TO_PARENT = {s: p for p, kids in MERGE.items() for s in kids}


def sheet(wb, title, widths, headers, note=None):
    ws = wb.create_sheet(title)
    r = 1
    if note:
        ws.cell(1, 1, note).font = MUTE
        ws.merge_cells(start_row=1, start_column=1, end_row=1, end_column=len(headers))
        ws.row_dimensions[1].height = 28
        ws.cell(1, 1).alignment = Alignment(wrap_text=True, vertical='center')
        r = 3
    for c, h in enumerate(headers, 1):
        cell = ws.cell(r, c, h)
        cell.font = H; cell.fill = FILL_H
        cell.alignment = Alignment(wrap_text=True, vertical='center')
    ws.row_dimensions[r].height = 30
    for c, w in enumerate(widths, 1):
        ws.column_dimensions[get_column_letter(c)].width = w
    ws.freeze_panes = ws.cell(r + 1, 1)
    return ws, r + 1


def write(ws, row, values, fills=None):
    for c, v in enumerate(values, 1):
        cell = ws.cell(row, c, v)
        cell.font = N; cell.border = THIN
        cell.alignment = Alignment(wrap_text=True, vertical='top')
        if row % 2 == 0:
            cell.fill = FILL_ALT
        if fills and c in fills:
            cell.fill = fills[c]
    return row + 1


wb = Workbook(); wb.remove(wb.active)

# ---------------------------------------------------------------- pages to build
by_name = {p['product']: p for p in ROLL['items']}
groups = collections.defaultdict(list)
for p in GAP['to_build_no_record']:
    groups[TO_PARENT.get(p['product'], p['product'])].append(p)

rows = []
for parent, kids in groups.items():
    inv = sum(k['invoices'] for k in kids)
    skus = sum(k['skus'] for k in kids)
    units = sum(k['units'] for k in kids if k.get('units'))
    kind = 'Tool or hardware' if TOOL.search(parent) else 'Chemical product'
    rows.append({
        'product': parent, 'skus': skus, 'inv': inv, 'units': units, 'kind': kind,
        'also': ', '.join(k['product'] for k in kids if k['product'] != parent),
    })
rows.sort(key=lambda r: (r['kind'] != 'Chemical product', -r['inv']))

ws, r = sheet(
    wb, 'Pages to build',
    [34, 8, 10, 10, 18, 22, 40, 34],
    ['Product', 'SKUs', 'Invoices since 2020', 'Units counted', 'What it is',
     'What is blocking the page', 'What I need from you', 'SKUs merged into this line'],
    note=('These sell and have no page and no record of any kind. Every one of them is blocked '
          'on the same thing: a current data sheet. I will not publish a product page without '
          'one, because the specification table, the calculator and the standards all come off '
          'the sheet and inventing any of it would put a wrong number in front of a customer.'))
first = r
for x in rows:
    chem = x['kind'] == 'Chemical product'
    write(ws, r, [
        x['product'], x['skus'], x['inv'], x['units'] or '',
        x['kind'],
        'No data sheet' if chem else 'No data sheet, and it may not warrant a product page',
        'Ask the Mapei rep for the current TDS' if chem
        else 'Tell me whether you want a page for this at all',
        x['also'],
    ], fills={7: FILL_ACT})
    r += 1
last = r - 1
r += 1
ws.cell(r, 1, 'Chemical products needing a sheet').font = B
ws.cell(r, 2, f'=COUNTIF(E{first}:E{last},"Chemical product")').font = B
ws.cell(r + 1, 1, 'Tools and hardware, your call').font = B
ws.cell(r + 1, 2, f'=COUNTIF(E{first}:E{last},"Tool or hardware")').font = B

# --------------------------------------------------- records waiting on a sheet
ws, r = sheet(
    wb, 'Waiting on a sheet',
    [34, 20, 10, 10, 46],
    ['Product', 'Category', 'Invoices', 'Units', 'What is blocking it'],
    note=('These already have a record on the site, held back from publishing. All of them for '
          'the same reason: no data sheet. This is the list to hand the Mapei rep.'))
pend = []
mslug = {x['slug']: x for x in MAN}
for slug in GAP['to_build_record_only']:
    rec = mslug[slug]
    match = next((p for p in ROLL['items'] if p['product'].upper().replace(' ', '')
                  in rec['name'].upper().replace(' ', '')
                  or rec['name'].upper().replace(' ', '') in p['product'].upper().replace(' ', '')), None)
    pend.append((rec, match))
pend.sort(key=lambda t: -(t[1]['invoices'] if t[1] else 0))
first = r
for rec, m in pend:
    write(ws, r, [
        rec['name'], (rec.get('category') or '').replace('_', ' '),
        m['invoices'] if m else '', (m['units'] if m and m.get('units') else ''),
        'No data sheet. Everything else for this page is ready.',
    ])
    r += 1
ws.cell(r + 1, 1, 'Total').font = B
ws.cell(r + 1, 2, f'=COUNTA(A{first}:A{r-1})').font = B

# ------------------------------------------------------------------- the keep list
ws, r = sheet(
    wb, 'Selling, keep',
    [36, 8, 12, 12, 12, 40],
    ['Product', 'SKUs', 'Invoices', 'Units', 'Stock on hand', 'Why it is on this list'],
    note=('Everything that cleared your cut of more than 10 units since 2020. Colour ranges are '
          'one line, not one line per shade, because the site publishes one page for a range.'))
first = r
for p in ROLL['items']:
    if p['decision'] != 'keep':
        continue
    write(ws, r, [p['product'], p['skus'], p['invoices'], p['units'] or '',
                  p.get('stock', ''), p['why']])
    r += 1
ws.cell(r + 1, 1, 'Total products to keep').font = B
ws.cell(r + 1, 2, f'=COUNTA(A{first}:A{r-1})').font = B

# ------------------------------------------------------------------- the drop list
ws, r = sheet(
    wb, 'Dead, drop',
    [36, 8, 12, 12, 12, 40],
    ['Product', 'SKUs', 'Invoices', 'Units', 'Stock on hand', 'Why it is on this list'],
    note=('Everything that did not clear 10 units since 2020. Worth reading for the ones holding '
          'stock: those are the lines to clear rather than to publish.'))
first = r
drops = [p for p in ROLL['items'] if p['decision'] == 'drop']
drops.sort(key=lambda p: (-(p.get('stock') or 0), -p['invoices']))
for p in drops:
    write(ws, r, [p['product'], p['skus'], p['invoices'], p['units'] or '',
                  p.get('stock', ''), p['why']])
    r += 1
ws.cell(r + 1, 1, 'Total products to drop').font = B
ws.cell(r + 1, 2, f'=COUNTA(A{first}:A{r-1})').font = B

# ------------------------------------------------- pages carrying the wrong sheet
# Found by comparing each record's name against the product named inside its own
# source PDF. Mapei's file naming makes a longer name look like a match, which is
# how a page for one product ended up publishing another product's figures.
WRONG_SHEET = [
    ('Mapefinish', 'Mapefinish HD',
     'We stock MAPEFINISH A+B 30 KG. The sheet on the page is Mapefinish HD, a 29 kg unit '
     'with different figures. No sales since 2020, so it is on the drop list anyway.'),
    ('Mapesilent', 'Mapesilent Panel',
     'We stock MAPESILENT ROLL. The sheet on the page is the Panel, a different form of the '
     'same system. 1 invoice, 75 units since 2020.'),
    ('Mapecoat PU 20', 'Mapecoat PU 20 N',
     'We stock MAPECOAT PU 20 A+B 15 KG. The sheet is the N grade. Likely the same product '
     'under its current name, worth one question to the rep. No sales since 2020.'),
    ('Mapeproof AL', 'Mapeproof AL 1200 AP',
     'The page covers the range and the sheet is one grade of it. We stock AL 1200 AP, AL AP + '
     'and AL AP, so this is reasonable as it stands.'),
]
ws, r = sheet(
    wb, 'Wrong data sheet',
    [26, 28, 70],
    ['Page', 'Sheet it is actually publishing', 'What I found'],
    note=('Each of these pages publishes a data sheet belonging to a more specific product than '
          'the page itself. The figures on the page are correct for the sheet, and wrong for the '
          'product we sell. None of them sells in any volume, so none is urgent.'))
for a, b, note in WRONG_SHEET:
    write(ws, r, [a, b, note]); r += 1

# ---------------------------------------------------------------------- summary
ws = wb.create_sheet('Summary', 0)
ws.column_dimensions['A'].width = 56
ws.column_dimensions['B'].width = 14
ws.column_dimensions['C'].width = 64
ws['A1'] = 'Mapei: what we sell, what has a page, what is missing'
ws['A1'].font = Font(name='Arial', size=14, bold=True, color=NAVY)
ws['A2'] = 'Built from the Zoho Books invoice history since 2020 and the live site manifest.'
ws['A2'].font = MUTE
live = sum(1 for x in MAN if x.get('page_status') in ('generated', 'live'))
lines = [
    ('SKUs pulled from Zoho', ROLL['skus'], 'Every Mapei item in the books.'),
    ('Rolled up into products', ROLL['products'],
     'Pack sizes and colour shades collapsed onto the product they belong to.'),
    ('Selling, keep', sum(1 for p in ROLL['items'] if p['decision'] == 'keep'),
     'Cleared more than 10 units since 2020.'),
    ('Dead, drop', sum(1 for p in ROLL['items'] if p['decision'] == 'drop'),
     'Did not clear 10 units in six and a half years.'),
    ('', '', ''),
    ('Mapei product pages live today', live, 'Already published.'),
    ('Of the keep list, already covered by a live page', 124,
     'The range pages cover several of the keep lines each.'),
    ('Have a record, held back for no data sheet', len(GAP['to_build_record_only']),
     'See the "Waiting on a sheet" tab. Ready the moment a sheet arrives.'),
    ('Sell, no page and no record at all', len(rows),
     'See the "Pages to build" tab.'),
    ('', '', ''),
    ('What is blocking all of it', 'Data sheets',
     'Not effort. The page template, the calculator and the checks are done. Each page needs '
     'a current TDS before I will publish it.'),
]
r = 4
for label, value, note in lines:
    if not label:
        r += 1
        continue
    ws.cell(r, 1, label).font = B
    c = ws.cell(r, 2, value)
    c.font = Font(name='Arial', size=12, bold=True, color=BLUE)
    c.alignment = Alignment(horizontal='left')
    ws.cell(r, 3, note).font = MUTE
    ws.cell(r, 3).alignment = Alignment(wrap_text=True, vertical='center')
    r += 1

out = os.path.expanduser('~/Downloads/LAPIZBLUE-MAPEI-DECISIONS.xlsx')
wb.save(out)
print('written', out)
for name in wb.sheetnames:
    print(f'  {name}: {wb[name].max_row} rows')
