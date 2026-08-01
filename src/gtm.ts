type DataLayerEvent = Record<string, unknown>;

declare global {
  interface Window {
    dataLayer: DataLayerEvent[];
    __geminiGtmRouteTrackerInitialized?: boolean;
  }
}

function getLocationKey(location: Location) {
  return `${location.pathname}${location.search}`;
}

function pushVirtualPageView() {
  const location = window.location;
  const eventPayload: DataLayerEvent = {
    event: 'virtual_page_view',
    page_path: `${location.pathname}${location.search}`,
    page_location: location.href,
    page_title: document.title,
  };

  if (!window.dataLayer) {
    window.dataLayer = [];
  }

  window.dataLayer.push(eventPayload);
}

export function initializeGtmRouteTracking() {
  if (window.__geminiGtmRouteTrackerInitialized) {
    return;
  }

  window.__geminiGtmRouteTrackerInitialized = true;

  let lastTrackedPath = getLocationKey(window.location);

  const trackRouteChange = () => {
    const currentPath = getLocationKey(window.location);
    if (currentPath === lastTrackedPath) {
      return;
    }

    lastTrackedPath = currentPath;
    pushVirtualPageView();
  };

  const originalPushState = window.history.pushState;
  const originalReplaceState = window.history.replaceState;

  window.history.pushState = function patchedPushState(this: History, ...args: Parameters<History['pushState']>) {
    const result = originalPushState.apply(this, args);
    queueMicrotask(trackRouteChange);
    return result;
  } as typeof window.history.pushState;

  window.history.replaceState = function patchedReplaceState(this: History, ...args: Parameters<History['replaceState']>) {
    const result = originalReplaceState.apply(this, args);
    queueMicrotask(trackRouteChange);
    return result;
  } as typeof window.history.replaceState;

  window.addEventListener('popstate', trackRouteChange, { passive: true });

  pushVirtualPageView();
}
