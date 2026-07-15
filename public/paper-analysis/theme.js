(() => {
  const storageKey = 'theme';
  const root = document.documentElement;

  const normalizeTheme = (theme) => (theme === 'light' || theme === 'dark' ? theme : null);

  const getStoredTheme = () => {
    try {
      return normalizeTheme(localStorage.getItem(storageKey));
    } catch {
      return null;
    }
  };

  const getTheme = () => getStoredTheme() ?? 'dark';

  const syncButton = (theme) => {
    const button = document.querySelector('[data-paper-theme-toggle]');
    if (!button) return;

    const isLight = theme === 'light';
    const label = isLight ? '切换到夜间模式' : '切换到日间模式';
    const icon = button.querySelector('.paper-theme-toggle__icon');

    button.setAttribute('aria-label', label);
    button.setAttribute('title', label);
    button.setAttribute('aria-pressed', String(isLight));
    if (icon) icon.textContent = isLight ? '☼' : '☾';
  };

  const applyTheme = (theme, persist = false) => {
    root.dataset.theme = theme;
    root.style.colorScheme = theme;
    syncButton(theme);

    if (!persist) return;

    try {
      localStorage.setItem(storageKey, theme);
    } catch {
      // The in-page switch still works when storage is unavailable.
    }
  };

  const mountToggle = () => {
    if (document.querySelector('[data-paper-theme-toggle]')) return;

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'paper-theme-toggle';
    button.dataset.paperThemeToggle = '';
    button.innerHTML = '<span class="paper-theme-toggle__icon" aria-hidden="true"></span>';
    button.addEventListener('click', () => {
      const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme, true);
    });

    const toolbar = document.querySelector('.topbar-actions');
    if (toolbar) {
      toolbar.prepend(button);
    } else {
      document.body.append(button);
    }

    syncButton(root.dataset.theme);
  };

  applyTheme(getTheme());

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountToggle, { once: true });
  } else {
    mountToggle();
  }

  window.addEventListener('storage', (event) => {
    if (event.key === storageKey) applyTheme(getTheme());
  });
})();
