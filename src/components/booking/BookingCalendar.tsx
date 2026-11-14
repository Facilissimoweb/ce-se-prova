import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  MONTHS_IT,
  WEEKDAYS_IT,
  type CalendarCell,
} from '../../lib/bookingCalendar';

interface BookingCalendarProps {
  calendarMonth: Date;
  calendarCells: CalendarCell[];
  selectedDateIso: string;
  onMonthShift: (delta: number) => void;
  onSelectDate: (iso: string) => void;
}

export function BookingCalendar({
  calendarMonth,
  calendarCells,
  selectedDateIso,
  onMonthShift,
  onSelectDate,
}: BookingCalendarProps) {
  return (
    <div className="rounded-xl bg-[#12100E]/75 border border-[#D4AF37]/20 p-4 md:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-lg text-[#F4F1EA]">
          {MONTHS_IT[calendarMonth.getMonth()]} {calendarMonth.getFullYear()}
        </h3>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onMonthShift(-1)}
            aria-label="Mese precedente"
            className="w-10 h-10 rounded-lg border border-[#D4AF37]/25 flex items-center justify-center text-[#F4F1EA] hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => onMonthShift(1)}
            aria-label="Mese successivo"
            className="w-10 h-10 rounded-lg border border-[#D4AF37]/25 flex items-center justify-center text-[#F4F1EA] hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1.5 text-center">
        {WEEKDAYS_IT.map((wd) => (
          <div
            key={wd}
            className="py-1.5 text-[11px] font-semibold uppercase tracking-[0.06em] text-[#A39B93]"
          >
            {wd}
          </div>
        ))}

        {calendarCells.map((cell, idx) => {
          if (!cell) {
            return <div key={`empty-${idx}`} className="h-11" />;
          }
          const isSelected = selectedDateIso === cell.iso;
          return (
            <button
              key={cell.iso}
              type="button"
              disabled={cell.disabled}
              onClick={() => onSelectDate(cell.iso)}
              aria-pressed={isSelected}
              aria-label={`Seleziona ${cell.iso}`}
              className={`h-11 rounded-lg text-sm font-medium tabular-nums transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] ${
                cell.disabled
                  ? 'text-[#A39B93]/30 cursor-not-allowed'
                  : isSelected
                    ? 'bg-[#D4AF37] text-[#12100E] font-bold shadow-[0_0_16px_rgba(212,175,55,0.28)]'
                    : 'text-[#F4F1EA] hover:bg-[#D4AF37]/15 hover:text-[#E6C65C]'
              }`}
            >
              {cell.day}
            </button>
          );
        })}
      </div>
    </div>
  );
}
