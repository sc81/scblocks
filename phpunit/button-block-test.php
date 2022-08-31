<?php
namespace ScBlocks;

class ButtonBlockTest extends \WP_UnitTestCase {
	public function test_button_block_render() {
		$button = new Button_Block();
		$block  = '<!-- wp:scblocks/button {"uidClass":"scb-button-1","text":"text"} /-->';
		$parsed = parse_blocks( $block );

		$this->assertEquals( '', $button->render( $parsed[0]['attrs'], '' ), 'should return content when the isDynamic attribute is not set' );

		$block    = '<!-- wp:scblocks/button {"isDynamic":true,"uidClass":"scb-button-1","text":"text"} /-->';
		$expected = '<span class="scb-button scb-button-1 scb-button-text">text</span>';
		$parsed   = parse_blocks( $block );

		$this->assertEquals( $expected, $button->render( $parsed[0]['attrs'], '' ), 'should render HTML with the span tag' );

		$block    = '<!-- wp:scblocks/button {"isDynamic":true,"uidClass":"scb-button-1","text":"text","url":"url"} /-->';
		$expected = '<a class="scb-button scb-button-1 scb-button-text" href="url">text</a>';
		$parsed   = parse_blocks( $block );

		$this->assertEquals( $expected, $button->render( $parsed[0]['attrs'], '' ), 'should render HTML with the a tag' );

		$block    = '<!-- wp:scblocks/button {"isDynamic":true,"uidClass":"scb-button-1","text":"text","url":"url","target":true} /-->';
		$expected = '<a class="scb-button scb-button-1 scb-button-text" href="url" target="_blank" rel="noopener noreferrer">text</a>';
		$parsed   = parse_blocks( $block );

		$this->assertEquals( $expected, $button->render( $parsed[0]['attrs'], '' ), 'should render HTML with the target attribute' );

		$block    = '<!-- wp:scblocks/button {"isDynamic":true,"uidClass":"scb-button-1","text":"text","url":"url","htmlId":"id"} /-->';
		$expected = '<a class="scb-button scb-button-1 scb-button-text" id="id" href="url">text</a>';
		$parsed   = parse_blocks( $block );

		$this->assertEquals( $expected, $button->render( $parsed[0]['attrs'], '' ), 'should render HTML with the id attribute' );

		$block    = '<!-- wp:scblocks/button {"isDynamic":true,"uidClass":"scb-button-1","text":"text","url":"url","htmlClass":"additional"} /-->';
		$expected = '<a class="scb-button scb-button-1 additional scb-button-text" href="url">text</a>';
		$parsed   = parse_blocks( $block );

		$this->assertEquals( $expected, $button->render( $parsed[0]['attrs'], '' ), 'should add an extra class' );

		$block    = '<!-- wp:scblocks/button {"isDynamic":true,"uidClass":"scb-button-1","text":"text","url":"url","icon":"1","withoutText":true} /-->';
		$expected = '<a class="scb-button scb-button-1" href="url"><span class="scb-icon">svg</span></a>';
		$parsed   = parse_blocks( $block );

		$this->assertEquals( $expected, $button->render( $parsed[0]['attrs'], '' ), 'should not display text' );
	}
}
