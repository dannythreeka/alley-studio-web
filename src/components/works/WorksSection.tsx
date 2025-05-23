import { FC } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Section from '../Section';
import SectionTitle from '../SectionTitle';
import Button from '../Button';

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  index: number;
}

const ProjectCard: FC<ProjectCardProps> = ({
  title,
  description,
  tags,
  imageUrl,
  index,
}) => {
  return (
    <motion.div
      className="bg-background rounded-lg overflow-hidden shadow-md flex flex-col"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      whileHover={{ y: -5 }}
    >
      <div className="relative h-48 md:h-64 w-full">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-primary/10 hover:bg-primary/0 transition-colors duration-300" />
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 font-[var(--font-space-grotesk)]">
          {title}
        </h3>
        <p className="text-gray mb-4">{description}</p>

        <div className="flex flex-wrap gap-2 mt-auto">
          {tags.map((tag, idx) => (
            <span
              key={idx}
              className="bg-gray-light text-gray px-2 py-1 rounded-md text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const WorksSection: FC = () => {
  const projects = [
    {
      title: 'E-Commerce Platform',
      description:
        'A full-featured online store with inventory management and payment processing.',
      tags: ['Next.js', 'Stripe', 'MongoDB'],
      imageUrl: '/images/project1.svg',
    },
    {
      title: 'Corporate Dashboard',
      description:
        'Data visualization and analytics platform for business intelligence.',
      tags: ['React', 'D3.js', 'Firebase'],
      imageUrl: '/images/project2.svg',
    },
    {
      title: 'Mobile App',
      description:
        'Cross-platform mobile application for event management and ticketing.',
      tags: ['React Native', 'Node.js', 'AWS'],
      imageUrl: '/images/project3.svg',
    },
  ];

  return (
    <Section id="works" className="bg-light">
      <SectionTitle
        title="Our Work"
        subtitle="Selected projects we've delivered for our clients"
        center
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} index={index} />
        ))}
      </div>

      <div className="flex justify-center">
        <Button variant="secondary" href="#contact">
          Let&apos;s Discuss Your Project
        </Button>
      </div>
    </Section>
  );
};

export default WorksSection;
