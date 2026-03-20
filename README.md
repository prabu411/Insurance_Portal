# 🛡️ GigShield — AI-Powered Parametric Insurance for Gig Workers

> Automatic payouts when weather disruptions stop you from working. No claim forms. No waiting.

![GigShield](https://img.shields.io/badge/Status-Prototype-6c63ff?style=for-the-badge)
![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

---

## 📌 Problem Statement

Gig economy delivery partners (Swiggy, Zomato, Zepto, Blinkit) lose **20–30% of their weekly income** due to weather disruptions like heavy rain, floods, and poor air quality. There is currently no financial safety net protecting their income.

---

## ⚡ Live Demo

Open `index.html` directly in your browser — no server or build step required.

Or deploy instantly via **GitHub Pages**:
> Settings → Pages → Deploy from `main` branch → root `/`

---

## 🔄 Application Flow

```
Register → AI Risk Profile → Policy Activated → Disruption Detected → Fraud Check → Auto Payout
```

1. Worker registers with name, city, platform, and weekly hours
2. AI calculates risk score and dynamic weekly premium
3. Policy activates instantly
4. Weather engine monitors city 24/7
5. Claim triggers automatically when threshold is crossed
6. Fraud detection runs in background
7. Payout credited within 2 minutes

---

## ⚙️ Features

### 👤 Worker Dashboard
- Live weather widget with real-time conditions
- Simulate disruptions (rain / AQI / flood / random)
- Claims history with fraud scores
- 7-day rainfall bar chart
- Activity log with full claim pipeline trace
- Wallet balance tracking

### 🖥️ Admin Panel
- Platform-wide stats (workers, claims, payouts, premiums)
- Workers table with risk profiles
- Claims table with fraud score visualization and status filter
- Fraud monitor with detection metrics
- City weather grid (all 6 cities)
- Demo data seeder with 12 Indian worker profiles

### 🤖 AI / ML Simulation
- Dynamic premium calculation based on city risk + working hours
- Risk scoring per zone (Low / Medium / High)
- Fraud detection using 5 independent signals

---

## ⚡ Parametric Triggers

| Event | Threshold | Payout |
|-------|-----------|--------|
| 🌧️ Heavy Rainfall | > 50mm | ₹300 |
| 😷 Poor Air Quality | AQI > 200 | ₹250 |
| 🌊 Flood Alert | Official alert issued | ₹500 |

---

## 💰 Weekly Premium Model

| Risk Zone | Example City | Premium |
|-----------|-------------|---------|
| Low Risk | Bangalore | ₹12/week |
| Medium Risk | Hyderabad, Pune | ₹14–15/week |
| High Risk | Mumbai, Delhi, Chennai | ₹18–25/week |

Premiums adjust based on weekly working hours (multiplier: 1.0× / 1.1× / 1.3×).

---

## 🛡️ Fraud Detection Signals

| Signal | Description |
|--------|-------------|
| Claim frequency | Flags >2 claims within 7 days |
| GPS consistency | Detects location mismatch with registered city |
| Device motion | Low accelerometer variance = possible static spoofing |
| Off-hours detection | Claims filed outside typical working hours |
| Duplicate events | Same city + event type within 1 hour |

Suspicious claims are **flagged for review, not auto-rejected** — workers can confirm activity manually.

---

## 🗂️ Project Structure

```
gigshield/
├── index.html          # Landing page + registration
├── dashboard.html      # Worker dashboard
├── admin.html          # Admin analytics panel
├── css/
│   └── style.css       # Full UI design system
└── js/
    ├── insurance.js    # Premium engine + state management
    ├── weather.js      # Weather simulation + disruption triggers
    └── fraud.js        # Fraud detection scoring
```

---

## 🚀 Getting Started

### Option 1 — Direct open (no install)
```
Double-click index.html
```

### Option 2 — Python server
```bash
python -m http.server 3000
# Open http://localhost:3000
```

### Option 3 — Node.js
```bash
npx http-server . -p 3000
# Open http://localhost:3000
```

---

## 🧪 Try the Demo

1. Open `admin.html` → **Seed Demo Data** tab → click **Seed 12 Sample Workers**
2. Open `dashboard.html` → click any **Simulate Disruption** button
3. Watch the full pipeline: detection → fraud check → payout modal

---

## 🧰 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| Storage | localStorage (prototype) |
| Weather | Simulated parametric engine (OpenWeather API ready) |
| Payments | Simulated (Razorpay integration planned) |
| AI/ML | Rule-based scoring (Scikit-learn model planned) |

---

## 🔗 Integrations (Planned)

- **OpenWeather API** — real rainfall and AQI data
- **IMD Flood Alerts** — official government flood data
- **Razorpay** — UPI payouts to worker wallets
- **MongoDB** — persistent worker and claims storage

---

## 🗺️ Covered Cities

Mumbai · Delhi · Bangalore · Chennai · Hyderabad · Pune

---

## 📅 Roadmap

- [x] Worker registration + risk profiling
- [x] Dynamic premium calculator
- [x] Parametric trigger simulation
- [x] Fraud detection engine
- [x] Admin analytics panel
- [ ] Real weather API integration
- [ ] Razorpay UPI payout
- [ ] Mobile PWA (Android)
- [ ] Swiggy/Zomato delivery log integration
- [ ] Deep learning fraud model

---

## ⚠️ Disclaimer

This is a **prototype / hackathon demo**. Payouts are simulated. GigShield is not a real financial or insurance product.

---

## 👨‍💻 Built with ❤️ for gig workers across India
