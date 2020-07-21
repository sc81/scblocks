/**
 * WordPress dependencies
 */
import { useRef } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { PLUGIN_NAME } from '../../constants';

export default function ResizeBelt( {
	top,
	right,
	bottom,
	left,
	maxWidth = 600,
	minWidth = 40,
	maxHeight,
	minHeight,
	clientRef,
	onResizeEnd,
	integer,
	toFixed,
	unit,
	convertToPercent,
	calculateMaxWidth,
} ) {
	const topBelt = useRef( null );
	const rightBelt = useRef( null );
	const bottomBelt = useRef( null );
	const leftBelt = useRef( null );
	const draggedBelt = useRef( false );
	const shift = useRef( 0 );
	const limitValue = useRef( false );
	const allSpace = useRef();
	const maxW = useRef();
	const minW = useRef();

	function onMouseDown( beltName ) {
		window.addEventListener( 'mouseup', onMouseUp );
		window.addEventListener( 'mousemove', onMouseMove );
		window.addEventListener( 'mouseleave', onMouseUp );
		draggedBelt.current = beltName;

		if ( convertToPercent ) {
			const clientWidth = clientRef.current.getBoundingClientRect().width;
			allSpace.current = clientRef.current.parentElement.getBoundingClientRect().width;
			//this code only applies to the columns block
			if ( calculateMaxWidth ) {
				if ( minWidth.includes( '%' ) ) {
					const min =
						parseFloat( minWidth ) * 0.01 * allSpace.current;
					const nextSiblingWidth = clientRef.current.nextElementSibling.getBoundingClientRect()
						.width;
					maxW.current = nextSiblingWidth + clientWidth - min;
				} else {
					const nextSiblingWidth = clientRef.current.nextElementSibling.getBoundingClientRect()
						.width;
					maxW.current = nextSiblingWidth + clientWidth - minWidth;
				}
			} else if ( maxWidth.includes( '%' ) ) {
				maxW.current = parseFloat( maxWidth ) * 0.01 * allSpace.current;
			} else {
				const percentMax =
					( parseFloat( maxWidth ) / allSpace.current ) * 100;
				maxW.current = percentMax * 0.01 * allSpace.current;
			}
			if ( minWidth.includes( '%' ) ) {
				minW.current = parseFloat( minWidth ) * 0.01 * allSpace.current;
			} else {
				const percentMin =
					( parseFloat( minWidth ) / allSpace.current ) * 100;
				minW.current = percentMin * 0.01 * allSpace.current;
			}
		} else {
			maxW.current = parseFloat( maxWidth );
			minW.current = parseFloat( minWidth );
		}
	}
	function onMouseUp() {
		if ( ! draggedBelt.current ) {
			return;
		}
		window.removeEventListener( 'mouseup', onMouseUp );
		window.removeEventListener( 'mousemove', onMouseMove );
		window.removeEventListener( 'mouseleave', onMouseUp );

		let value;

		switch ( draggedBelt.current ) {
			case 'right': {
				value = limitValue.current
					? limitValue.current
					: clientRef.current.getBoundingClientRect().width -
					  shift.current;
				rightBelt.current.style.right = '0px';
				break;
			}
			case 'left': {
				value = limitValue.current
					? limitValue.current
					: clientRef.current.getBoundingClientRect().width -
					  shift.current;
				leftBelt.current.style.left = '0px';
				break;
			}
			case 'top': {
				value = limitValue.current
					? limitValue.current
					: clientRef.current.getBoundingClientRect().height -
					  shift.current;
				topBelt.current.style.top = '0px';
				break;
			}
			case 'bottom': {
				value = limitValue.current
					? limitValue.current
					: clientRef.current.getBoundingClientRect().height -
					  shift.current;
				bottomBelt.current.style.bottom = '0px';
				break;
			}
		}
		draggedBelt.current = false;
		shift.current = 0;
		limitValue.current = false;

		let nextSiblingWidth;

		if ( convertToPercent ) {
			//this code only applies to the columns block
			if ( calculateMaxWidth ) {
				const clientWidth = clientRef.current.getBoundingClientRect()
					.width;
				const nextAdjacentWidth = clientRef.current.nextElementSibling.getBoundingClientRect()
					.width;
				nextSiblingWidth =
					( Math.abs( value - ( clientWidth + nextAdjacentWidth ) ) /
						allSpace.current ) *
					100;
				nextSiblingWidth =
					Number( nextSiblingWidth ).toFixed( toFixed ) + unit;
			} //end

			value = ( value / allSpace.current ) * 100;
		}

		if ( integer ) {
			value = parseInt( value, 10 );
		}
		if ( ! integer && toFixed ) {
			value = Number( value ).toFixed( toFixed );
		}
		if ( unit ) {
			value = value + unit;
		}

		onResizeEnd( value, nextSiblingWidth );
	}
	function onMouseMove( event ) {
		if ( ! draggedBelt.current ) {
			return;
		}

		const clientCords = clientRef.current.getBoundingClientRect();

		switch ( draggedBelt.current ) {
			case 'right': {
				if ( event.clientX - clientCords.left < minW.current ) {
					limitValue.current = minW.current;
				} else if ( event.clientX - clientCords.left > maxW.current ) {
					limitValue.current = maxW.current;
				} else {
					shift.current = clientCords.right - event.clientX;
					limitValue.current = false;
					rightBelt.current.style.right = shift.current + 'px';
				}
				break;
			}
			case 'left': {
				if ( clientCords.right - event.clientX < minW.current ) {
					limitValue.current = minW.current;
				} else if ( clientCords.right - event.clientX > maxW.current ) {
					limitValue.current = maxW.current;
				} else {
					shift.current = event.clientX - clientCords.left;
					limitValue.current = false;
					leftBelt.current.style.left = shift.current + 'px';
				}
				break;
			}
			case 'top': {
				if ( clientCords.bottom - event.clientY < minHeight ) {
					limitValue.current = minHeight;
				} else if ( clientCords.bottom - event.clientY > maxHeight ) {
					limitValue.current = maxHeight;
				} else {
					shift.current = event.clientY - clientCords.top;
					limitValue.current = false;
					topBelt.current.style.top = shift.current + 'px';
				}
				break;
			}
			case 'bottom': {
				if ( event.clientY - clientCords.top < minHeight ) {
					limitValue.current = minHeight;
				} else if ( event.clientY - clientCords.top > maxHeight ) {
					limitValue.current = maxHeight;
				} else {
					shift.current = clientCords.bottom - event.clientY;
					limitValue.current = false;
					bottomBelt.current.style.bottom = shift.current + 'px';
				}
				break;
			}
		}
	}
	/* eslint-disable jsx-a11y/no-static-element-interactions */
	return (
		<>
			{ top && (
				<div
					ref={ topBelt }
					className={ `${ PLUGIN_NAME }-resize-belt top` }
					onMouseDown={ () => onMouseDown( 'top' ) }
				/>
			) }
			{ right && (
				<div
					ref={ rightBelt }
					className={ `${ PLUGIN_NAME }-resize-belt right` }
					onMouseDown={ () => onMouseDown( 'right' ) }
				/>
			) }
			{ bottom && (
				<div
					ref={ bottomBelt }
					className={ `${ PLUGIN_NAME }-resize-belt bottom` }
					onMouseDown={ () => onMouseDown( 'bottom' ) }
				/>
			) }
			{ left && (
				<div
					ref={ leftBelt }
					className={ `${ PLUGIN_NAME }-resize-belt left` }
					onMouseDown={ () => onMouseDown( 'left' ) }
				/>
			) }
		</>
	);
	/* eslint-enable jsx-a11y/no-static-element-interactions */
}
