// generate-qr.js - Standalone QR code generator
const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');
const { Builder } = require('xml2js');

async function generateQRCodes() {
  // Get input from environment variables or command line args
  const uniqueIdsInput = process.env.UNIQUE_IDS || process.argv[2] || 'featuredproducts,contact,about';
  const namesInput = process.env.NAMES || process.argv[3] || 'Featured Products,Contact Page,About Us';
  
  const uniqueIds = uniqueIdsInput.split(',').map(id => id.trim());
  const names = namesInput.split(',').map(name => name.trim());
  const timestamp = new Date().toISOString();
  
  // Validate unique IDs
  for (const uniqueId of uniqueIds) {
    if (!/^[a-zA-Z0-9]+$/.test(uniqueId)) {
      throw new Error(`Invalid unique ID: "${uniqueId}". Only letters and numbers allowed, no spaces or special characters.`);
    }
  }
  
  // Validate that we have the same number of IDs and names
  if (uniqueIds.length !== names.length) {
    throw new Error(`Mismatch: ${uniqueIds.length} unique IDs but ${names.length} names. Please provide the same number of IDs and names.`);
  }
  
  console.log(`🚀 Starting QR code generation for Local Bar Tees`);
  console.log(`🔢 IDs: ${uniqueIds.join(', ')}`);
  console.log(`📝 Names: ${names.join(', ')}`);
  
  // Create output directory (write directly to qr folder)
  const outputDir = `qr`;
  
  fs.mkdirSync(outputDir, { recursive: true });
  
  const qrData = [];
  
  for (let i = 0; i < uniqueIds.length; i++) {
    const uniqueId = uniqueIds[i];
    const name = names[i];
    
    try {
      // Construct URL with ?qr parameter
      const fullUrl = `https://localbartees.com/${uniqueId}?qr`;
      
      // Generate QR code PNG directly in qr directory
      const filename = `${uniqueId}.png`;
      const pngPath = path.join(outputDir, filename);
      
      await QRCode.toFile(pngPath, fullUrl, {
        width: 300,
        height: 300,
        margin: 2,
        color: {
          dark: '#2d3748',  // Dark gray
          light: '#ffffff'  // White
        },
        errorCorrectionLevel: 'M'  // Medium error correction
      });
      
      // Collect data for XML
      const qrInfo = {
        uniqueId: uniqueId,
        name: name,
        url: fullUrl,
        filename: filename,
        generated: timestamp,
        size: '300x300',
        errorCorrection: 'M',
        fileSize: fs.statSync(pngPath).size
      };
      
      qrData.push(qrInfo);
      
      console.log(`✅ Generated: ${uniqueId} (${name}) → ${filename}`);
      
    } catch (error) {
      console.error(`❌ Failed to generate QR code for ${uniqueId}:`, error.message);
    }
  }
  
  // Generate qr.xml file in qr directory
  const xmlData = {
    qrCodes: {
      $: { 
        version: '1.0',
        generator: 'Local Bar Tees QR Generator',
        generated: timestamp,
        count: qrData.length
      },
      summary: {
        totalFiles: qrData.length + 1, // PNG files + XML file
        totalSize: qrData.reduce((sum, item) => sum + item.fileSize, 0),
        baseUrl: 'https://localbartees.com',
        qrParameter: '?qr'
      },
      codes: {
        code: qrData.map(item => ({
          $: { uniqueId: item.uniqueId },
          name: item.name,
          url: item.url,
          filename: item.filename,
          size: item.size,
          errorCorrection: item.errorCorrection,
          fileSizeBytes: item.fileSize,
          generated: item.generated
        }))
      }
    }
  };
  
  const builder = new Builder({
    xmldec: { version: '1.0', encoding: 'UTF-8' },
    pretty: true
  });
  const xml = builder.buildObject(xmlData);
  
  const xmlPath = path.join(outputDir, 'qr.xml');
  fs.writeFileSync(xmlPath, xml);
  
  // Generate README
  const readmePath = path.join(outputDir, 'README.md');
  const totalSize = qrData.reduce((sum, item) => sum + item.fileSize, 0);
  const readmeContent = `# Local Bar Tees QR Codes

**Generated:** ${new Date(timestamp).toLocaleString()}  
**Total QR Codes:** ${qrData.length}  
**Total File Size:** ${(totalSize / 1024).toFixed(2)} KB  

## 📁 Directory Structure
\`\`\`
qr/
├── shirt123.png                    # QR code images (300x300 PNG)
├── promosummer.png
├── contact.png
├── qr.xml                          # All QR code metadata
└── README.md                       # This file
\`\`\`

## 🔗 Generated QR Codes

| Unique ID | Name | URL | Filename |
|-----------|------|-----|----------|
${qrData.map(item => `| \`${item.uniqueId}\` | ${item.name} | ${item.url} | ${item.filename} |`).join('\n')}

## 📱 Usage Instructions

1. **For Print/Digital Use:** Use PNG files directly from this directory
2. **For Integration/Tracking:** Use \`qr.xml\` for all metadata
3. **Simple Access:** Everything in one qr/ folder

## ⚙️ Technical Specifications

- **Size:** 300x300 pixels
- **Format:** PNG with transparency support
- **Error Correction:** Medium (M) - 15% damage recovery
- **Colors:** Dark gray (#2d3748) on white (#ffffff)
- **URL Parameter:** All URLs include \`?qr\` for tracking
- **Unique ID Format:** Letters and numbers only (no spaces/special characters)

## 🔄 Regeneration

To regenerate, run:
\`\`\`bash
node generate-qr.js "${uniqueIds.join(',')}" "${names.join(',')}"
\`\`\`

---
*Generated by Local Bar Tees QR Generator*
`;
  
  fs.writeFileSync(readmePath, readmeContent);
  
  // Summary output
  console.log(`\n🎉 Generation complete!`);
  console.log(`📁 Output directory: ${outputDir}`);
  console.log(`📊 Generated: ${qrData.length} QR codes`);
  console.log(`📄 Files created: ${qrData.length} PNGs, 1 XML, 1 README`);
  console.log(`💾 Total size: ${(totalSize / 1024).toFixed(2)} KB`);
  
  return {
    outputDir,
    count: qrData.length,
    totalSize
  };
}

// Run if called directly
if (require.main === module) {
  generateQRCodes().catch(error => {
    console.error('❌ Generation failed:', error);
    process.exit(1);
  });
}

module.exports = { generateQRCodes };