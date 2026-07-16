import type { Project } from './projects/projectSchema';

export type { LinkValue, LocalizedText, Project, ProjectCategory, ProjectCover, ProjectLinkSet } from './projects/projectSchema';
export { defineProject } from './projects/projectSchema';

const projectModules = import.meta.glob<{ default: Project }>('./projects/facts/*.ts', { eager: true });
const loadedProjects = Object.entries(projectModules).map(([source, module]) => {
  const project = module.default;
  if (!project?.id || project.id !== project.slug || !project.title?.en || !project.title?.zh || !project.cover?.src) {
    throw new Error(`Invalid project fact module: ${source}`);
  }
  return project;
});

const duplicateIds = loadedProjects.map((project) => project.id).filter((id, index, ids) => ids.indexOf(id) !== index);
const duplicateNumbers = loadedProjects.map((project) => project.number).filter((number, index, numbers) => numbers.indexOf(number) !== index);
if (duplicateIds.length > 0) throw new Error(`Duplicate project id(s): ${[...new Set(duplicateIds)].join(', ')}`);
if (duplicateNumbers.length > 0) throw new Error(`Duplicate project number(s): ${[...new Set(duplicateNumbers)].join(', ')}`);

export const projects = [...loadedProjects].sort((left, right) => left.sortOrder - right.sortOrder) as readonly Project[];
export const projectsBySlug = Object.fromEntries(projects.map((project) => [project.slug, project])) as Readonly<Record<string, Project>>;
export type ProjectSlug = (typeof projects)[number]['slug'];

export function getProject(slug: string): Project {
  const project = projectsBySlug[slug];
  if (!project) throw new Error(`Unknown project: ${slug}`);
  return project;
}
