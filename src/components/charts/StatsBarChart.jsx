import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'

const DATA = [
  { name: 'Cash Flow', value: 25, label: '25%' },
  { name: 'Net Collection', value: 97, label: '97%' },
  { name: 'Days in A/R', value: 32, label: '<32' },
  { name: 'Success Rate', value: 99, label: '99%' },
]
const GOLD = '#8b7049'
const GOLD_LIGHT = '#9d8057'

export function StatsBarChart() {
  return (
    <div className="w-full max-w-2xl mx-auto mt-12 h-64">
      <p className="text-center text-primary-400 text-sm mb-4">Key performance metrics</p>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={DATA} margin={{ top: 8, right: 16, left: 16, bottom: 8 }} layout="vertical">
          <XAxis type="number" domain={[0, 100]} hide />
          <YAxis type="category" dataKey="name" width={100} tick={{ fill: '#a3a3a3', fontSize: 12 }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={{ backgroundColor: '#262626', border: '1px solid #525252', borderRadius: 8 }} labelStyle={{ color: '#e5e5e5' }} formatter={(v, n, p) => [p.payload.label, '']} />
          <Bar dataKey="value" radius={[0, 4, 4, 0]} maxBarSize={28}>
            {DATA.map((_, i) => (
              <Cell key={i} fill={i % 2 === 0 ? GOLD : GOLD_LIGHT} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
