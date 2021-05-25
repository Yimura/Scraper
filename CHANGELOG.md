# Yimura/Scraper Changelog

## Versioning Policy

Following:
**major.minor.patch**

* **major** is almost never used unless major breaking changes were pushed or a complete rewrite happened of the code
* **minor** used whenever a single file was rewritten or significant change happened
* **patch** may only be bumped after a bug was resolved as whole

## 2021-05-25, Version 1.2.2, @GeopJr

 * fix(idToThumbnail): always use maxres, thanks @GeopJr

## 2021-03-25, Version 1.2.1, @omarkhatibco

### Changes

 * fixed TypeScript annotations, thanks @omarkhatibco

## 2021-03-25, Version 1.2.0, @Lioness100

### Changes

 * Added typings, thanks @Lioness100

## 2021-02-19, Version 1.1.0, @Yimura

### Changes

 * Fixed an issue with verified channel states where it would only check for verified artist but not verified channel.
 * Added support for channel search.
 * Fixed typo's in README

## 2021-02-15, Version 1.0.0, @Yimura

### Changes

 * Updated Constants with pre-decoded SearchTypes, this to prevent problems where URLSearchParams would encode the value again.
 * The Constants are accessible and export in the index if you needed these for some reason.
 * YT Scraper has been updated and support has been added for the following search types:
   * any
   * live
   * movie
   * playlist
   * video
 * Tests have been updated for the new functionalities
 * README includes an entire response object of possible results

## 2020-12-16, Version 0.2.3, @Yimura

### Changes

 * Fixed an edge case were data from YouTube would be incorrectly parsed.

## 2020-11-25, Version 0.2.2, @Yimura

### Changes

 * Fixed a change in the YouTube webpage preventing from parsing a valid result

## 2020-10-28, Version 0.2.1, @Yimura

### Changes

 * Updated README

## 2020-10-28, Version 0.2.0, @Yimura

### Changes

 * Added a language option
 * Added a limit option
 * Fixed #2
 * Made testing more in-depth of features
 * Updated README to showcase the options

## 2020-10-27, Version 0.1.0, @Yimura

### Changes

 * Initial Beta Release
