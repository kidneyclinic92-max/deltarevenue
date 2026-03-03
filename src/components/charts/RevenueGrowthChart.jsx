import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

const DATA = [
  { month: 'Month 1', revenue: 72, benchmark: 70 },
  { month: 'Month 2', revenue: 78, benchmark: 72 },
  { month: 'Month 3', revenue: 85, benchmark: 74 },
  { month: 'Month 4', revenue: 92, benchmark: 76 },
  { month: 'Month 5', revenue: 98, benchmark: 78 },
  { month: 'Month 6', revenue: 100, benchmark: 80 },
]

const GOLD = '#8b7049'
const GOLD_FILL = 'rgba(139, 112, 73, 0.25)'

export function RevenueGrowthChart() {
  return (
    <div className="w-full max-w-xl mx-auto mt-10 h-56">
      <p className="text-center text-primary-400 text-sm mb-2">Typical revenue index with Delta (vs benchmark)</p>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={DATA} margin={{ top: 8, right: 8, left: 8, bottom: 8 }}>
          <defs>
            <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={GOLD} stopOpacity={0.4} />
              <stop offset="100%" stopColor={GOLD} stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="month" tick={{ fill: '#737373', fontSize: 11 }} axisLine={{ stroke: '#525252' }} tickLine={false} />
          <YAxis hide domain={[60, 110]} />
          <Tooltip
            contentStyle={{ backgroundColor: '#262626', border: '1px solid #525252', borderRadius: 8 }}
            labelStyle={{ color: '#e5e5e5' }}
            formatter={(value) => [value, 'Revenue index']}
          />
          <Area type="monotone" dataKey="revenue" stroke={GOLD} strokeWidth={2} fill="url(#revenueGrad)" name="With Delta" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
