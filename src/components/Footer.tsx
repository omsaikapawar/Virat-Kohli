export default function Footer() {
  return (
    <footer className="bg-white border-t border-border mt-16">
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Main footer */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🏏</span>
            <span className="font-bold text-xl text-text-primary">OSK Fun</span>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-text-secondary">
            <a href="#" className="hover:text-primary transition-colors">Home</a>
            <a href="#" className="hover:text-primary transition-colors">About</a>
            <a href="#" className="hover:text-primary transition-colors">More Experiments</a>
            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary transition-colors">Disclaimer</a>
            <a href="#" className="hover:text-primary transition-colors">GitHub</a>
          </nav>
        </div>

        {/* Disclaimer */}
        <div className="border-t border-gray-100 pt-6">
          <p className="text-xs text-text-muted text-center leading-relaxed max-w-2xl mx-auto">
            Virat Kohli's name and likeness are used only to identify the subject of this fictional entertainment experiment. 
            No affiliation or endorsement is implied. Net worth is an estimate and this game is purely for entertainment. 
            Starting wealth is an approximate public estimate and may change over time.
          </p>
          <p className="text-xs text-text-muted text-center mt-3">
            Made for fun by <span className="font-semibold text-text-secondary">OSK</span>. © {new Date().getFullYear()} OSK Fun.
          </p>
        </div>
      </div>
    </footer>
  );
}
