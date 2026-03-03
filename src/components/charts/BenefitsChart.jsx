import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'

const DATA = [
  { name: 'Pain points', value: 95 },
  { name: 'Collections', value: 88 },
  { name: 'Cash flow', value: 92 },
  { name: 'Accountability', value: 100 },
  { name: 'Ease of use', value: 90 },
]

const GOLD = '#8b7049'
const GOLD_LIGHT = '#9d8057'

export function BenefitsChart() {
  return (
    <div className="w-full max-w-lg mx-auto mt-10 h-64">
      <p className="text-center text-primary-400 text-sm mb-4">Client satisfaction by benefit area (%)</p>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={DATA} margin={{ top: 8, right: 16, left: 8, bottom: 8 }}>
          <XAxis dataKey="name" tick={{ fill: '#a3a3a3', fontSize: 11 }} axisLine={{ stroke: '#525252' }} tickLine={false} />
          <YAxis domain={[0, 100]} tick={{ fill: '#737373', fontSize: 11 }} axisLine={{ stroke: '#525252' }} tickLine={false} />
          <Tooltip
            contentStyle={{ backgroundColor: '#262626', border: '1px solid #525252', borderRadius: 8 }}
            formatter={(value) => [`${value}%`, 'Satisfaction']}
          />
          <Bar dataKey="value" radius={[4, 4, 0, 0]} maxBarSize={40}>
            {DATA.map((_, i) => (
              <Cell key={i} fill={i % 2 === 0 ? GOLD : GOLD_LIGHT} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
