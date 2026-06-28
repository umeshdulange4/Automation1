const path = require('path');
const fs = require('fs');

// Helper function to take screenshots and attach to report
async function takeScreenshot(page, context, stepName) {
  const screenshotDir = path.join(process.cwd(), 'screenshots');
  
  // Create screenshots directory if it doesn't exist
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }
  
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const fileName = `${stepName}-${timestamp}.png`;
  const filePath = path.join(screenshotDir, fileName);
  
  // Take screenshot and save to disk
  const screenshotBuffer = await page.screenshot();
  fs.writeFileSync(filePath, screenshotBuffer);
  
  // Attach screenshot to Cucumber report
  context.attach(screenshotBuffer, 'image/png');
  
  console.log(`📸 Screenshot: ${fileName}`);
}

async function attachText(context, text) {
  if (context && typeof context.attach === 'function') {
    await context.attach(text, 'text/plain');
  } else {
    console.warn('Cannot attach text: missing Cucumber context attach function');
  }
}

module.exports = { takeScreenshot, attachText };
