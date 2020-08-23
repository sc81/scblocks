<?php
namespace ScBlocks;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

const BLOCK_SELECTORS = array(
	'button'    => array(
		'link' => '.scb-button-link',
		'text' => '.scb-button-text',
		'icon' => '.scb-button-icon',
	),
	'column'    => array(
		'content'   => '> .scb-column-content',
		'col'       => '.scb-col',
		'link'      => 'uidSelector a',
		'linkHover' => 'uidSelector a:hover',
	),
	'columns'   => array(
		'allColumns'        => 'uidSelector > .scb-column',
		'allColumnsContent' => 'uidSelector > .scb-column > .scb-column-content',
	),
	'container' => array(
		'content' => '> .scb-container-content',
	),
	'heading'   => array(
		'link'          => 'a',
		'linkHover'     => 'a:hover',
		'highlightText' => 'mark',
	),
);
