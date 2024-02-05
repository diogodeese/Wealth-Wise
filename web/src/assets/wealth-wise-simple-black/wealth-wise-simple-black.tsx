import * as React from "react";

interface WealthWiseSimpleBlackProps extends React.SVGProps<SVGSVGElement> {}

const WealthWiseSimpleBlack: React.FC<WealthWiseSimpleBlackProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 358 308"
    width="46"
    height="46"
    fill="none"
    {...props}
  >
    <path
      fill="#FAFAFA"
      d="M345.907 65.767h10.54l-70.38 241.4h-12.92l-55.76-222.36-66.3 222.36h-12.92l-59.5-241.4h10.54l55.76 231.54 68.68-231.54h7.82l58.48 232.22 65.96-232.22Z"
    />
    <path
      fill="#FAFAFA"
      d="M274.708 14.6h10.54L214.868 256h-12.92l-55.76-222.36L79.888 256h-12.92L7.468 14.6h10.54l55.76 231.54 68.68-231.54h7.82l58.48 232.22 65.96-232.22Z"
    />
    <path
      fill="#09090B"
      d="m232 165 2-14 5.5 22-3 9-4.5-17ZM178.5 184l2.5-11.5 6 24-4 4.5-4.5-17Z"
    />
  </svg>
);

export default WealthWiseSimpleBlack;
