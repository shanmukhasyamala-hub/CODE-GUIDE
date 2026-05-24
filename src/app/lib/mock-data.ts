export interface PullRequest {
  id: string;
  title: string;
  author: string;
  repository: string;
  status: 'pending' | 'scanning' | 'cleared' | 'issues_found';
  healthScore: number;
  createdAt: string;
  diff: string;
}

export const MOCK_PRS: PullRequest[] = [
  {
    id: 'PR-1204',
    title: 'Feat: Add authentication layer for dashboard',
    author: 'alex_dev',
    repository: 'codeguide/core-api',
    status: 'issues_found',
    healthScore: 68,
    createdAt: '2024-05-20T10:00:00Z',
    diff: `--- a/src/auth/service.ts
+++ b/src/auth/service.ts
@@ -10,5 +10,12 @@
 export class AuthService {
   async login(credentials: LoginDto) {
-    const user = await this.userRepo.find(credentials.email);
+    // Optimized query
+    const user = await this.userRepo.findOneBy({ email: credentials.email });
+    
+    if (user && user.password === credentials.password) {
+      return this.jwtService.sign({ sub: user.id });
+    }
+    
+    return null;
   }
 }`
  },
  {
    id: 'PR-1205',
    title: 'Fix: Resolve memory leak in data processor',
    author: 'sarah_eng',
    repository: 'codeguide/worker-nodes',
    status: 'cleared',
    healthScore: 98,
    createdAt: '2024-05-21T14:30:00Z',
    diff: `--- a/src/worker/processor.ts
+++ b/src/worker/processor.ts
@@ -45,3 +45,5 @@
   process(batch: any[]) {
-    this.cache.push(...batch);
+    const results = batch.map(item => transform(item));
+    this.cleanup();
+    return results;
   }`
  },
  {
    id: 'PR-1206',
    title: 'Refactor: Improve SQL query performance',
    author: 'mike_db',
    repository: 'codeguide/analytics-engine',
    status: 'scanning',
    healthScore: 0,
    createdAt: '2024-05-22T09:15:00Z',
    diff: `--- a/src/db/queries.sql
+++ b/src/db/queries.sql
@@ -1,3 +1,3 @@
-SELECT * FROM orders WHERE status = 'pending';
+SELECT id, customer_id, total FROM orders WHERE status = 'pending' INDEXED BY status_idx;`
  }
];

export const HEALTH_METRICS = [
  { name: 'Mon', score: 85 },
  { name: 'Tue', score: 82 },
  { name: 'Wed', score: 90 },
  { name: 'Thu', score: 78 },
  { name: 'Fri', score: 88 },
  { name: 'Sat', score: 92 },
  { name: 'Sun', score: 95 },
];

export const DEBT_HOTSPOTS = [
  { subject: 'Security', A: 80, fullMark: 100 },
  { subject: 'Typing', A: 65, fullMark: 100 },
  { subject: 'Logic', A: 90, fullMark: 100 },
  { subject: 'Performance', A: 70, fullMark: 100 },
  { subject: 'Accessibility', A: 50, fullMark: 100 },
];
