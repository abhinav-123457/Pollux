import { useState, useMemo, useEffect } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { format } from 'date-fns';
import {
  generateDailyEngagement,
  generateQuizMetrics,
  getTrendingAITopics,
  getRegionalDistribution,
  calculateMetrics,
} from '../lib/analyticsData';
import {
  getPageViewEvents,
  getQuizEvents,
  getAIQuestionEvents,
  aggregateDailyStats,
  type DailyStats,
} from '../lib/firebaseAnalytics';

const COLORS = ['#E63946', '#F1FAEE', '#A8DADC', '#457B9D', '#1D3557'];

/**
 * Analytics Dashboard - Real-time visualization of election engagement
 * Shows engagement trends, quiz performance, AI topics, and regional distribution
 */
export default function Analytics() {
  const [dayRange, setDayRange] = useState(30);
  const [engagementData, setEngagementData] = useState<DailyStats[]>([]);
  const [isRealTime, setIsRealTime] = useState(false);

  // Fetch real Firebase data
  useEffect(() => {
    const fetchRealData = async () => {
      try {
        const pageViews = await getPageViewEvents(dayRange);
        const quizzes = await getQuizEvents(dayRange);
        const aiQuestions = await getAIQuestionEvents(dayRange);

        // If we have real data, aggregate and use it
        if (pageViews.length > 0 || quizzes.length > 0 || aiQuestions.length > 0) {
          const aggregated = aggregateDailyStats(pageViews, quizzes, aiQuestions);
          if (aggregated.length > 0) {
            setEngagementData(aggregated);
            setIsRealTime(true);
            return;
          }
        }

        // Fall back to mock data
        setEngagementData(generateDailyEngagement(dayRange));
        setIsRealTime(false);
      } catch (error) {
        console.error('Error fetching analytics:', error);
        // Fall back to mock data on error
        setEngagementData(generateDailyEngagement(dayRange));
        setIsRealTime(false);
      }
    };

    fetchRealData();
  }, [dayRange]);

  // Use generated data for other metrics
  const quizData = useMemo(() => generateQuizMetrics(dayRange), [dayRange]);
  const metrics = useMemo(() => calculateMetrics(engagementData), [engagementData]);
  const trendingTopics = useMemo(() => getTrendingAITopics(), []);
  const regionalData = useMemo(() => getRegionalDistribution(), []);

  // Calculate category distribution for AI questions
  const categoryDistribution = useMemo(() => {
    const cats = trendingTopics.reduce(
      (acc, topic) => {
        const existing = acc.find((c) => c.name === topic.category);
        if (existing) {
          existing.value += topic.frequency;
        } else {
          acc.push({ name: topic.category, value: topic.frequency });
        }
        return acc;
      },
      [] as { name: string; value: number }[]
    );
    return cats.sort((a, b) => b.value - a.value);
  }, [trendingTopics]);

  return (
    <div
      className="min-h-screen py-8 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: 'var(--pollux-bg)' }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div>
              <h1
                className="text-3xl sm:text-4xl font-bold uppercase"
                style={{
                  fontFamily: 'var(--font-headline)',
                  color: 'var(--pollux-text)',
                  letterSpacing: '-0.02em',
                }}
              >
                📊 Analytics Dashboard
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <span
                className="text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1"
                style={{
                  backgroundColor: isRealTime ? '#22c55e' : '#f59e0b',
                  color: 'white',
                }}
              >
                <span className={isRealTime ? 'animate-pulse' : ''}>●</span>
                {isRealTime ? 'LIVE' : 'DEMO'}
              </span>
            </div>
          </div>
          <p
            style={{
              color: 'var(--pollux-text-muted)',
              fontSize: '16px',
            }}
          >
            Real-time election engagement metrics across India
          </p>
        </div>

        {/* Date Range Selector */}
        <div className="mb-8 flex gap-3 flex-wrap">
          {[7, 14, 30, 60].map((days) => (
            <button
              key={days}
              onClick={() => setDayRange(days)}
              className="px-4 py-2 rounded font-bold transition-colors"
              style={{
                backgroundColor: dayRange === days ? 'var(--pollux-red)' : 'var(--pollux-border)',
                color: 'var(--pollux-text)',
                borderRadius: 'var(--radius)',
                border: 'none',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                if (dayRange !== days) {
                  e.currentTarget.style.backgroundColor = 'var(--pollux-red)';
                }
              }}
              onMouseLeave={(e) => {
                if (dayRange !== days) {
                  e.currentTarget.style.backgroundColor = 'var(--pollux-border)';
                }
              }}
            >
              {days}D
            </button>
          ))}
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <MetricCard
            label="Total Page Views"
            value={metrics.totalPageViews.toLocaleString()}
            icon="👁️"
          />
          <MetricCard
            label="Unique Users"
            value={metrics.totalUsers.toLocaleString()}
            icon="👥"
          />
          <MetricCard label="Quiz Attempts" value={metrics.totalQuizzes.toLocaleString()} icon="🎯" />
          <MetricCard
            label="AI Questions"
            value={metrics.totalAI.toLocaleString()}
            icon="💡"
          />
        </div>

        {/* Main Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Engagement Over Time */}
          <ChartCard title="User Engagement Over Time">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={engagementData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--pollux-border)" />
                <XAxis
                  dataKey="date"
                  tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }}
                  tickFormatter={(date) => format(new Date(date), 'MMM dd')}
                />
                <YAxis tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(10,10,15,0.9)',
                    border: '1px solid var(--pollux-red)',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="uniqueUsers"
                  stroke="var(--pollux-red)"
                  strokeWidth={2}
                  dot={false}
                  name="Unique Users"
                />
                <Line
                  type="monotone"
                  dataKey="pageViews"
                  stroke="#A8DADC"
                  strokeWidth={2}
                  dot={false}
                  name="Page Views"
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Quiz Performance */}
          <ChartCard title="Quiz Performance Trends">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={quizData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--pollux-border)" />
                <XAxis
                  dataKey="date"
                  tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }}
                  tickFormatter={(date) => format(new Date(date), 'MMM dd')}
                />
                <YAxis tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(10,10,15,0.9)',
                    border: '1px solid var(--pollux-red)',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Bar dataKey="avgScore" fill="var(--pollux-red)" name="Avg Score (%)" />
                <Bar dataKey="completionRate" fill="#A8DADC" name="Completion Rate (%)" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* AI Topics Category Distribution */}
          <ChartCard title="AI Questions by Category">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryDistribution.map((_entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(10,10,15,0.9)',
                    border: '1px solid var(--pollux-red)',
                    borderRadius: '8px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Regional Distribution */}
          <ChartCard title="Top States by Users">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={regionalData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="var(--pollux-border)" />
                <XAxis type="number" tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }} />
                <YAxis
                  dataKey="state"
                  type="category"
                  tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }}
                  width={100}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(10,10,15,0.9)',
                    border: '1px solid var(--pollux-red)',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="users" fill="var(--pollux-red)" name="Users" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* Trending Questions */}
        <ChartCard title="🔥 Trending AI Questions">
          <div className="space-y-3">
            {trendingTopics.map((topic, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded" style={{ backgroundColor: 'rgba(230, 57, 70, 0.1)' }}>
                <div className="flex-1">
                  <p style={{ color: 'var(--pollux-text)', fontSize: '14px', fontWeight: 500 }}>
                    {topic.question}
                  </p>
                  <p style={{ color: 'var(--pollux-text-muted)', fontSize: '12px' }}>
                    Category: <span style={{ color: 'var(--pollux-red)' }}>{topic.category.toUpperCase()}</span>
                  </p>
                </div>
                <div
                  style={{
                    backgroundColor: 'var(--pollux-red)',
                    color: 'var(--pollux-text)',
                    padding: '8px 12px',
                    borderRadius: '4px',
                    fontWeight: 'bold',
                    fontSize: '14px',
                    minWidth: '60px',
                    textAlign: 'center',
                  }}
                >
                  {topic.frequency}
                </div>
              </div>
            ))}
          </div>
        </ChartCard>

        {/* Key Insights */}
        <ChartCard title="📈 Key Insights">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InsightItem
              label="Quiz Engagement Rate"
              value={`${metrics.quizToUsersRatio}x`}
              description="Quiz attempts per user"
            />
            <InsightItem
              label="AI Adoption Rate"
              value={`${metrics.aiToUsersRatio}x`}
              description="AI questions per user"
            />
            <InsightItem
              label="Avg Daily Users"
              value={metrics.avgUsers.toLocaleString()}
              description={`Over ${dayRange} days`}
            />
            <InsightItem
              label="Peak Interest"
              value="Election Phases"
              description="2.5x spike during voting periods"
            />
          </div>
        </ChartCard>
      </div>
    </div>
  );
}

