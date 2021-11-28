<?php
namespace ScBlocks;

class HeadingBlockTest extends \WP_UnitTestCase {
	public function test_heading_block_render() {
		$heading = new Heading_Block();

		$block    = '<!-- wp:scblocks/heading {"uidClass":"scb-heading-1","text":"text"} /-->';
		$expected = '<h2 class="scb-heading scb-heading-1 scb-heading-text">text</h2>';
		$parsed   = parse_blocks( $block );

		$this->assertEquals( $expected, $heading->render( $parsed[0]['attrs'], '' ), 'should render HTML with the default tag' );

		$block    = '<!-- wp:scblocks/heading {"uidClass":"scb-heading-1","text":"text","tagName":"p"} /-->';
		$expected = '<p class="scb-heading scb-heading-1 scb-heading-text">text</p>';
		$parsed   = parse_blocks( $block );

		$this->assertEquals( $expected, $heading->render( $parsed[0]['attrs'], '' ), 'should render HTML with the tag selected' );

		$block    = '<!-- wp:scblocks/heading {"uidClass":"scb-heading-1","text":"text","htmlClass":"additional"} /-->';
		$expected = '<h2 class="scb-heading scb-heading-1 additional scb-heading-text">text</h2>';
		$parsed   = parse_blocks( $block );

		$this->assertEquals( $expected, $heading->render( $parsed[0]['attrs'], '' ), 'should add an extra class' );

		$block    = '<!-- wp:scblocks/heading {"uidClass":"scb-heading-1","text":"text","htmlId":"id"} /-->';
		$expected = '<h2 class="scb-heading scb-heading-1 scb-heading-text" id="id">text</h2>';
		$parsed   = parse_blocks( $block );

		$this->assertEquals( $expected, $heading->render( $parsed[0]['attrs'], '' ), 'should render the HTML element id' );

		$block     = '<!-- wp:scblocks/heading {"uidClass":"scb-heading-1","text":"text","tagName":"h2","iconId":"1"} /-->';
		$expected  = '<h2 class="scb-heading scb-heading-1"><span class="scb-icon">svg</span><span class="scb-heading-text">text</span></h2>';
		$parsed    = parse_blocks( $block );
		$used_icon = '<!-- wp:scblocks/used-icon {"name":"name","id":"1"} -->svg<!-- /wp:scblocks/used-icon -->';
		$id        = wp_insert_post(
			array(
				'post_type'    => Icons::POST_TYPE_NAME,
				'post_content' => $used_icon,
				'post_title'   => 'used icons',
			)
		);

		$options = Plugin::options();
		$options[ Icons::USED_ICONS_POST_ID_OPTION_NAME ] = $id;
		$options = Plugin::update_options( $options );

		$this->assertEquals( $expected, $heading->render( $parsed[0]['attrs'], '' ), 'should render HTML with the icon' );

	}
}
