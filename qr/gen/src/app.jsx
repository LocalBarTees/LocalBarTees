import React, { useState } from 'react';
import { QrCode, Download, Link, MessageSquare, User, Copy, Check } from 'lucide-react';

const QRCodeGenerator = () => {
  const [activeTab, setActiveTab] = useState('url');
  const [qrData, setQrData] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [copied, setCopied] = useState(false);
  
  // URL form state
  const [url, setUrl] = useState('');
  
  // Text form state
  const [text, setText] = useState('');
  
  // Contact form state
  const [contact, setContact] = useState({
    name: '',
    phone: '',
    email: '',
    organization: '',
    url: ''
  });

  const formatUrl = (inputUrl) => {
    if (!inputUrl) return '';
    
    // If it already has a protocol, return as is
    if (inputUrl.startsWith('http://') || inputUrl.startsWith('https://')) {
      return inputUrl;
    }
    
    // Add https:// if no protocol is specified
    return `https://${inputUrl}`;
  };

  const formatVCard = (contactData) => {
    const vcard = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      contactData.name ? `FN:${contactData.name}` : '',
      contactData.phone ? `TEL:${contactData.phone}` : '',
      contactData.email ? `EMAIL:${contactData.email}` : '',
      contactData.organization ? `ORG:${contactData.organization}` : '',
      contactData.url ? `URL:${formatUrl(contactData.url)}` : '',
      'END:VCARD'
    ].filter(line => line !== '').join('\n');
    
    return vcard;
  };

  const generateQRCode = () => {
    let data = '';
    
    switch (activeTab) {
      case 'url':
        data = formatUrl(url);
        break;
      case 'text':
        data = text;
        break;
      case 'contact':
        data = formatVCard(contact);
        break;
      default:
        return;
    }
    
    if (!data.trim()) return;
    
    setQrData(data);
    
    // Generate QR code using QR Server API
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(data)}`;
    setQrCode(qrUrl);
  };

  const downloadQRCode = () => {
    if (!qrCode) return;
    
    const link = document.createElement('a');
    link.href = qrCode;
    link.download = `qrcode-${activeTab}-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copyToClipboard = () => {
    if (!qrData) return;
    
    navigator.clipboard.writeText(qrData).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleContactChange = (field, value) => {
    setContact(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const isFormValid = () => {
    switch (activeTab) {
      case 'url':
        return url.trim() !== '';
      case 'text':
        return text.trim() !== '';
      case 'contact':
        return contact.name.trim() !== '' || contact.phone.trim() !== '' || contact.email.trim() !== '';
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <QrCode className="w-12 h-12 text-indigo-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-800">QR Code Generator</h1>
          </div>
          <p className="text-gray-600 text-lg">Create QR codes for URLs, text, and contact information</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Generate QR Code</h2>
            
            {/* Tab Navigation */}
            <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setActiveTab('url')}
                className={`flex-1 flex items-center justify-center py-2 px-4 rounded-md transition-colors ${
                  activeTab === 'url' 
                    ? 'bg-white text-indigo-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <Link className="w-4 h-4 mr-2" />
                URL
              </button>
              <button
                onClick={() => setActiveTab('text')}
                className={`flex-1 flex items-center justify-center py-2 px-4 rounded-md transition-colors ${
                  activeTab === 'text' 
                    ? 'bg-white text-indigo-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Text
              </button>
              <button
                onClick={() => setActiveTab('contact')}
                className={`flex-1 flex items-center justify-center py-2 px-4 rounded-md transition-colors ${
                  activeTab === 'contact' 
                    ? 'bg-white text-indigo-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <User className="w-4 h-4 mr-2" />
                Contact
              </button>
            </div>

            {/* URL Form */}
            {activeTab === 'url' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Website URL
                  </label>
                  <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Enter URL (e.g., google.com or https://google.com)"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    URLs without protocol will automatically get https:// prefix
                  </p>
                </div>
              </div>
            )}

            {/* Text Form */}
            {activeTab === 'text' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Text Content
                  </label>
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter any text you want to encode..."
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors resize-none"
                  />
                </div>
              </div>
            )}

            {/* Contact Form */}
            {activeTab === 'contact' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={contact.name}
                    onChange={(e) => handleContactChange('name', e.target.value)}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={contact.phone}
                    onChange={(e) => handleContactChange('phone', e.target.value)}
                    placeholder="+1 (555) 123-4567"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={contact.email}
                    onChange={(e) => handleContactChange('email', e.target.value)}
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Organization
                  </label>
                  <input
                    type="text"
                    value={contact.organization}
                    onChange={(e) => handleContactChange('organization', e.target.value)}
                    placeholder="Company Name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Website
                  </label>
                  <input
                    type="text"
                    value={contact.url}
                    onChange={(e) => handleContactChange('url', e.target.value)}
                    placeholder="company.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                  />
                </div>
              </div>
            )}

            {/* Generate Button */}
            <button
              onClick={generateQRCode}
              disabled={!isFormValid()}
              className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                isFormValid()
                  ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Generate QR Code
            </button>
          </div>

          {/* QR Code Display Section */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Your QR Code</h2>
            
            {qrCode ? (
              <div className="text-center space-y-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <img 
                    src={qrCode} 
                    alt="Generated QR Code" 
                    className="mx-auto w-64 h-64 object-contain"
                  />
                </div>
                
                {/* Data Preview */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Encoded Data:</span>
                    <button
                      onClick={copyToClipboard}
                      className="flex items-center space-x-1 text-sm text-indigo-600 hover:text-indigo-700"
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      <span>{copied ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </div>
                  <div className="text-sm text-gray-600 bg-white p-3 rounded border break-all">
                    {qrData}
                  </div>
                </div>
                
                {/* Download Button */}
                <button
                  onClick={downloadQRCode}
                  className="flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  <Download className="w-5 h-5" />
                  <span>Download QR Code</span>
                </button>
              </div>
            ) : (
              <div className="text-center py-12">
                <QrCode className="w-24 h-24 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">
                  Fill out the form and click "Generate QR Code" to see your QR code here
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Tips for Best Results</h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
            <div className="space-y-2">
              <h4 className="font-medium text-gray-800">URLs</h4>
              <p>URLs are automatically formatted with https:// to ensure they open directly in browsers when scanned.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-gray-800">Text</h4>
              <p>Keep text concise for better QR code readability. Very long text may result in complex codes.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-gray-800">Contact Info</h4>
              <p>Contact QR codes use vCard format, compatible with most smartphone contact apps.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRCodeGenerator;