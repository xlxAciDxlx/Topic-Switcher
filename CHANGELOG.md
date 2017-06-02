# Changelog
## v1.2.4
- Changed the default animation from a grow effect, to a slide left effect
- Fixed a bug where a blank file would add 4 blank topic containers
- Fixed a bug where a blank file being opened would still hide the file selector
- Fixed a bug where the file selector wouldn't be hidden after the first topic was shown
- Slightly tweaked some CSS rules for better styling

## v1.2.3
- Changed a small stylesheet rule to prevent odd sizing of the last topic in the list
- Fixed a bug where the last and only topic can be hidden
- Changed the CSS so that the last child will have a standard cursor, not the pointer as no actions can be taken
- Scrollbars should no longer appear if the content area is too small in width or height

## v1.2.2
- Changed the default behavior of the switcher to hide other topics
- Changed default font from *Raleway* to *Lato*
- Slight organization to `index.html`
- Removed some debug code as it shouldn't (hopefully) be needed anymore
- Added some default CSS rules incase people want to add actual content aside from topics to the display

## v1.2.1
- Derp, renamed `app/css/styles.css` to `app/css/style.css`

## v1.2.0
- Refactored a majority of the switcher JavaScript
- Added the ability to simply select a file that has your topics in it rather than having to edit JavaScript
- Added better Getting Started instructions
- Added a Feedback section to `README.md`
- Added a section to `README.md` explaining how to capture the topic list in OBS. XSplit instructions will be added eventually
- Moved CSS into it's own file, rather than in `index.html`
- Moved JS and CSS into their own assets directory

## v1.0.0
Initial Release