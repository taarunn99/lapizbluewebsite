"""
The 78 Mapei products that sell and have no page.

One list, sorted the way it should be worked: by how much each one actually
sells. Every figure traces to the Zoho invoice history since 2020 in
data/discovery/mapei-sales-rollup.json and the page state in data/manifest.json.
"""
import json, os, re
from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter

ROWS = json.load(open('data/discovery/mapei-78-missing.json'))

NAVY='161925'; BLUE='406E8E'; PAPER='F6F8FA'; CREAM='F3DFC1'; LIGHT='BFD7EA'
H=Font(name='Arial', size=10, bold=True, color='FFFFFF')
B=Font(name='Arial', size=10, bold=True)
N=Font(name='Arial', size=10)
MUTE=Font(name='Arial', size=9, color='555555')
FILL_H=PatternFill('solid', fgColor=NAVY)
FILL_ALT=PatternFill('solid', fgColor=PAPER)
FILL_URGENT=PatternFill('solid', fgColor=CREAM)
FILL_READY=PatternFill('solid', fgColor=LIGHT)
THIN=Border(bottom=Side('thin', color='DDDDDD'))

# Applicator guns, levelling clips, sponges and trowels. They sell, but they
# are hardware rather than a chemical with a data sheet, so whether they get a
# product page at all is a different question.
TOOL = re.compile(r'\b(gun|pistola|sponge|trowel|spacer|wedge|wdg|cap|net|tape|fibre|fiber|clip|shield)\b', re.I)

# SKU lines that are one product on the shelf.
MERGE = {
 'Quartz': ['Quartz','Quartz 1 2 ME','Quartz 0'],
 'Mapefix EP': ['Mapefix EP','Mapefix EP 585 Boxes 12X585 ML (it+gb+pl)'],
 'Planigrout 300 ME': ['Planigrout 300 ME A+b+c','Planigrout 300 ME Pct A+b+c 60'],
 'Mapecoat TNS Fin 4': ['Mapecoat Tns Fin 4 Tns','Mapecoat Tns Fin 4 Tns 20 Dark ( )'],
 'Mapecolor CPU': ['Mapecolor Cpu 850 X 4','Mapecolor Cpu+'],
 'Mapelevel Prowdg': ['Mapelevel Prowdg','Mapelevel Prowdg Spacer C'],
 'Mapelevel Easywdg': ['Mapelevel Easywdg','Mapelevel Easywdg Spacer M'],
 'Mapelevel Easy': ['Mapelevel Easy Spacer L I','Mapelevel Easy Cap','Mapelevel Easyclick Cap'],
 'Mapefibre': ['Mapefibre 6MMPC 0','Mapefibre Ns12','Mapefibre ST 42','Fiber'],
 'Mapefix applicator gun': ['Gun 585 2K','Pistola Manuale Mapefix EP 385 585MLPC'],
}
TO_PARENT={s:p for p,kids in MERGE.items() for s in kids}

def sheet(wb, title, widths, headers, note):
    ws=wb.create_sheet(title)
    ws.cell(1,1,note).font=MUTE
    ws.merge_cells(start_row=1,start_column=1,end_row=1,end_column=len(headers))
    ws.row_dimensions[1].height=42
    ws.cell(1,1).alignment=Alignment(wrap_text=True, vertical='center')
    r=3
    for c,h in enumerate(headers,1):
        cell=ws.cell(r,c,h); cell.font=H; cell.fill=FILL_H
        cell.alignment=Alignment(wrap_text=True, vertical='center')
    ws.row_dimensions[r].height=30
    for c,w in enumerate(widths,1): ws.column_dimensions[get_column_letter(c)].width=w
    ws.freeze_panes=ws.cell(r+1,1)
    return ws, r+1

def write(ws,row,vals,fill=None):
    for c,v in enumerate(vals,1):
        cell=ws.cell(row,c,v); cell.font=N; cell.border=THIN
        cell.alignment=Alignment(wrap_text=True, vertical='top')
        if row%2==0: cell.fill=FILL_ALT
        if fill: cell.fill=fill
    return row+1

wb=Workbook(); wb.remove(wb.active)

# ---------------------------------------------------- the 20 that are ready
ready=[r for r in ROWS if r['status']=='record']
ready.sort(key=lambda r:-r['invoices'])
ws,r=sheet(wb,'1. Ready, needs a sheet',[32,20,12,12,14,46],
  ['Product','Category','Invoices since 2020','Units counted','Stock on hand',
   'What is blocking it'],
  note=('These twenty already have a record built on the site and are held back from publishing '
        'for one reason only: no current data sheet. Everything else for the page is done. This '
        'is the list to send the Mapei rep first, because the top five here sell more than the '
        'whole fifty eight on the next tab put together.'))
