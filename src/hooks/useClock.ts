import { useEffect, useState } from "react";

interface ClockResult {
  hours: string;
  minutes: string;
  seconds: string;
  dateStr: string;
  greeting: string;
}

export function useClock(): ClockResult {
  const [time, setTime] = useState(() => {
    const now = new Date();
    return new Date(now.getTime() + (now.getTimezoneOffset() + 480) * 60000);
  });

  useEffect(() => {
    const id = setInterval(() => {
      const now = new Date();
      setTime(new Date(now.getTime() + (now.getTimezoneOffset() + 480) * 60000));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const h = time.getHours();
  const hours = String(h).padStart(2, "0");
  const minutes = String(time.getMinutes()).padStart(2, "0");
  const seconds = String(time.getSeconds()).padStart(2, "0");
  const weekdays = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
  const dateStr = `${time.getMonth() + 1}月${time.getDate()}日 ${weekdays[time.getDay()]}`;
  const greeting = h < 12 ? "Good Morning" : h < 18 ? "Good Afternoon" : "Good Evening";
  return { hours, minutes, seconds, dateStr, greeting };
}
