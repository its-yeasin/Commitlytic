"use client";

import { useState } from "react";
import { Calendar, ChevronDown } from "lucide-react";
import {
  format,
  subDays,
  subWeeks,
  subMonths,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
} from "date-fns";

export interface DateRange {
  start: Date;
  end: Date;
  label: string;
}

interface DateFilterProps {
  onDateRangeChange?: (dateRange: DateRange) => void;
  className?: string;
  showCustomRange?: boolean;
}

const PRESET_RANGES = [
  {
    id: "last-7-days",
    label: "Last 7 days",
    getValue: () => ({
      start: subDays(new Date(), 7),
      end: new Date(),
      label: "Last 7 days",
    }),
  },
  {
    id: "last-30-days",
    label: "Last 30 days",
    getValue: () => ({
      start: subDays(new Date(), 30),
      end: new Date(),
      label: "Last 30 days",
    }),
  },
  {
    id: "this-week",
    label: "This week",
    getValue: () => ({
      start: startOfWeek(new Date()),
      end: endOfWeek(new Date()),
      label: "This week",
    }),
  },
  {
    id: "last-week",
    label: "Last week",
    getValue: () => {
      const lastWeek = subWeeks(new Date(), 1);
      return {
        start: startOfWeek(lastWeek),
        end: endOfWeek(lastWeek),
        label: "Last week",
      };
    },
  },
  {
    id: "this-month",
    label: "This month",
    getValue: () => ({
      start: startOfMonth(new Date()),
      end: endOfMonth(new Date()),
      label: "This month",
    }),
  },
  {
    id: "last-month",
    label: "Last month",
    getValue: () => {
      const lastMonth = subMonths(new Date(), 1);
      return {
        start: startOfMonth(lastMonth),
        end: endOfMonth(lastMonth),
        label: "Last month",
      };
    },
  },
  {
    id: "last-3-months",
    label: "Last 3 months",
    getValue: () => ({
      start: subMonths(new Date(), 3),
      end: new Date(),
      label: "Last 3 months",
    }),
  },
  {
    id: "last-6-months",
    label: "Last 6 months",
    getValue: () => ({
      start: subMonths(new Date(), 6),
      end: new Date(),
      label: "Last 6 months",
    }),
  },
];

export default function DateFilter({
  onDateRangeChange,
  className = "",
  showCustomRange = false,
}: DateFilterProps) {
  const [selectedRange, setSelectedRange] = useState(PRESET_RANGES[1]); // Default to "Last 30 days"
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [customStart, setCustomStart] = useState("");
  const [customEnd, setCustomEnd] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);

  const handleRangeSelect = (range: (typeof PRESET_RANGES)[0]) => {
    setSelectedRange(range);
    setIsDropdownOpen(false);
    setShowCustomInput(false);
    const dateRange = range.getValue();
    onDateRangeChange?.(dateRange);
  };

  const handleCustomRangeApply = () => {
    if (customStart && customEnd) {
      const start = new Date(customStart);
      const end = new Date(customEnd);

      if (start <= end) {
        const customRange = {
          start,
          end,
          label: `${format(start, "MMM d")} - ${format(end, "MMM d, yyyy")}`,
        };
        setShowCustomInput(false);
        setIsDropdownOpen(false);
        onDateRangeChange?.(customRange);
      }
    }
  };

  const currentDateRange = selectedRange.getValue();

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
      >
        <Calendar className="w-4 h-4 mr-2 text-gray-400" />
        <span className="mr-2">{selectedRange.label}</span>
        <ChevronDown className="w-4 h-4 text-gray-400" />
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-3">
              Select date range
            </h3>

            {/* Preset Ranges */}
            <div className="space-y-1 mb-4">
              {PRESET_RANGES.map((range) => {
                const isSelected = selectedRange.id === range.id;
                return (
                  <button
                    key={range.id}
                    onClick={() => handleRangeSelect(range)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                      isSelected
                        ? "bg-indigo-100 text-indigo-700"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {range.label}
                  </button>
                );
              })}
            </div>

            {/* Custom Range */}
            {showCustomRange && (
              <>
                <div className="border-t border-gray-200 pt-4">
                  <button
                    onClick={() => setShowCustomInput(!showCustomInput)}
                    className="w-full text-left px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    Custom range
                  </button>
                </div>

                {showCustomInput && (
                  <div className="mt-3 p-3 bg-gray-50 rounded-md">
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Start date
                        </label>
                        <input
                          type="date"
                          value={customStart}
                          onChange={(e) => setCustomStart(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          End date
                        </label>
                        <input
                          type="date"
                          value={customEnd}
                          onChange={(e) => setCustomEnd(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                    <button
                      onClick={handleCustomRangeApply}
                      disabled={!customStart || !customEnd}
                      className="w-full px-3 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Apply Custom Range
                    </button>
                  </div>
                )}
              </>
            )}

            {/* Current Selection Info */}
            <div className="border-t border-gray-200 pt-4 mt-4">
              <div className="text-xs text-gray-500">
                <p className="font-medium mb-1">Selected range:</p>
                <p>
                  {format(currentDateRange.start, "MMM d, yyyy")} -{" "}
                  {format(currentDateRange.end, "MMM d, yyyy")}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Overlay to close dropdown */}
      {isDropdownOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsDropdownOpen(false)}
        />
      )}
    </div>
  );
}