first=r
for x in ready:
    write(ws,r,[x['rec_name'] or x['product'], (x['category'] or '').replace('_',' '),
                x['invoices'], x['units'] or '', x['stock'] if x['stock'] is not None else '',
                'No data sheet. The page is built and waiting.'],
          fill=FILL_URGENT if x['invoices']>=300 else None)
    r+=1
ws.cell(r+1,1,'Total').font=B
ws.cell(r+1,3,f'=SUM(C{first}:C{r-1})').font=B
ws.cell(r+1,4,'invoices between them').font=MUTE

# ---------------------------------------------- the 58 with no record at all
none=[r for r in ROWS if r['status']=='none']
groups={}
for x in none:
    parent=TO_PARENT.get(x['product'], x['product'])
    g=groups.setdefault(parent, {'product':parent,'skus':0,'invoices':0,'units':0,'also':[]})
    g['skus']+=x['skus']; g['invoices']+=x['invoices']; g['units']+=x['units'] or 0
    if x['product']!=parent: g['also'].append(x['product'])
items=sorted(groups.values(), key=lambda g:(TOOL.search(g['product']) is not None, -g['invoices']))
ws,r=sheet(wb,'2. No record at all',[32,8,12,12,18,34,34],
  ['Product','SKUs','Invoices since 2020','Units counted','What it is',
   'What I need from you','SKU lines merged into this row'],
  note=('These sell and have no page, no record and no data sheet. Colour shades and pack sizes '
        'are merged onto one line, so this is a count of products and not of SKUs. The ones '
        'marked as hardware are applicator guns, tile levelling clips, sponges and trowels: they '
        'sell, but whether they deserve a product page at all is your call rather than mine.'))
first=r
for g in items:
    chem = not TOOL.search(g['product'])
    write(ws,r,[g['product'], g['skus'], g['invoices'], g['units'] or '',
                'Chemical product' if chem else 'Tool or hardware',
                'Ask the Mapei rep for the current TDS' if chem else 'Tell me if you want a page for this at all',
                ', '.join(g['also'])],
          fill=FILL_URGENT if (chem and g['invoices']>=150) else None)
    r+=1
ws.cell(r+1,1,'Chemical products').font=B
ws.cell(r+1,2,f'=COUNTIF(E{first}:E{r-1},"Chemical product")').font=B
ws.cell(r+2,1,'Tools and hardware').font=B
ws.cell(r+2,2,f'=COUNTIF(E{first}:E{r-1},"Tool or hardware")').font=B

# ------------------------------------------------------------------ summary
ws=wb.create_sheet('Summary',0)
for col,w in [('A',52),('B',14),('C',66)]: ws.column_dimensions[col].width=w
ws['A1']='Mapei: what we sell that is not on the website'
ws['A1'].font=Font(name='Arial', size=14, bold=True, color=NAVY)
ws['A2']=('Everything that cleared more than 10 units since 2020 and has no live product page. '
          'From the Zoho Books invoice history and the live site manifest.')
ws['A2'].font=MUTE
ws['A2'].alignment=Alignment(wrap_text=True)
ws.row_dimensions[2].height=30
lines=[
 ('Mapei products selling more than 10 units', 214, 'Colour ranges counted once, not once per shade.'),
 ('Of those, on the website now', 136, 'Across 124 pages. That is 64 per cent.'),
 ('NOT on the website', 78, 'This workbook. 36 per cent.'),
 ('', '', ''),
 ('Built already, held back for a missing sheet', len(ready), 'Tab 1. Publishes the day a sheet arrives.'),
 ('No record of any kind', len(none), 'Tab 2, merged into ' + str(len(items)) + ' products.'),
 ('', '', ''),
 ('Mapei pages live today', 225, 'Only 124 of them carry a product that still sells.'),
 ('Live pages for products that no longer sell', '~100', 'Worth a separate decision about pruning.'),
 ('', '', ''),
 ('Share of Mapei trade the 58 represent', '3.6%', '4,360 invoices of 122,457 since 2020. A long tail.'),
 ('Share the top 5 of tab 1 represent', 'far more', 'Keraflex Maxi S1 Zero alone is 3,079 invoices.'),
 ('', '', ''),
 ('What unblocks all 78', 'Data sheets', 'The page template, the calculator and the checks are '
  'finished. Each page needs a current TDS before it is published.'),
]
r=4
for label,value,note in lines:
    if not label:
        r+=1; continue
    ws.cell(r,1,label).font=B
    c=ws.cell(r,2,value); c.font=Font(name='Arial', size=12, bold=True, color=BLUE)
    c.alignment=Alignment(horizontal='left')
    ws.cell(r,3,note).font=MUTE
    ws.cell(r,3).alignment=Alignment(wrap_text=True, vertical='center')
    r+=1

out=os.path.expanduser('~/Downloads/LAPIZBLUE-MAPEI-78-MISSING.xlsx')
wb.save(out)
print('written', out)
for n in wb.sheetnames: print(f'  {n}: {wb[n].max_row} rows')
