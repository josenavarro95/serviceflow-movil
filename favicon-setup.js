// Crear favicon SVG dinámicamente
function setupFavicon() {
  const svgString = `<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="grad4" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#A0633A;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#B8754A;stop-opacity:1" />
      </linearGradient>
    </defs>
    <rect width="512" height="512" fill="url(#grad4)"/>
    <circle cx="256" cy="220" r="100" fill="#FFFFFF"/>
    <circle cx="256" cy="220" r="95" fill="none" stroke="#A0633A" stroke-width="1" opacity="0.2"/>
    <text x="256" y="270" font-family="Georgia, serif" font-size="150" font-weight="bold" fill="#A0633A" text-anchor="middle">PR</text>
    <text x="256" y="410" font-family="Georgia, serif" font-size="38" font-weight="300" fill="#FFFFFF" text-anchor="middle" letter-spacing="5">PRAÍA</text>
  </svg>`;

  const blob = new Blob([svgString], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);

  // Eliminar favicon anterior si existe
  let link = document.querySelector("link[rel*='icon']");
  if (link) {
    link.remove();
  }

  // Crear nuevo favicon
  link = document.createElement('link');
  link.rel = 'icon';
  link.type = 'image/svg+xml';
  link.href = url;
  document.head.appendChild(link);
}

// Ejecutar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupFavicon);
} else {
  setupFavicon();
}
