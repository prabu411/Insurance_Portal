// ── Fraud Detection Engine ─────────────────────────────────────────

/*
  Signals analyzed:
  1. Claim frequency  – too many claims in short window
  2. Location consistency – city matches registered city
  3. Time of claim – claims during non-working hours are suspicious
  4. Device motion – simulated accelerometer variance
  5. Duplicate detection – same event, same city, multiple accounts
*/

function analyzeFraud(worker, claim, allClaims) {
  let score = 0;
  const flags = [];

  // 1. Claim frequency check (>2 claims in 7 days)
  const recentClaims = allClaims.filter(c => {
    const diff = (Date.now() - new Date(c.triggeredAt)) / (1000 * 60 * 60 * 24);
    return c.workerId === worker.id && diff <= 7;
  });
  if (recentClaims.length > 2) {
    score += 35;
    flags.push('High claim frequency (>2 in 7 days)');
  }

  // 2. Location mismatch (simulated — 5% chance of mismatch)
  const locationMismatch = Math.random() < 0.05;
  if (locationMismatch) {
    score += 40;
    flags.push('GPS location inconsistent with registered city');
  }

  // 3. Off-hours claim (before 6am or after 11pm)
  const hour = new Date().getHours();
  if (hour < 6 || hour > 23) {
    score += 15;
    flags.push('Claim filed outside typical working hours');
  }

  // 4. Device motion variance (simulated)
  const motionVariance = Math.random();
  if (motionVariance < 0.08) {
    score += 25;
    flags.push('Low device motion — possible static GPS spoofing');
  }

  // 5. Duplicate event claim (same city + type within 1 hour)
  const dupClaim = allClaims.find(c =>
    c.id !== claim.id &&
    c.city === claim.city &&
    c.type === claim.type &&
    (Date.now() - new Date(c.triggeredAt)) < 3600000
  );
  if (dupClaim) {
    score += 10; // not penalized heavily — weather affects everyone
  }

  return {
    score: Math.min(100, score),
    flags,
    verdict: score >= 60 ? 'flagged' : score >= 30 ? 'review' : 'clean',
  };
}

function getFraudLabel(score) {
  if (score >= 60) return { label: '🚨 Flagged',     cls: 'tag-danger'  };
  if (score >= 30) return { label: '⚠️ Review',      cls: 'tag-warning' };
  return                { label: '✅ Clean',         cls: 'tag-success' };
}
