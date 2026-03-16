// Suppress stale data warning from baseline-browser-mapping
// The env var check in the package has a bug, so we filter console.warn instead
var origWarn = console.warn;
console.warn = function() {
  if (typeof arguments[0] === 'string' && arguments[0].includes('[baseline-browser-mapping]')) {
    return;
  }
  return origWarn.apply(console, arguments);
};
