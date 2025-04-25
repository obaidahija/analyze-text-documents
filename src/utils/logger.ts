export class Logger {
    info(message: string, ...args: any[]): void {
      console.log(`[INFO]: ${message}`, ...args);
    }
  
    error(message: string, ...args: any[]): void {
      console.error(`[ERROR]: ${message}`, ...args);
    }
  }
  
  const l = new Logger();
  export default l;