// Favicon setup
(function() {
  const svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180"><rect fill="#1A1410" width="180" height="180"/><text x="90" y="110" font-size="100" font-weight="bold" fill="white" text-anchor="middle">P</text></svg>';
  const link = document.createElement('link');
  link.rel = 'icon';
  link.type = 'image/svg+xml';
  link.href = 'data:image/svg+xml,' + encodeURIComponent(svg);
  document.head.appendChild(link);
})();
