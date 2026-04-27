import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

interface PageTransitionProps {
  children: React.ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const location = useLocation();
  const [transitionStage, setTransitionStage] = useState("enter");
  const prevKey = useRef(location.key);
  const [displayedChildren, setDisplayedChildren] = useState(children);

  useEffect(() => {
    if (location.key !== prevKey.current) {
      // Route changed: play exit animation with OLD content, then swap to new
      setTransitionStage("exit");
      const timer = setTimeout(() => {
        setDisplayedChildren(children);
        setTransitionStage("enter");
        prevKey.current = location.key;
      }, 200);
      return () => clearTimeout(timer);
    } else {
      // Same route, just update content
      setDisplayedChildren(children);
    }
  }, [location.key, children]);

  return (
    <div className={`pageTransition ${transitionStage}`}>
      {displayedChildren}
    </div>
  );
}
