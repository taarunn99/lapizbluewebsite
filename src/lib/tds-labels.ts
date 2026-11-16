export const SPEC_LABELS: Record<string, string> = {
  classification: 'Classification',
  coverage: 'Coverage',
  joint_width: 'Joint width',
  pack_size: 'Pack size',
  pot_life: 'Pot life',
  open_time: 'Open time',
  adjustment_time: 'Adjustment time',
  set_time: 'Set to light foot traffic',
  grouting_time: 'Waiting time before grouting',
  colours: 'Colours',
  mixing_ratio: 'Mixing ratio',
  bond_strength: 'Bond strength',
  water_resistance: 'Water resistance',
  application_temperature: 'Application temperature',
  consistency: 'Consistency',
  storage_shelf_life: 'Storage and shelf life',
  emicode: 'EMICODE',
};

export function specLabel(field: string): string {
  return (
    SPEC_LABELS[field] ??
    field.replace(/_/g, ' ').replace(/^./, (c) => c.toUpperCase())
  );
}
