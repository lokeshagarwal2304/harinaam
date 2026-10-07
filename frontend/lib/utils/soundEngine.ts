/**
 * Harinaam Subtle Sound & Haptic Engine
 * Uses Web Audio API for organic slate/ink friction sound and navigator.vibrate for haptics.
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  /**
   * Haptic vibration for mobile tactile feedback
   */
  public triggerHaptic(type: 'touch' | 'commit' | 'reject') {
    if (typeof window === 'undefined' || !navigator.vibrate) return;
    try {
      if (type === 'touch') {
        navigator.vibrate(10); // Subtle 10ms micro pulse
      } else if (type === 'commit') {
        navigator.vibrate([25, 30, 45]); // Happy sacred rhythm pulse
      } else if (type === 'reject') {
        navigator.vibrate([15, 20]); // Soft rejection pulse
      }
    } catch {
      // Haptics not supported or blocked by user gesture policy
    }
  }

  /**
   * Very soft friction sound while moving stylus/finger on digital slate
   */
  public playStrokeFriction() {
    if (this.isMuted) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(140 + Math.random() * 30, ctx.currentTime);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450, ctx.currentTime);

      gain.gain.setValueAtTime(0.015, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.04);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } catch {
      // Audio autoplay policy fallback
    }
  }

  /**
   * Gentle sacred singing bowl / meditative chime harmonic on Naam commit
   */
  public playNaamCommitSound() {
    this.triggerHaptic('commit');
    if (this.isMuted) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const now = ctx.currentTime;

      // Base harmonic tone (528 Hz - Solfeggio frequency of harmony)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(528, now);

      gain1.gain.setValueAtTime(0.04, now);
      gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.75);

      osc1.connect(gain1);
      gain1.connect(ctx.destination);

      osc1.start(now);
      osc1.stop(now + 0.75);

      // Higher harmonic (1056 Hz)
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();

      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(1056, now);

      gain2.gain.setValueAtTime(0.018, now);
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.55);

      osc2.connect(gain2);
      gain2.connect(ctx.destination);

      osc2.start(now);
      osc2.stop(now + 0.55);
    } catch {
      // Audio autoplay policy fallback
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
  }
}

export const soundEngine = new SoundEngine();
