<?php
namespace ScBlocks;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}


function get_block_selector() {
	return apply_filters(
		'scblocks_block_selector',
		array(
			'button' => array(
				'main' => function( $uid_class ) {
					return ".$uid_class,.$uid_class:visited";
				},
				'mainHover' => function( $uid_class ) {
					return ".$uid_class:hover";
				},
				'icon' => function( $uid_class ) {
					return ".$uid_class .scb-icon";
				},
			),
			'buttons' => array(
				'main' => function( $uid_class ) {
					return ".$uid_class";
				},
				'button' => function( $uid_class ) {
					return ".$uid_class .scb-button,.$uid_class .scb-button:visited";
				},
				'buttonHover' => function( $uid_class ) {
					return ".$uid_class .scb-button:hover";
				},
				'icon' => function( $uid_class ) {
					return ".$uid_class .scb-icon";
				},
			),
			'column' => array(
				'main' => function( $uid_class ) {
					return ".$uid_class";
				},
				'link' => function( $uid_class ) {
					return ".$uid_class a";
				},
				'linkHover' => function( $uid_class ) {
					return ".$uid_class a:hover";
				},
			),
			'columns' => array(
				'main' => function( $uid_class ) {
					return ".$uid_class";
				},
				'column' => function( $uid_class ) {
					return ".$uid_class > .scb-column";
				},
			),
			'container' => array(
				'main' => function( $uid_class ) {
					return ".$uid_class";
				},
				'mainStronger' => function( $uid_class ) {
					return ".scb-container.$uid_class";
				},
				'content' => function( $uid_class ) {
					return ".$uid_class > .scb-container-content";
				},
				'link' => function( $uid_class ) {
					return ".$uid_class a";
				},
				'linkHover' => function( $uid_class ) {
					return ".$uid_class a:hover";
				},
				'shapes' => function( $uid_class ) {
					return ".$uid_class > .scb-shapes";
				},
				'shape' => function( $uid_class, $shape_class ) {
					return ".$uid_class > .scb-shapes .$shape_class";
				},
				'shapeSvg' => function( $uid_class, $shape_class ) {
					return ".$uid_class > .scb-shapes .$shape_class";
				},
			),
			'heading' => array(
				'main' => function( $uid_class ) {
					return ".$uid_class";
				},
				'link' => function( $uid_class ) {
					return ".$uid_class a";
				},
				'linkHover' => function( $uid_class ) {
					return ".$uid_class a:hover";
				},
				'highlightText' => function( $uid_class ) {
					return ".$uid_class mark";
				},
				'icon' => function( $uid_class ) {
					return ".$uid_class .scb-icon";
				},
			),
			'grid' => array(
				'main' => function( $uid_class ) {
					return ".$uid_class";
				},
			),
		)
	);
}

