'use strict';

hexo.extend.filter.register('before_generate', function removeDefaultFollowLinks() {
  const follow = this.theme.config.follow;

  if (!follow) {
    return;
  }

  delete follow.facebook;
  delete follow.instagram;
});

hexo.extend.filter.register('after_render:html', function injectCustomStyle(html) {
  const root = this.config.root || '/';
  const normalizedRoot = root.endsWith('/') ? root : `${root}/`;
  const tag = `<link rel="stylesheet" href="${normalizedRoot}css/huhu-nav-fix.css">`;

  if (html.includes('huhu-nav-fix.css')) {
    return html;
  }

  return html.replace('</head>', `  ${tag}\n  </head>`);
});
