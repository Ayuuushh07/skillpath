import type { Platform, RoadmapFormData } from '../types';

function platformGuidance(platform: Platform): string {
  switch (platform) {
    case 'Claude':
      return 'Optimize for Claude: use thoughtful Markdown, explicit assumptions, nuanced trade-offs, and a short checkpoint at the end of each phase.';
    case 'ChatGPT':
      return 'Optimize for ChatGPT: use clear headings, practical examples, compact tables, and actionable checklists. Ask at most 3 questions only when a critical detail is missing.';
    case 'Gemini':
      return 'Optimize for Gemini: use concise comparison-friendly sections, current resource verification when browsing is available, and recommendations grounded in the learner profile.';
    default:
      return 'Use clean portable Markdown that works across major AI assistants. Do not assume platform-specific tools and make the response easy to export.';
  }
}

function display(value: string): string {
  return value.trim() || 'Not provided';
}

function roadmapSections(skill: string): string[] {
  const normalized = skill.toLowerCase();
  if (/language|english|hindi|spanish|french|german|japanese/.test(normalized)) {
    return ['Learning objective and fluency target', 'Current level and gap analysis', 'Pronunciation and vocabulary foundation', 'Grammar and comprehension sequence', 'Listening and speaking practice', 'Reading and writing practice', 'Weekly practice schedule', 'Immersion resources', 'Progress checks and fluency milestones', '30-day action plan', 'Next steps'];
  }
  if (/data|sql|excel|power bi|tableau|analytics|business intelligence/.test(normalized)) {
    return ['Executive learning summary', 'Baseline and prerequisite audit', 'Data literacy and tool foundations', 'SQL and data preparation sequence', 'Analysis and visualization workflow', 'Portfolio projects with datasets', 'Weekly practice schedule', 'Recommended data resources', 'Assessment and quality checks', 'Portfolio and career preparation', '30-day action plan', 'Next steps'];
  }
  if (/design|figma|ux|ui/.test(normalized)) {
    return ['Design goal and success criteria', 'Current skill assessment', 'Principles and tool foundations', 'Research and ideation workflow', 'Practice briefs and case studies', 'Portfolio project sequence', 'Weekly critique and practice schedule', 'Recommended design resources', 'Review rubric and milestones', 'Portfolio presentation strategy', '30-day action plan', 'Next steps'];
  }
  return ['Executive summary and timeline feasibility', 'Knowledge audit and prerequisite gaps', 'Core concepts and tooling sequence', 'Hands-on practice and weekly schedule', 'Progressive projects with acceptance criteria', 'Testing, debugging, and quality checks', 'Recommended resources with verified links', 'Portfolio and career preparation', 'Assessment milestones and progress checklist', 'Estimated completion timeline', '30-day action plan', 'Next steps'];
}

