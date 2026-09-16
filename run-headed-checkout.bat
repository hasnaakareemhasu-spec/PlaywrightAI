@echo off
cd /d "D:\Obsqura\PlaywrightAI"
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
npx playwright test tests/sauce-demo-checkout.spec.js --project=chromium --headed
