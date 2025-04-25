export function cleanJsonRes(text: string): string {
    // Remove leading/trailing code block
    return text
      .replace(/^```json\s*/i, '')  // Removes ```json or ```JSON at the start
      .replace(/^```\s*/i, '')      // Removes ``` at the very start (if any)
      .replace(/\s*```$/, '')       // Removes ``` at the very end
      .trim();
  }