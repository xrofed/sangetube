export function formatDuration(rawDuration, options = {}) {
  if (rawDuration == null || rawDuration === '') return '';

  const { compact = false } = options;
  const input = String(rawDuration).trim();

  // ISO 8601 duration format, e.g. P0DT2H13M or PT45M30S
  const isoMatch = input.match(/^P(?:(\d+)D)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?)?$/i);
  if (isoMatch) {
    const days = Number(isoMatch[1] || 0);
    const hours = Number(isoMatch[2] || 0) + days * 24;
    const minutes = Number(isoMatch[3] || 0);
    const seconds = Number(isoMatch[4] || 0);

    return formatParts(hours, minutes, seconds, compact);
  }

  // HH:MM[:SS] format fallback
  const clockMatch = input.match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?$/);
  if (clockMatch) {
    const hours = Number(clockMatch[1] || 0);
    const minutes = Number(clockMatch[2] || 0);
    const seconds = Number(clockMatch[3] || 0);

    return formatParts(hours, minutes, seconds, compact);
  }

  return input;
}

function formatParts(hours, minutes, seconds, compact) {
  const roundedMinutes = minutes + (seconds >= 30 ? 1 : 0);
  const normalizedHours = hours + Math.floor(roundedMinutes / 60);
  const normalizedMinutes = roundedMinutes % 60;

  if (compact) {
    if (normalizedHours > 0) {
      return normalizedMinutes > 0 ? `${normalizedHours}j ${normalizedMinutes}m` : `${normalizedHours}j`;
    }
    if (normalizedMinutes > 0) return `${normalizedMinutes}m`;
    return seconds > 0 ? '1m' : '0m';
  }

  if (normalizedHours > 0) {
    return normalizedMinutes > 0
      ? `${normalizedHours} jam ${normalizedMinutes} menit`
      : `${normalizedHours} jam`;
  }

  if (normalizedMinutes > 0) return `${normalizedMinutes} menit`;
  return seconds > 0 ? '1 menit' : '0 menit';
}