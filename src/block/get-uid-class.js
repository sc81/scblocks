/**
 * Creates a unique class for the block.
 *
 * @param {string} blockName Block name {namespace/block name}.
 * @param {string} clientId  Block clientId.
 * @param {string} suffix    Class suffix. Optional.
 * @return {string} Unique class.
 */
export default function getUidClass( blockName, clientId, suffix = '' ) {
	blockName = blockName.split( '/' )[ 1 ];
	return `scb-${ blockName }-${ clientId
		.substring( 2, 9 )
		.replace( '-', '' ) }${ suffix }`;
}
