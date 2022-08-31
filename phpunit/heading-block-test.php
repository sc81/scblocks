<?php
namespace ScBlocks;

class HeadingBlockTest extends \WP_UnitTestCase {
	public function test_heading_block_render() {
		$heading = new Heading_Block();
		$block   = '<!-- wp:scblocks/heading {"uidClass":"scb-heading-1","text":"text"} /-->';
		$parsed  = parse_blocks( $block );

		$this->assertEquals( '', $heading->render( $parsed[0]['attrs'], '' ), 'should return content when the isDynamic attribute is not set' );

		$block    = '<!-- wp:scblocks/heading {"isDynamic":true,"uidClass":"scb-heading-1","text":"text"} /-->';
		$expected = '<h2 class="scb-heading scb-heading-1 scb-heading-text">text</h2>';
		$parsed   = parse_blocks( $block );

		$this->assertEquals( $expected, $heading->render( $parsed[0]['attrs'], '' ), 'should render HTML with the default tag' );

		$block    = '<!-- wp:scblocks/heading {"isDynamic":true,"uidClass":"scb-heading-1","text":"text","tagName":"p"} /-->';
		$expected = '<p class="scb-heading scb-heading-1 scb-heading-text">text</p>';
		$parsed   = parse_blocks( $block );

		$this->assertEquals( $expected, $heading->render( $parsed[0]['attrs'], '' ), 'should render HTML with the tag selected' );

		$block    = '<!-- wp:scblocks/heading {"isDynamic":true,"uidClass":"scb-heading-1","text":"text","htmlClass":"additional"} /-->';
		$expected = '<h2 class="scb-heading scb-heading-1 additional scb-heading-text">text</h2>';
		$parsed   = parse_blocks( $block );

		$this->assertEquals( $expected, $heading->render( $parsed[0]['attrs'], '' ), 'should add an extra class' );

		$block    = '<!-- wp:scblocks/heading {"isDynamic":true,"uidClass":"scb-heading-1","text":"text","htmlId":"id"} /-->';
		$expected = '<h2 class="scb-heading scb-heading-1 scb-heading-text" id="id">text</h2>';
		$parsed   = parse_blocks( $block );

		$this->assertEquals( $expected, $heading->render( $parsed[0]['attrs'], '' ), 'should render the HTML element id' );

	}
}
