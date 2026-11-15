export interface PageMeta {
  // The folder name, which is also the page's own bundle: <name>.lynx.bundle.
  name: string;
  title: string;
  platform: 'Android' | 'iOS' | 'Android and iOS' | 'HarmonyOS';
  summary: string;
  // The Lynx issue number, once filed.
  issue?: number;
}
