const FACES = ["front", "back", "right", "left", "top", "bottom"] as const;

export function BonusCube({ pop, onOpen }: { pop: boolean; onOpen: () => void }) {
  return (
    <button
      type="button"
      className={pop ? "bonus-scene bonus-scene-pop" : "bonus-scene"}
      onClick={onOpen}
      aria-label="Bonus Now, mở PayPal và MoMo"
    >
      <span className="bonus-tilt">
        <span className="bonus-cube">
          {FACES.map((face) => (
            <span key={face} className={`bonus-face bonus-${face}`}>
              <span className="bonus-plate">
                <span className="bonus-mark">
                  BONUS
                  <br />
                  NOW
                </span>
              </span>
            </span>
          ))}
        </span>
      </span>
    </button>
  );
}
