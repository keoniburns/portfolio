import { projects } from '../data/projects';
import { experiences } from '../data/experience';
import { education } from '../data/experience';
import constants from '../constants';

// Define different search result types
export type SearchResultType = 'project' | 'skill' | 'experience' | 'education';

// Define a unified search result interface
export interface SearchResult {
  id: string;
  title: string;
  description: string;
  type: SearchResultType;
  url: string;
  relevance: number;  // Higher means more relevant
  image?: string;
  tags?: string[];
}

// Helper function to calculate relevance score based on search query matches
function calculateRelevance(item: any, searchQuery: string): number {
  const query = searchQuery.toLowerCase();
  let score = 0;
  
  // Check title match (highest weight)
  if (item.title && item.title.toLowerCase().includes(query)) {
    score += 10;
    
    // Exact match gets even higher score
    if (item.title.toLowerCase() === query) {
      score += 15;
    }
  }
  
  // Check description match
  if (item.description && item.description.toLowerCase().includes(query)) {
    score += 5;
  }
  
  // Check position/degree match (for experience/education)
  if (item.position && item.position.toLowerCase().includes(query)) {
    score += 7;
  }
  
  if (item.degree && item.degree.toLowerCase().includes(query)) {
    score += 7;
  }
  
  // Check tags match
  if (item.tags && Array.isArray(item.tags)) {
    item.tags.forEach((tag: string) => {
      if (tag.toLowerCase().includes(query)) {
        score += 8;
      }
    });
  }
  
  return score;
}

/**
 * Search across all content in the portfolio
 * @param query The search query
 * @param limit Optional limit for results per type
 * @returns Array of search results ordered by relevance
 */
export function searchAll(query: string, limit?: number): SearchResult[] {
  if (!query || query.trim() === '') return [];
  
  const results: SearchResult[] = [];
  const cleanQuery = query.trim();
  
  // Search projects
  projects.forEach(project => {
    const relevance = calculateRelevance(project, cleanQuery);
    if (relevance > 0) {
      results.push({
        id: project.id,
        title: project.title,
        description: project.description,
        type: 'project',
        url: project.link,
        relevance,
        image: project.image,
        tags: project.tags
      });
    }
  });
  
  // Search skills
  const allSkills = [
    ...constants.programmingLanguages.map(skill => ({ id: `pl-${skill}`, name: skill, category: 'Programming Languages' })),
    ...constants.frameworks.map(skill => ({ id: `fw-${skill}`, name: skill, category: 'Frameworks & Libraries' })),
    ...constants.cloudPlatforms.map(skill => ({ id: `cp-${skill}`, name: skill, category: 'Cloud Platforms' })),
    ...constants.devOpsTools.map(skill => ({ id: `do-${skill}`, name: skill, category: 'DevOps Tools' })),
    ...constants.databases.map(skill => ({ id: `db-${skill}`, name: skill, category: 'Databases' })),
    ...constants.parallelComputing.map(skill => ({ id: `pc-${skill}`, name: skill, category: 'Parallel Computing' })),
    ...constants.testing.map(skill => ({ id: `test-${skill}`, name: skill, category: 'Testing' }))
  ];
  
  allSkills.forEach(skill => {
    if (skill.name.toLowerCase().includes(cleanQuery.toLowerCase())) {
      results.push({
        id: skill.id,
        title: skill.name,
        description: `Skill in ${skill.category}`,
        type: 'skill',
        url: '/skills',
        relevance: 8, // Base relevance score for skills
        tags: [skill.category]
      });
    }
  });
  
  // Search experiences
  experiences.forEach(exp => {
    const relevance = calculateRelevance(exp, cleanQuery);
    if (relevance > 0) {
      results.push({
        id: exp.id,
        title: exp.title,
        description: `${exp.position} - ${exp.description}`,
        type: 'experience',
        url: '/about#experience',
        relevance,
        tags: exp.tags
      });
    }
  });
  
  // Search education
  education.forEach(edu => {
    const relevance = calculateRelevance(edu, cleanQuery);
    if (relevance > 0) {
      results.push({
        id: edu.id,
        title: edu.title,
        description: `${edu.degree} - ${edu.description}`,
        type: 'education',
        url: '/about#education',
        relevance
      });
    }
  });
  
  // Sort by relevance
  results.sort((a, b) => b.relevance - a.relevance);
  
  // Apply limit if specified
  return limit ? results.slice(0, limit) : results;
}

/**
 * Get search results grouped by type
 * @param query The search query
 * @param limit Optional limit for results per type
 */
export function getGroupedSearchResults(query: string, limit?: number) {
  const results = searchAll(query);
  
  // Group by type
  const grouped = {
    projects: results.filter(r => r.type === 'project'),
    skills: results.filter(r => r.type === 'skill'),
    experience: results.filter(r => r.type === 'experience'),
    education: results.filter(r => r.type === 'education')
  };
  
  // Apply limit per group if specified
  if (limit) {
    return {
      projects: grouped.projects.slice(0, limit),
      skills: grouped.skills.slice(0, limit),
      experience: grouped.experience.slice(0, limit),
      education: grouped.education.slice(0, limit)
    };
  }
  
  return grouped;
} 