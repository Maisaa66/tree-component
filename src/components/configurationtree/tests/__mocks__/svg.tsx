/** *********************************************************
 * This software and related documentation are proprietary
 * and confidential to Siemens.
 * Copyright 2023 Siemens.
 ********************************************************** */

import React, { SVGProps } from 'react';

// eslint-disable-next-line react/display-name
const SvgrMock = React.forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
  (props, ref) => <svg ref={ref} {...props} />
);

export const ReactComponent = SvgrMock;
export default SvgrMock;
