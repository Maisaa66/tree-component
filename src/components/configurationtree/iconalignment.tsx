

/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { ReactComponent as ArrowDown } from "../../assets/icons/arrowdowntreeicon.svg";
import { ReactComponent as ArrowRight } from "../../assets/icons/arrowrighttreeicon.svg";
import { ReactComponent as Iicon } from "../../assets/icons/ibranchicon.svg";
import { ReactComponent as Ticon } from "../../assets/icons/tbranchicon.svg";
import { ReactComponent as Licon } from "../../assets/icons/lastbranchicon.svg";
type IconProps = {
  isExpand: boolean;
  isLast: boolean;
  isParentLastChild?: boolean;
  isGrandParentLastChild?: boolean;
  isFirst?: boolean;
  treeXlevel: number;
  hasChildren: boolean;
  expandIcon?: any;
  collapseIcon?: any;
  onClick: () => void;
  itemName: string;
  id: number | string;
};

const Icon: React.FC<IconProps> = ({
  isExpand,
  isLast,
  treeXlevel,
  hasChildren,
  expandIcon,
  collapseIcon,
  isParentLastChild,
  isGrandParentLastChild,
  onClick,
  itemName,
  id,
}) => {
  const ExpandIcon = expandIcon ? expandIcon : ArrowRight;
  const CollapseIcon = collapseIcon ? collapseIcon : ArrowDown;
  return (
    <div onClick={onClick} data-testid={`${itemName}-${id}-icon-container`}>
      {treeXlevel > 1 && (!isGrandParentLastChild || !isParentLastChild) && (
        <div
          className="line"
          style={{
            position: "absolute",
            left: `${
              isParentLastChild
                ? 18.5
                : 20 +
                  treeXlevel * -1.5 +
                  (treeXlevel - 1) * 20 -
                  18.5 *
                    (isParentLastChild && !isGrandParentLastChild
                      ? treeXlevel - 1
                      : 1)
            }px`,
          }}
        >
          <Iicon />
        </div>
      )}

      <div
        className="line"
        style={{
          position: "absolute",
          left: `${20 + treeXlevel * -1.5 + (treeXlevel - 1) * 20}px`,
        }}
      >
        {treeXlevel !== 0 &&
          (!isLast ? (
            <Ticon />
          ) : isLast ? (
            <div style={{ display: "inline-block", marginBottom: "0px" }}>
              <Licon />
            </div>
          ) : null)}
      </div>

      <span style={{zIndex:1}}>
        {hasChildren &&
        (isExpand ? (
          collapseIcon ? (
            <CollapseIcon />
          ) : (
            <CollapseIcon data-testid={"arrowDownIcon"} />
          )
        ) : expandIcon ? (
          <ExpandIcon />
        ) : (
          <ExpandIcon data-testid={"arrowRightIcon"} />
        ))}
      </span>
    </div>
  );
};

export default Icon;
