const STORAGE_KEY = 'szdTheme';
type Theme = 'dark' | 'light';

const getStoredTheme = (): Theme => {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'light' ? 'light' : 'dark';
  } catch {
    return 'dark';
  }
};

const setStoredTheme = (theme: Theme) => {
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // Theme still applies for the current page even if storage is unavailable.
  }
};

const getTheme = (): Theme => (document.documentElement.dataset.theme === 'light' ? 'light' : 'dark');

const updateMetaThemeColor = (theme: Theme) => {
  const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
  if (meta) meta.content = theme === 'light' ? '#f4efe7' : '#050505';
};

const syncToggle = (button: HTMLButtonElement, theme: Theme) => {
  const darkLabel = button.dataset.themeDarkLabel ?? 'Night';
  const lightLabel = button.dataset.themeLightLabel ?? 'Day';
  const isDark = theme === 'dark';
  const label = isDark ? darkLabel : lightLabel;
  const next = isDark ? lightLabel.toLowerCase() : darkLabel.toLowerCase();

  button.setAttribute('aria-pressed', String(isDark));
  button.setAttribute('aria-label', `Switch to ${next} mode`);

  const labelNode = button.querySelector<HTMLElement>('[data-theme-toggle-label]');
  if (labelNode) labelNode.textContent = label;

  const iconNode = button.querySelector<HTMLElement>('[data-theme-toggle-icon]');
  if (iconNode) iconNode.textContent = isDark ? '☾' : '☀';
};

const applyTheme = (theme: Theme) => {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  updateMetaThemeColor(theme);
  document.querySelectorAll<HTMLButtonElement>('[data-theme-toggle]').forEach((button) => syncToggle(button, theme));
  window.dispatchEvent(new CustomEvent('szd:theme-change', { detail: { theme } }));
};

const initThemeToggle = () => {
  applyTheme(getStoredTheme());

  document.querySelectorAll<HTMLButtonElement>('[data-theme-toggle]').forEach((button) => {
    if (button.dataset.themeReady === 'true') return;
    button.dataset.themeReady = 'true';

    button.addEventListener('click', () => {
      const nextTheme: Theme = getTheme() === 'dark' ? 'light' : 'dark';
      setStoredTheme(nextTheme);
      applyTheme(nextTheme);
    });
  });
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initThemeToggle, { once: true });
} else {
  initThemeToggle();
}
