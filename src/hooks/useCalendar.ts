import { useState } from "react";

interface CalendarDay {
  day: number;
  isToday: boolean;
}

interface CalendarResult {
  days: (CalendarDay | null)[];
  year: number;
  monthName: string;
  goNext: () => void;
  goPrev: () => void;
}

export function useCalendar(): CalendarResult {
  const [offset, setOffset] = useState(0);
  const today = new Date();
  const viewDate = new Date(today.getFullYear(), today.getMonth() + offset, 1);
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDay = (new Date(year, month, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const days = [];
  for (let i = 0; i < firstDay; i += 1) days.push(null);
  for (let d = 1; d <= daysInMonth; d += 1) {
    days.push({ day: d, isToday: d === today.getDate() && month === today.getMonth() && year === today.getFullYear() });
  }

  const monthName = new Intl.DateTimeFormat("zh-CN", { month: "long" }).format(viewDate);
  return {
    days, year, monthName,
    goNext: () => setOffset((old) => old + 1),
    goPrev: () => setOffset((old) => old - 1),
  };
}
