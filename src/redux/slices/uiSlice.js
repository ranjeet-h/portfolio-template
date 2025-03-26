import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mobileMenuOpen: false,
  scrollProgress: 0,
  activeHash: '',
  isNavVisible: true,
  isScrollingUp: true,
  cursorType: 'default',
  modalOpen: false,
  modalContent: null,
  loadingState: {
    hero: false,
    about: false,
    skills: false,
    projects: false,
    experience: false,
    education: false,
    certifications: false,
    testimonials: false,
    contact: false,
  },
  animationComplete: {
    hero: false,
    about: false,
    skills: false,
    projects: false,
    experience: false,
    education: false,
    certifications: false,
    testimonials: false,
    contact: false,
  },
  dimensions: {
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  },
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleMobileMenu: (state, action) => {
      state.mobileMenuOpen = action.payload !== undefined ? action.payload : !state.mobileMenuOpen;
    },
    updateScrollProgress: (state, action) => {
      state.scrollProgress = action.payload;
    },
    setActiveHash: (state, action) => {
      state.activeHash = action.payload;
    },
    setNavVisibility: (state, action) => {
      state.isNavVisible = action.payload;
    },
    setScrollDirection: (state, action) => {
      state.isScrollingUp = action.payload;
    },
    setCursorType: (state, action) => {
      state.cursorType = action.payload;
    },
    toggleModal: (state, action) => {
      state.modalOpen = action.payload.open;
      state.modalContent = action.payload.content;
    },
    setLoadingState: (state, action) => {
      state.loadingState = {
        ...state.loadingState,
        [action.payload.section]: action.payload.isLoading,
      };
    },
    setAnimationComplete: (state, action) => {
      state.animationComplete = {
        ...state.animationComplete,
        [action.payload.section]: action.payload.isComplete,
      };
    },
    updateDimensions: (state, action) => {
      state.dimensions = action.payload;
    },
  },
});

// Export actions
export const {
  toggleMobileMenu,
  updateScrollProgress,
  setActiveHash,
  setNavVisibility,
  setScrollDirection,
  setCursorType,
  toggleModal,
  setLoadingState,
  setAnimationComplete,
  updateDimensions,
} = uiSlice.actions;

// Selectors
export const selectMobileMenuOpen = (state) => state.ui.mobileMenuOpen;
export const selectScrollProgress = (state) => state.ui.scrollProgress;
export const selectActiveHash = (state) => state.ui.activeHash;
export const selectNavVisibility = (state) => state.ui.isNavVisible;
export const selectScrollDirection = (state) => state.ui.isScrollingUp;
export const selectCursorType = (state) => state.ui.cursorType;
export const selectModalState = (state) => ({
  isOpen: state.ui.modalOpen,
  content: state.ui.modalContent,
});
export const selectLoadingState = (state) => state.ui.loadingState;
export const selectAnimationComplete = (state) => state.ui.animationComplete;
export const selectDimensions = (state) => state.ui.dimensions;

export default uiSlice.reducer; 