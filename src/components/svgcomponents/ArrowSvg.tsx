import React from "react";
import { useEffect } from "react";

const ArrowSvg = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 70 82"
      width="70"
      height="82"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <clipPath id="__lottie_element_294">
          <rect width="70" height="82" x="0" y="0"></rect>
        </clipPath>
      </defs>
      <g clipPath="url(#__lottie_element_294)">
        <g
          transform="matrix(1,0,0,1,-4.425998687744141,-3)"
          opacity="1"
          style={{ display: "block" }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            fillOpacity="0"
            stroke="rgb(71,71,71)"
            strokeOpacity="1"
            strokeWidth="3"
            d=" M69.55899810791016,80.29199981689453 C59.981998443603516,79.9990005493164 50.334999084472656,80.53600311279297 40.854000091552734,79.35600280761719 C31.371999740600586,78.1760025024414 21.7810001373291,75.01899719238281 15.711999893188477,68.72899627685547 C7.603000164031982,60.32600021362305 7.5,47.900001525878906 12.284000396728516,37.827999114990234 C17.066999435424805,27.756000518798828 25.96500015258789,19.542999267578125 34.90599822998047,11.770999908447266"
          ></path>
        </g>
        <g
          transform="matrix(1,0,0,1,-4.425998687744141,-3)"
          opacity="1"
          style={{ display: "block" }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            fillOpacity="0"
            stroke="rgb(71,71,71)"
            strokeOpacity="1"
            strokeWidth="3"
            d=" M8.925999641418457,11.708000183105469 C19.923999786376953,11.986000061035156 31.384000778198242,12.17199993133545 41.34400177001953,7.5 C36.08000183105469,12.184000015258789 32.439998626708984,18.659000396728516 31.17300033569336,25.59000015258789"
          ></path>
        </g>
      </g>
    </svg>
  );
};

export default ArrowSvg;

import { useRef } from "react";

export const AnimatedSVG = () => {
  const stateRef = useRef(1);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    let frameId: number;

    const animate = () => {
      if (svgRef.current) {
        const groups = svgRef.current.querySelectorAll("g[data-frame]");
        groups.forEach((g, index) => {
          g.setAttribute("opacity", index + 1 === stateRef.current ? "1" : "0");
        });
      }

      stateRef.current = stateRef.current === 4 ? 1 : stateRef.current + 1;
      frameId = setTimeout(animate, 400) as unknown as number;
    };

    animate();

    return () => clearTimeout(frameId);
  }, []);

  return (
    <svg
      ref={svgRef}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 43"
      width="32"
      height="43"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <clipPath id="clip">
          <rect width="32" height="43" x="0" y="0"></rect>
        </clipPath>
      </defs>
      <g clipPath="url(#clip)"></g>

      {[1, 2, 3, 4].map((n) => (
        <g key={n} data-frame={n} opacity={n === 1 ? "1" : "0"}>
          <g
            opacity="1"
            transform="matrix(1,0,0,1,30.697999954223633,13.45199966430664)"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              fillOpacity="0"
              stroke="rgb(71,71,71)"
              strokeOpacity="1"
              strokeWidth="3"
              d=" M-2.2260000705718994,-5.952000141143799 C-2.299999952316284,-3.796999931335449 -1.7289999723434448,-1.659000039100647 -0.8650000095367432,0.31700000166893005 C0,2.2920000553131104 1.1519999504089355,4.125999927520752 2.299999952316284,5.952000141143799"
            ></path>
          </g>
          <g
            opacity="1"
            transform="matrix(1,0,0,1,15.88700008392334,18.226999282836914)"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              fillOpacity="0"
              stroke="rgb(71,71,71)"
              strokeOpacity="1"
              strokeWidth="3"
              d=" M-8.38700008392334,-4.494999885559082 C-6.363999843597412,-2.6029999256134033 -4.176000118255615,-0.8899999856948853 -1.8539999723434448,0.6200000047683716 C1.2419999837875366,2.632999897003174 4.697999954223633,4.316999912261963 8.38700008392334,4.494999885559082"
            ></path>
          </g>
          <g
            opacity="1"
            transform="matrix(1,0,0,1,21.05500030517578,38.854000091552734)"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              fillOpacity="0"
              stroke="rgb(71,71,71)"
              strokeOpacity="1"
              strokeWidth="3"
              d=" M-4.390999794006348,2.3570001125335693 C-1.49399995803833,0.6819999814033508 1.0920000076293945,-1.7910000085830688 4.390999794006348,-2.3570001125335693"
            ></path>
          </g>
        </g>
      ))}
    </svg>
  );
};
