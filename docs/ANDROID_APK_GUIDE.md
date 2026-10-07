# Harinaam — Android APK Build & Dedicated Device Guide

This guide explains how to package the Harinaam digital slate into a **standalone Android APK (`.apk`)** for loading onto dedicated tablets, E-Ink devices, and mobile phones.

---

## 📱 Two Easy Ways to Create the APK

### Method 1: Capacitor Native Android APK (Recommended for dedicated devices)

Capacitor wraps the Next.js frontend into a native Android application with full access to hardware acceleration, low-latency pointer events, and offline persistence.

#### Step 1: Export Next.js static build
In `frontend/`:
```powershell
npm run build
```
*(Next.js will output the optimized static web assets into `out/`)*

#### Step 2: Add Android Native Platform
```powershell
npx cap add android
npx cap sync android
```

#### Step 3: Build the `.apk` using Android Studio or CLI
Open the generated android project in Android Studio:
```powershell
npx cap open android
```
In Android Studio:
1. Go to **Build** ➔ **Build Bundle(s) / APK(s)** ➔ **Build APK(s)**.
2. The generated `.apk` will be in:
   `android/app/build/outputs/apk/debug/app-debug.apk`

---

### Method 2: Instant PWA Install (Zero-build APK via Chrome / Edge)

On any Android device, tablet, or kiosk:
1. Open `http://your-server-ip:3000` or production domain in Chrome.
2. Tap the **Three Dots (⋮)** menu ➔ Tap **"Install app"** or **"Add to Home Screen"**.
3. Chrome creates a standalone Android WebAPK that runs full-screen with zero address bar, offline caching, and native icon!

---

## ⚙️ Key Device Features Implemented

1. **Screen WakeLock**: Prevents device display from sleeping or locking while user is in active Naam Lekhan practice.
2. **Offline-First IndexedDB**: Devotees can write 108 or 1008 Naams anywhere without internet; entries automatically sync to Laravel MySQL when connectivity returns.
3. **Low-Latency Hardware-Accelerated Canvas**: Direct Pointer Events API handling Touch, Pen/Stylus, and Mouse with quadratic bezier curve smoothing.
4. **Data Ledger Export**: Devotees can download their entire sadhana ledger as a single `.json` file directly from the Dashboard.
