import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

interface PageTransitionProps {
  children: React.ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const location = useLocation();
  const [transitionStage, setTransitionStage] = useState("enter");
  const prevKey = useRef(location.key);

  useEffect(() => {
    if (location.key !== prevKey.current) {
      setTransitionStage("exit");
      const timer = setTimeout(() => {
        setTransitionStage("enter");
        prevKey.current = location.key;
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [location.key]);

  return (
    <div className={`pageTransition ${transitionStage}`}>
      {children}
    </div>
  );
}
