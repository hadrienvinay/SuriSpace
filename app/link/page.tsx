import ShowLinks from "@/components/common/ShowLinks"

export default function LinkPage() {
  return (
    <div
      className="max-w-7xl mx-auto px-4 py-10"
      style={{ fontFamily: "'Exo 2', 'Space Grotesk', sans-serif" }}
    >
      <div className="mb-8">
        <h1
          className="text-4xl sm:text-5xl font-bold mb-2"
          style={{
            background: 'linear-gradient(135deg, #A78BFA, #60A5FA)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.5px',
          }}
        >
          Ressources
        </h1>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)' }}>
          Liens & références classés par catégorie
        </p>
      </div>

      <ShowLinks />
    </div>
  );
}
