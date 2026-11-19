"""
The two lists: Mapei products we sell that still need a data sheet, and the
stock lines that are not Mapei catalogue products at all.

Chain behind the numbers, all from the Zoho invoice history since 2020 and the
live site: 1,339 SKUs roll into 543 products, 329 of those sold 10 units or
fewer and are dropped, 214 remain, 170 already have a page, 44 do not.
"""
import json, os
from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter

ROWS = json.load(open('data/discovery/mapei-remaining-classified.json'))

NAVY='161925'; BLUE='406E8E'; PAPER='F6F8FA'; CREAM='F3DFC1'
H=Font(name='Arial', size=10, bold=True, color='FFFFFF')
B=Font(name='Arial', size=10, bold=True)
N=Font(name='Arial', size=10)
MUTE=Font(name='Arial', size=9, color='555555')
FILL_H=PatternFill('solid', fgColor=NAVY); FILL_ALT=PatternFill('solid', fgColor=PAPER)
FILL_ACT=PatternFill('solid', fgColor=CREAM)
THIN=Border(bottom=Side('thin', color='DDDDDD'))

def sheet(wb, title, widths, headers, note):
    ws=wb.create_sheet(title)
    ws.cell(1,1,note).font=MUTE
    ws.merge_cells(start_row=1,start_column=1,end_row=1,end_column=len(headers))
    ws.row_dimensions[1].height=46
    ws.cell(1,1).alignment=Alignment(wrap_text=True, vertical='center')
    for c,h in enumerate(headers,1):
        cell=ws.cell(3,c,h); cell.font=H; cell.fill=FILL_H
        cell.alignment=Alignment(wrap_text=True, vertical='center')
    ws.row_dimensions[3].height=32
    for c,w in enumerate(widths,1): ws.column_dimensions[get_column_letter(c)].width=w
    ws.freeze_panes=ws.cell(4,1)
    return ws, 4

def write(ws,row,vals,fill=None):
    for c,v in enumerate(vals,1):
        cell=ws.cell(row,c,v); cell.font=N; cell.border=THIN
        cell.alignment=Alignment(wrap_text=True, vertical='top')
        if row%2==0: cell.fill=FILL_ALT
        if fill: cell.fill=fill
    return row+1

wb=Workbook(); wb.remove(wb.active)

# ------------------------------------------------------------ TDS not found
tds=[r for r in ROWS if r['bucket']=='TDS not found']
tds.sort(key=lambda r:-r['invoices'])
ws,r=sheet(wb,'TDS not found',[34,8,11,10,11,30,52,26],
  ['Product','SKUs','Invoices since 2020','Units','Stock on hand',
   'Mapei page we found','What happened','What I need from you'],
  note=('Mapei products we sell that still have no page, because we have no data sheet we trust '
        'for them. In most cases Mapei does publish a page, but the sheet behind it belongs to a '
        'different product, so building from it would put another product’s figures in front of '
        'a customer. Send the correct TDS for any of these and the page follows the same day.'))
first=r
for x in tds:
    write(ws,r,[x['product'], x['skus'], x['invoices'], x['units'] or '',
                x['stock'] if x['stock'] is not None else '',
                x['mapei_page'].replace('https://www.mapei.com','') if x['mapei_page'] else 'none',
                x['why'], 'The correct data sheet'],
          fill=FILL_ACT if x['invoices']>=100 else None)
    r+=1
ws.cell(r+1,1,'Total').font=B
ws.cell(r+1,2,f'=COUNTA(A{first}:A{r-1})').font=B

# ----------------------------------------------------------- Item not found
other=[r for r in ROWS if r['bucket']=='Item not found']
other.sort(key=lambda r:-r['invoices'])
ws,r=sheet(wb,'Item not found',[34,8,11,10,11,64],
  ['Product','SKUs','Invoices since 2020','Units','Stock on hand','What I found'],
  note=('Stock lines that are not Mapei catalogue products. None of them appears on any Mapei '
        'country site under any name, and Mapei publishes no data sheet for them, because they '
        'are tools rather than materials. They sell, so the question is only whether you want a '
        'page for them at all. If you do, it would be a photograph and a pack size, not a TDS page.'))
first=r
for x in other:
    write(ws,r,[x['product'], x['skus'], x['invoices'], x['units'] or '',
                x['stock'] if x['stock'] is not None else '', x['why']])
    r+=1
ws.cell(r+1,1,'Total').font=B
ws.cell(r+1,2,f'=COUNTA(A{first}:A{r-1})').font=B

out=os.path.expanduser('~/Downloads/LAPIZBLUE-MAPEI-TDS-WANTED.xlsx')
wb.save(out)
print('written', out)
for n_ in wb.sheetnames: print(f'  {n_}: {wb[n_].max_row-4} rows')
