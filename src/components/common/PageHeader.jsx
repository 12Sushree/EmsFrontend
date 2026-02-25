export default function PageHeader({ title, subtitle = "" }) {
  if (!title) return null;

  return (
    <header className="mb-6">
      <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
      {subtitle && <p className="text-sm text-slate-500">{subtitle}</p>}
    </header>
  );
}
