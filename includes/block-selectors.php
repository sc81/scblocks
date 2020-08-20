<?php
namespace ScBlocks;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

const BLOCK_SELECTORS = array(
	'button'  => array(
		'link' => '.scb-button-link',
		'text' => '.scb-button-text',
		'icon' => '.scb-button-icon',
	),
	'column'  => array(
		'content'   => '> .scb-column-content',
		'col'       => '.scb-col',
		'link'      => 'uidSelector a',
		'linkHover' => 'uidSelector a:hover',
	),
	'columns' => array(
		'allColumns'        => 'uidSelector > .scb-column',
		'allColumnsContent' => 'uidSelector > .scb-column > .scb-column-content',
	),
	'group'   => array(
		'content' => '> .scb-group-content',
	),
	'heading' => array(
		'text' => '.scb-heading-text',
		'icon' => '.scb-heading-icon',
		'svg'  => '.scb-heading-icon svg',
	),
);
