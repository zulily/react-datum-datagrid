## [0.3.7](git+https://github.com/zulily/react-datum-datagrid.git/compare/0.3.6...0.3.7) (2018-04-25)


### New Features
* [380cbef](git+https://github.com/zulily/react-datum-datagrid.git/commit/380cbef68b1af99da98c3988007891f4d7cc8cfe)  add exportToCsv() api

### Other Commits
* [594698f](git+https://github.com/zulily/react-datum-datagrid.git/commit/594698fccfff1f8ba46996a970011b9cdff970e1) cells should be wrapped in an Rd.Model which provides a model context and response to changes in model
* [68f2f6e](git+https://github.com/zulily/react-datum-datagrid.git/commit/68f2f6e5b36a6eaeeb63fd3bff424d656878703c) should support legacy 'formatter' column def attribute
* [63813ec](git+https://github.com/zulily/react-datum-datagrid.git/commit/63813eca6f4571414888ffcc6a28ea79738820d1) add getCollection legacy api

## [0.3.6](git+https://github.com/zulily/react-datum-datagrid.git/compare/0.3.5...0.3.6) (2018-04-23)


### Other Commits
* [7dae654](git+https://github.com/zulily/react-datum-datagrid.git/commit/7dae654c4af4a60e3fd59db91d9193f2dabdad1f) update bumble-docs to latest. love you, babel

## [0.3.5](git+https://github.com/zulily/react-datum-datagrid.git/compare/0.3.4...0.3.5) (2018-04-22)


### Other Commits
* [607e0e0](git+https://github.com/zulily/react-datum-datagrid.git/commit/607e0e034dae8b3a14cdfae02124efbbc55d1705) upgrade to latest bumble-docs to mitigate ES2015 preset issue

## [0.3.4](git+https://github.com/zulily/react-datum-datagrid.git/compare/0.3.3...0.3.4) (2018-04-22)


### Other Commits
* [635ab80](git+https://github.com/zulily/react-datum-datagrid.git/commit/635ab8090455f29335c6622ffba2ca22f5f22730) update bumble-docs to latest. love you, babel

## [0.3.3](git+https://github.com/zulily/react-datum-datagrid.git/compare/0.3.2...0.3.3) (2018-04-22)


### Other Commits
* [1f8711f](git+https://github.com/zulily/react-datum-datagrid.git/commit/1f8711f84f337618376f6ff0c42e431db6a1fe6e) clean build
* [a8a7f58](git+https://github.com/zulily/react-datum-datagrid.git/commit/a8a7f5803fdea0e8fd8820974af0e92b4a4f3317) upgrade to latest bumble-strings and replace underscore.string

## [0.3.2](git+https://github.com/zulily/react-datum-datagrid.git/compare/0.3.1...0.3.2) (2018-04-21)


### Other Commits
* [be9e888](git+https://github.com/zulily/react-datum-datagrid.git/commit/be9e8883cb5f56246c8062001dae86785804b99a) fill in gaps with zuKeeper datagrid and make aliases for older react-data-grid column attrs like defaultFormatter (now defaultCellComponent) and header

## [0.3.1](git+https://github.com/zulily/react-datum-datagrid.git/compare/0.3.0...0.3.1) (2018-04-21)
The breaking change in 0.3.0 was this:

### Other Commits
* [71cdcc2](git+https://github.com/zulily/react-datum-datagrid.git/commit/71cdcc2be14799d6f74488b9e38acdd49df15de7) also update README with new requires syntax

## [0.3.0](git+https://github.com/zulily/react-datum-datagrid.git/compare/0.2.0...0.3.0) (2018-04-21)
Breaking Change!   

### Other Commits
* [d356b1b](git+https://github.com/zulily/react-datum-datagrid.git/commit/d356b1b78f0ca104bf0fed1e76d3ebfc82b5759e) also need to export cell and headerCell in package
* [2619013](git+https://github.com/zulily/react-datum-datagrid.git/commit/26190136a3bd5d60b2b641ba1cbcf57d3cf94232) ammend changelog

## [0.2.0](git+https://github.com/zulily/react-datum-datagrid.git/compare/0.1.1...0.2.0) (2018-04-21)
MVP release!  Includes:

- Inline editing
- Copy and Paste including to and from Excel or Sheets
- Sorting
- Full column select (click on header name); you can also paste a value after selecting


## [0.1.1](git+https://github.com/zulily/react-datum-datagrid.git/compare/0.1.0...0.1.1) (2018-04-16)
Initial WIP release

### Other Commits
* [9586625](git+https://github.com/zulily/react-datum-datagrid.git/commit/9586625ccf8446887ccb85d4197b7492ac827d89) updated changelog via atom:publish
* [53292db](git+https://github.com/zulily/react-datum-datagrid.git/commit/53292db0a33254b7f961cef19a2103ab429942fd) add real example to README.md
* [8fb8401](git+https://github.com/zulily/react-datum-datagrid.git/commit/8fb8401dabeba8ffdc5d5f5fc2a800a062c18207) remove '...' cell placeholders + simplify example
* [78feefc](git+https://github.com/zulily/react-datum-datagrid.git/commit/78feefc9336e7f877c1d38e2513eab71bea2b893) add constants for required cell margin
* [4bdd09b](git+https://github.com/zulily/react-datum-datagrid.git/commit/4bdd09b62731331fd5170783bc50a540e714be0c) focus rect should be fully visible on all data cells
* [228c4dd](git+https://github.com/zulily/react-datum-datagrid.git/commit/228c4dd212889c6ecfe3b3a284444027791688be) syncrhonized scrolling works nicely
* [1988769](git+https://github.com/zulily/react-datum-datagrid.git/commit/19887694aef02d644fff1a42a53591971255f736) remove all cell styling using inline styles; inline styles should only be used for structural and required layout, not things that the user should provide stying for like background colors and borders
* [1484dce](git+https://github.com/zulily/react-datum-datagrid.git/commit/1484dce52f70921866c1694d9dcce9449d42d8e8) LabelCell should really be named HeaderCell
* [4f2a218](git+https://github.com/zulily/react-datum-datagrid.git/commit/4f2a218e5b3f6d9cb3abcf5b05a62f1162cc912b) add RV AutoSizer; clean up inline styles
* [4009037](git+https://github.com/zulily/react-datum-datagrid.git/commit/4009037cf5aa7390bd5651332e1a4513f554f4f9) basic demo tweaks
* [86570d2](git+https://github.com/zulily/react-datum-datagrid.git/commit/86570d2d2b22f258088332972b83fc02e1673554) I'm tired of looking at kittens and besides, I'm really more of a dog person, so let's do puppies! New test data from petfinder API
* [55b7cf1](git+https://github.com/zulily/react-datum-datagrid.git/commit/55b7cf12ae1f856ceb746874cce82e41c308c274) make basicDatagrid.jsx example more interesting
* [d74b9b7](git+https://github.com/zulily/react-datum-datagrid.git/commit/d74b9b7f84182f06f514554a0ff87da2aba255e1) tis beginning to look like a datagrid!
* [b0d65cd](git+https://github.com/zulily/react-datum-datagrid.git/commit/b0d65cdd232ee206ba0cf8965d273923ba23b268) clean up refs to zukeeper specific stuff
* [f3fa07a](git+https://github.com/zulily/react-datum-datagrid.git/commit/f3fa07aeb7cbf4666efb3fdf3d50ae2eb68179a5) more more more. all components from zuKeeper present and accounted for
* [5cf89c8](git+https://github.com/zulily/react-datum-datagrid.git/commit/5cf89c8366b44c1c8e29a6d0e58a99c8856911dd) cell, editor and formatter components as from zuKeeper
* [be6d564](git+https://github.com/zulily/react-datum-datagrid.git/commit/be6d56409500fdea2f29a742630e497cc5dff820) API docs generating
* [81fc1dc](git+https://github.com/zulily/react-datum-datagrid.git/commit/81fc1dc5c7a5637bb848cbbf961f139d7e54b7fd) add dist/ lib/ and sr/
* [2c44e9e](git+https://github.com/zulily/react-datum-datagrid.git/commit/2c44e9ee074f968c906dc53a9c81c18b4b708399) give the build something to build
* [9731af5](git+https://github.com/zulily/react-datum-datagrid.git/commit/9731af564db9e8a22a9e30a6e636f5c9ab7db88d) initial build / setup theivery from react-datum

## [0.1.0](git+https://github.com/zulily/react-datum-datagrid.git/compare/0.0.0...0.1.0) (2018-04-16)
Initial WIP release
