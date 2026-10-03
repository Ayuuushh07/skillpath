import type { Platform, RoadmapFormData } from '../types';

function platformGuidance(platform: Platform): string {
  switch (platform) {
    case 'Claude':
      return 'Use a thoughtful, structured Markdown response. Surface assumptions and trade-offs clearly, then end each phase with a short checkpoint.';
    case 'ChatGPT':
      return 'Use clear headings, tables where they improve scanning, and practical examples. Keep the plan interactive by asking one useful follow-up only if a critical detail is missing.';
    case 'Gemini':
      return 'Use concise sections, comparison-friendly tables, and current resource verification when browsing is available. Keep recommendations grounded in the learner profile.';
    default:
      return 'Use clean Markdown that works across major AI assistants. Do not assume any platform-specific tool or feature, and make the response easy to copy into notes.';
  }
}

function display(value: string): string {
  return value.trim() || 'Not provided';
}

export function generatePrompt(data: RoadmapFormData, platform: Platform): string {
  const dailyCommitment = data.dailyTime === 'Custom' ? display(data.customDailyTime) : display(data.dailyTime);
  const deadline = data.deadline === 'Custom' ? display(data.customDeadline) : display(data.deadline);
  const formats = data.learningFormats.length ? data.learningFormats.join(', ') : 'No preference specified';

  return `# Personalized Learning Roadmap + PDF Document Request

## Non-negotiable deliverable
Do not give me only a chat explanation. Research, write, and return the completed learning roadmap as a downloadable PDF document (.pdf). The PDF file must contain the entire roadmap, clickable hyperlinks, tables where useful, a clear title page, a short table of contents, and clean formatting that is ready to save, print, or share. If your environment cannot attach a real .pdf file, say that clearly before responding and provide the complete PDF-ready content in one well-structured response with all hyperlinks preserved; do not pretend that a file was created.

## Selected AI platform
The learner plans to use **${platform}**. ${platformGuidance(platform)}

## AI role
Act as an experienced learning path architect, technical mentor, resource researcher, and career guidance expert. Turn the learner profile below into a realistic, motivating, measurable, and resource-backed learning roadmap. Explain complex topics in beginner-friendly language without being vague or patronizing.

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
1. Browse the web before writing the roadmap and verify every link is live and relevant at the time of research.
2. Recommend resources phase-by-phase and week-by-week, not as a disconnected list. For every topic, state exactly what to study, from which resource, and in which order.
3. Include at least 8 useful resources unless the subject genuinely has fewer credible options: official documentation, high-quality free tutorials or courses, practice platforms, project references, and books.
4. Include legal free resources wherever possible. For books, link only to legitimate free/open-access sources such as official publishers, author sites, Internet Archive/Open Library when legally available, university materials, or public-domain sources. Never include pirated PDF sites, torrent links, or copyright-infringing downloads.
5. For every resource include: resource name, exact topic covered, provider/platform, free/paid status, why it fits this learner, estimated time, and a direct clickable URL. Mark links as \`Verified on YYYY-MM-DD\` after checking them.
6. If a good resource is paid, also give a credible free alternative where one exists. If no link can be verified, do not invent one: provide a precise search phrase and label the item \`Link needs verification\`.
7. Include a compact resource table in the PDF document with columns: Phase/Week, Topic, Resource, Format, Free/Paid, Verified URL, and What to complete.

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
Use exactly these sections, in this order:
1. Title Page
2. Table of Contents
3. Student Profile Summary
4. Current Skill Assessment
5. Prerequisites
6. Overall Learning Strategy
7. Phase-wise Roadmap
8. Weekly Learning Schedule
9. Daily Task Breakdown
10. Recommended Learning Resources (with verified clickable links)
11. Practical Projects
12. Progress Tracking Checklist
13. Assessment Milestones
14. Portfolio Building Strategy
15. Career Preparation (if relevant)
16. Estimated Completion Timeline
17. 30-Day Action Plan
18. Next Steps
19. Source Verification Notes

Before creating the PDF file, check that the schedule fits the learner's stated time, every recommendation connects to the goal, every resource URL was actually checked, free legal book/resource options are included where available, and the tone stays beginner-friendly, practical, and honest about trade-offs.`;
}
