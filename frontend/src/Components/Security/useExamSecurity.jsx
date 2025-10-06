import { useEffect } from "react";

export default function useExamSecurity(onViolation) {
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isFullscreen = !!document.fullscreenElement;
      if (!isFullscreen) {
        onViolation("Fullscreen exited!");
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        onViolation("Tab switched!");
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [onViolation]);
}
