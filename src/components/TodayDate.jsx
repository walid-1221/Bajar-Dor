"use client";

import { useEffect, useState } from "react";

// Renders today's date in the browser. Computing the current time on the
// server blocks prerendering when Cache Components is enabled.
export default function TodayDate({
  options = { day: "numeric", month: "long", year: "numeric" },
}) {
  const [date, setDate] = useState("");

  useEffect(() => {
    setDate(new Date().toLocaleDateString("bn-BD", options));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <span suppressHydrationWarning>{date}</span>;
}
