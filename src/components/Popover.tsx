import { AnimatePresence, m, domAnimation, LazyMotion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Popover({
  children,
  dismissable,
  onlyShowOnce,
  popoverID,
}: {
  children: JSX.Element;
  dismissable: boolean;
  onlyShowOnce: boolean;
  popoverID?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (event.target === document.getElementById("popover") && dismissable) {
        setIsOpen(false);
      }
    };

    if (onlyShowOnce) {
      const hasBeenOpened = localStorage.getItem(popoverID ?? "popoverOpened");
      if (hasBeenOpened) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    } else {
      setIsOpen(true);
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dismissable, onlyShowOnce]);

  useEffect(() => {
    const popoverAnchor = document.getElementById("popover-zoom-out");
    if (isOpen && popoverAnchor) {
      popoverAnchor.style.transition =
        "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), border-radius 0.2s ease-in-out";
      popoverAnchor.style.transform = "scale(0.95)";
      popoverAnchor.style.borderRadius = "0.5rem";
    } else if (!isOpen && popoverAnchor) {
      popoverAnchor.style.transition =
        "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), border-radius 0.2s ease-in-out";
      popoverAnchor.style.transform = "scale(1)";
      popoverAnchor.style.borderRadius = "0";
    }
  }, [isOpen]);
  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence>
        {isOpen && (
          <m.div
            initial={{
              backdropFilter: "blur(0px)",
              background: "rgba(0,0,0,0)",
            }}
            animate={{
              backdropFilter: "blur(0px)",
              background: "rgba(0,0,0,0.5)",
            }}
            exit={{ backdropFilter: "blur(0px)", background: "rgba(0,0,0,0)" }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-50 overflow-hidden"
            id="popover"
          >
            <m.div
              initial={{ y: 200 }}
              animate={{ y: 0 }}
              exit={{ y: 200 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-fit bg-background rounded-t-2xl p-2 flex flex-col gap-2 bottom-0 absolute"
              onClick={() => setIsOpen(false)}
            >
              {children}
              {dismissable && (
                <button
                  className="w-full p-2 bg-white/10 rounded-md"
                  onClick={() => {
                    setIsOpen(false);
                    localStorage.setItem(popoverID ?? "popoverOpened", "true");
                  }}
                >
                  {onlyShowOnce ? "Don't show again" : "Dismiss"}
                </button>
              )}
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </LazyMotion>
  );
}
