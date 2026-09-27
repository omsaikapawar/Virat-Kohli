import { useEffect, useState } from 'react';

interface AchievementPopupProps {
  achievement: {
    id: string;
    name: string;
    description: string;
    emoji: string;
  } | null;
  onDismiss: () => void;
}

export default function AchievementPopup({ achievement, onDismiss }: AchievementPopupProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (achievement) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        setTimeout(onDismiss, 500);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [achievement, onDismiss]);

  if (!achievement) return null;

  return (
    <div
      className={`fixed top-20 right-4 z-[200] max-w-sm transition-all duration-500 ${
        visible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}
    >
      <div className="bg-white rounded-2xl shadow-2xl border border-primary/20 overflow-hidden">
        <div className="bg-gradient-to-r from-accent-saffron to-primary h-1" />
        <div className="p-4 flex items-center gap-3">
          <div className="text-3xl flex-shrink-0">{achievement.emoji}</div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">🏆 Achievement Unlocked!</p>
            <p className="font-bold text-text-primary">{achievement.name}</p>
            <p className="text-xs text-text-muted">{achievement.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// List of all achievements
interface AchievementsListProps {
  achievements: Array<{
    id: string;
    name: string;
    description: string;
    emoji: string;
    unlockedAt?: number;
  }>;
  allAchievements: Array<{
    id: string;
    name: string;
    description: string;
    emoji: string;
  }>;
  isOpen: boolean;
  onClose: () => void;
}

export function AchievementsList({ achievements, allAchievements, isOpen, onClose }: AchievementsListProps) {
  if (!isOpen) return null;

  const unlockedIds = new Set(achievements.map((a) => a.id));

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in" />
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[80vh] overflow-hidden animate-fade-in-scale"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-text-primary">🏆 Achievements</h2>
          <p className="text-sm text-text-muted">{achievements.length}/{allAchievements.length} unlocked</p>
        </div>
        <div className="p-6 overflow-y-auto max-h-[60vh] space-y-3">
          {allAchievements.map((ach) => {
            const unlocked = unlockedIds.has(ach.id);
            return (
              <div
                key={ach.id}
                className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${
                  unlocked ? 'bg-green-50 border border-primary/20' : 'bg-gray-50 border border-gray-100 opacity-50'
                }`}
              >
                <span className="text-2xl">{unlocked ? ach.emoji : '🔒'}</span>
                <div>
                  <p className={`font-semibold text-sm ${unlocked ? 'text-text-primary' : 'text-text-muted'}`}>
                    {ach.name}
                  </p>
                  <p className="text-xs text-text-muted">{ach.description}</p>
                </div>
                {unlocked && <span className="ml-auto text-primary text-sm">✓</span>}
              </div>
            );
          })}
        </div>
        <div className="p-4 border-t border-gray-100">
          <button
            onClick={onClose}
            className="w-full py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary-dark transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
