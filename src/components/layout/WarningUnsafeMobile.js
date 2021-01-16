import React, { useState } from "react";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import PageCard from "../util-components/centeredpage/PageCard";

/**
 * Render a warning if this component renders on mobile
 * @param {Array} children
 */
export default function WarningUnsafeMobile(props) {
  const { md } = useWindowDimensions();
  const [confirmed, setConfirmed] = useState(false);
  if (!confirmed && !md) {
    return (
      <PageCard navbar>
        Sorry, but the contents of this page are too large to be optimized for
        mobile. You can come back to this page on desktop or{" "}
        <span onClick={() => setConfirmed(true)} className="fake-link">
          proceed anyway{" "}
        </span>
      </PageCard>
    );
  }
  return <>{props.children}</>;
}
