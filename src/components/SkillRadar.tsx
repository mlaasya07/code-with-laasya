import { useMemo } from 'react';
import { storage } from '@/utils/localStorage';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';

export default function SkillRadar() {
  const skills = useMemo(() => {
    const skillData = storage.getSkills();
    return [
      { skill: 'Frontend', value: skillData.frontend || 0 },
      { skill: 'Backend', value: skillData.backend || 0 },
      { skill: 'Debugging', value: skillData.debugging || 0 },
      { skill: 'Logic', value: skillData.logic || 0 },
      { skill: 'Database', value: skillData.database || 0 },
      { skill: 'Tools', value: skillData.tools || 0 },
    ];
  }, []);

  const maxValue = Math.max(...skills.map(s => s.value), 10);

  return (
    <div className="w-full h-[280px]">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={skills}>
          <PolarGrid stroke="hsl(var(--border))" />
          <PolarAngleAxis 
            dataKey="skill" 
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
          />
          <PolarRadiusAxis 
            angle={30} 
            domain={[0, maxValue]} 
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
          />
          <Radar
            name="Skills"
            dataKey="value"
            stroke="hsl(var(--primary))"
            fill="hsl(var(--primary))"
            fillOpacity={0.3}
            strokeWidth={2}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
