=== ScBlocks - Page Builder Gutenberg Blocks ===
Contributors: sc81
Donate link: https://sc81.github.io/scblocks
Tags: page builder, blocks, gutenberg, WordPress blocks, container
Requires at least: 5.5
Tested up to: 5.6
Stable tag: 1.2.0
Requires PHP: 7.0
License: GPL-2.0
License URI: http://www.gnu.org/licenses/gpl-2.0.html

A collection of Gutenberg Blocks that help you build WordPress sites.

== Description ==

https://www.youtube.com/watch?v=W0eIGbPa0TQ

ScBlocks is a collection of advanced and powerful blocks. This plugin provides multiple options for each block so you can easily change the styles, attributes, and contents of the blocks. With this plugin, you can create any kind of layout with beautiful content.

= Container =

This is the base block that allows you to organize your content into sections.

= Columns =

Build any layout by using flexible columns.

= Heading =

Create headlines with advanced typography.

= Buttons =

Prompt visitors to take action with a beautiful buttons.

= Source files =

[github](https://github.com/sc81/scblocks)

== Installation ==

There's two ways to install ScBlocks.

1. Go to "Plugins > Add New" in your Dashboard and search for: ScBlocks
2. Download the .zip from WordPress.org, and upload the folder to the `/wp-content/plugins/` directory via FTP.

In most cases, #1 will work fine and is way easier.

== Changelog ==

= 1.2.0 =
* New: Shape dividers in the Container block
* New: Filter default css for all blocks
* New: Build the Container Block on the server side
* New: Build the Columns Block on the server side
* New: Build the Column Block on the server side
* New: Build the Buttons Block on the server side
* Fix: Prevent infinite reconstruction of blocks in a reusable block
* Fix: After selecting from the icon library, there is no HTML for Dashicon
* Fix: Too narrow box-shadow popover
* Minor fixes
* Tweak: Do not store reusable block ids in the database
* Tweak: Always inline CSS on AMP pages
* Tweak: Move the blocks to the top of the inserter
* Tweak: Update DOMPurify
* Tweak: Update @wordpress/scripts
* Tweak: Update immer

= 1.1.1 =
* Fix: ButtonBlockAppender in column

= 1.1.0 =
* New: Use apiVersion 2
* New: Dynamically generate default css for blocks
* New: Distribute editor scripts as modules
* Tweak: Remove scblocks-select-control class from typography controls
* Fix: Use ToolbarGroup instead of Toolbar
* Fix: Icon style in Icon Library

= 1.0 =
* Initial release
