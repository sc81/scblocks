<?php
namespace ScBlocks;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

const BLOCK_SELECTORS = array(
	'button'         => array(
		'text' => '.scb-button-text',
		'icon' => '.scb-icon',
	),
	'column'         => array(
		'content'   => '> .scb-column-content',
		'col'       => '.scb-col',
		'link'      => 'uidSelector a',
		'linkHover' => 'uidSelector a:hover',
	),
	'columns'        => array(
		'allColumns'        => 'uidSelector > .scb-column',
		'allColumnsContent' => 'uidSelector > .scb-column > .scb-column-content',
	),
	'container'      => array(
		'content' => '> .scb-container-content',
	),
	'heading'        => array(
		'link'          => 'a',
		'linkHover'     => 'a:hover',
		'highlightText' => 'mark',
	),
	'headingWrapped' => array(
		'link'          => 'a',
		'linkHover'     => 'a:hover',
		'highlightText' => 'mark',
		'icon'          => '.scb-icon',
		'text'          => '.scb-heading',
		'wrapper'       => '.scb-heading-wrapper',
	),
);
