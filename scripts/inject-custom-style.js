'use strict';

hexo.extend.filter.register('before_generate', function removeDefaultFollowLinks() {
  const follow = this.theme.config.follow;

  if (!follow) {
    return;
  }

  delete follow.facebook;
  delete follow.instagram;
});

hexo.extend.filter.register('after_render:html', function customizeRenderedHtml(html) {
  const root = this.config.root || '/';
  const normalizedRoot = root.endsWith('/') ? root : `${root}/`;
  const customStyleHref = `${normalizedRoot}css/huhu-nav-fix.css`;
  const tag = `<link rel="stylesheet" href="${customStyleHref}">`;
  const avatar = this.theme.config.avatar || '/images/avatar.jpg';
  const avatarHref = normalizeAssetPath(avatar, normalizedRoot);
  const favicon = this.theme.config.favicon || avatar;
  const faviconHref = normalizeAssetPath(favicon, normalizedRoot);

  let result = html;

  if (!result.includes('huhu-nav-fix.css')) {
    result = result.replace('</head>', `  ${tag}\n  </head>`);
  }

  return result
    .replace(
      /<link rel="shortcut icon" href="\/images\/[^"]+" type="image\/x-icon" \/>/,
      `<link rel="icon" href="${faviconHref}" type="image/jpeg" />`
    )
    .replace(/href="\/" class="logo"/g, `href="${normalizedRoot}" class="logo"`)
    .replace(/url\('\/images\/logo\.jpeg'\)/g, `url('${avatarHref}')`)
    .replace(/src="\/images\/logo\.jpeg"/g, `src="${avatarHref}"`);
});

function normalizeAssetPath(path, root) {
  if (/^(https?:)?\/\//.test(path) || path.startsWith('data:')) {
    return path;
  }

  return `${root}${path.replace(/^\/+/, '')}`;
}
