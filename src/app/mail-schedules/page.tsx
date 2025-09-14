"use client";

import { useState, useEffect } from "react";
import {
  Mail,
  Plus,
  Calendar,
  Clock,
  Users,
  Play,
  Pause,
  Trash2,
  Edit3,
  Send,
  CheckCircle,
  XCircle,
  Settings,
  Filter,
} from "lucide-react";
import AppHeader from "@/components/AppHeader";
import { mailService } from "@/lib/mailService";
import { SIMPLE_CONTRIBUTORS } from "@/lib/simpleData";

interface EmailSchedule {
  id: string;
  name: string;
  description: string;
  recipients: string[];
  frequency: "daily" | "weekly" | "monthly";
  time: string;
  timezone: string;
  contributorId: string; // ID of the contributor this schedule is for
  contributorName: string; // Name of the contributor for display
  status: "active" | "paused" | "draft";
  nextRun: string;
  lastRun?: string;
  created: string;
  repositoryIds: string[];
}

const defaultSchedule: Omit<EmailSchedule, "id" | "created" | "nextRun"> = {
  name: "",
  description: "",
  recipients: [],
  frequency: "weekly",
  time: "09:00",
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  contributorId: "",
  contributorName: "",
  status: "draft",
  repositoryIds: [],
};

export default function MailSchedulePage() {
  const [schedules, setSchedules] = useState<EmailSchedule[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState<EmailSchedule | null>(
    null
  );
  const [filterStatus, setFilterStatus] = useState<
    "all" | "active" | "paused" | "draft"
  >("all");
  const [newSchedule, setNewSchedule] = useState(defaultSchedule);
  const [newRecipient, setNewRecipient] = useState("");
  const [urlParamsProcessed, setUrlParamsProcessed] = useState(false);

  useEffect(() => {
    // Check for contributor pre-fill from URL params
    if (!urlParamsProcessed) {
      const urlParams = new URLSearchParams(window.location.search);
      const contributorId = urlParams.get("contributor");
      const contributorName = urlParams.get("name");

      if (contributorId && contributorName) {
        setNewSchedule((prev) => ({
          ...prev,
          contributorId,
          contributorName: decodeURIComponent(contributorName),
          name: `Weekly Report for ${decodeURIComponent(contributorName)}`,
          description: `Automated weekly performance report for ${decodeURIComponent(
            contributorName
          )}`,
        }));
        setShowCreateModal(true);
      }
      setUrlParamsProcessed(true);
    }
  }, [urlParamsProcessed]); // Add urlParamsProcessed as dependency

  useEffect(() => {
    // Load saved schedules
    const savedSchedules = localStorage.getItem("email_schedules");
    if (savedSchedules) {
      setSchedules(JSON.parse(savedSchedules));
    } else {
      // Add some demo data
      const demoSchedules: EmailSchedule[] = [
        {
          id: "1",
          name: "Weekly Report for Sarah Chen",
          description: "Sarah's weekly productivity and contribution summary",
          recipients: ["manager@company.com", "sarah.chen@company.com"],
          frequency: "weekly",
          time: "09:00",
          timezone: "UTC",
          contributorId: "1",
          contributorName: "Sarah Chen",
          status: "active",
          nextRun: "2025-09-21T09:00:00Z",
          lastRun: "2025-09-14T09:00:00Z",
          created: "2025-09-01T10:00:00Z",
          repositoryIds: ["1", "2"],
        },
        {
          id: "2",
          name: "Daily Summary for Marcus Rodriguez",
          description: "Daily development activity report for Marcus",
          recipients: ["team-lead@company.com", "marcus.rodriguez@company.com"],
          frequency: "daily",
          time: "08:30",
          timezone: "UTC",
          contributorId: "2",
          contributorName: "Marcus Rodriguez",
          status: "active",
          nextRun: "2025-09-15T08:30:00Z",
          created: "2025-09-10T15:00:00Z",
          repositoryIds: ["1"],
        },
        {
          id: "3",
          name: "Monthly Report for Alex Thompson",
          description: "Comprehensive monthly performance analysis for Alex",
          recipients: ["hr@company.com", "alex.thompson@company.com"],
          frequency: "monthly",
          time: "10:00",
          timezone: "UTC",
          contributorId: "3",
          contributorName: "Alex Thompson",
          status: "paused",
          nextRun: "2025-10-01T10:00:00Z",
          lastRun: "2025-08-01T10:00:00Z",
          created: "2025-08-15T12:00:00Z",
          repositoryIds: ["1", "2", "3"],
        },
      ];
      setSchedules(demoSchedules);
      localStorage.setItem("email_schedules", JSON.stringify(demoSchedules));
    }
  }, []);

  const saveSchedules = (updatedSchedules: EmailSchedule[]) => {
    setSchedules(updatedSchedules);
    localStorage.setItem("email_schedules", JSON.stringify(updatedSchedules));
  };

  const handleCreateSchedule = () => {
    const schedule: EmailSchedule = {
      ...newSchedule,
      id: Date.now().toString(),
      created: new Date().toISOString(),
      nextRun: calculateNextRun(newSchedule.frequency, newSchedule.time),
    };

    const updatedSchedules = [...schedules, schedule];
    saveSchedules(updatedSchedules);
    setShowCreateModal(false);
    setNewSchedule(defaultSchedule);
  };

  const handleUpdateSchedule = () => {
    if (!editingSchedule) return;

    const updatedSchedules = schedules.map((s) =>
      s.id === editingSchedule.id
        ? {
            ...editingSchedule,
            nextRun: calculateNextRun(
              editingSchedule.frequency,
              editingSchedule.time
            ),
          }
        : s
    );
    saveSchedules(updatedSchedules);
    setEditingSchedule(null);
  };

  const handleToggleStatus = (id: string) => {
    const updatedSchedules = schedules.map((s) =>
      s.id === id
        ? {
            ...s,
            status: (s.status === "active"
              ? "paused"
              : "active") as EmailSchedule["status"],
          }
        : s
    );
    saveSchedules(updatedSchedules);
  };

  const handleDeleteSchedule = (id: string) => {
    if (confirm("Are you sure you want to delete this schedule?")) {
      const updatedSchedules = schedules.filter((s) => s.id !== id);
      saveSchedules(updatedSchedules);
    }
  };

  const handleSendNow = async (schedule: EmailSchedule) => {
    try {
      const result = await mailService.sendScheduledEmail(schedule);
      if (result.success) {
        alert("Email sent successfully!");
      } else {
        alert(`Failed to send email: ${result.message}`);
      }
    } catch {
      alert("Error sending email. Please check your SMTP configuration.");
    }
  };

  const calculateNextRun = (frequency: string, time: string): string => {
    const now = new Date();
    const [hours, minutes] = time.split(":").map(Number);

    const nextRun = new Date();
    nextRun.setHours(hours, minutes, 0, 0);

    if (frequency === "daily") {
      if (nextRun <= now) {
        nextRun.setDate(nextRun.getDate() + 1);
      }
    } else if (frequency === "weekly") {
      nextRun.setDate(
        nextRun.getDate() + ((7 - nextRun.getDay() + 1) % 7) || 7
      );
    } else if (frequency === "monthly") {
      nextRun.setMonth(nextRun.getMonth() + 1, 1);
    }

    return nextRun.toISOString();
  };

  const addRecipient = (
    recipients: string[],
    setRecipients: (recipients: string[]) => void
  ) => {
    if (newRecipient && !recipients.includes(newRecipient)) {
      setRecipients([...recipients, newRecipient]);
      setNewRecipient("");
    }
  };

  const removeRecipient = (
    recipients: string[],
    email: string,
    setRecipients: (recipients: string[]) => void
  ) => {
    setRecipients(recipients.filter((r) => r !== email));
  };

  const filteredSchedules = schedules.filter(
    (schedule) => filterStatus === "all" || schedule.status === filterStatus
  );

  const getStatusIcon = (status: EmailSchedule["status"]) => {
    switch (status) {
      case "active":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "paused":
        return <Pause className="w-4 h-4 text-yellow-600" />;
      case "draft":
        return <Edit3 className="w-4 h-4 text-gray-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: EmailSchedule["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "paused":
        return "bg-yellow-100 text-yellow-800";
      case "draft":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader onRepositoryChange={() => {}} />

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Email Schedules
            </h1>
            <p className="text-gray-600">
              Manage automated email reports and notifications
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <a
              href="/settings"
              className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Settings className="w-4 h-4 mr-2" />
              SMTP Settings
            </a>
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Schedule
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
          <div className="flex items-center space-x-4">
            <Filter className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">
              Filter by status:
            </span>
            <div className="flex space-x-2">
              {["all", "active", "paused", "draft"].map((status) => (
                <button
                  key={status}
                  onClick={() =>
                    setFilterStatus(
                      status as "all" | "active" | "paused" | "draft"
                    )
                  }
                  className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                    filterStatus === status
                      ? "bg-gray-900 text-white border-gray-900"
                      : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Schedules List */}
        <div className="space-y-4">
          {filteredSchedules.map((schedule) => (
            <div
              key={schedule.id}
              className="bg-white rounded-lg border border-gray-200 p-6"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {schedule.name}
                    </h3>
                    <span
                      className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                        schedule.status
                      )}`}
                    >
                      {getStatusIcon(schedule.status)}
                      <span className="ml-1">
                        {schedule.status.charAt(0).toUpperCase() +
                          schedule.status.slice(1)}
                      </span>
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{schedule.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>
                        {schedule.frequency.charAt(0).toUpperCase() +
                          schedule.frequency.slice(1)}{" "}
                        at {schedule.time}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Users className="w-4 h-4 mr-2" />
                      <span>For: {schedule.contributorName}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Mail className="w-4 h-4 mr-2" />
                      <span>
                        {schedule.recipients.length} recipient
                        {schedule.recipients.length !== 1 ? "s" : ""}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>Next: {formatDateTime(schedule.nextRun)}</span>
                    </div>
                  </div>

                  {schedule.lastRun && (
                    <div className="mt-2 text-sm text-gray-500">
                      Last sent: {formatDateTime(schedule.lastRun)}
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-2 ml-6">
                  <button
                    onClick={() => handleSendNow(schedule)}
                    className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Send now"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleToggleStatus(schedule.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      schedule.status === "active"
                        ? "text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50"
                        : "text-green-600 hover:text-green-700 hover:bg-green-50"
                    }`}
                    title={schedule.status === "active" ? "Pause" : "Resume"}
                  >
                    {schedule.status === "active" ? (
                      <Pause className="w-4 h-4" />
                    ) : (
                      <Play className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    onClick={() => setEditingSchedule(schedule)}
                    className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteSchedule(schedule.id)}
                    className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {filteredSchedules.length === 0 && (
            <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
              <Mail className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {filterStatus === "all"
                  ? "No email schedules found"
                  : `No ${filterStatus} schedules found`}
              </h3>
              <p className="text-gray-600 mb-6">
                Create your first automated email report to get started.
              </p>
              <button
                onClick={() => setShowCreateModal(true)}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Schedule
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Create/Edit Modal */}
      {(showCreateModal || editingSchedule) && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowCreateModal(false);
              setEditingSchedule(null);
              setNewSchedule(defaultSchedule);
            }
          }}
        >
          <div
            className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                {editingSchedule ? "Edit Schedule" : "Create New Schedule"}
              </h2>
            </div>

            <div className="p-6 space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Schedule Name *
                  </label>
                  <input
                    type="text"
                    value={
                      editingSchedule ? editingSchedule.name : newSchedule.name
                    }
                    onChange={(e) =>
                      editingSchedule
                        ? setEditingSchedule({
                            ...editingSchedule,
                            name: e.target.value,
                          })
                        : setNewSchedule({
                            ...newSchedule,
                            name: e.target.value,
                          })
                    }
                    placeholder="Weekly Team Report"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    rows={2}
                    value={
                      editingSchedule
                        ? editingSchedule.description
                        : newSchedule.description
                    }
                    onChange={(e) =>
                      editingSchedule
                        ? setEditingSchedule({
                            ...editingSchedule,
                            description: e.target.value,
                          })
                        : setNewSchedule({
                            ...newSchedule,
                            description: e.target.value,
                          })
                    }
                    placeholder="Brief description of what this report includes"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Schedule Settings */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Frequency *
                  </label>
                  <select
                    value={
                      editingSchedule
                        ? editingSchedule.frequency
                        : newSchedule.frequency
                    }
                    onChange={(e) =>
                      editingSchedule
                        ? setEditingSchedule({
                            ...editingSchedule,
                            frequency: e.target
                              .value as EmailSchedule["frequency"],
                          })
                        : setNewSchedule({
                            ...newSchedule,
                            frequency: e.target
                              .value as EmailSchedule["frequency"],
                          })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time *
                  </label>
                  <input
                    type="time"
                    value={
                      editingSchedule ? editingSchedule.time : newSchedule.time
                    }
                    onChange={(e) =>
                      editingSchedule
                        ? setEditingSchedule({
                            ...editingSchedule,
                            time: e.target.value,
                          })
                        : setNewSchedule({
                            ...newSchedule,
                            time: e.target.value,
                          })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contributor *
                  </label>
                  <select
                    value={
                      editingSchedule
                        ? editingSchedule.contributorId
                        : newSchedule.contributorId
                    }
                    onChange={(e) => {
                      const selectedContributor = SIMPLE_CONTRIBUTORS.find(
                        (c) => c.id.toString() === e.target.value
                      );
                      if (selectedContributor) {
                        const updates = {
                          contributorId: e.target.value,
                          contributorName: selectedContributor.name,
                        };
                        if (editingSchedule) {
                          setEditingSchedule({
                            ...editingSchedule,
                            ...updates,
                          });
                        } else {
                          setNewSchedule({ ...newSchedule, ...updates });
                        }
                      }
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select a contributor</option>
                    {SIMPLE_CONTRIBUTORS.map((contributor) => (
                      <option
                        key={contributor.id}
                        value={contributor.id.toString()}
                      >
                        {contributor.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Recipients */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Recipients *
                </label>
                <div className="flex items-center space-x-2 mb-2">
                  <input
                    type="email"
                    value={newRecipient}
                    onChange={(e) => setNewRecipient(e.target.value)}
                    placeholder="Add email address"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        const currentRecipients = editingSchedule
                          ? editingSchedule.recipients
                          : newSchedule.recipients;
                        const setRecipients = editingSchedule
                          ? (recipients: string[]) =>
                              setEditingSchedule({
                                ...editingSchedule,
                                recipients,
                              })
                          : (recipients: string[]) =>
                              setNewSchedule({ ...newSchedule, recipients });
                        addRecipient(currentRecipients, setRecipients);
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const currentRecipients = editingSchedule
                        ? editingSchedule.recipients
                        : newSchedule.recipients;
                      const setRecipients = editingSchedule
                        ? (recipients: string[]) =>
                            setEditingSchedule({
                              ...editingSchedule,
                              recipients,
                            })
                        : (recipients: string[]) =>
                            setNewSchedule({ ...newSchedule, recipients });
                      addRecipient(currentRecipients, setRecipients);
                    }}
                    className="px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(editingSchedule
                    ? editingSchedule.recipients
                    : newSchedule.recipients
                  ).map((email) => (
                    <span
                      key={email}
                      className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                    >
                      {email}
                      <button
                        type="button"
                        onClick={() => {
                          const currentRecipients = editingSchedule
                            ? editingSchedule.recipients
                            : newSchedule.recipients;
                          const setRecipients = editingSchedule
                            ? (recipients: string[]) =>
                                setEditingSchedule({
                                  ...editingSchedule,
                                  recipients,
                                })
                            : (recipients: string[]) =>
                                setNewSchedule({ ...newSchedule, recipients });
                          removeRecipient(
                            currentRecipients,
                            email,
                            setRecipients
                          );
                        }}
                        className="ml-2 text-blue-600 hover:text-blue-800"
                      >
                        <XCircle className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex items-center justify-end space-x-3">
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setEditingSchedule(null);
                  setNewSchedule(defaultSchedule);
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={
                  editingSchedule ? handleUpdateSchedule : handleCreateSchedule
                }
                disabled={
                  !(editingSchedule
                    ? editingSchedule.name &&
                      editingSchedule.recipients.length &&
                      editingSchedule.contributorId
                    : newSchedule.name &&
                      newSchedule.recipients.length &&
                      newSchedule.contributorId)
                }
                className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {editingSchedule ? "Update Schedule" : "Create Schedule"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
