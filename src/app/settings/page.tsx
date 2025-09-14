"use client";

import { useState, useEffect } from "react";
import {
  Mail,
  Server,
  Shield,
  Key,
  Eye,
  EyeOff,
  Save,
  TestTube2,
  CheckCircle,
  XCircle,
  Loader2,
} from "lucide-react";
import AppHeader from "@/components/AppHeader";

interface SMTPConfig {
  host: string;
  port: number;
  secure: boolean;
  username: string;
  password: string;
  fromEmail: string;
  fromName: string;
}

const defaultSMTPConfig: SMTPConfig = {
  host: "",
  port: 587,
  secure: true,
  username: "",
  password: "",
  fromEmail: "",
  fromName: "Commitlytic Reports",
};

export default function SettingsPage() {
  const [smtpConfig, setSMTPConfig] = useState<SMTPConfig>(defaultSMTPConfig);
  const [showPassword, setShowPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  useEffect(() => {
    // Load saved SMTP configuration
    const savedConfig = localStorage.getItem("smtp_config");
    if (savedConfig) {
      setSMTPConfig(JSON.parse(savedConfig));
    }
  }, []);

  const handleConfigChange = (
    field: keyof SMTPConfig,
    value: string | number | boolean
  ) => {
    setSMTPConfig((prev) => ({
      ...prev,
      [field]: value,
    }));
    setHasUnsavedChanges(true);
    setTestResult(null);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Save to localStorage (in real app, this would be an API call)
      localStorage.setItem("smtp_config", JSON.stringify(smtpConfig));
      setHasUnsavedChanges(false);

      // Show success message
      setTimeout(() => {
        setIsSaving(false);
      }, 1000);
    } catch {
      console.error("Error saving SMTP config");
      setIsSaving(false);
    }
  };

  const handleTestConnection = async () => {
    setIsTesting(true);
    setTestResult(null);

    try {
      // Simulate SMTP test (in real app, this would be an API call)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Mock validation
      if (!smtpConfig.host || !smtpConfig.username || !smtpConfig.password) {
        setTestResult({
          success: false,
          message: "Please fill in all required fields",
        });
      } else {
        setTestResult({
          success: true,
          message: "SMTP connection successful! Test email sent.",
        });
      }
    } catch {
      setTestResult({
        success: false,
        message: "Connection failed. Please check your settings.",
      });
    } finally {
      setIsTesting(false);
    }
  };

  const commonSMTPProviders = [
    { name: "Gmail", host: "smtp.gmail.com", port: 587, secure: true },
    { name: "Outlook", host: "smtp-mail.outlook.com", port: 587, secure: true },
    { name: "Yahoo", host: "smtp.mail.yahoo.com", port: 587, secure: true },
    { name: "SendGrid", host: "smtp.sendgrid.net", port: 587, secure: true },
    { name: "Custom", host: "", port: 587, secure: true },
  ];

  const handleProviderSelect = (provider: (typeof commonSMTPProviders)[0]) => {
    if (provider.name !== "Custom") {
      setSMTPConfig((prev) => ({
        ...prev,
        host: provider.host,
        port: provider.port,
        secure: provider.secure,
      }));
      setHasUnsavedChanges(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader onRepositoryChange={() => {}} />

      <div className="max-w-4xl mx-auto px-6 py-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-600">
            Configure SMTP settings for email reports and notifications
          </p>
        </div>

        {/* SMTP Configuration Card */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center">
              <Mail className="w-5 h-5 text-gray-600 mr-3" />
              <h2 className="text-lg font-semibold text-gray-900">
                SMTP Configuration
              </h2>
            </div>
            <p className="text-gray-600 mt-1">
              Configure your email server settings for sending reports
            </p>
          </div>

          <div className="p-6">
            {/* Provider Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Email Provider
              </label>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                {commonSMTPProviders.map((provider) => (
                  <button
                    key={provider.name}
                    onClick={() => handleProviderSelect(provider)}
                    className={`p-2 text-xs rounded-lg border text-center transition-colors ${
                      smtpConfig.host === provider.host &&
                      provider.name !== "Custom"
                        ? "bg-blue-50 border-blue-200 text-blue-700"
                        : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {provider.name}
                  </button>
                ))}
              </div>
            </div>

            {/* SMTP Host */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Server className="w-4 h-4 inline mr-1" />
                  SMTP Host *
                </label>
                <input
                  type="text"
                  value={smtpConfig.host}
                  onChange={(e) => handleConfigChange("host", e.target.value)}
                  placeholder="smtp.gmail.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Port *
                </label>
                <input
                  type="number"
                  value={smtpConfig.port}
                  onChange={(e) =>
                    handleConfigChange("port", parseInt(e.target.value))
                  }
                  placeholder="587"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Security */}
            <div className="mb-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={smtpConfig.secure}
                  onChange={(e) =>
                    handleConfigChange("secure", e.target.checked)
                  }
                  className="mr-2"
                />
                <Shield className="w-4 h-4 mr-1" />
                <span className="text-sm font-medium text-gray-700">
                  Use SSL/TLS encryption
                </span>
              </label>
            </div>

            {/* Authentication */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Key className="w-4 h-4 inline mr-1" />
                  Username/Email *
                </label>
                <input
                  type="email"
                  value={smtpConfig.username}
                  onChange={(e) =>
                    handleConfigChange("username", e.target.value)
                  }
                  placeholder="your-email@gmail.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password *
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={smtpConfig.password}
                    onChange={(e) =>
                      handleConfigChange("password", e.target.value)
                    }
                    placeholder="Your app password"
                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* From Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  From Email *
                </label>
                <input
                  type="email"
                  value={smtpConfig.fromEmail}
                  onChange={(e) =>
                    handleConfigChange("fromEmail", e.target.value)
                  }
                  placeholder="reports@yourcompany.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  From Name
                </label>
                <input
                  type="text"
                  value={smtpConfig.fromName}
                  onChange={(e) =>
                    handleConfigChange("fromName", e.target.value)
                  }
                  placeholder="Commitlytic Reports"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Test Result */}
            {testResult && (
              <div
                className={`mb-6 p-4 rounded-lg border ${
                  testResult.success
                    ? "bg-green-50 border-green-200 text-green-700"
                    : "bg-red-50 border-red-200 text-red-700"
                }`}
              >
                <div className="flex items-center">
                  {testResult.success ? (
                    <CheckCircle className="w-4 h-4 mr-2" />
                  ) : (
                    <XCircle className="w-4 h-4 mr-2" />
                  )}
                  <span className="text-sm font-medium">
                    {testResult.message}
                  </span>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <button
                onClick={handleTestConnection}
                disabled={isTesting || !smtpConfig.host || !smtpConfig.username}
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isTesting ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <TestTube2 className="w-4 h-4 mr-2" />
                )}
                {isTesting ? "Testing..." : "Test Connection"}
              </button>

              <button
                onClick={handleSave}
                disabled={isSaving || !hasUnsavedChanges}
                className="flex items-center px-6 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSaving ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Save className="w-4 h-4 mr-2" />
                )}
                {isSaving ? "Saving..." : "Save Settings"}
              </button>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-8 bg-blue-50 rounded-lg border border-blue-200 p-6">
          <h3 className="text-sm font-semibold text-blue-900 mb-3">
            Setup Help
          </h3>
          <div className="text-sm text-blue-800 space-y-2">
            <p>
              <strong>Gmail:</strong> Use your email address and an App Password
              (not your regular password)
            </p>
            <p>
              <strong>Outlook:</strong> Use your email address and password, or
              App Password if 2FA is enabled
            </p>
            <p>
              <strong>Custom SMTP:</strong> Contact your email provider for the
              correct server settings
            </p>
            <p>
              <strong>Security:</strong> Most modern email providers require
              SSL/TLS encryption (port 587 or 465)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
