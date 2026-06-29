interface SkillBadgeProps {
  name: string;
  color: string;
  delay?: number;
}

export default function SkillBadge({ name, color, delay = 0 }: SkillBadgeProps) {
  return (
    <div
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm"
      style={{
        background: `${color}14`,
        border: `1px solid ${color}33`,
        color: '#202020',
        fontFamily: "'Inter', sans-serif",
        animation: `fadeIn 300ms ${delay}ms cubic-bezier(0.34, 1.56, 0.64, 1) both`,
      }}
    >
      <span
        className="w-2 h-2 rounded-full inline-block"
        style={{ background: color }}
      />
      {name}
    </div>
  );
}
