import { Nav } from '@/components/sections/Nav';
import { Hero } from '@/components/sections/Hero';
import { Experience } from '@/components/sections/Experience';
import { Education } from '@/components/sections/Education';
import { Activities } from '@/components/sections/Activities';
import { Skills } from '@/components/sections/Skills';
import { Contact } from '@/components/sections/Contact';

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Experience />
      <Education />
      <Activities />
      <Skills />
      <Contact />
    </main>
  );
}
