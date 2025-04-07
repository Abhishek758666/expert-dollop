"use client";
import React, { useEffect, useState } from "react";

const ThreeLines = () => {
  const [line, setLine] = useState(2);

  useEffect(() => {
    let currentLine = 1;
    const interval = setInterval(() => {
      setLine(currentLine);
      currentLine = currentLine < 4 ? currentLine + 1 : 1;
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 43"
        width="32"
        height="43"
        preserveAspectRatio="xMidYMid slice"
        style={{
          width: "100%",
          height: "100%",
          transform: "translate3d(0px, 0px, 0px)",
        }}
      >
        <defs>
          <clipPath id="__lottie_element_50">
            <rect width="32" height="43" x="0" y="0"></rect>
          </clipPath>
        </defs>
        <g clipPath="url(#__lottie_element_50)">
          {line === 1 && (
            <g
              transform="matrix(1,0,0,1,-3.8740005493164062,-4.784000396728516)"
              opacity="1"
              style={{ display: "block" }}
            >
              <g
                opacity="1"
                transform="matrix(1,0,0,1,30.18400001525879,14.279999732971191)"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fillOpacity="0"
                  stroke="rgb(71,71,71)"
                  strokeOpacity="1"
                  strokeWidth="3"
                  d=" M1.746000051498413,6.78000020980835 C-0.3089999854564667,2.553999900817871 -1.503999948501587,-2.0880000591278076 -1.746000051498413,-6.78000020980835"
                ></path>
              </g>
              <g
                opacity="1"
                transform="matrix(1,0,0,1,16.233999252319336,21.483999252319336)"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fillOpacity="0"
                  stroke="rgb(71,71,71)"
                  strokeOpacity="1"
                  strokeWidth="3"
                  d=" M8.734000205993652,5.36299991607666 C2.0859999656677246,3.453000068664551 -4.0229997634887695,-0.2980000078678131 -8.734000205993652,-5.36299991607666"
                ></path>
              </g>
              <g
                opacity="1"
                transform="matrix(1,0,0,1,17.493000030517578,40.694000244140625)"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fillOpacity="0"
                  stroke="rgb(71,71,71)"
                  strokeOpacity="1"
                  strokeWidth="3"
                  d=" M6.868000030517578,-1.1030000448226929 C2.2190001010894775,-0.9800000190734863 -2.4130001068115234,-0.23600000143051147 -6.867000102996826,1.1030000448226929"
                ></path>
              </g>
            </g>
          )}
          {line === 2 && (
            <g
              style={{ display: "block" }}
              transform="matrix(1,0,0,1,-4.170000076293945,-4.5149993896484375)"
              opacity="1"
            >
              <g
                opacity="1"
                transform="matrix(1,0,0,1,31.57900047302246,14.137999534606934)"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fillOpacity="0"
                  stroke="rgb(71,71,71)"
                  strokeOpacity="1"
                  strokeWidth="3"
                  d=" M1.024999976158142,6.638999938964844 C-0.35100001096725464,2.359999895095825 -1.0240000486373901,-2.1449999809265137 -0.9580000042915344,-6.638999938964844"
                ></path>
              </g>
              <g
                opacity="1"
                transform="matrix(1,0,0,1,17.84600067138672,20.621000289916992)"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fillOpacity="0"
                  stroke="rgb(71,71,71)"
                  strokeOpacity="1"
                  strokeWidth="3"
                  d=" M-10.345999717712402,-5.26200008392334 C-4.381999969482422,-0.22200000286102295 2.760999917984009,3.4110000133514404 10.345999717712402,5.26200008392334"
                ></path>
              </g>
              <g
                opacity="1"
                transform="matrix(1,0,0,1,18.93400001525879,42.17399978637695)"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fillOpacity="0"
                  stroke="rgb(71,71,71)"
                  strokeOpacity="1"
                  strokeWidth="3"
                  d=" M-8.142999649047852,1.1859999895095825 C-2.686000108718872,0.5609999895095825 2.6519999504089355,-1.121999979019165 8.144000053405762,-1.1859999895095825"
                ></path>
              </g>
            </g>
          )}
          {line === 3 && (
            <g
              style={{ display: "block" }}
              transform="matrix(1,0,0,1,-4.536999702453613,-3.8109989166259766)"
              opacity="1"
            >
              <g
                opacity="1"
                transform="matrix(1,0,0,1,30.80299949645996,13.727999687194824)"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fillOpacity="0"
                  stroke="rgb(71,71,71)"
                  strokeOpacity="1"
                  strokeWidth="3"
                  d=" M-2.2839999198913574,-6.228000164031982 C-2.1610000133514404,-1.7289999723434448 -0.531000018119812,2.7160000801086426 2.2839999198913574,6.228000164031982"
                ></path>
              </g>
              <g
                opacity="1"
                transform="matrix(1,0,0,1,17.3700008392334,20.298999786376953)"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fillOpacity="0"
                  stroke="rgb(71,71,71)"
                  strokeOpacity="1"
                  strokeWidth="3"
                  d=" M-9.869999885559082,-4.0920000076293945 C-3.359999895095825,-1.1979999542236328 3.2230000495910645,1.531000018119812 9.869999885559082,4.0920000076293945"
                ></path>
              </g>
              <g
                opacity="1"
                transform="matrix(1,0,0,1,19.16900062561035,40.89500045776367)"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fillOpacity="0"
                  stroke="rgb(71,71,71)"
                  strokeOpacity="1"
                  strokeWidth="3"
                  d=" M-7.796000003814697,3.440000057220459 C-3.0950000286102295,0.19099999964237213 2.2269999980926514,-2.1570000648498535 7.796000003814697,-3.440000057220459"
                ></path>
              </g>
            </g>
          )}
          {line === 4 && (
            <g
              style={{ display: "block" }}
              transform="matrix(1,0,0,1,-5.000000953674316,-2.2320003509521484)"
              opacity="1"
            >
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
          )}
        </g>
      </svg>
    </div>
  );
};

export default ThreeLines;
