# CurrencyWise Operations Runbook

## Document Control

- **Version:** 1.0.0
- **Date:** January 27, 2025
- **Status:** Draft
- **Author:** Your Name
- **Approvers:** TBD

## 1. Introduction

This Operations Runbook provides detailed procedures for deploying, maintaining, and troubleshooting the CurrencyWise application. It serves as a reference for the operations team to handle routine and emergency operations.

## 2. System Overview

CurrencyWise is a single-page application (SPA) built with React and TypeScript, deployed on Netlify. The application provides currency conversion functionality with historical data visualization, favorites management, and conversion history.

### 2.1 Architecture Components

- **Frontend Application**: React SPA
- **API Integration**: Exchange Rate API
- **Deployment Platform**: Netlify
- **CI/CD**: GitHub Actions
- **Monitoring**: Netlify Analytics, Sentry

### 2.2 Dependencies

- Exchange Rate API
- Netlify infrastructure
- GitHub repository and GitHub Actions
- npm package ecosystem

## 3. Deployment Procedures

### 3.1 Standard Deployment

The application follows a three-environment deployment process:

#### Development Deployment

```bash
# CI/CD automatically triggered on push to main branch
# Manual deployment:
npm run build
netlify deploy --site $DEV_SITE_ID
```

#### Staging Deployment

```bash
# After approval in GitHub workflow
# Manual deployment:
npm run build
netlify deploy --site $STAGING_SITE_ID
```

#### Production Deployment

```bash
# After approval in GitHub workflow
# Manual deployment:
npm run build
netlify deploy --prod --site $PROD_SITE_ID
```

### 3.2 Rollback Procedure

If issues are detected after deployment:

1. Access Netlify dashboard for the affected environment
2. Navigate to Deploys section
3. Identify the last known good deployment
4. Select "Publish deploy" from the options menu

```bash
# Alternatively, use CLI:
netlify sites:rollback --site $SITE_ID
```

### 3.3 Emergency Hotfix

For critical issues requiring immediate attention:

1. Create hotfix branch from production tag
2. Implement and test fix
3. Create PR to main branch with "HOTFIX" prefix
4. After approval, merge and deploy following expedited approval process

## 4. Monitoring and Alerting

### 4.1 Health Checks

| Check | Description | Frequency | Tool |
|-------|-------------|-----------|------|
| Website Availability | Verify the website is accessible | 5 minutes | UptimeRobot |
| Page Load Performance | Monitor load times | 15 minutes | Lighthouse CI |
| JavaScript Errors | Track client-side errors | Real-time | Sentry |
| API Accessibility | Verify API endpoints are accessible | 10 minutes | UptimeRobot |

### 4.2 Alert Configuration

| Alert | Trigger | Severity | Notification Channels |
|-------|---------|----------|----------------------|
| Site Down | Website unavailable for >2 minutes | Critical | Email, SMS, Slack |
| High Error Rate | >5% of requests result in errors | High | Email, Slack |
| Performance Degradation | Page load time >3 seconds | Medium | Email, Slack |
| API Timeout | API response time >2 seconds | High | Email, Slack |

### 4.3 Metrics to Monitor

- **Error Rates**: JavaScript errors, 404s, 5xx errors
- **Performance**: Page load time, time to interactive, first contentful paint
- **User Engagement**: Session duration, bounce rate
- **API Usage**: Calls per minute, error rates by endpoint

## 5. Routine Maintenance

### 5.1 Dependency Updates

Perform monthly dependency updates:

```bash
# Check for outdated dependencies
npm outdated

# Update dependencies (with approval process)
npm update

# Run tests to verify stability
npm test
```

### 5.2 Security Updates

Weekly security checks:

```bash
# Run npm audit
npm audit

# Fix automatically resolvable issues
npm audit fix

# Generate report for manual review
npm audit --json > audit-report.json
```

### 5.3 Backup Procedures

- **Configuration Backup**: Netlify and GitHub settings backed up quarterly
- **Content Backup**: Not applicable (stateless application)
- **Code Repository**: GitHub with protected branches and automated backups

## 6. Troubleshooting

### 6.1 Common Issues and Resolutions

| Issue | Symptoms | Resolution |
|-------|----------|------------|
| API Rate Limiting | Failed conversions, error messages | Check API quota, implement backoff strategy if necessary |
| Slow Performance | Extended page load times | Review recent deployments, check for JavaScript errors, verify CDN status |
| Stale Exchange Rates | Outdated rates displayed | Verify API service status, check rate refresh logic |
| Browser Compatibility | Features not working in specific browsers | Check browser console errors, review compatibility settings |

