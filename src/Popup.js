import React, { useEffect, useRef, forwardRef } from "react";
import maplibregl from "maplibre-gl";

export const Popup = forwardRef(function Popup(props, ref) {
  // export const Popup = ({ children, lngLat, map }) => {
  const popupRef = useRef();

  useEffect(() => {
    if (!props.lngLat) return;
    const popup = new maplibregl.Popup({
      closeButton: false,
      closeOnClick: false,
    })
      .setLngLat(props.lngLat)
      .setDOMContent(popupRef.current)
      .addTo(ref);

    return popup.remove;
  }, [props.children, props.lngLat]);

  return (
    <div style={{ display: "none" }}>
      <div ref={popupRef}>{props.children}</div>
    </div>
  );
});

export default Popup;
