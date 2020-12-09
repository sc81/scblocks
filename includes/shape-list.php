<?php
namespace ScBlocks;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
const SHAPE_DIVIDERS = array(
	'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 10" preserveAspectRatio="none"><path d="m490,0l20,0l-10,10l-10,-10z" /></svg>',
	'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 10" preserveAspectRatio="none"><path d="m0,0l0,10l1000,0l0,-10l-490,0l-10,9.9l-10,-9.9l-490,0z" /></svg>',
	'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="none"><path d="m0,99l0,-99l1000,0l0,99c0,0 -75,0 -195,0c-195.5,0.1875 -303.75,-75 -305,-95.75c-0.5,20.5 -107.375,96.187 -306,95.75c-110.625,0 -194.02,0 -194,0l0,0z"/></svg>',
	'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="none"><path d="m0,100c0,0 0,0 194.45,-3c185.52,-7.04 304.92,-77.75 305.54,-95c0,17.36 120.48,88.12 305.45,94c193.74,3.5 194.56,4 194.56,4c0,0 -1000,0 -1000,0l0,0z" /></svg>',
	'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="none"><path d="m0,0c0,0 0.05,7.29 0.05,7.99c0,18 249.54,83.85 615.14,91.3c365.6,7.45 384.8,-73 384.8,-91.3c0,-0.7 0,-8 0,-8l-1000,0l0.01,0.01z" /></svg>',
	'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="none"><path d="m624.76,98.13c-291,-2.65 -624.76,-79.23 -624.76,-98.13l0,102l1000,0l0,-100.31c0.94,17.61 -84.23,99.1 -375.23,96.45l-0.01,-0.01z" /></svg>',
	'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="none"><path d="m1000,4.3l0,-4.3l-1000,0l0,4.3c0.9,18.8 126.7,94.9 500,95.7s500,-77.3 500,-95.7z"/></svg>',
	'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="none"><path d="m500,97c-373.3,-0.7 -499.2,-77.2 -500,-97l0,100l1000,0l0,-100c0,18.4 -126.7,97.8 -500,97z"/></svg>',
	'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="none"><path d="m0,0l1000,0l-250,51l-140,-29l-271,76l-339,-85l0,-13z" /></svg>',
	'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="none"><path d="m0,13l339,84l271,-75l140,29l250,-50l0,99l-1000,0l0,-87z" /></svg>',
	'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="none"><path d="m0,0l1000,0l0,100l-1000,-93l0,-7z" /></svg>',
	'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="none"><path d="m0,0l1000,0l0,0l-260,99l-740,-99l0,0z"/></svg>',
	'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="none"><path d="m0,0l0,100l1000,0l0,-100l-260,95l-740,-95z" /></svg>',
	'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="none"><path d="m0,0l500,99l500,-99l-1000,0z" /></svg>',
	'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="none"><path d="m0,0l0,100l1000,0l0,-100l-500,99l-500,-99z" /></svg>',
	'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="none"><path d="m0,0l0,32.01c0,0 64.94,32.58 160.68,32.88c95.73,0.3 125.6,-16.52 132.32,-18.89c6.71,-2.36 55.95,-24.8 82.16,-31c26.21,-6.2 22,-5.4 45.61,-8c23.6,-2.6 58.28,0 76,4c17.75,3.15 41,6 102.44,36c61.42,30 155.53,45.74 189.74,48.88c34.2,3.13 63.85,4.76 106.37,1c42.51,-3.76 104.68,-27.47 104.68,-27.47c0,0 0,-69.4 0,-69.41c0,0 -1000,0 0,0l0,0l-1000,0z"/></svg>',
	'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="none"><path d="m0,27.27l0,72.72l1000,0l0,-35c0,0 -39.35,26.17 -107.09,29c-67.74,2.82 -61.32,1.71 -101.81,-0.72c-40.49,-2.44 -134.79,-17.96 -193,-46.27c-58.2,-28.3 -77.1,-33.35 -104,-38.72c-26.89,-5.37 -64.34,-6.83 -74,-6.27c-9.65,0 -22.87,0 -49,5.27c-26.12,5 -34.68,12.125 -82,26c-47.31,13.875 -62.43,20.87 -130,23c-67.56,2.125 -159,-29 -159,-29l-0.1,-0.01z" /></svg>',
	'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="none"><path d="m0,0l1000,0l0,63c0,0 -131,66 -334,14c-203,-52 -225.4,-63.75 -345.9,-65c-120.5,-1.25 -320,38.27 -320.09,38c0,0 0,-50.1 0,-50l0,0z" /></svg>',
	'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="none"><path d="m0,50l0,50l1000,0l0,-35c1,-1 -145,61 -334,12c-189,-49 -231,-64 -346,-65c-115,-1 -320,39 -320,38z" /></svg>',
);