### 6.2 Error Logs

- **Application Errors**: Available in Sentry dashboard
- **Build Errors**: Available in GitHub Actions logs
- **Deployment Errors**: Available in Netlify deployment logs

### 6.3 Support Escalation

| Severity | Initial Response | Escalation Path | Communication Channel |
|----------|------------------|-----------------|----------------------|
| Critical | 15 minutes | L1 → L2 → Development Lead | Slack, Phone |
| High | 1 hour | L1 → L2 → Development Lead | Slack |
| Medium | 4 hours | L1 → L2 | Slack |
| Low | 1 business day | L1 | Email |

## 7. Disaster Recovery

### 7.1 Failure Scenarios

#### 7.1.1 Complete Service Outage

**Recovery Steps**:
1. Verify Netlify status at status.netlify.com
2. If Netlify issue, monitor status and communicate to stakeholders
3. If application-specific, deploy to backup CDN using GitHub Actions backup workflow
4. Update DNS if necessary

#### 7.1.2 Data Corruption

**Recovery Steps**:
1. Identify affected data (typically limited to localStorage)
2. Push emergency fix to clear corrupt data
3. Deploy hotfix following emergency deployment procedure

#### 7.1.3 API Provider Outage

**Recovery Steps**:
1. Verify Exchange Rate API status
2. Enable fallback provider in configuration
3. Deploy update if necessary
4. Monitor and switch back when primary provider is restored

### 7.2 Recovery Time Objectives

| Scenario | RTO | RPO |
|----------|-----|-----|
| Netlify Outage | 30 minutes | 0 (no data loss) |
| Application Bug | 2 hours | 0 (no data loss) |
| API Provider Outage | 15 minutes | 0 (no data loss) |

## 8. Security Procedures

### 8.1 Access Control

| Resource | Access Level | Approval Process |
|----------|--------------|------------------|
| GitHub Repository | Admin/Write/Read | Manager approval |
| Netlify Deployment | Admin/Deploy | Manager approval |
| API Credentials | Full Access | Director approval |

### 8.2 Credential Management

- Store all credentials in secure credential management system
- Rotate API keys quarterly
- Use environment variables for all sensitive configurations
- No credentials in source code or documentation

### 8.3 Security Incident Response

1. Identify and isolate affected systems
2. Assess impact and containment requirements
3. Implement containment measures
4. Eradicate threat and restore systems
5. Conduct post-incident review

## 9. Compliance and Auditing

### 9.1 Compliance Requirements

- Web Content Accessibility Guidelines (WCAG) 2.1 AA
- General Data Protection Regulation (GDPR) for user data
- Financial data accuracy standards

### 9.2 Audit Procedures

- Quarterly accessibility audits
- Monthly security scans
- Bi-annual code quality reviews

### 9.3 Record Keeping

- Deployment logs: Retained for 1 year
- Security incidents: Retained for 3 years
- Change management records: Retained for 2 years

## 10. Contact Information

| Role | Name | Email | Phone | Availability |
|------|------|-------|-------|-------------|
| DevOps Lead | [Name] | [Email] | [Phone] | 24/7 |
| Development Lead | [Name] | [Email] | [Phone] | Business hours, on-call |
| Product Owner | [Name] | [Email] | [Phone] | Business hours |

## 11. Appendices

### 11.1 Environment Configuration

| Environment | URL | Site ID | Purpose |
|-------------|-----|---------|---------|
| Development | dev.currencywise.app | [DEV_SITE_ID] | Feature testing |
| Staging | staging.currencywise.app | [STAGING_SITE_ID] | Pre-release verification |
| Production | currencywise.app | [PROD_SITE_ID] | Public website |

### 11.2 External Service Dependencies

| Service | Provider | Purpose | Contact |
|---------|----------|---------|---------|
| Exchange Rate API | ExchangeRate-API | Currency data | support@exchangerate-api.com |
| CDN | Netlify | Content delivery | support@netlify.com |
| Error Tracking | Sentry | Error monitoring | support@sentry.io |

### 11.3 Reference Documentation

- [Netlify CLI Documentation](https://docs.netlify.com/cli/get-started/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Exchange Rate API Documentation](https://www.exchangerate-api.com/docs)