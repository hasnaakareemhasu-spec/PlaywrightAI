# PlaywrightAI

## Run the checkout spec in headed mode

### PowerShell
```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
cd 'D:\Obsqura\PlaywrightAI'
npx playwright test tests/sauce-demo-checkout.spec.js --project=chromium --headed
```

### Batch file
```bat
run-headed-checkout.bat
```
