import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'

const DATA = [
  { name: 'In-house', value: 100, fill: '#525252' },
  { name: 'With Delta', value: 62, fill: '#8b7049' },
]

export function SavingsChart() {
  return (
    <div className="w-full max-w-xs mx-auto mt-6 h-48">
      <p className="text-center text-primary-300 text-sm mb-2">Relative cost: In-house vs Delta</p>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={DATA} layout="vertical" margin={{ top: 8, right: 24, left: 8, bottom: 8 }}>
          <XAxis type="number" domain={[0, 120]} hide />
          <YAxis type="category" dataKey="name" width={80} tick={{ fill: '#a3a3a3', fontSize: 12 }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{ backgroundColor: '#262626', border: '1px solid #525252', borderRadius: 8 }}
            formatter={(value) => [value === 100 ? 'Baseline (100%)' : '~38% savings', '']}
          />
          <Bar dataKey="value" radius={[0, 4, 4, 0]} maxBarSize={36}>
            {DATA.map((entry, i) => (
              <Cell key={i} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
