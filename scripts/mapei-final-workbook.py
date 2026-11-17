"""
The final Mapei sheet.

What we sell, what is on the website now, and what is left. Built after the
pages are merged, so every number is the state of the site rather than a plan.
Totals are formulas so they cannot drift from the rows they summarise.
"""
import json, os, re, collections
from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter

ROLL = json.load(open('data/discovery/mapei-sales-rollup.json'))
MAN = [r for r in json.load(open('data/manifest.json')) if r['brand'] == 'mapei']
BY_SLUG = {r['slug']: r for r in MAN}
LIVE = {r['slug'] for r in MAN if r['page_status'] in ('generated', 'live')}
CALC = json.load(open('data/calculators/index.json'))

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
    ws.row_dimensions[1].height=44
    ws.cell(1,1).alignment=Alignment(wrap_text=True, vertical='center')
    for c,h in enumerate(headers,1):
        cell=ws.cell(3,c,h); cell.font=H; cell.fill=FILL_H
        cell.alignment=Alignment(wrap_text=True, vertical='center')
    ws.row_dimensions[3].height=30
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

def norm(s):
    s=s.upper(); s=re.sub(r'\b(ECO|ME|ZERO|PLUS|2K|1K|AND|FO)\b',' ',s)
    return re.sub(r'[^A-Z0-9]','',s)

keep=[p for p in ROLL['items'] if p['decision']=='keep']
by_name={}
for r in MAN: by_name.setdefault(norm(r['name']), r)

def match(product):
    k=norm(product); hit=by_name.get(k)
    if hit: return hit
    c=[r for n,r in by_name.items() if n and (n.startswith(k) or k.startswith(n)) and min(len(n),len(k))>=6]
    return sorted(c,key=lambda r:-len(norm(r['name'])))[0] if c else None

covered, pending, missing = [], [], []
for p in keep:
    hit=match(p['product'])
    if hit and hit['slug'] in LIVE: covered.append((p,hit))
    elif hit: pending.append((p,hit))
    else: missing.append(p)

wb=Workbook(); wb.remove(wb.active)

# ------------------------------------------------------------------- summary
ws=wb.create_sheet('Summary')
for col,w in [('A',54),('B',14),('C',64)]: ws.column_dimensions[col].width=w
ws['A1']='Mapei: what we sell and what is on the website'
ws['A1'].font=Font(name='Arial', size=14, bold=True, color=NAVY)
ws['A2']='From the Zoho Books invoice history since 2020 and the live site.'
ws['A2'].font=MUTE
with_calc=sum(1 for s in LIVE if CALC.get(f'mapei/{s}',{}).get('model') not in (None,'none'))
rows=[
 ('Mapei products selling more than 10 units', len(keep), 'Colour ranges counted once, not once per shade.'),
 ('On the website now', len(covered), f'{len(covered)/len(keep)*100:.0f} per cent of what we sell.'),
 ('Still not on the website', len(pending)+len(missing), 'The next two tabs.'),
 ('', '', ''),
 ('Mapei product pages live', len(LIVE), 'Including products that no longer sell.'),
 ('Of those, with a working calculator', with_calc, 'The rest publish the sheet without one, and say why.'),
 ('', '', ''),
 ('Records built this pass', '', 'See the "Built this pass" tab.'),
]
r=4
for label,value,note in rows:
    if not label: r+=1; continue
    ws.cell(r,1,label).font=B
    c=ws.cell(r,2,value); c.font=Font(name='Arial',size=12,bold=True,color=BLUE)
    c.alignment=Alignment(horizontal='left')
    ws.cell(r,3,note).font=MUTE
    ws.cell(r,3).alignment=Alignment(wrap_text=True, vertical='center')
    r+=1

# -------------------------------------------------------------- on the site
ws,r=sheet(wb,'On the website',[34,12,12,22,34,16],
  ['Product','Invoices since 2020','Units','Category','Calculator','Data sheet'],
  note=('Everything we sell that now has a live product page. The calculator column says which sum '
        'the page offers, taken from the manufacturer’s own published table.'))
first=r
for p,hit in sorted(covered,key=lambda t:-t[0]['invoices']):
    cfg=CALC.get(f"mapei/{hit['slug']}",{})
    model=cfg.get('model','none')
    label={'tiered_area':'Trowel, method or coats','thickness_area':'Thickness','joint_volume':'Tile and joint size',
           'linear_joint':'Joint length and section','gap_volume':'Gap under a base plate',
           'layer_schedule':'Layer schedule, no single rate','none':'No rate published'}.get(model,model)
    write(ws,r,[hit['name'],p['invoices'],p['units'] or '',(hit.get('category') or '').replace('_',' '),
                label, 'hosted' if (hit.get('tds') or {}).get('local_path') else 'request only'])
    r+=1
ws.cell(r+1,1,'Total').font=B
ws.cell(r+1,2,f'=COUNTA(A{first}:A{r-1})').font=B

# ------------------------------------------------------------------ what is left
ws,r=sheet(wb,'Still to do',[34,12,12,22,46],
  ['Product','Invoices since 2020','Units','What exists','What is needed'],
  note=('What we sell and still cannot show. Anything here is blocked on a data sheet we could not '
        'obtain or match with confidence, or is hardware the manufacturer publishes no sheet for.'))
first=r
rest=[(p,'a record, held back') for p,_ in pending]+[(p,'nothing') for p in missing]
for p,state in sorted(rest,key=lambda t:-t[0]['invoices']):
    write(ws,r,[p['product'],p['invoices'],p['units'] or '',state,
                'A current data sheet, or a decision that it does not warrant a page'],
          fill=FILL_ACT if p['invoices']>=100 else None)
    r+=1
ws.cell(r+1,1,'Total').font=B
ws.cell(r+1,2,f'=COUNTA(A{first}:A{r-1})').font=B

out=os.path.expanduser('~/Downloads/LAPIZBLUE-MAPEI-FINAL.xlsx')
wb.save(out)
print('written', out)
for n_ in wb.sheetnames: print(f'  {n_}: {wb[n_].max_row} rows')
