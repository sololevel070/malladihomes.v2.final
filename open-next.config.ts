// Plain config — no import needed. defineCloudflareConfig is a type-only helper
// that returns its argument unchanged. This avoids a build-time module resolution
// error when @opennextjs/cloudflare is installed via npx (not in node_modules).
export default {};
