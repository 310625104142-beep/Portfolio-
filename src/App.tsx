import React, { useState, useEffect } from 'react';
import { Project, Skill, Experience, Testimonial } from './types/portfolio.ts';
import { INITIAL_PROJECTS, INITIAL_SKILLS, INITIAL_EXPERIENCE, INITIAL_TESTIMONIALS } from './data/initialData.ts';

import { Header } from './components/Header.tsx';
import { Hero } from './components/Hero.tsx';
import { ProjectsSection } from './components/ProjectsSection.tsx';
import { ArchitectureSection } from './components/ArchitectureSection.tsx';
import { SkillsSection } from './components/SkillsSection.tsx';
import { ExperienceSection } from './components/ExperienceSection.tsx';
import { TestimonialsSection } from './components/TestimonialsSection.tsx';
import { ContactSection } from './components/ContactSection.tsx';
import { Footer } from './components/Footer.tsx';

import { ProjectDetailModal } from './components/ProjectDetailModal.tsx';
import { InteractiveDemoModal } from './components/InteractiveDemoModal.tsx';
import { DatabaseExplorer } from './components/DatabaseExplorer.tsx';
import { ProjectAdminModal } from './components/ProjectAdminModal.tsx';
import { DeploymentGuideModal } from './components/DeploymentGuideModal.tsx';
import { ResumeModal } from './components/ResumeModal.tsx';

export default function App() {
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [skills, setSkills] = useState<Skill[]>(INITIAL_SKILLS);
  const [experience, setExperience] = useState<Experience[]>(INITIAL_EXPERIENCE);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(INITIAL_TESTIMONIALS);
  const [loading, setLoading] = useState<boolean>(true);
  const [serverOnline, setServerOnline] = useState<boolean>(false);

  // Modals state
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeDemoProject, setActiveDemoProject] = useState<Project | null>(null);
  const [isDbExplorerOpen, setIsDbExplorerOpen] = useState<boolean>(false);
  const [isDeploymentGuideOpen, setIsDeploymentGuideOpen] = useState<boolean>(false);
  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState<boolean>(false);
  const [projectToEdit, setProjectToEdit] = useState<Project | null>(null);

  // Theme: 'dark' | 'light' | 'terminal'
  const [theme, setTheme] = useState<'dark' | 'light' | 'terminal'>('dark');

  // Load data from backend API
  const fetchAllData = async () => {
    try {
      const [projRes, skillRes, expRes, testRes, healthRes] = await Promise.allSettled([
        fetch('/api/projects'),
        fetch('/api/skills'),
        fetch('/api/experience'),
        fetch('/api/testimonials'),
        fetch('/api/health')
      ]);

      if (projRes.status === 'fulfilled' && projRes.value.ok) {
        const d = await projRes.value.json();
        if (d.success && d.data) setProjects(d.data);
      }

      if (skillRes.status === 'fulfilled' && skillRes.value.ok) {
        const d = await skillRes.value.json();
        if (d.success && d.data) setSkills(d.data);
      }

      if (expRes.status === 'fulfilled' && expRes.value.ok) {
        const d = await expRes.value.json();
        if (d.success && d.data) setExperience(d.data);
      }

      if (testRes.status === 'fulfilled' && testRes.value.ok) {
        const d = await testRes.value.json();
        if (d.success && d.data) setTestimonials(d.data);
      }

      if (healthRes.status === 'fulfilled' && healthRes.value.ok) {
        setServerOnline(true);
      }
    } catch (e) {
      console.warn('Backend API connection note (using canonical fallback if booting):', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const handleAddNewProject = () => {
    setProjectToEdit(null);
    setIsAdminModalOpen(true);
  };

  const handleEditProject = (project: Project) => {
    setProjectToEdit(project);
    setIsAdminModalOpen(true);
  };

  // Theme container classes
  const getThemeClass = () => {
    if (theme === 'light') return 'bg-neutral-50 text-neutral-900';
    if (theme === 'terminal') return 'bg-[#060a08] text-[#34d399] font-mono selection:bg-emerald-900 selection:text-white';
    return 'bg-neutral-950 text-neutral-100';
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 ${getThemeClass()}`}>
      
      {/* Top Header Navigation conforming to Top Bar Contract */}
      <Header
        onOpenDbExplorer={() => setIsDbExplorerOpen(true)}
        onOpenDeploymentGuide={() => setIsDeploymentGuideOpen(true)}
        onOpenResume={() => setIsResumeOpen(true)}
        theme={theme}
        setTheme={setTheme}
      />

      {/* Main Content Layout */}
      <main>
        {/* Split Hero Section with Proof Strip */}
        <Hero
          onOpenDbExplorer={() => setIsDbExplorerOpen(true)}
          onOpenResume={() => setIsResumeOpen(true)}
          onOpenDeploymentGuide={() => setIsDeploymentGuideOpen(true)}
          serverOnline={serverOnline}
        />

        {/* Selected Works Bento Grid */}
        <ProjectsSection
          projects={projects}
          loading={loading}
          onSelectProject={(proj) => setSelectedProject(proj)}
          onLaunchDemo={(proj) => setActiveDemoProject(proj)}
          onAddNewProject={handleAddNewProject}
          onEditProject={handleEditProject}
        />

        {/* Technical Stack & Architecture Matrix */}
        <SkillsSection skills={skills} />

        {/* Architecture Topography & Relational Schema Pipeline */}
        <ArchitectureSection
          onOpenDbExplorer={() => setIsDbExplorerOpen(true)}
          onOpenDeploymentGuide={() => setIsDeploymentGuideOpen(true)}
        />

        {/* Career Experience & Milestones */}
        <ExperienceSection experience={experience} />

        {/* Peer Reviews & Endorsements */}
        <TestimonialsSection testimonials={testimonials} />

        {/* Direct Contact Form with Database Persistence & Recruiter Inbox */}
        <ContactSection onMessageSent={fetchAllData} />
      </main>

      {/* Footer */}
      <Footer
        onOpenDbExplorer={() => setIsDbExplorerOpen(true)}
        onOpenDeploymentGuide={() => setIsDeploymentGuideOpen(true)}
      />

      {/* Modals */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onLaunchDemo={(proj) => {
          setSelectedProject(null);
          setActiveDemoProject(proj);
        }}
      />

      <InteractiveDemoModal
        project={activeDemoProject}
        onClose={() => setActiveDemoProject(null)}
      />

      <DatabaseExplorer
        isOpen={isDbExplorerOpen}
        onClose={() => setIsDbExplorerOpen(false)}
        onDataChanged={fetchAllData}
      />

      <ProjectAdminModal
        isOpen={isAdminModalOpen}
        projectToEdit={projectToEdit}
        onClose={() => setIsAdminModalOpen(false)}
        onSaved={fetchAllData}
      />

      <DeploymentGuideModal
        isOpen={isDeploymentGuideOpen}
        onClose={() => setIsDeploymentGuideOpen(false)}
      />

      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

    </div>
  );
}
