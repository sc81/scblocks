<?php
namespace ScBlocks;

class IconsTest extends \WP_UnitTestCase {
	public static function wpSetUpBeforeClass() {
		add_action( 'wp_insert_post_data', array( __CLASS__, 'update_icons_data' ), 10, 2 );
	}
	public static function wpTearDownAfterClass() {
		remove_action( 'wp_insert_post_data', array( __CLASS__, 'update_icons_data' ), 10, 2 );
	}
	public static function update_icons_data( array $data, array $postarr ) {
		if ( wp_is_post_autosave( $postarr['ID'] ) ||
			wp_is_post_revision( $postarr['ID'] ) ||
			Icons::POST_TYPE_NAME === $data['post_type'] ) {
			return $data;
		}
		$blocks = parse_blocks( wp_unslash( $data['post_content'] ) );
		$icons  = new Icons();
		$icons->update_used_by_posts( $blocks );
		$data['post_content'] = wp_slash( serialize_blocks( $blocks ) );

		return $data;
	}
	public function test_saving_icons_data_into_db() {
		$content = '<!-- wp:scblocks/heading {"iconId":"1","iconName":"icon name","iconHtml":"svg"} /-->';
		wp_insert_post(
			array(
				'post_content' => $content,
			)
		);
		$used_icons_post_id = Plugin::option( Icons::USED_ICONS_POST_ID_OPTION_NAME );
		$this->assertNotEmpty( $used_icons_post_id, 'used_icons_post_id should not be empty' );

		$used_icons = Plugin::used_icons();
		$this->assertNotEmpty( $used_icons[1], 'icon should exists' );

		$this->assertEquals( 'svg', $used_icons[1] );

		$used_icons_post_content = '<!-- wp:scblocks/used-icon {"name":"icon name","id":"1"} -->svg<!-- /wp:scblocks/used-icon -->';
		$this->assertEquals( $used_icons_post_content, get_post( $used_icons_post_id )->post_content, 'there should only be one icon' );

		$content2 = '<!-- wp:scblocks/heading {"iconId":"1","iconName":"icon name","iconHtml":"svg"} /-->';
		wp_insert_post(
			array(
				'post_content' => $content2,
			)
		);
		$this->assertEquals( $used_icons_post_content, get_post( $used_icons_post_id )->post_content, 'it should not duplicate the icon' );

		$content3 = '<!-- wp:scblocks/heading {"iconId":"2","iconName":"icon name2","iconHtml":"svg2"} /-->';
		wp_insert_post(
			array(
				'post_content' => $content3,
			)
		);
		$used_icons_post_content = '<!-- wp:scblocks/used-icon {"name":"icon name","id":"1"} -->svg<!-- /wp:scblocks/used-icon --><!-- wp:scblocks/used-icon {"name":"icon name2","id":"2"} -->svg2<!-- /wp:scblocks/used-icon -->';
		$this->assertEquals( $used_icons_post_content, get_post( $used_icons_post_id )->post_content, 'it should have two icons' );
	}

	public function test_remove_icon_redundant_attrs() {
		$content  = '<!-- wp:scblocks/heading {"iconId":"1","iconName":"icon name","iconHtml":"svg"} /-->';
		$expected = '<!-- wp:scblocks/heading {"iconId":"1"} /-->';

		$blocks = parse_blocks( $content );
		( new Icons() )->remove_redundant_attrs( $blocks );
		$actual = serialize_blocks( $blocks );

		$this->assertEquals( $expected, $actual );
	}
}
