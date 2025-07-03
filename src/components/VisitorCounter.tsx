import React, { useEffect, useState } from "react";

const VisitorCounter = () => {
  const [count, setCount] = useState<number | string | null>(null);

  useEffect(() => {
    fetch("https://countapi.jaki.app/hit/anubhav-dev/portfolio")
      .then(res => res.json())
      .then(data => {
        setCount(data.value);
      })
      .catch(err => {
        console.error("Visitor count fetch failed:", err);
        setCount("N/A");
      });
  }, []);

  return (
    <div className="text-sm text-gray-500 dark:text-gray-300 mt-4 text-center">
      👀 Visitor Count: <strong>{count !== null ? count : "Loading..."}</strong>
    </div>
  );
};

export default VisitorCounter; 