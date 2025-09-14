// Mail service for sending emails using SMTP configuration
import { SIMPLE_CONTRIBUTORS, type SimpleContributor } from "./simpleData";

export interface MailConfig {
  host: string;
  port: number;
  secure: boolean;
  username: string;
  password: string;
  fromEmail: string;
  fromName: string;
}

export interface EmailSchedule {
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

export interface EmailData {
  to: string[];
  subject: string;
  html: string;
  text: string;
}

export class MailService {
  private config: MailConfig | null = null;

  constructor() {
    this.loadConfig();
  }

  private loadConfig(): void {
    if (typeof window !== "undefined") {
      const savedConfig = localStorage.getItem("smtp_config");
      if (savedConfig) {
        this.config = JSON.parse(savedConfig);
      }
    }
  }

  public updateConfig(newConfig: MailConfig): void {
    this.config = newConfig;
    if (typeof window !== "undefined") {
      localStorage.setItem("smtp_config", JSON.stringify(newConfig));
    }
  }

  public async testConnection(): Promise<{
    success: boolean;
    message: string;
  }> {
    if (!this.config) {
      return { success: false, message: "SMTP configuration not found" };
    }

    try {
      // In a real implementation, this would test the actual SMTP connection
      // For demo purposes, we'll simulate the test
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (!this.config.host || !this.config.username || !this.config.password) {
        return {
          success: false,
          message: "Missing required SMTP configuration",
        };
      }

      return { success: true, message: "SMTP connection successful" };
    } catch (error) {
      return { success: false, message: `Connection failed: ${error}` };
    }
  }

  public async sendEmail(
    emailData: EmailData
  ): Promise<{ success: boolean; message: string }> {
    if (!this.config) {
      return { success: false, message: "SMTP configuration not found" };
    }

    try {
      // In a real implementation, this would use a proper SMTP library like nodemailer
      // For demo purposes, we'll simulate sending
      console.log("Sending email with config:", {
        host: this.config.host,
        port: this.config.port,
        secure: this.config.secure,
        from: `${this.config.fromName} <${this.config.fromEmail}>`,
        to: emailData.to.join(", "),
        subject: emailData.subject,
      });

      await new Promise((resolve) => setTimeout(resolve, 2000));

      return { success: true, message: "Email sent successfully" };
    } catch (error) {
      return { success: false, message: `Failed to send email: ${error}` };
    }
  }

  public generateReportEmail(
    schedule: EmailSchedule,
    repositoryName: string
  ): EmailData {
    const currentDate = new Date().toLocaleDateString();
    const subject = this.generateSubject(schedule, repositoryName, currentDate);
    const { html, text } = this.generateEmailContent(
      schedule,
      repositoryName,
      currentDate
    );

    return {
      to: schedule.recipients,
      subject,
      html,
      text,
    };
  }

  private generateSubject(
    schedule: EmailSchedule,
    repositoryName: string,
    date: string
  ): string {
    const frequency =
      schedule.frequency.charAt(0).toUpperCase() + schedule.frequency.slice(1);

    return `${frequency} Report for ${schedule.contributorName} - ${repositoryName} (${date})`;
  }

  private generateEmailContent(
    schedule: EmailSchedule,
    repositoryName: string,
    date: string
  ): { html: string; text: string } {
    // Find the specific contributor this schedule is for
    const contributor = SIMPLE_CONTRIBUTORS.find(
      (c) => c.id.toString() === schedule.contributorId
    );

    if (!contributor) {
      throw new Error(
        `Contributor with ID ${schedule.contributorId} not found`
      );
    }

    const html = this.generateHTMLTemplate(
      schedule,
      repositoryName,
      date,
      contributor
    );
    const text = this.generateTextTemplate(
      schedule,
      repositoryName,
      date,
      contributor
    );

    return { html, text };
  }

