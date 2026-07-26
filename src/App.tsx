import React, { Suspense, lazy, startTransition, useDeferredValue, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ThemeProvider } from './contexts/ThemeContext';
import { MagicModeProvider, useMagicMode } from './contexts/MagicModeContext';
import Hero from './components/Hero';
import Navigation from './components/Navigation';
import CustomCursor from './components/CustomCursor';
import ChaosCursor from './components/ChaosCursor';
import MagicParticles from './components/MagicParticles';
import LoadingScreen from './components/LoadingScreen';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import NotFound404 from './components/NotFound404';
import { ParallaxBackground } from './components/ParallaxSection';
import ScrollProgressBar from './components/ScrollProgressBar';
import { MouseFollower } from 'react-mouse-follower';
import { usePerformanceProfile } from './hooks/usePerformanceProfile';
import { useLenisScroll } from './hooks/useLenisScroll';
import { force_scroll_to_id } from './utils/scroll_to';
import './App.css';

const Scene3D = lazy(() => import('./components/Scene3D'));
const About = lazy(() => import('./components/About'));
const Skills = lazy(() => import('./components/Skills'));
const Projects = lazy(() => import('./components/Projects'));
const Internships = lazy(() => import('./components/Internships'));
const Achievements = lazy(() => import('./components/Achievements'));
const Contact = lazy(() => import('./components/Contact'));
const AllProjects = lazy(() => import('./components/AllProjects'));

const PreJourneySections = ({ magic_mode }: { magic_mode: boolean }) => (
  <>
    <Hero magicMode={magic_mode} />
    <div className="section-deferred">
      <About magicMode={magic_mode} />
    </div>
    <div className="section-deferred">
      <Skills magicMode={magic_mode} />
    </div>
    <Projects magicMode={magic_mode} />
  </>
);

const PostJourneySections = ({ magic_mode }: { magic_mode: boolean }) => (
  <>
    <Internships magicMode={magic_mode} />
    <div className="section-bridge" aria-hidden />
    <Achievements magicMode={magic_mode} />
    <div className="section-deferred">
      <Contact magicMode={magic_mode} />
    </div>
  </>
);

const HomeSections = ({ magic_mode }: { magic_mode: boolean }) => (
  <>
    <PreJourneySections magic_mode={magic_mode} />
    <PostJourneySections magic_mode={magic_mode} />
  </>
);

const AppContent = () => {
  const location = useLocation();
  const { magicMode } = useMagicMode();
  const deferred_magic_mode = useDeferredValue(magicMode);
  const { enable_parallax } = usePerformanceProfile();
  useLenisScroll();

  useEffect(() => {
    if (!location.hash) return;

    const id = location.hash.replace('#', '');
    let attempts = 0;
    let timeout_id = 0;

    const try_scroll = () => {
      const el = document.getElementById(id);
      if (el) {
        force_scroll_to_id(id);
        window.setTimeout(() => {
          (document.activeElement as HTMLElement | null)?.blur?.();
        }, 300);
        return;
      }

      if (attempts < 30) {
        attempts += 1;
        timeout_id = window.setTimeout(try_scroll, 40);
      }
    };

    try_scroll();
    return () => window.clearTimeout(timeout_id);
  }, [location]);

  return (
    <div className="App relative z-10">
      <ScrollProgressBar />
      <CustomCursor />
      <ChaosCursor magicMode={deferred_magic_mode} />
      <MagicParticles magicMode={deferred_magic_mode} />
      <Navigation />

      <Suspense fallback={null}>
        <Routes>
          <Route
            path="/"
            element={
              enable_parallax ? (
                <>
                  <ParallaxBackground>
                    <PreJourneySections magic_mode={deferred_magic_mode} />
                  </ParallaxBackground>
                  <PostJourneySections magic_mode={deferred_magic_mode} />
                </>
              ) : (
                <HomeSections magic_mode={deferred_magic_mode} />
              )
            }
          />
          <Route path="/all-projects" element={<AllProjects magicMode={deferred_magic_mode} />} />
          <Route path="*" element={<NotFound404 />} />
        </Routes>
      </Suspense>
    </div>
  );
};

function App() {
  const [is_loading, set_is_loading] = React.useState(true);
  const [show_3d_scene, set_show_3d_scene] = React.useState(false);
  const {
    enable_3d_scene,
    enable_mouse_follower,
    enable_heavy_effects,
    prefers_reduced_motion,
  } = usePerformanceProfile();

  const handle_loading_complete = () => {
    startTransition(() => {
      set_is_loading(false);
    });
  };

  useEffect(() => {
    if (is_loading || !enable_3d_scene) {
      set_show_3d_scene(false);
      return;
    }

    let cancelled = false;
    const mount_3d = () => {
      if (!cancelled) {
        startTransition(() => set_show_3d_scene(true));
      }
    };

    const idle_id = window.requestIdleCallback?.(mount_3d, { timeout: 1200 });
    const timeout_id = idle_id === undefined ? window.setTimeout(mount_3d, 800) : undefined;

    return () => {
      cancelled = true;
      if (idle_id !== undefined) window.cancelIdleCallback(idle_id);
      if (timeout_id !== undefined) window.clearTimeout(timeout_id);
    };
  }, [is_loading, enable_3d_scene]);

  return (
    <ThemeProvider>
      <MagicModeProvider>
        <div className={`relative min-h-[100dvh] min-h-screen bg-white dark:bg-black text-slate-900 dark:text-white transition-colors duration-500 ${prefers_reduced_motion ? 'reduce-motion' : ''}`}>
          {is_loading && <LoadingScreen onComplete={handle_loading_complete} />}

          {show_3d_scene && (
            <Suspense fallback={null}>
              <Scene3D />
            </Suspense>
          )}

          <div className="fixed inset-0 z-0 pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50/20 via-white/40 to-white dark:bg-black" />
            {enable_heavy_effects && (
              <>
                <motion.div
                  className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-blue-100/20 dark:bg-black/20 rounded-full blur-2xl"
                  animate={{ x: [0, 50, 0], y: [0, -50, 0] }}
                  transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                />
                <motion.div
                  className="absolute bottom-1/4 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-purple-100/20 dark:bg-black/20 rounded-full blur-2xl"
                  animate={{ x: [0, -50, 0], y: [0, 50, 0] }}
                  transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
                />
              </>
            )}
          </div>

          {enable_mouse_follower && <MouseFollower />}

          {!is_loading && (
            <BrowserRouter>
              <AppContent />
            </BrowserRouter>
          )}
        </div>
      </MagicModeProvider>
    </ThemeProvider>
  );
}

export default App;