interface MetricCardProps {
  label: string;
  value: string;
  icon: string;
}

function MetricCard({ label, value, icon }: MetricCardProps) {
  return (
    <div
      className="p-4 rounded-lg"
      style={{
        backgroundColor: 'rgba(230, 57, 70, 0.1)',
        border: '1px solid var(--pollux-red)',
      }}
    >
      <div className="text-3xl mb-2">{icon}</div>
      <p style={{ color: 'var(--pollux-text-muted)', fontSize: '12px', marginBottom: '8px' }}>
        {label}
      </p>
      <p
        style={{
          color: 'var(--pollux-text)',
          fontSize: '24px',
          fontWeight: 'bold',
        }}
      >
        {value}
      </p>
    </div>
  );
}

interface ChartCardProps {
  title: string;
  children: React.ReactNode;
}

function ChartCard({ title, children }: ChartCardProps) {
  return (
    <div
      className="p-6 rounded-lg"
      style={{
        backgroundColor: 'rgba(255,255,255,0.02)',
        border: '1px solid var(--pollux-border)',
      }}
    >
      <h2
        className="text-lg font-bold mb-4"
        style={{
          color: 'var(--pollux-text)',
          fontFamily: 'var(--font-headline)',
        }}
      >
        {title}
      </h2>
      {children}
    </div>
  );
}

interface InsightItemProps {
  label: string;
  value: string;
  description: string;
}

function InsightItem({ label, value, description }: InsightItemProps) {
  return (
    <div style={{ padding: '12px' }}>
      <p style={{ color: 'var(--pollux-text-muted)', fontSize: '12px', marginBottom: '4px' }}>
        {label}
      </p>
      <p style={{ color: 'var(--pollux-red)', fontSize: '20px', fontWeight: 'bold', marginBottom: '4px' }}>
        {value}
      </p>
      <p style={{ color: 'var(--pollux-text-muted)', fontSize: '12px' }}>
        {description}
      </p>
    </div>
  );
}
