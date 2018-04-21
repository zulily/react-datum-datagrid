## [0.2.0](git+https://github.com/zulily/react-datum-datagrid.git/compare/0.1.1...0.2.0) (2018-04-21)
MVP release!  Includes:

### Other Commits
* [25234cd](git+https://github.com/zulily/react-datum-datagrid.git/commit/25234cd23bb980e99bc8d271fa4662496a079558) another example of sorting using the collection onDatagridSort method
* [c27b977](git+https://github.com/zulily/react-datum-datagrid.git/commit/c27b9772bb659ef85860497175c270abbd24db18) self sorting works + demo
* [9fef4ca](git+https://github.com/zulily/react-datum-datagrid.git/commit/9fef4ca0344cd2ba43fa0485dfd35aee57804e91) select all column and paste now works on 3000 without breaking a sweat
* [9ed868b](git+https://github.com/zulily/react-datum-datagrid.git/commit/9ed868bcd6ee55c9e4910e5cf006fcac80b9205a) single value into multiple selected cells should work
* [cb96518](git+https://github.com/zulily/react-datum-datagrid.git/commit/cb96518fed25a85537ab7bf4fb8e75f762eba586) paste works and shows cell indicators
* [bf7d45b](git+https://github.com/zulily/react-datum-datagrid.git/commit/bf7d45b81eb7fb41112c4696d230756fff5adf6c) remove extra columns from editing example
* [d70779e](git+https://github.com/zulily/react-datum-datagrid.git/commit/d70779ebf1ddeb7210e7c0db6cabf77b3bc72c81) fix bug causing wrong cell to flash on save success
* [a100242](git+https://github.com/zulily/react-datum-datagrid.git/commit/a1002422328cc6ae21ce86c9d95e60a2efb9a2a7) tab and enter when editing should save and goto adjacent cell; esc should cancel editing
* [cb716d8](git+https://github.com/zulily/react-datum-datagrid.git/commit/cb716d83084e76de49b2b100ccfb0eaf7d3298ad) scripts/publishDocs.sh should rebuild on switching back to master
* [0ab76d8](git+https://github.com/zulily/react-datum-datagrid.git/commit/0ab76d871c7eae41e4a5ad22f11406b83ed07db8) clean build
* [c57251d](git+https://github.com/zulily/react-datum-datagrid.git/commit/c57251d234042b38b580308bdb7daec931ae9732) change timeout on saved indicator showing to match animation css
* [437bf59](git+https://github.com/zulily/react-datum-datagrid.git/commit/437bf59803f8d7ffc8d11fba56655236e836ed47) update scripts/publishDocs.sh to add new files in docs/ dir
* [a11a2b7](git+https://github.com/zulily/react-datum-datagrid.git/commit/a11a2b750f3d0fa42d7182b7901f7314588be10a) update description of react-virtualized demo
* [75c31c1](git+https://github.com/zulily/react-datum-datagrid.git/commit/75c31c13fd9271270a25f85e7583675f4be1f007) add missing files from last commit
* [1474fc0](git+https://github.com/zulily/react-datum-datagrid.git/commit/1474fc041997a1b30fc6217cd732654286928075) basic cell editing works as in product prep
* [97aa864](git+https://github.com/zulily/react-datum-datagrid.git/commit/97aa864dca1517619003481d4db63cf2986bbe2a) add example to show issue with react-virtualized
* [0aed2ee](git+https://github.com/zulily/react-datum-datagrid.git/commit/0aed2eeb2dfe3a448a7def9b2d7b4d077294b102) remove dependencies on jQuery - add polyfills for older browser support
* [94adf92](git+https://github.com/zulily/react-datum-datagrid.git/commit/94adf92e880b1b81cccd889e8ec4fedd173797a9) copy to clipboard from datagrid to excel works beautifully
* [c0ebafb](git+https://github.com/zulily/react-datum-datagrid.git/commit/c0ebafb390d695e966dc5b309f09180367cf2a76) more flex layout
* [2c024b3](git+https://github.com/zulily/react-datum-datagrid.git/commit/2c024b35548d297498233f19ad0f83a77448f14d) add scripts/publishDocs.sh to push docs to gh-pages
* [0361f67](git+https://github.com/zulily/react-datum-datagrid.git/commit/0361f67ef0e9ed6c1cc46cb87ebcd4e5f197e5a5) keyboard cell select should scroll last selected cell into view
* [e2d7e4b](git+https://github.com/zulily/react-datum-datagrid.git/commit/e2d7e4bfa658bcd42a65062e2991196fd77dd9ec) keyboard cell selection works
* [aa7379b](git+https://github.com/zulily/react-datum-datagrid.git/commit/aa7379b0efd4073c1e6b126d46d4e5ccef1dc47c) cell selection works beautifully!
* [7c40546](git+https://github.com/zulily/react-datum-datagrid.git/commit/7c405462035fef97864237a412c3d7624d57bf3c) remove tab and focus rect from cells; remove margins between cell wrappers that cause deadspace in the grid
* [4fd5a06](git+https://github.com/zulily/react-datum-datagrid.git/commit/4fd5a062732460b9fab8b8f2b60e29d981bb7475) used scoped (rdd-...) className for cell selected and placeholder states
* [9d762eb](git+https://github.com/zulily/react-datum-datagrid.git/commit/9d762eb4c46cda9bdf7dc0b1007f8589ece0fc5a) WIP: grid selection almost working
* [5f154a4](git+https://github.com/zulily/react-datum-datagrid.git/commit/5f154a42e008de140366ea8ddcbafa6c8d7c5c70) add example of editable data grid + fix regression in scrolling
* [f4971ee](git+https://github.com/zulily/react-datum-datagrid.git/commit/f4971ee0cbd933b30474f6b4583567fdd14fae38) add real thumbnail for basic demo
* [7a6fbe3](git+https://github.com/zulily/react-datum-datagrid.git/commit/7a6fbe3e3f11e1147a97091ac0b576f13a78b644) add real thumbnail for basic demo
* [57572df](git+https://github.com/zulily/react-datum-datagrid.git/commit/57572df2d4d41d49e592df9a68783583705a6e62) break scrolling methods out of datagrid main source and move to mixin
* [7cb9e87](git+https://github.com/zulily/react-datum-datagrid.git/commit/7cb9e8764d56a5b8020b1ac1ec32248398916871) move cellWrapper, gridEdit, gridSelect to helpers dir, base src/ should only have components exported by the package
* [bcc852c](git+https://github.com/zulily/react-datum-datagrid.git/commit/bcc852c1a1cc75bb5928ac129060cd964275132b) correct language tag in README.md
* [60c524a](git+https://github.com/zulily/react-datum-datagrid.git/commit/60c524ace421074c80261e8ad646e6dde7754fb3) add webpackStats.json to gitignore
* [7635da3](git+https://github.com/zulily/react-datum-datagrid.git/commit/7635da3a9b00092dac9f8795f675263400261406) remove webpackStats.json from git
* [f5f8adc](git+https://github.com/zulily/react-datum-datagrid.git/commit/f5f8adc39eeda9f3a886210dd7e601148652b57e) upgrade packages to appease the github nanny bot
* [3df72ab](git+https://github.com/zulily/react-datum-datagrid.git/commit/3df72ab0f7d60cdde9bce4074603c38e7a6d3714) readme tweaks

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
