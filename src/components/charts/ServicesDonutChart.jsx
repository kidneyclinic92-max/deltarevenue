import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'

const DATA = [
  { name: 'Billing & Coding', value: 35, color: '#8b7049' },
  { name: 'RCM & Audits', value: 28, color: '#9d8057' },
  { name: 'Credentialing', value: 18, color: '#6d5939' },
  { name: 'DME & Hospital', value: 12, color: '#a08b65' },
  { name: 'Other', value: 7, color: '#5c4a2e' },
]

export function ServicesDonutChart() {
  return (
    <div className="w-full max-w-sm mx-auto mt-10 h-72">
      <p className="text-center text-primary-400 text-sm mb-2">Service mix we support</p>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={DATA}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={2}
            dataKey="value"
            nameKey="name"
          >
            {DATA.map((entry, i) => (
              <Cell key={i} fill={entry.color} stroke="#262626" strokeWidth={2} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ backgroundColor: '#262626', border: '1px solid #525252', borderRadius: 8 }}
            formatter={(value) => [`${value}%`, '']}
          />
          <Legend
            wrapperStyle={{ fontSize: 12 }}
            formatter={(value) => <span style={{ color: '#d4d4d4' }}>{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
