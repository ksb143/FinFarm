import create from 'zustand';

// 상태의 타입을 정의합니다.
interface SoundSettingsState {
  backgroundMusic: boolean;
  soundEffects: boolean;
  musicVolume: number;
  toggleBackgroundMusic: () => void;
  toggleSoundEffects: () => void;
  setMusicVolume: (volume: number) => void;
}

// 스토어를 생성합니다.
export const useSoundSettingsStore = create<SoundSettingsState>((set) => ({
  backgroundMusic: true,
  soundEffects: true,
  musicVolume: 0.3,

  // backgroundMusic 상태를 토글하는 함수
  toggleBackgroundMusic: () =>
    set((state) => ({ backgroundMusic: !state.backgroundMusic })),

  // soundEffects 상태를 토글하는 함수
  toggleSoundEffects: () =>
    set((state) => ({ soundEffects: !state.soundEffects })),

  // musicVolume 상태를 설정하는 함수
  setMusicVolume: (volume) => set(() => ({ musicVolume: volume })),
}));
