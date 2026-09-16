Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
cd 'D:\Obsqura\PlaywrightAI'
npx playwright test tests/sauce-demo-checkout.spec.js --project=chromium --headed