export function generatePrompt(data: RoadmapFormData, platform: Platform): string {
  const dailyCommitment = data.dailyTime === 'Custom' ? display(data.customDailyTime) : display(data.dailyTime);
  const deadline = data.deadline === 'Custom' ? display(data.customDeadline) : display(data.deadline);
  const formats = data.learningFormats.length ? data.learningFormats.join(', ') : 'No preference specified';
  const verificationDate = new Date().toISOString().slice(0, 10);
  const sections = roadmapSections(data.skill);

  return `# Personalized Learning Roadmap + PDF Document Request

## Non-negotiable deliverable
Do not give me only a chat explanation. Research, write, and return the completed learning roadmap as a downloadable PDF document (.pdf) when your environment supports real file creation. The PDF must contain the entire roadmap, clickable hyperlinks, readable tables, a clear title page, a short table of contents, page numbers, and clean formatting ready to save, print, or share. If you cannot create or attach a real PDF, say so clearly and provide complete, well-structured PDF-ready Markdown or HTML with all hyperlinks preserved. Never claim that a PDF was created when it was not.

## Output optimization
${platformGuidance(platform)}

## AI role
Act as an experienced learning path architect, technical mentor, resource researcher, and career guidance expert. Turn the learner profile below into a realistic, motivating, measurable, and resource-backed learning roadmap. Explain complex topics in beginner-friendly language without being vague or patronizing.

## Missing information and assumptions
Use the provided profile as the source of truth. If one or more missing details would materially change the roadmap, ask no more than 3 high-impact questions before drafting. Otherwise, proceed with clearly labeled, conservative assumptions. Do not ask questions merely to collect optional preferences.

## Student profile
- Skill to learn: ${display(data.skill)}
- Primary goal: ${display(data.primaryGoal)}
- Specific target or outcome: ${display(data.targetOutcome)}
- Current education: ${display(data.education)}
- Current year/status: ${display(data.currentYear)}
- Current knowledge level: ${display(data.knowledgeLevel)}
- Related skills already known: ${display(data.relatedSkills)}
- Daily study time: ${dailyCommitment}
- Study days per week: ${display(data.studyDays)}
- Deadline: ${deadline}
- Resource preference: ${display(data.resourcePreference)}
- Preferred learning formats: ${formats}
- Preferred teaching language: ${display(data.teachingLanguage)}
- Learning approach: ${display(data.learningApproach)}

## Research and resource requirements
1. Browse the web before writing the roadmap when browsing is available and verify every link is live and relevant at the time of research. If browsing is unavailable, state that limitation and do not present unverified links as confirmed.
2. Recommend resources phase-by-phase and week-by-week, not as a disconnected list. For every topic, state exactly what to study, from which resource, and in which order.
3. Include at least 8 useful resources unless the subject genuinely has fewer credible options: official documentation, high-quality free tutorials or courses, practice platforms, project references, and books.
4. Include legal free resources wherever possible. For books, link only to legitimate free/open-access sources such as official publishers, author sites, Internet Archive/Open Library when legally available, university materials, or public-domain sources. Never include pirated PDF sites, torrent links, or copyright-infringing downloads.
5. For every resource include: resource name, exact topic covered, provider/platform, free/paid status, why it fits this learner, estimated time, and a direct clickable URL. Mark checked links as \`Verified on ${verificationDate}\`; use \`Link needs verification\` when a link could not be checked.
6. If a good resource is paid, also give a credible free alternative where one exists. If no link can be verified, do not invent one: provide a precise search phrase and label the item \`Link needs verification\`.
7. Include a compact resource table in the PDF document with columns: Phase/Week, Topic, Resource, Format, Free/Paid, Verified URL, and What to complete.

## Roadmap scope and adaptation rules
1. Scale the roadmap to the learner's available time. Prefer a focused, achievable path over an exhaustive catalog. State the recommended total duration and what to defer.
2. Adapt deliverables to the skill domain. Technical skills may use repositories, APIs, tests, and deployments; design skills may use case studies and prototypes; business skills may use analyses and plans; languages may use speaking, listening, reading, and writing practice. Do not force irrelevant technical sections.
3. Avoid repeating the same advice across phases, weekly plans, projects, and the 30-day plan. Each section must add new information.
4. Use A4-friendly formatting when generating a PDF: readable body text, consistent headings, page numbers, clickable table of contents, and tables that do not become unreadably wide.

## What the roadmap must contain
1. Analyze the student's background and existing knowledge before recommending a path.
2. Identify missing prerequisites and order them by importance.
3. Create a realistic step-by-step roadmap divided into phases and weeks.
4. Explain what to learn, why it matters, and how each topic connects to the goal.
5. Respect the available study hours and study days. Include realistic daily tasks; if the time is insufficient, explain trade-offs rather than pretending everything fits.
6. Add practical assignments, progressively harder projects, revision sessions, and assessment checkpoints.
7. Explain how the learner can measure progress and know when to move to the next phase.
8. Include portfolio-building suggestions tailored to the chosen skill and primary goal.
9. Include internship, job, freelance, or academic preparation guidance when relevant to the stated goal.
10. Estimate the total learning duration realistically and show what would change if the learner can study more or less.
11. Add a final 30-day action plan and a checklist of the next five concrete actions.

## Required PDF document structure
Use these relevant sections in this order. Add a title page, table of contents, and source verification notes when producing a PDF. Do not force unrelated sections or repeat content:
${sections.map((section, index) => `${index + 1}. ${section}`).join('\n')}

Before creating the PDF file or PDF-ready content, run a final quality check: the schedule must fit the learner's stated time, every recommendation must connect to the goal, every resource URL must be labeled with its actual verification status, free legal book/resource options must be included where available, irrelevant sections must be omitted, duplicated advice must be removed, and the tone must stay beginner-friendly, practical, and honest about trade-offs.`;
}