  private generateHTMLTemplate(
    schedule: EmailSchedule,
    repositoryName: string,
    date: string,
    contributor: SimpleContributor
  ): string {
    const frequency =
      schedule.frequency.charAt(0).toUpperCase() + schedule.frequency.slice(1);

    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${frequency} Report for ${contributor.name}</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f5f5f5; }
        .container { max-width: 600px; margin: 0 auto; background-color: white; }
        .header { background-color: #1f2937; color: white; padding: 20px; text-align: center; }
        .content { padding: 30px; }
        .contributor-header { background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin: 15px 0; text-align: center; }
        .contributor-avatar { width: 64px; height: 64px; border-radius: 50%; margin: 0 auto 10px; }
        .metric-card { background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin: 15px 0; }
        .metric-value { font-size: 24px; font-weight: bold; color: #1f2937; }
        .metric-label { color: #6b7280; font-size: 14px; margin-top: 5px; }
        .activity-item { border-bottom: 1px solid #e5e7eb; padding: 15px 0; }
        .activity-date { font-weight: 600; color: #1f2937; }
        .activity-stats { color: #6b7280; font-size: 14px; margin-top: 5px; }
        .footer { background-color: #f9fafb; padding: 20px; text-align: center; font-size: 12px; color: #6b7280; border-top: 1px solid #e5e7eb; }
        .btn { display: inline-block; background-color: #1f2937; color: white; padding: 10px 20px; text-decoration: none; border-radius: 6px; margin: 10px 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📊 ${frequency} Report for ${contributor.name}</h1>
            <p>${repositoryName} • ${date}</p>
        </div>
        
        <div class="content">
            <div class="contributor-header">
                <img src="${contributor.avatar}" alt="${
      contributor.name
    }" class="contributor-avatar">
                <h2>${contributor.name}</h2>
                <p style="color: #6b7280; margin: 5px 0;">Contributor Report</p>
            </div>

            <h2>📈 Performance Metrics</h2>
            
            <div class="metric-card">
                <div class="metric-value">${contributor.totalCommits}</div>
                <div class="metric-label">Total Commits</div>
            </div>
            
            <div class="metric-card">
                <div class="metric-value">${Math.round(
                  contributor.totalCommits / 4
                )}</div>
                <div class="metric-label">Weekly Average Commits</div>
            </div>
            
            <div class="metric-card">
                <div class="metric-value">${contributor.lastCommitDate}</div>
                <div class="metric-label">Last Active</div>
            </div>

            <h2>� Recent Activity</h2>
            <div class="activity-item">
                <div class="activity-date">Latest Contribution</div>
                <div class="activity-stats">
                    Last commit: ${
                      contributor.lastCommitDate
                    } • Total contributions: ${contributor.totalCommits}
                </div>
            </div>

            ${
              schedule.frequency === "weekly" ||
              schedule.frequency === "monthly"
                ? `
                <h2>🔍 ${frequency} Summary</h2>
                <p>This ${frequency.toLowerCase()} period showed ${
                    contributor.name
                  }'s development activity:</p>
                <ul>
                    <li>Consistent contribution pattern with ${Math.round(
                      contributor.totalCommits / 4
                    )} average commits per week</li>
                    <li>Maintained regular development velocity</li>
                    <li>Active engagement in repository development</li>
                </ul>
            `
                : ""
            }

            <p style="text-align: center; margin: 30px 0;">
                <a href="/contributors" class="btn">View Full Dashboard</a>
            </p>
        </div>
        
        <div class="footer">
            <p>This automated report was generated by Commitlytic</p>
            <p>Schedule: ${schedule.name} • Next report: ${new Date(
      schedule.nextRun
    ).toLocaleDateString()}</p>
        </div>
    </div>
</body>
</html>`;
  }

  private generateTextTemplate(
    schedule: EmailSchedule,
    repositoryName: string,
    date: string,
    contributor: SimpleContributor
  ): string {
    const frequency =
      schedule.frequency.charAt(0).toUpperCase() + schedule.frequency.slice(1);
    const weeklyAvg = Math.round(contributor.totalCommits / 4);

    return `
${frequency} Report for ${contributor.name}
${repositoryName} • ${date}

=== CONTRIBUTOR PROFILE ===

Name: ${contributor.name}
Total Commits: ${contributor.totalCommits}
Weekly Average: ${weeklyAvg} commits
Last Active: ${contributor.lastCommitDate}

=== PERFORMANCE METRICS ===

Total Contributions: ${contributor.totalCommits}
Activity Level: ${
      contributor.totalCommits > 50
        ? "High"
        : contributor.totalCommits > 20
        ? "Medium"
        : "Low"
    }
Consistency: Regular contributor

=== RECENT ACTIVITY ===

Latest Contribution: ${contributor.lastCommitDate}
Contribution Pattern: ${weeklyAvg} commits per week average

${
  schedule.frequency === "weekly" || schedule.frequency === "monthly"
    ? `
=== ${frequency.toUpperCase()} SUMMARY ===

This ${frequency.toLowerCase()} period shows ${
        contributor.name
      }'s development activity:

- Consistent contribution pattern with ${weeklyAvg} average commits per week
- Maintained regular development velocity
- Active engagement in repository development
`
    : ""
}

---
This automated report was generated by Commitlytic
Schedule: ${schedule.name}
Next report: ${new Date(schedule.nextRun).toLocaleDateString()}
    `.trim();
  }

  public async sendScheduledEmail(
    schedule: EmailSchedule
  ): Promise<{ success: boolean; message: string }> {
    try {
      const repositoryData = JSON.parse(
        localStorage.getItem("selectedRepoData") || "{}"
      );
      const repositoryName = repositoryData.fullName || "Unknown Repository";

      const emailData = this.generateReportEmail(schedule, repositoryName);
      const result = await this.sendEmail(emailData);

      if (result.success) {
        // Update last run time
        this.updateScheduleLastRun(schedule.id);
      }

      return result;
    } catch (error) {
      return {
        success: false,
        message: `Failed to send scheduled email: ${error}`,
      };
    }
  }

  private updateScheduleLastRun(scheduleId: string): void {
    if (typeof window !== "undefined") {
      const schedules = JSON.parse(
        localStorage.getItem("email_schedules") || "[]"
      );
      const updatedSchedules = schedules.map((s: EmailSchedule) =>
        s.id === scheduleId ? { ...s, lastRun: new Date().toISOString() } : s
      );
      localStorage.setItem("email_schedules", JSON.stringify(updatedSchedules));
    }
  }

  public getNextRunTime(frequency: string, time: string): Date {
    const now = new Date();
    const [hours, minutes] = time.split(":").map(Number);

    const nextRun = new Date();
    nextRun.setHours(hours, minutes, 0, 0);

    if (frequency === "daily") {
      if (nextRun <= now) {
        nextRun.setDate(nextRun.getDate() + 1);
      }
    } else if (frequency === "weekly") {
      // Set to next Monday
      const daysUntilMonday = (7 - nextRun.getDay() + 1) % 7 || 7;
      nextRun.setDate(nextRun.getDate() + daysUntilMonday);
    } else if (frequency === "monthly") {
      // Set to first day of next month
      nextRun.setMonth(nextRun.getMonth() + 1, 1);
    }

    return nextRun;
  }

  public async processScheduledEmails(): Promise<void> {
    if (typeof window !== "undefined") {
      const schedules: EmailSchedule[] = JSON.parse(
        localStorage.getItem("email_schedules") || "[]"
      );
      const now = new Date();

      for (const schedule of schedules) {
        if (schedule.status === "active" && new Date(schedule.nextRun) <= now) {
          console.log(`Processing scheduled email: ${schedule.name}`);
          await this.sendScheduledEmail(schedule);

          // Update next run time
          const nextRun = this.getNextRunTime(
            schedule.frequency,
            schedule.time
          );
          const updatedSchedules = schedules.map((s) =>
            s.id === schedule.id ? { ...s, nextRun: nextRun.toISOString() } : s
          );
          localStorage.setItem(
            "email_schedules",
            JSON.stringify(updatedSchedules)
          );
        }
      }
    }
  }
}

// Export singleton instance
export const mailService = new MailService();

// Auto-process scheduled emails every minute (in a real app, this would be handled by a backend cron job)
if (typeof window !== "undefined") {
  setInterval(() => {
    mailService.processScheduledEmails();
  }, 60000);
}
