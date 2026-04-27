import { useEffect, useState } from "react";

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
  const [, setTick] = useState(0);
  const today = new Date();

  // Re-render at midnight so "today" highlight updates
  useEffect(() => {
    const now = new Date();
    const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const msUntilMidnight = midnight.getTime() - now.getTime();
    const timer = setTimeout(() => setTick((t) => t + 1), msUntilMidnight);
    return () => clearTimeout(timer);
  }, [today.toDateString()]);

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
