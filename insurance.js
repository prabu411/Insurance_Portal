// ── Insurance Engine ──────────────────────────────────────────────

const ZONES = {
  mumbai:    { name: 'Mumbai',    riskScore: 85, basePremium: 25, floodRisk: 'High',   aqiRisk: 'Medium' },
  delhi:     { name: 'Delhi',     riskScore: 78, basePremium: 22, floodRisk: 'Medium', aqiRisk: 'High'   },
  bangalore: { name: 'Bangalore', riskScore: 45, basePremium: 12, floodRisk: 'Low',    aqiRisk: 'Low'    },
  chennai:   { name: 'Chennai',   riskScore: 70, basePremium: 18, floodRisk: 'High',   aqiRisk: 'Low'    },
  hyderabad: { name: 'Hyderabad', riskScore: 55, basePremium: 14, floodRisk: 'Medium', aqiRisk: 'Medium' },
  pune:      { name: 'Pune',      riskScore: 50, basePremium: 13, floodRisk: 'Medium', aqiRisk: 'Low'    },
};

const PAYOUT_TABLE = {
  rain:  { threshold: 50,  payout: 300, unit: 'mm',  label: 'Heavy Rainfall' },
  aqi:   { threshold: 200, payout: 250, unit: 'AQI', label: 'Poor Air Quality' },
  flood: { threshold: 1,   payout: 500, unit: 'alert',label: 'Flood Alert'    },
};

function calcPremium(city, hoursPerWeek) {
  const zone = ZONES[city] || ZONES.bangalore;
  const hoursFactor = hoursPerWeek >= 50 ? 1.3 : hoursPerWeek >= 35 ? 1.1 : 1.0;
  return Math.round(zone.basePremium * hoursFactor);
}

function calcRiskScore(city, hoursPerWeek) {
  const zone = ZONES[city] || ZONES.bangalore;
  const hoursBonus = hoursPerWeek >= 50 ? 10 : hoursPerWeek >= 35 ? 5 : 0;
  return Math.min(100, zone.riskScore + hoursBonus);
}

function getRiskLabel(score) {
  if (score >= 70) return { label: 'High Risk',    cls: 'tag-danger',  barCls: 'risk-high'   };
  if (score >= 45) return { label: 'Medium Risk',  cls: 'tag-warning', barCls: 'risk-medium' };
  return              { label: 'Low Risk',     cls: 'tag-success', barCls: 'risk-low'    };
}

function generatePolicyId() {
  return 'GW-' + Date.now().toString(36).toUpperCase();
}

// ── State ──────────────────────────────────────────────────────────
const InsuranceState = {
  workers: JSON.parse(localStorage.getItem('gw_workers') || '[]'),
  claims:  JSON.parse(localStorage.getItem('gw_claims')  || '[]'),

  save() {
    localStorage.setItem('gw_workers', JSON.stringify(this.workers));
    localStorage.setItem('gw_claims',  JSON.stringify(this.claims));
  },

  addWorker(data) {
    const city = data.city;
    const zone = ZONES[city] || ZONES.bangalore;
    const riskScore = calcRiskScore(city, data.hoursPerWeek);
    const premium   = calcPremium(city, data.hoursPerWeek);
    const risk      = getRiskLabel(riskScore);

    const worker = {
      id:           generatePolicyId(),
      name:         data.name,
      phone:        data.phone,
      city,
      platform:     data.platform,
      hoursPerWeek: data.hoursPerWeek,
      riskScore,
      premium,
      riskLabel:    risk.label,
      riskCls:      risk.cls,
      barCls:       risk.barCls,
      zone:         zone.name,
      status:       'active',
      joinedAt:     new Date().toISOString(),
      balance:      0,
      totalPaid:    premium,
      claimsCount:  0,
    };
    this.workers.push(worker);
    this.save();
    return worker;
  },

  addClaim(workerId, type, weatherData) {
    const worker = this.workers.find(w => w.id === workerId);
    if (!worker) return null;
    const trigger = PAYOUT_TABLE[type];
    const claim = {
      id:        'CLM-' + Date.now().toString(36).toUpperCase(),
      workerId,
      workerName: worker.name,
      city:       worker.city,
      type,
      label:      trigger.label,
      payout:     trigger.payout,
      status:     'processing',
      triggeredAt: new Date().toISOString(),
      weatherData,
      fraudScore: 0,
    };
    this.claims.push(claim);
    worker.claimsCount++;
    this.save();
    return claim;
  },

  approveClaim(claimId) {
    const claim = this.claims.find(c => c.id === claimId);
    if (!claim) return;
    claim.status = 'paid';
    claim.paidAt = new Date().toISOString();
    const worker = this.workers.find(w => w.id === claim.workerId);
    if (worker) { worker.balance += claim.payout; this.save(); }
    return claim;
  },

  flagClaim(claimId, score) {
    const claim = this.claims.find(c => c.id === claimId);
    if (!claim) return;
    claim.status = 'flagged';
    claim.fraudScore = score;
    this.save();
    return claim;
  },
};
