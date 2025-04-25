export function cleanText(input: string): string {
  let text = input;
  // Remove HTML tags
  text = text.replace(/<[^>]*>/g, ' ');
  // Remove Markdown images ![Alt](url)
  text = text.replace(/!\[.*?\]\(.*?\)/g, ' ');
  // Remove Markdown links [Text](url) (leaving just "Text")
  text = text.replace(/\[(.*?)\]\(.*?\)/g, '$1');
  // Remove standalone [Brackets]
  text = text.replace(/\[[^\]]+\]/g, ' ');
  // Remove image/media refs
  text = text.replace(/!? ?\[Image ?\d+.*?\]/gi, ' ');
  // Remove URLs
  text = text.replace(/https?:\/\/\S+/g, ' ');
  // Remove Markdown formatting (**bold**, _italic_, etc.)
  text = text.replace(/[*_~`>#-]+/g, ' ');
  // Remove section underline/separators (===, ---, *** etc.)
  text = text.replace(/[=]{3,}|[*]{3,}|[-]{3,}/g, ' ');
  // Remove page boilerplate/common menu text
  text = text.replace(/\b(Sign in|Register|Log into your account|Password recovery|Sign up|Create a Free Account|Cart|Leave a Reply|Cancel reply|Privacy Policy|Contact|All News|Home|Shop|Become a Member|Support GNN|Facebook|Instagram|Pinterest|Twitter|Youtube|Email|Share|Good News Network)\b/gi, ' ');
  // Remove non-printable/control characters
  text = text.replace(/[^\x20-\x7E\n\r]/g, '');
  // Collapse whitespace
  text = text.replace(/\s+/g, ' ');
  return text.trim();
  }